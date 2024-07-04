import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}
}
