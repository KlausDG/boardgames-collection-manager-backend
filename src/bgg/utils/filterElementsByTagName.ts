import { SingleOrMany } from '../../types';

export const filterElementsByTagName = <
  T extends { type: string; value: string },
>(
  data: SingleOrMany<T>,
  tag: string,
) => {
  let response: Array<T>;

  if (Array.isArray(data)) {
    response = data.filter((item) => item.type === tag);
  } else {
    response = [data].filter((item) => item.type === tag);
  }

  return response.map((item) => item.value);
};
