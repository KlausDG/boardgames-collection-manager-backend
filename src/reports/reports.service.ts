import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getPurchasedPriceReport() {
    const purchasedPrice: Prisma.BoardgameMaxAggregateInputType = {
      purchasedPrice: true,
    };

    const standalonesData = await this.prisma.boardgame.aggregate({
      _sum: purchasedPrice,
      _avg: purchasedPrice,
      where: {
        isExpansion: false,
        purchasedPrice: {
          not: 0,
        },
      },
    });

    const expansionsData = await this.prisma.boardgame.aggregate({
      _sum: purchasedPrice,
      _avg: purchasedPrice,
      where: {
        isExpansion: true,
        purchasedPrice: {
          not: 0,
        },
      },
    });

    const allGameData = await this.prisma.boardgame.aggregate({
      _sum: purchasedPrice,
      _avg: purchasedPrice,
      where: {
        purchasedPrice: {
          gt: 0,
        },
      },
    });

    const freeGames = await this.prisma.boardgame.count({
      where: {
        purchasedPrice: {
          equals: 0,
        },
      },
    });

    return {
      standalones: standalonesData,
      expansions: expansionsData,
      condensed: allGameData,
      free: freeGames,
    };
  }

  async getGameWeightReport() {
    const weight: Prisma.BoardgameMaxAggregateInputType = {
      weight: true,
    };

    const aggregateWeight = this.prisma.boardgame.aggregate({
      _avg: weight,
      _min: weight,
      _max: weight,
      where: {
        weight: {
          gt: 0,
        },
        isExpansion: false,
      },
    });

    const weightRanges = [
      { label: '1_2', min: 1, max: 2 },
      { label: '2_3', min: 2, max: 3 },
      { label: '3_4', min: 3, max: 4 },
      { label: '4_5', min: 4, max: 5 },
    ];

    const countPromises = weightRanges.map((range) =>
      this.countBoardgamesWithWeightInRange(range.min, range.max).then(
        (count) => ({ [range.label]: count }),
      ),
    );

    const [aggregateResult, ...countResults] = await Promise.all([
      aggregateWeight,
      ...countPromises,
    ]);

    const countWeightInRanges = countResults.reduce(
      (acc, countResult) => ({
        ...acc,
        ...countResult,
      }),
      {},
    );

    return {
      ...aggregateResult,
      countWeightInRanges,
    };
  }

  countBoardgamesWithWeightInRange(x: number, y: number) {
    return this.prisma.boardgame.count({
      where: {
        weight: {
          gte: x,
          lt: y,
        },
        isExpansion: false,
      },
    });
  }
}
