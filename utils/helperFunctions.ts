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

export const trimTitle = (title: string, maxLength: number = 22) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};
