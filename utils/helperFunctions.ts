export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-UK", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

export const roundToOneDecimalPlace = (num: number): number => {
  return Math.round(num * 10) / 10;
};
