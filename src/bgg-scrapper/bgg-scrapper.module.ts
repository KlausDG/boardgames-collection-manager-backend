import { Module } from '@nestjs/common';
import { BggScrapperService } from './bgg-scrapper.service';
import { BggScrapperController } from './bgg-scrapper.controller';

@Module({
  providers: [BggScrapperService],
  controllers: [BggScrapperController]
})
export class BggScrapperModule {}
