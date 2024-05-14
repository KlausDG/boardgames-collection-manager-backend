import { PrismaService } from '@/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { AssignSleeveToBoardgameDto } from './dto';

@Injectable()
export class SleeveToBoardgameService {
  constructor(private prisma: PrismaService) {}

  async assignSleeveToBoardgame(dto: AssignSleeveToBoardgameDto) {
    try {
      const { boardgameId, sleeveId, amount } = dto;

      const apiResponse = await this.prisma.sleeveToBoardgame.create({
        data: {
          amount,
          boardgameId,
          sleeveId,
        },
        include: {
          boardgame: true,
          sleeve: true,
        },
      });

      return apiResponse;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Already in the Database');
        }
      }
    }
  }

  async updateConsumedAmount(dto: AssignSleeveToBoardgameDto) {
    try {
      const { boardgameId, sleeveId, amount } = dto;

      const apiResponse = await this.prisma.sleeveToBoardgame.update({
        where: {
          boardgameId_sleeveId: {
            boardgameId,
            sleeveId,
          },
        },
        data: {
          amount,
        },
        include: {
          boardgame: true,
          sleeve: true,
        },
      });

      return apiResponse;
    } catch (error) {
      throw new ForbiddenException('Something wrong happened');
    }
  }
}
