import { Boardgame } from '@prisma/client';

export type BoardgameFilterKeys = keyof Omit<
  Boardgame,
  | 'id'
  | 'thumbnail'
  | 'bggLink'
  | 'bggId'
  | 'isExpansionFor'
  | 'isExpansionForBggId'
>;

export type BoardgameFilters = {
  key?: BoardgameFilterKeys;
  value?: string;
  isLinked?: boolean;
};
