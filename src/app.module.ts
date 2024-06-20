import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { BggScrapperModule } from './bgg-scrapper/bgg-scrapper.module';
import { BggModule } from './bgg/bgg.module';
import { BoardgameModule } from './boardgame/boardgame.module';
import { DesignerModule } from './designer/designer.module';
import { PrismaModule } from './prisma/prisma.module';
import { PublisherModule } from './publisher/publisher.module';
import { PublisherService } from './publisher/publisher.service';
import { SleevesModule } from './sleeves/sleeves.module';

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
  ],
  providers: [PublisherService],
})
export class AppModule {}
