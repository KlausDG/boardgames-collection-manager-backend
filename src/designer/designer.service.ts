import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DesignerService {
  constructor(private prisma: PrismaService) {}

  getDesigners() {
    return this.prisma.designer.findMany({
      select: {
        name: true,
        id: true,
      },
    });
  }

  async findOrCreateDesigners(designersNames: Array<string>) {
    const designers = [];

    if (!designersNames.length) {
      return null;
    }

    for (const name of designersNames) {
      let designer = await this.prisma.designer.findUnique({
        where: { name },
      });

      if (!designer) {
        designer = await this.prisma.designer.create({
          data: {
            name,
          },
        });
      }

      designers.push(designer);
    }

    return designers as {
      id: number;
      name: string;
    }[];
  }
}
