import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  getPurchasedPriceReport() {
    const purchasedPrice: Prisma.BoardgameMaxAggregateInputType = {
      purchasedPrice: true,
    };

    return this.prisma.boardgame.aggregate({
      _sum: purchasedPrice,
      _avg: purchasedPrice,
    });
  }
}
