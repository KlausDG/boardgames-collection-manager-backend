export const convertToArray = <T>(value: T | T[] | null | undefined) => {
  if (typeof value === 'string' && !!value) {
    return value.split(',').map((item) => Number(item.trim()));
  } else if (typeof value === 'number') {
    return [value];
    
  } else {
    return [];
  }
};
