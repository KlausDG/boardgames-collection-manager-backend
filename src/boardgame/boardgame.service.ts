import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DesignerService } from '../designer/designer.service';
import { PrismaService } from '../prisma/prisma.service';
import { connectWithId } from '../utils';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';

@Injectable()
export class BoardgameService {
  constructor(
    private prisma: PrismaService,
    private designerService: DesignerService,
  ) {}

  async createBoardgame(userId: number, dto: CreateBoardgameDto) {
    try {
      const { designerName, ...otherDtoFields } = dto;

      const designer =
        await this.designerService.findOrCreateDesigner(designerName);

      const boardgame = await this.prisma.boardgame.create({
        data: {
          user: connectWithId(userId),
          designer: connectWithId(designer.id),
          ...otherDtoFields,
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
      include: {
        designer: true,
      },
    });
  }

  getBoardgameById(userId: number, boardgameId: number) {
    return this.prisma.boardgame.findFirst({
      where: {
        userId,
        id: boardgameId,
      },
      include: {
        designer: true,
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

  deleteBoardgameById(userId: number, boardgameId: number) {
    return this.prisma.boardgame.update({
      where: {
        userId,
        id: boardgameId,
      },
      data: {
        inCollection: false,
      },
    });
  }
}
