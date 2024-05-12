import { Page } from 'puppeteer';

export const scrapeGameRank = async (browserPage: Page) => {
  const rankValue = await browserPage.evaluate(() => {
    const container = document.querySelector('.rank-number a') as HTMLElement;
    return container ? container?.innerText : null;
  });

  return rankValue ? Number(rankValue) : null;
};
