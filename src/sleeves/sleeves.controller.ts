import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateSleeveSizeDto, SleevePacksDto, SleeveProductDto } from './dto';
import { SleevesService } from './sleeves.service';

// @UseGuards(AuthGuard)
@Controller('sleeves')
export class SleevesController {
  constructor(private sleevesService: SleevesService) {}

  @Post('add-packs')
  createSleeve(@Body() dto: SleevePacksDto) {
    return this.sleevesService.addSleevePacks(dto);
  }

  @Post('sizes')
  createSleeveSize(@Body() dto: CreateSleeveSizeDto) {
    return this.sleevesService.createSleeveSize(dto);
  }

  @Get('sizes')
  getSleeveSizes() {
    return this.sleevesService.getSleeveSizes();
  }

  @Get('brands')
  getSleeveBrands() {
    return this.sleevesService.getSleeveBrands();
  }

  @Get('categories')
  getSleeveCategories() {
    return this.sleevesService.getSleeveCategories();
  }

  @Post('products')
  createSleeveProduct(@Body() dto: SleeveProductDto) {
    return this.sleevesService.createSleeveProduct(dto);
  }

  @Get('products')
  getSleeveProducts() {
    return this.sleevesService.getSleeveProducts();
  }
}
