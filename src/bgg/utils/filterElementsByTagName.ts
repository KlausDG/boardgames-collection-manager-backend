import { SingleOrMany } from '../../types';

export const filterElementsByTagName = <
  T extends { type: string; value: string },
>(
  data: SingleOrMany<T>,
  tag: string,
) => {
  const dataToFilter = Array.isArray(data) ? data : [data];

  return dataToFilter.reduce((acc, item) => {
    if (item.type === tag) {
      acc.push(item.value);
    }
    return acc;
  }, [] as Array<string>);
}