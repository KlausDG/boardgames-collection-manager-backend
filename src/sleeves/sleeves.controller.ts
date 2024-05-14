import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
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

@UseGuards(JwtGuard)
@Controller('sleeves')
export class SleevesController {
  constructor(private sleevesService: SleevesService) {}

  @Post()
  createSleeve(@GetUser('id') userId: number, @Body() dto: CreateSleeveDto) {
    return this.sleevesService.createSleeve(userId, dto);
  }

  @Get()
  getSleeves(
    @GetUser('id') userId: number,
    @OrderBy(['brand', 'type', 'category']) orderBy: SleeveOrderBy,
  ) {
    return this.sleevesService.getSleeves(userId, orderBy);
  }

  @Get('brand/:brand')
  getSleevesByBrand(
    @GetUser('id') userId: number,
    @Param('brand') brand: string,
  ) {
    return this.sleevesService.getSleevesByBrand(userId, brand);
  }

  @Get('type/:type')
  getSleevesByType(
    @GetUser('id') userId: number,
    @Param('type', UpperCasePipe) type: string,
  ) {
    return this.sleevesService.getSleevesByType(userId, type);
  }

  @Patch(':id')
  editSleeveById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) sleeveId: number,
    @Body() dto: EditSleeveDto,
  ) {
    return this.sleevesService.editSleeveById(userId, sleeveId, dto);
  }
}
