import csv from 'csv-parser';
import { createReadStream } from 'fs';

import { BggService } from '@/bgg/bgg.service';
import { selectBaseFields } from '@/utils';
import {
  convertCommaToDot,
  convertToArray,
  delay,
  roundDecimal,
  stringToNumber,
} from '@/utils/helpers';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DesignerService } from '../designer/designer.service';
import { PrismaService } from '../prisma/prisma.service';
import { PublisherService } from '../publisher/publisher.service';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';

interface IsExpansionForInput {
  connect: {
    bggId: number;
  };
}

interface CreateBoardgameData {
  designers: {
    connect: Prisma.DesignerWhereUniqueInput[];
  };
  publisher: {
    connect: Prisma.PublisherWhereUniqueInput;
  };
  bestPlayerCount: number[];
  recPlayerCount: number[];
  isExpansion: boolean;
  isExpansionFor?: IsExpansionForInput;
}

@Injectable()
export class BoardgameService {
  constructor(
    private prisma: PrismaService,
    private designerService: DesignerService,
    private publisherService: PublisherService,
    private bggService: BggService,
  ) {}

  async createBoardgame(dto: CreateBoardgameDto) {
    try {
      const {
        designers,
        publisher,
        bestPlayerCount: bestPlayerCountString,
        recPlayerCount: recPlayerCountString,
        isExpansion,
        isExpansionForBggId,
        ...otherDtoFields
      } = dto;

      const bestPlayerCount = convertToArray(bestPlayerCountString);
      const recPlayerCount = convertToArray(recPlayerCountString);

      const designersDbData =
        await this.designerService.findOrCreateDesigners(designers);

      const publisherDbData =
        await this.publisherService.findOrCreatePublisher(publisher);

      const connectData = {} as CreateBoardgameData;

      if (!!designersDbData) {
        connectData.designers = {
          connect: designersDbData.map((designer) => ({ id: designer.id })),
        };
      }

      if (!!publisherDbData?.id) {
        connectData.publisher = {
          connect: {
            id: publisherDbData.id,
          },
        };
      }

      const boardgameData: CreateBoardgameData = {
        ...connectData,
        bestPlayerCount,
        recPlayerCount,
        isExpansion,
        ...otherDtoFields,
      };

      if (isExpansion && isExpansionForBggId) {
        const baseGame = await this.getBoardgameByBggId(isExpansionForBggId);

        if (baseGame.inDatabase) {
          boardgameData.isExpansionFor = {
            connect: {
              bggId: isExpansionForBggId,
            },
          };
        }
      }

      const boardgame = await this.prisma.boardgame.create({
        data: boardgameData as Prisma.BoardgameCreateInput,
        include: {
          designers: selectBaseFields(),
          publisher: selectBaseFields(),
          sleeveRequirements: true,
          isExpansionFor: selectBaseFields(),
        },
      });

      return boardgame;
    } catch (error) {
      console.log(error.message);

      throw error;

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Already in the Database');
        }
      }
    }
  }

  createBoardgameBatch = (file: Express.Multer.File) => {
    const results = [];

    return new Promise((resolve, reject) => {
      createReadStream(file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            const batchSize = 10;
            const delayTime = 300;
            const formattedData = [];

            for (let i = 0; i < results.length; i += batchSize) {
              const batch = results.slice(i, i + batchSize);

              const batchResults = await Promise.all(
                batch.map(async (item) => {
                  const bggData =
                    await this.bggService.findBoardGameDetailsById(
                      item.objectid,
                    );

                  return {
                    name: item.objectname,
                    bggId: stringToNumber(item.objectid),
                    bggLink: `https://boardgamegeek.com/boardgame/${item.objectid}`,
                    language: item.language,
                    thumbnail: bggData.thumbnail,
                    designers: bggData.designers,
                    publisher: bggData.publishers[0],
                    mechanics: bggData.mechanics,
                    description: bggData.description,
                    yearPublished: bggData.yearPublished,
                    minPlayers: bggData.minPlayers,
                    maxPlayers: bggData.maxPlayers,
                    minPlaytime: bggData.minPlaytime,
                    maxPlaytime: bggData.maxPlaytime,
                    isExpansion: bggData.isExpansion,
                    isExpansionForBggId: stringToNumber(item.isexpansionfor),
                    purchasedPrice: stringToNumber(
                      convertCommaToDot(item.purchasedprice),
                    ),
                    languageDependence: item.bgglanguagedependence,
                    weight: roundDecimal(stringToNumber(item.avgweight)),
                    recPlayerCount: item.bggrecplayers,
                    bestPlayerCount: item.bggbestplayers,
                    bggRank: stringToNumber(item.rank),
                    category: item.itemtype.toUpperCase(),
                  };
                }),
              );

              formattedData.push(...batchResults);
              await delay(delayTime);
            }

            const sortedData = formattedData.sort((a, b) => {
              if (a.isExpansionForBggId === null) return -1;
              if (b.isExpansionForBggId === null) return 1;
              return 0;
            });

            //add each item from formattedData to prisma here
            sortedData.forEach(
              async (item) => await this.createBoardgame(item),
            );

            resolve(formattedData);
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => reject(error + 'error'));
    });
  };

  async getBoardgames(type: 'basegame' | 'expansion') {
    const boardgames = await this.prisma.boardgame.findMany({
      where: {
        isExpansion: type === 'expansion' ? true : false,
      },
      include: {
        designers: selectBaseFields(),
        publisher: selectBaseFields(),
        expansions: true,
        sleeveRequirements: true,
      },
    });
    return boardgames.map((game) => {
      const { createdAt, updatedAt, ...rest } = game;
      return rest;
    });
  }

  getBoardgameById(boardgameId: number) {
    return this.prisma.boardgame.findFirst({
      where: {
        id: boardgameId,
      },
      include: {
        designers: selectBaseFields(),
        publisher: selectBaseFields(),
        expansions: true,
        sleeveRequirements: true,
      },
    });
  }

  async getBoardgameByBggId(bggId: number) {
    const boardgame = await this.prisma.boardgame.findUnique({
      where: {
        bggId,
      },
    });

    return {
      inDatabase: !!boardgame,
    };
  }

  editBoardgameById(boardgameId: number, dto: EditBoardgameDto) {
    const { bestPlayerCount: bestPlayerCountString, ...otherDtoFields } = dto;

    const bestPlayerCount = bestPlayerCountString
      .split(', ')
      .map((item) => Number(item));
    return this.prisma.boardgame.update({
      where: {
        id: boardgameId,
      },
      data: {
        bestPlayerCount,
        ...otherDtoFields,
      },
    });
  }

  deleteBoardgameById(boardgameId: number) {
    return this.prisma.boardgame.update({
      where: {
        id: boardgameId,
      },
      data: {
        inCollection: false,
      },
    });
  }

  async canSleeveBoardgame(boardgameId: number) {
    const boardgame = await this.prisma.boardgame.findUnique({
      where: { id: boardgameId },
      include: {
        sleeveRequirements: {
          include: {
            sleeveSize: true,
          },
        },
      },
    });

    if (!boardgame) {
      throw new Error('Boardgame not found');
    }

    for (const requirement of boardgame.sleeveRequirements) {
      const { sleeveSize, amount } = requirement;

      const sufficientStock = await this.prisma.sleeveStock.findMany({
        where: {
          product: {
            id: sleeveSize.id,
          },
          amount: { gte: amount },
        },
      });

      if (sufficientStock.length === 0) {
        return false;
      }
    }

    return true;
  }
}
