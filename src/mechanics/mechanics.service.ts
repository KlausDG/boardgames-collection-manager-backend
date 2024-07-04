import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MechanicsService {
  constructor(private prisma: PrismaService) {}

  async getMechanics() {
    const mechanics = await this.prisma.mechanics.findMany({
      select: {
        name: true,
        id: true,
        boardgames: {
          where: {
            category: 'STANDALONE',
          },
        },
      },
    });

    const mechanicsWithCount = mechanics.map((mechanic) => ({
      ...mechanic,
      boardgamesCount: mechanic.boardgames.length,
    }));

    mechanicsWithCount.sort((a, b) => b.boardgamesCount - a.boardgamesCount);

    return mechanicsWithCount.map(
      ({ boardgamesCount, ...mechanic }) => mechanic,
    );
  }
}
