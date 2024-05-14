import { PrismaService } from '@/prisma/prisma.service';
import { connectWithId } from '@/utils';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { CreateSleeveDto, EditSleeveDto } from './dto';
import { SleeveOrderBy } from './types';

@Injectable()
export class SleevesService {
  constructor(private prisma: PrismaService) {}

  async createSleeve(userId: number, dto: CreateSleeveDto) {
    try {
      const { amount, ...otherDtoFields } = dto;

      const sleeve = await this.prisma.sleeve.create({
        data: {
          user: connectWithId(userId),
          amountOwned: amount,
          ...otherDtoFields,
        },
      });

      return sleeve;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Already in the Database');
        }
      }
    }
  }

  getSleeves(userId: number, orderBy?: SleeveOrderBy) {
    return this.prisma.sleeve.findMany({
      where: {
        userId,
      },
      orderBy,
      include: {
        boardgame: true,
      },
    });
  }

  getSleevesByBrand(userId: number, brand: string) {
    return this.prisma.sleeve.findMany({
      where: {
        userId,
        brand: { contains: brand },
      },
      orderBy: { brand: 'asc' },
    });
  }

  getSleevesByType(userId: number, type: string) {
    return this.prisma.sleeve.findMany({
      where: {
        userId,
        type,
      },
      orderBy: { type: 'asc' },
    });
  }

  editSleeveById(userId: number, sleeveId: number, dto: EditSleeveDto) {
    const { amount, ...otherDtoFields } = dto;

    return this.prisma.sleeve.update({
      where: {
        userId,
        id: sleeveId,
      },
      data: {
        amountOwned: amount,
        ...otherDtoFields,
      },
    });
  }
}
