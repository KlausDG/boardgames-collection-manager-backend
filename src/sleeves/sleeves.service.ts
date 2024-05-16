import { PrismaService } from '@/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { CreateSleeveDto, EditSleeveDto } from './dto';
import { SleeveOrderBy } from './types';

@Injectable()
export class SleevesService {
  constructor(private prisma: PrismaService) {}

  async createSleeve(dto: CreateSleeveDto) {
    try {
      const { amount, ...otherDtoFields } = dto;

      const sleeve = await this.prisma.sleeve.create({
        data: {
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

  getSleeves(orderBy?: SleeveOrderBy) {
    return this.prisma.sleeve.findMany({
      orderBy,
      include: {
        boardgame: true,
      },
    });
  }

  getSleevesByBrand(brand: string) {
    return this.prisma.sleeve.findMany({
      where: {
        brand: { contains: brand },
      },
      orderBy: { brand: 'asc' },
    });
  }

  getSleevesByType(type: string) {
    return this.prisma.sleeve.findMany({
      where: {
        type,
      },
      orderBy: { type: 'asc' },
    });
  }

  editSleeveById(sleeveId: number, dto: EditSleeveDto) {
    const { amount, ...otherDtoFields } = dto;

    return this.prisma.sleeve.update({
      where: {
        id: sleeveId,
      },
      data: {
        amountOwned: amount,
        ...otherDtoFields,
      },
    });
  }
}
