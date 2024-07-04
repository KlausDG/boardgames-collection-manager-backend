export const convertCommaToDot = (value: string | number) => {
  if (typeof value === 'string') {
    return value?.replace(',', '.');
  }

  return value;
};
