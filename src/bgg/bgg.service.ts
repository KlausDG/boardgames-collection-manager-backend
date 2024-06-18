import {
  BggBoardgameItem,
  getBggSearch,
  getBggThing,
} from 'bgg-xml-api-client';

import { Injectable } from '@nestjs/common';

import { filterElementsByTagName, findBaseGames } from './utils';

@Injectable()
export class BggService {
  async findBoardgamesByName(name: string) {
    const apiResult = await getBggSearch({
      query: name,
      type: ['boardgame'],
    });

    const formatResponse = () => {
      if (Array.isArray(apiResult.item)) {
        return apiResult.item.slice(0, 20).map((item) => {
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
      }
      return apiResult.item;
    };

    return {
      items: apiResult.total ? formatResponse() : [],
      total: apiResult.total,
    };
  }

  async findBoardGameDetailsById(id: number) {
    const apiResult = await getBggThing({ id });

    const item = apiResult.item as BggBoardgameItem;
    const { link } = item;

    const designers = filterElementsByTagName(link, 'boardgamedesigner');
    const publishers = filterElementsByTagName(link, 'boardgamepublisher');
    const isExpansionFor = findBaseGames(link);

    const formattedResponse = {
      name: Array.isArray(item.name) ? item.name[0].value : item.name.value,
      thumbnail: item.thumbnail,
      description: item.description,
      yearPublished: item.yearpublished.value,
      minPlayers: item.minplayers.value,
      maxPlayers: item.maxplayers.value,
      minPlaytime: item.minplaytime.value,
      maxPlaytime: item.maxplaytime.value,
      designers,
      publishers,
      isExpansion: !!isExpansionFor.length,
      isExpansionFor,
    };

    return formattedResponse;
  }
}
