import { Module } from '@nestjs/common';
import { SleeveToBoardgameService } from './sleeve-to-boardgame.service';
import { SleeveToBoardgameController } from './sleeve-to-boardgame.controller';

@Module({
  providers: [SleeveToBoardgameService],
  controllers: [SleeveToBoardgameController]
})
export class SleeveToBoardgameModule {}
