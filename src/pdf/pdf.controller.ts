import { Response } from 'express';

import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';

import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Get(':players')
  async generatePdf(
    @Param('players', ParseIntPipe) players: number,
    @Res() res: Response,
  ) {
    const pdfBuffer = await this.pdfService.generatePdf(players);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=generated.pdf',
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }
}
