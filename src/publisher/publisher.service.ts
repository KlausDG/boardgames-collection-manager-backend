import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublisherService {
  constructor(private prisma: PrismaService) {}

  async findOrCreatePublisher(publisher: string) {
    let existingPublisher = await this.prisma.publisher.findUnique({
      where: { name: publisher },
    });

    if (!existingPublisher) {
      existingPublisher = await this.prisma.publisher.create({
        data: {
          name: publisher,
        },
      });
    }

    return existingPublisher;
  }
}
