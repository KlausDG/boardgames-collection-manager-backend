import { Module } from '@nestjs/common';

import { DesignerModule } from '../designer/designer.module';
import { PublisherModule } from '../publisher/publisher.module';
import { BoardgameController } from './boardgame.controller';
import { BoardgameService } from './boardgame.service';

@Module({
  providers: [BoardgameService],
  controllers: [BoardgameController],
  imports: [DesignerModule, PublisherModule],
  exports: [BoardgameService],
})
export class BoardgameModule {}
