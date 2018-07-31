const dateConverter = (date: Date): string => {
  const converted = `${date.getFullYear()}.${(
    '0' +
    (date.getMonth() + 1)
  ).slice(-2)}.${('0' + date.getDate()).slice(-2)}`;

  return converted;
};

export default dateConverter;
