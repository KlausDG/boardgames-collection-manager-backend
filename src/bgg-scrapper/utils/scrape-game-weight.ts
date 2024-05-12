import { Page } from 'puppeteer';

export const scrapeGameWeight = async (browserPage: Page) => {
  const weightValue = await browserPage.evaluate(() => {
    const container = document.querySelector(
      '[class*=gameplay-weight]',
    ) as HTMLElement;
    return container ? container?.innerText : null;
  });

  return Number(weightValue);
};
