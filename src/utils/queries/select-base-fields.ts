export const selectBaseFields = (extraFields?: Array<string>) => {
  const fields = {
    id: true,
    name: true,
  };

  if (extraFields && extraFields.length > 0) {
    extraFields.forEach((field) => {
      fields[field] = true;
    });
  }

  return {
    select: fields,
  };
};
