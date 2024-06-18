import { SingleOrMany } from '../../types';

export const findBaseGames = <
  T extends { id: number; type: string; value: string; inbound?: boolean },
>(
  data: SingleOrMany<T>,
) => {
  const formattedData = Array.isArray(data) ? data : [data];

  return formattedData.reduce(
    (acc, item) => {
      if (item.type === 'boardgameexpansion' && item.inbound) {
        acc.push({ value: item.value, id: item.id });
      }
      return acc;
    },
    [] as Array<{ value: string; id: number }>,
  );
};
