import {
  BggBoardgameItem,
  getBggSearch,
  getBggThing,
} from 'bgg-xml-api-client';

import { Injectable } from '@nestjs/common';

import { filterElementsByTagName } from './utils';

@Injectable()
export class BggService {
  async findBoardgamesByName(name: string) {
    const apiResult = await getBggSearch({
      query: name,
      type: ['boardgame'],
    });

    const formattedResponse = apiResult.item.slice(0, 10).map((item) => {
      const { name, yearpublished, type, id } = item;

      const yearPublishedSection = yearpublished
        ? `(${yearpublished?.value})`
        : '';

      return {
        id,
        name: `${name.value} ${yearPublishedSection}`,
        type,
      };
    });

    return {
      items: formattedResponse,
      total: apiResult.total,
    };
  }

  async findBoardGameDetailsById(id: number) {
    const apiResult = await getBggThing({ id });
    const item = apiResult.item as BggBoardgameItem;
    const { link } = item;

    const designers = filterElementsByTagName(link, 'boardgamedesigner');
    const publishers = filterElementsByTagName(link, 'boardgamepublisher');

    const formattedResponse = {
      name: item.name[0].value,
      thumbnail: item.thumbnail,
      description: item.description,
      yearPublished: item.yearpublished.value,
      minPlayers: item.minplayers.value,
      maxPlayers: item.maxplayers.value,
      minPlaytime: item.minplaytime.value,
      maxPlaytime: item.maxplaytime.value,
      designers,
      publishers,
    };

    return formattedResponse;
  }
}
