import { BoardgameModule } from '@/boardgame/boardgame.module';
import { Module } from '@nestjs/common';

import { BggController } from './bgg.controller';
import { BggService } from './bgg.service';

@Module({
  providers: [BggService],
  controllers: [BggController],
  imports: [BoardgameModule],
})
export class BggModule {}
