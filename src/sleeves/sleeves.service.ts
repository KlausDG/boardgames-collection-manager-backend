import { PrismaService } from '@/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { CreateSleeveDto } from './dto';

@Injectable()
export class SleevesService {
  constructor(private prisma: PrismaService) {}

  async addSleevePacks({
    brand,
    category,
    sleeveTypeId,
    packs,
    sleevesPerPack,
  }: CreateSleeveDto) {
    let brandData = await this.prisma.sleeveBrand.findFirst({
      where: {
        name: brand,
      },
    });

    if (!brandData) {
      brandData = await this.prisma.sleeveBrand.create({
        data: {
          name: brand,
        },
      });
    }

    const existingStock = await this.prisma.sleeveStock.findFirst({
      where: {
        brandId: brandData.id,
        category,
        sleeveTypeId,
        sleevesPerPack,
      },
    });

    if (existingStock) {
      await this.prisma.sleeveStock.update({
        where: { id: existingStock.id },
        data: {
          amount: existingStock.amount + packs * sleevesPerPack,
          packs: existingStock.packs + packs,
        },
      });
    } else {
      await this.prisma.sleeveStock.create({
        data: {
          brandId: brandData.id,
          category,
          sleeveTypeId,
          amount: packs * sleevesPerPack,
          packs,
          sleevesPerPack,
        },
      });
    }
  }

  async createSleeveType({ type, width, height }) {
    try {
      const sleeveType = await this.prisma.sleeveType.create({
        data: { type, width, height },
      });

      return sleeveType;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Already in the Database');
        }
      }
    }
  }

  getSleeveTypes() {
    return this.prisma.sleeveType.findMany({
      include: {
        requirements: true,
        stocks: true,
      },
    });
  }

  getSleeveBrands() {
    return this.prisma.sleeveBrand.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        stocks: true,
      },
    });
  }
}
