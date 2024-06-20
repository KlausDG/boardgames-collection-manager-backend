import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateSleeveDto, CreateSleeveTypeDto } from './dto';
import { SleevesService } from './sleeves.service';

// @UseGuards(AuthGuard)
@Controller('sleeves')
export class SleevesController {
  constructor(private sleevesService: SleevesService) {}

  @Post('add-packs')
  createSleeve(@Body() dto: CreateSleeveDto) {
    return this.sleevesService.addSleevePacks(dto);
  }

  @Post('types')
  createSleeveType(@Body() dto: CreateSleeveTypeDto) {
    return this.sleevesService.createSleeveType(dto);
  }

  @Get('types')
  getSleeveTypes() {
    return this.sleevesService.getSleeveTypes();
  }

  @Get('brands')
  getSleeveBrands() {
    return this.sleevesService.getSleeveBrands();
  }
}
