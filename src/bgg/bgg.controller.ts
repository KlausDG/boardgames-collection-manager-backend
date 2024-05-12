import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { BggService } from './bgg.service';

// @UseGuards(JwtGuard)
@Controller('bgg')
export class BggController {
  constructor(private bggService: BggService) {}

  @Get('games/:name')
  findBoardgamesByName(@Param('name') name: string) {
    return this.bggService.findBoardgamesByName(name);
  }

  @Get('game/:id')
  findBoardGameDetailsById(@Param('id', ParseIntPipe) id: number) {
    return this.bggService.findBoardGameDetailsById(id);
  }
}
