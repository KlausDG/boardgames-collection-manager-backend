import { BoardgameModule } from '@/boardgame/boardgame.module';
import { Module } from '@nestjs/common';

import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

@Module({
  controllers: [PdfController],
  providers: [PdfService],
  imports: [BoardgameModule],
})
export class PdfModule {}
