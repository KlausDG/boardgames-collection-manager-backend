import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';

@Injectable()
export class BoardgameService {
  constructor(private prisma: PrismaService) {}

  async createBoardgame(userId: number, dto: CreateBoardgameDto) {
    try {
      const { designerName, ...otherDtoFields } = dto;
      const designer = await this.prisma.designer.findFirst({
        where: {
          name: designerName,
        },
      });

      let designerParam;

      if (!designer) {
        designerParam = {
          designer: {
            create: {
              name: designerName,
            },
          },
        };
      } else {
        designerParam = {
          designer: {
            connect: { id: designer.id },
          },
        };
      }

      const boardgame = await this.prisma.boardgame.create({
        data: {
          user: {
            connect: { id: userId },
          },
          description: 'asd',
          ...otherDtoFields,
          ...designerParam,
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

  getBoardgames(userId: number) {
    return this.prisma.boardgame.findMany({
      where: {
        userId,
      },
    });
  }

  getBoardgameById(userId: number, boardgameId: number) {
    return this.prisma.boardgame.findFirst({
      where: {
        userId,
        id: boardgameId,
      },
    });
  }

  editBoardgameById(
    userId: number,
    boardgameId: number,
    dto: EditBoardgameDto,
  ) {
    return this.prisma.boardgame.update({
      where: {
        userId,
        id: boardgameId,
      },
      data: {
        ...dto,
      },
    });
  }

  deleteBoardgameById(userId: number, boardgameId: number) {}
}
