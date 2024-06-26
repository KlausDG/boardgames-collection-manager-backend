import { PrismaService } from '@/prisma/prisma.service';
import { connectWithId } from '@/utils';
import { Injectable } from '@nestjs/common';
import { SleeveCategories } from '@prisma/client';

import { CreateSleeveSizeDto, SleevePacksDto, SleeveProductDto } from './dto';

@Injectable()
export class SleevesService {
  constructor(private prisma: PrismaService) {}

  async addSleevePacks({ productId, packs }: SleevePacksDto) {
    const existingStock = await this.prisma.sleeveStock.findFirst({
      where: {
        productId,
      },
    });

    if (existingStock) {
      await this.prisma.sleeveStock.update({
        where: { id: existingStock.id },
        data: {
          amount: existingStock.amount + packs,
        },
      });
    } else {
      await this.prisma.sleeveStock.create({
        data: {
          productId,
          amount: packs,
        },
      });
    }
  }

  async createSleeveSize(dto: CreateSleeveSizeDto) {
    try {
      const sleeveSize = await this.prisma.sleeveSize.create({
        data: dto,
      });

      return sleeveSize;
    } catch (error) {
      throw error;
    }
  }

  getSleeveSizes() {
    return this.prisma.sleeveSize.findMany({
      include: {
        sleeveRequirements: true,
        products: true,
      },
    });
  }

  async createSleeveProduct({
    brand,
    sizeId,
    ...otherDtoFields
  }: SleeveProductDto) {
    console.log();

    try {
      const sleeveProduct = await this.prisma.sleeveProduct.create({
        data: {
          brand: {
            connectOrCreate: {
              where: { name: brand },
              create: { name: brand },
            },
          },
          size: connectWithId(sizeId),
          ...otherDtoFields,
        },
        include: {
          brand: true,
          size: true,
        },
      });

      return sleeveProduct;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  getSleeveProducts() {
    return this.prisma.sleeveProduct.findMany({
      orderBy: {
        brand: { name: 'asc' },
      },
      include: {
        brand: true,
        size: true,
      },
    });
  }

  getSleeveBrands() {
    return this.prisma.sleeveBrand.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        products: true,
      },
    });
  }

  getSleeveCategories() {
    return Object.values(SleeveCategories);
  }
}
