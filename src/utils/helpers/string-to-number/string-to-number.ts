export const stringToNumber = (value: string | number): number | null => {
  if (value === null || value === undefined) {
    return null;
  }

  const num = Number(value);

  if (isNaN(num)) {
    return null;
  }

  return num;
};
