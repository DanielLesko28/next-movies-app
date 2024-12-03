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

export const shuffle = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
