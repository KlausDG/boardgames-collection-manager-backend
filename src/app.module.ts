import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { BggScrapperModule } from './bgg-scrapper/bgg-scrapper.module';
import { BggModule } from './bgg/bgg.module';
import { BoardgameModule } from './boardgame/boardgame.module';
import { DesignerModule } from './designer/designer.module';
import { PrismaModule } from './prisma/prisma.module';
import { PublisherModule } from './publisher/publisher.module';
import { PublisherService } from './publisher/publisher.service';
import { SleevesModule } from './sleeves/sleeves.module';
import { PrismaExceptionFilter } from './utils/filters';
import { MechanicsModule } from './mechanics/mechanics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    BoardgameModule,
    DesignerModule,
    BggModule,
    BggScrapperModule,
    SleevesModule,
    PublisherModule,
    MechanicsModule,
  ],
  providers: [
    PublisherService,
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
  ],
})
export class AppModule {}
