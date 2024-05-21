import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublisherService {
  constructor(private prisma: PrismaService) {}

  async findOrCreatePublisher(publishersNames: Array<string>) {
    const publishers = [];

    for (const name of publishersNames) {
      let publisher = await this.prisma.publisher.findUnique({
        where: { name },
      });

      if (!publisher) {
        publisher = await this.prisma.publisher.create({
          data: {
            name,
          },
        });
      }

      publishers.push(publisher);
    }

    return publishers as {
      id: number;
      name: string;
    }[];
  }
}
