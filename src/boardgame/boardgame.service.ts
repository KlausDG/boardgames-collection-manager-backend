import { selectBaseFields } from '@/utils';
import { convertToArray } from '@/utils/helpers';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DesignerService } from '../designer/designer.service';
import { PrismaService } from '../prisma/prisma.service';
import { PublisherService } from '../publisher/publisher.service';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';
import { BoardgameFilters } from './types';

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
  mechanics: {
    connectOrCreate: Prisma.MechanicsCreateOrConnectWithoutBoardgamesInput[];
  };
  bestPlayerCount: number[];
  isExpansion: boolean;
  isExpansionFor?: IsExpansionForInput;
}

@Injectable()
export class BoardgameService {
  constructor(
    private prisma: PrismaService,
    private designerService: DesignerService,
    private publisherService: PublisherService,
  ) {}

  async createBoardgame(dto: CreateBoardgameDto) {
    try {
      const {
        designers,
        publisher,
        bestPlayerCount: bestPlayerCountString,
        isExpansion,
        isExpansionForBggId,
        mechanics,
        ...otherDtoFields
      } = dto;

      const bestPlayerCount = convertToArray(bestPlayerCountString);

      const designersDbData =
        await this.designerService.findOrCreateDesigners(designers);

      const publisherDbData =
        await this.publisherService.findOrCreatePublisher(publisher);

      const mechanicsStructure = mechanics.map((name: string) => {
        return {
          create: { name },
          where: { name },
        };
      });

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
        isExpansion,
        mechanics: { connectOrCreate: mechanicsStructure },
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
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Already in the Database');
        }
      }

      throw error;
    }
  }

  async getBoardgames(filter: BoardgameFilters) {
    const filterValue = filter.isLinked
      ? { some: { name: filter.value } }
      : filter.value;

    const boardgames = await this.prisma.boardgame.findMany({
      where: {
        category: 'STANDALONE',
        [filter.key]: filterValue,
      },
      orderBy: {
        bggRank: 'asc',
      },
      include: {
        designers: selectBaseFields(),
        publisher: selectBaseFields(),
        expansions: true,
        sleeveRequirements: true,
        mechanics: true,
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
        mechanics: selectBaseFields(),
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
