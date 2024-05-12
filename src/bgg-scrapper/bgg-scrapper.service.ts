import puppeteer, { Browser } from 'puppeteer';

import { Injectable } from '@nestjs/common';

import {
  scrapeBestGamePlayerCount,
  scrapeGameRank,
  scrapeGameWeight,
} from './utils';

@Injectable()
export class BggScrapperService {
  async scrapeBggGameData(gameId: number) {
    let browser: Browser;

    try {
      browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      await page.setRequestInterception(true);
      page.on('request', (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;
        if (
          interceptedRequest.url().endsWith('.png') ||
          interceptedRequest.url().endsWith('.jpg') ||
          interceptedRequest.url().endsWith('.css')
        )
          interceptedRequest.abort();
        else interceptedRequest.continue();
      });

      await page.goto(`https://boardgamegeek.com/boardgame/${gameId}`);

      const bestPlayersCount = await scrapeBestGamePlayerCount(page);
      const weight = await scrapeGameWeight(page);
      const rank = await scrapeGameRank(page);

      return {
        bestPlayersCount,
        weight,
        rank,
      };
    } catch (error) {
      throw new Error('Error scraping external page');
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
