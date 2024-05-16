import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DesignerService } from '../designer/designer.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';

@Injectable()
export class BoardgameService {
  constructor(
    private prisma: PrismaService,
    private designerService: DesignerService,
  ) {}

  async createBoardgame(dto: CreateBoardgameDto) {
    try {
      const { designers, ...otherDtoFields } = dto;

      const designersDbData =
        await this.designerService.findOrCreateDesigners(designers);

      const boardgame = await this.prisma.boardgame.create({
        data: {
          designers: {
            connect: designersDbData.map((designer) => ({ id: designer.id })),
          },
          ...otherDtoFields,
        },
        include: {
          designers: true,
          sleeves: true,
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

  getBoardgames() {
    return this.prisma.boardgame.findMany({
      include: {
        designers: true,
        sleeves: true,
      },
    });
  }

  getBoardgameById(boardgameId: number) {
    return this.prisma.boardgame.findFirst({
      where: {
        id: boardgameId,
      },
      include: {
        designers: true,
        sleeves: true,
      },
    });
  }

  editBoardgameById(boardgameId: number, dto: EditBoardgameDto) {
    return this.prisma.boardgame.update({
      where: {
        id: boardgameId,
      },
      data: {
        ...dto,
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
