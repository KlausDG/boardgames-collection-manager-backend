import { Page } from 'puppeteer';

export const scrapeBestGamePlayerCount = async (browserPage: Page) => {
  const bestPlayersValue = await browserPage.evaluate(() => {
    const container = document.querySelector(
      '.gameplay-item-secondary .ng-binding:last-child',
    ) as HTMLElement;
    return container ? container?.innerText : null;
  });

  return !bestPlayersValue.includes('none')
    ? bestPlayersValue
        .replace('— Best: ', '')
        .split('–')
        .map((item) => parseInt(item))
    : [];
};
