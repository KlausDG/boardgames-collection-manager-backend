import { Module } from '@nestjs/common';

import { BggController } from './bgg.controller';
import { BggService } from './bgg.service';

@Module({
  providers: [BggService],
  controllers: [BggController],
  exports: [BggService],
})
export class BggModule {}
