import { Module } from '@nestjs/common';

import { DesignerModule } from '../designer/designer.module';
import { BoardgameController } from './boardgame.controller';
import { BoardgameService } from './boardgame.service';

@Module({
  imports: [DesignerModule],
  controllers: [BoardgameController],
  providers: [BoardgameService],
})
export class BoardgameModule {}
