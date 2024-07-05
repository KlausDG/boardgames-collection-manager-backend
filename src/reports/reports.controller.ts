import { Controller, Get } from '@nestjs/common';

import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('purchased-price')
  getPurchasedPriceReport() {
    return this.reportsService.getPurchasedPriceReport();
  }

  @Get('game-weight')
  getGameWeightReport() {
    return this.reportsService.getGameWeightReport();
  }
}
