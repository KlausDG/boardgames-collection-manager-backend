import { BggScrapperModule } from '@/bgg-scrapper/bgg-scrapper.module';
import { BggModule } from '@/bgg/bgg.module';
import { Module } from '@nestjs/common';

import { DesignerModule } from '../designer/designer.module';
import { PublisherModule } from '../publisher/publisher.module';
import { BoardgameController } from './boardgame.controller';
import { BoardgameService } from './boardgame.service';

@Module({
  providers: [BoardgameService],
  controllers: [BoardgameController],
  imports: [DesignerModule, PublisherModule, BggModule, BggScrapperModule],
  exports: [BoardgameService],
})
export class BoardgameModule {}
