export const nextFetchTime = seconds => {
  return new Date(Date.now() + seconds * 1000);
};
