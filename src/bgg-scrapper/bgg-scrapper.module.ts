import { Module } from '@nestjs/common';

import { BggScrapperController } from './bgg-scrapper.controller';
import { BggScrapperService } from './bgg-scrapper.service';

@Module({
  providers: [BggScrapperService],
  controllers: [BggScrapperController],
  exports: [BggScrapperService],
})
export class BggScrapperModule {}
