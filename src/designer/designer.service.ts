import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DesignerService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateDesigner(designerName: string) {
    let designer = await this.prisma.designer.findUnique({
      where: { name: designerName },
    });

    if (!designer) {
      designer = await this.prisma.designer.create({
        data: {
          name: designerName,
        },
      });
    }

    return designer;
  }
}
