export type ActionModes = 'random' | 'rotate' | 'remove' | 'build' | 'increase' | 'decrease';

export type ObjectType = 'block' | 'ghost';

export type SavedPoint = {
  x: number;
  y: number;
  z: number;
  evelation: string;
  type?: ObjectType;
}

export type SupportedKeys = {
  ArrowUp: boolean,
  ArrowDown: boolean,
  ArrowLeft: boolean,
  ArrowRight: boolean,
}

export const exampleMap: SavedPoint[] = [{"x":4,"y":4,"z":0,"evelation":"1111"},{"x":3,"y":4,"z":0,"evelation":"1111"},{"x":2,"y":4,"z":0,"evelation":"1111"},{"x":1,"y":4,"z":0,"evelation":"1111"},{"x":0,"y":4,"z":0,"evelation":"1111"},{"x":-1,"y":4,"z":0,"evelation":"1111"},{"x":-2,"y":4,"z":0,"evelation":"1111"},{"x":-3,"y":4,"z":0,"evelation":"1111"},{"x":-4,"y":4,"z":0,"evelation":"1111"},{"x":4,"y":3,"z":0,"evelation":"1111"},{"x":3,"y":3,"z":0,"evelation":"1111"},{"x":2,"y":3,"z":0,"evelation":"1111"},{"x":1,"y":3,"z":0,"evelation":"1111"},{"x":0,"y":3,"z":0,"evelation":"1111"},{"x":-1,"y":3,"z":0,"evelation":"1111"},{"x":-2,"y":3,"z":0,"evelation":"1111"},{"x":-3,"y":3,"z":0,"evelation":"1111"},{"x":-4,"y":3,"z":0,"evelation":"1111"},{"x":4,"y":2,"z":0,"evelation":"1110"},{"x":3,"y":2,"z":0,"evelation":"0111"},{"x":2,"y":2,"z":0,"evelation":"0110"},{"x":1,"y":2,"z":0,"evelation":"0110"},{"x":0,"y":2,"z":0,"evelation":"0110"},{"x":-1,"y":2,"z":0,"evelation":"0110"},{"x":-2,"y":2,"z":0,"evelation":"1110"},{"x":-3,"y":2,"z":0,"evelation":"1111"},{"x":-4,"y":2,"z":0,"evelation":"1111"},{"x":-2,"y":1,"z":0,"evelation":"0100"},{"x":-3,"y":1,"z":0,"evelation":"1110"},{"x":-4,"y":1,"z":0,"evelation":"0111"},{"x":3,"y":-1,"z":0,"evelation":"1000"},{"x":2,"y":-1,"z":0,"evelation":"1101"},{"x":1,"y":-1,"z":0,"evelation":"1111"},{"x":0,"y":-1,"z":0,"evelation":"1011"},{"x":-1,"y":-1,"z":0,"evelation":"0001"},{"x":4,"y":-2,"z":0,"evelation":"1101"},{"x":3,"y":-2,"z":0,"evelation":"1111"},{"x":2,"y":-2,"z":0,"evelation":"1111"},{"x":1,"y":-2,"z":0,"evelation":"1111"},{"x":0,"y":-2,"z":0,"evelation":"1111"},{"x":-1,"y":-2,"z":0,"evelation":"1011"},{"x":-2,"y":-2,"z":0,"evelation":"1001"},{"x":-3,"y":-2,"z":0,"evelation":"1001"},{"x":-4,"y":-2,"z":0,"evelation":"1101"},{"x":4,"y":-3,"z":0,"evelation":"1111"},{"x":3,"y":-3,"z":0,"evelation":"1111"},{"x":2,"y":-3,"z":0,"evelation":"1111"},{"x":1,"y":-3,"z":0,"evelation":"1111"},{"x":0,"y":-3,"z":0,"evelation":"1111"},{"x":-1,"y":-3,"z":0,"evelation":"1111"},{"x":-2,"y":-3,"z":0,"evelation":"1111"},{"x":-3,"y":-3,"z":0,"evelation":"1111"},{"x":-4,"y":-3,"z":0,"evelation":"1111"},{"x":4,"y":-4,"z":0,"evelation":"1111"},{"x":3,"y":-4,"z":0,"evelation":"1111"},{"x":2,"y":-4,"z":0,"evelation":"1111"},{"x":1,"y":-4,"z":0,"evelation":"1111"},{"x":0,"y":-4,"z":0,"evelation":"1111"},{"x":-1,"y":-4,"z":0,"evelation":"1111"},{"x":-2,"y":-4,"z":0,"evelation":"1111"},{"x":-3,"y":-4,"z":0,"evelation":"1111"},{"x":-4,"y":-4,"z":0,"evelation":"1111"},{"x":3,"y":-3,"z":1,"evelation":"1111"},{"x":3,"y":-3,"z":2,"evelation":"1111"},{"x":3,"y":-3,"z":3,"evelation":"1111"},{"x":3,"y":-3,"z":4,"evelation":"1111"},{"x":3,"y":-3,"z":5,"evelation":"1111"},{"x":1,"y":-3,"z":1,"evelation":"1111"},{"x":1,"y":-3,"z":2,"evelation":"1111"},{"x":1,"y":-1,"z":1,"evelation":"1111"},{"x":1,"y":-1,"z":2,"evelation":"1111"},{"x":-1,"y":-3,"z":1,"evelation":"1111"},{"x":-3,"y":-3,"z":1,"evelation":"1111"},{"x":-3,"y":-3,"z":2,"evelation":"1111"},{"x":-3,"y":-3,"z":3,"evelation":"1111"},{"x":-3,"y":-3,"z":4,"evelation":"1111"},{"x":-3,"y":-3,"z":5,"evelation":"1111"},{"x":-3,"y":-3,"z":6,"evelation":"1111"},{"x":-3,"y":-3,"z":7,"evelation":"1111"},{"x":-3,"y":-3,"z":8,"evelation":"1101"},{"x":-3,"y":-3,"z":9,"evelation":"1000"},{"x":1,"y":4,"z":1,"evelation":"1111"},{"x":0,"y":4,"z":1,"evelation":"1111"},{"x":2,"y":4,"z":1,"evelation":"1100"},{"x":0,"y":3,"z":1,"evelation":"1110"},{"x":1,"y":3,"z":1,"evelation":"0110"},{"x":2,"y":3,"z":1,"evelation":"0100"},{"x":1,"y":4,"z":2,"evelation":"0100"},{"x":0,"y":4,"z":2,"evelation":"1110"},{"x":-1,"y":4,"z":1,"evelation":"1111"},{"x":-1,"y":3,"z":1,"evelation":"1111"},{"x":-2,"y":4,"z":1,"evelation":"1111"},{"x":-1,"y":4,"z":2,"evelation":"1111"},{"x":-2,"y":3,"z":1,"evelation":"0111"},{"x":-3,"y":4,"z":1,"evelation":"0111"},{"x":-3,"y":3,"z":1,"evelation":"0010"},{"x":-4,"y":4,"z":1,"evelation":"0110"},{"x":-2,"y":4,"z":2,"evelation":"0011"}];

const axisBase = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const flatMap: SavedPoint[] = axisBase.reduce((points: SavedPoint[], x) => {
  axisBase.forEach((y) => {
    points.push({ evelation: '1111', x, y, z: 0, type: 'ghost' });
  });

  return points;
}, []);

export const defaultMap = exampleMap;
