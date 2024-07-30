export const clamp = (min: number, value: number, max: number) => {
  if (value > max) {
    return max;
  }

  if (value < min) {
    return min;
  }

  return value;
}

export const getRandomItem = <T>(list: T[]): T | undefined => {
  if (list.length === 0) return undefined;
  
  const randomIndex = Math.floor(Math.random() * list.length);

  return list[randomIndex] as T;
};
