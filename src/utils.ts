export const formatRadius = (r: number) => {
  if (r < 1000) {
    return `${r}m`;
  } else {
    return `${r / 1000}km`;
  }
};
