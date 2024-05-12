import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { BggScrapperService } from './bgg-scrapper.service';

@Controller('bgg-scrapper')
export class BggScrapperController {
  constructor(private bggScrapperService: BggScrapperService) {}

  @Get(':id')
  scrapeBggGameData(@Param('id', ParseIntPipe) id: number) {
    return this.bggScrapperService.scrapeBggGameData(id);
  }
}
