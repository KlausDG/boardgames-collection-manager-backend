import fs from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';
import * as puppeteer from 'puppeteer';

import { Injectable } from '@nestjs/common';

import { BoardgameService } from '../boardgame/boardgame.service';

@Injectable()
export class PdfService {
  constructor(private readonly boardgameService: BoardgameService) {}

  async generatePdf(players: number) {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    const boardgames =
      await this.boardgameService.getBoardgameByBestPlayerCount(players);

    const absolutePath = isDevelopment
      ? join(process.cwd(), '/src/pdf/template/template.hbs')
      : join(__dirname, '..', './template/template.html');

    const templateContent = fs.readFileSync(absolutePath, 'utf8');

    const template = handlebars.compile(templateContent);

    const htmlContent = template({ boardgames, players });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    const cssPath = join(process.cwd(), '/src/pdf/template/styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    await page.addStyleTag({ content: cssContent });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        left: '30px',
        top: '30px',
        right: '30px',
        bottom: '30px',
      },
    });

    await browser.close();

    return pdfBuffer;
  }
}
