export const indicateChange = (change, positive, neutral, negative) => {
  if (change > 0) return positive;
  if (change < 0) return negative;

  return neutral;
};

export const calculateTransitionDelay = (index, totalItems, fetching) => {
  const itemTransitionDelayOffset = 50

  const baseOffset = (fetching ? totalItems * itemTransitionDelayOffset : 0);

  return baseOffset + (fetching ? -1 : 1) * index * itemTransitionDelayOffset;
};

export const calculateAbsoluteChange = (value, change) => {
  return value - (value / (( 100 + change ) / 100));
};

export const formatPercentage = change => {
  return `${change > 0 ? '+' : (change < 0 ? '-' : '')}${Math.abs(change.toFixed(1))}%`;
};
