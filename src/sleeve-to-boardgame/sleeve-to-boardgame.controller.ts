import { ParseAllIntPipe } from '@/utils/pipes';
import { Body, Controller, Patch, Post, UsePipes } from '@nestjs/common';

import { AssignSleeveToBoardgameDto } from './dto';
import { SleeveToBoardgameService } from './sleeve-to-boardgame.service';

@Controller('sleeve-to-boardgame')
export class SleeveToBoardgameController {
  constructor(private sleeveToBoardgameService: SleeveToBoardgameService) {}

  @Post('link')
  @UsePipes(new ParseAllIntPipe())
  assignSleeveToBoardgame(@Body() dto: AssignSleeveToBoardgameDto) {
    return this.sleeveToBoardgameService.assignSleeveToBoardgame(dto);
  }

  @Patch('update')
  @UsePipes(new ParseAllIntPipe())
  updateConsumedAmount(@Body() dto: AssignSleeveToBoardgameDto) {
    return this.sleeveToBoardgameService.updateConsumedAmount(dto);
  }
}
