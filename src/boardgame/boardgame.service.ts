import { selectBaseFields } from '@/utils';
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
        ...otherDtoFields
      } = dto;

      const bestPlayerCount = bestPlayerCountString
        .split(', ')
        .map((item) => Number(item));

      const designersDbData =
        await this.designerService.findOrCreateDesigners(designers);

      const publisherDbData =
        await this.publisherService.findOrCreatePublisher(publisher);

      const boardgameData: CreateBoardgameData = {
        designers: {
          connect: designersDbData.map((designer) => ({ id: designer.id })),
        },
        publisher: {
          connect: {
            id: publisherDbData.id,
          },
        },
        bestPlayerCount,
        isExpansion,
        ...otherDtoFields,
      };

      if (isExpansion && isExpansionForBggId) {
        boardgameData.isExpansionFor = {
          connect: {
            bggId: isExpansionForBggId,
          },
        };
      }

      const boardgame = await this.prisma.boardgame.create({
        data: boardgameData as Prisma.BoardgameCreateInput,
        include: {
          designers: selectBaseFields(),
          publisher: selectBaseFields(),
          sleeves: true,
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
    }
  }

  async getBoardgames(type: 'basegame' | 'expansion') {
    const boardgames = await this.prisma.boardgame.findMany({
      where: {
        isExpansion: type === 'expansion' ? true : false,
      },
      include: {
        designers: selectBaseFields(),
        publisher: selectBaseFields(),
        expansions: true,
        sleeves: true,
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
        sleeves: true,
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
}
