import { AuthGuard } from '@/auth/guard';
import { OrderBy } from '@/utils/decorators';
import { UpperCasePipe } from '@/utils/pipes';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateSleeveDto, EditSleeveDto } from './dto';
import { SleevesService } from './sleeves.service';
import { SleeveOrderBy } from './types';

@UseGuards(AuthGuard)
@Controller('sleeves')
export class SleevesController {
  constructor(private sleevesService: SleevesService) {}

  @Post()
  createSleeve(@Body() dto: CreateSleeveDto) {
    return this.sleevesService.createSleeve(dto);
  }

  @Get()
  getSleeves(@OrderBy(['brand', 'type', 'category']) orderBy: SleeveOrderBy) {
    return this.sleevesService.getSleeves(orderBy);
  }

  @Get('brand/:brand')
  getSleevesByBrand(@Param('brand') brand: string) {
    return this.sleevesService.getSleevesByBrand(brand);
  }

  @Get('type/:type')
  getSleevesByType(@Param('type', UpperCasePipe) type: string) {
    return this.sleevesService.getSleevesByType(type);
  }

  @Patch(':id')
  editSleeveById(
    @Param('id', ParseIntPipe) sleeveId: number,
    @Body() dto: EditSleeveDto,
  ) {
    return this.sleevesService.editSleeveById(sleeveId, dto);
  }
}
