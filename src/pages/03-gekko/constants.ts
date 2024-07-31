export const scaleFactor = 5;

export const gravity = 2;
export const jumpPower = -10;

type PointX = {
  x: number,
  width: 'max'
} | {
  x: 'max',
  width: number
} | {
  x: number,
  width: number
}


type PointY = {
  y: number,
  height: 'max'
} | {
  y: 'max',
  height: number
} | {
  y: number,
  height: number
}

type LevelPoint = PointX & PointY

export const level1: LevelPoint[] = [
  { x: 0, y: 0, width: 'max', height: 20 },
  { x: 0, y: 0, width: 20, height: 'max' },
  { x: 'max', y: 0, width: 20, height: 'max' },
  { x: 0, y: 'max', width: 'max', height: 20 },
  { x: 20, y: 235, width: 150, height: 80 },
  { x: 280, y: 120, width: 75, height: 30 },
  { x: 280, y: 250, width: 150, height: 30 },
  { x: 240, y: 370, width: 20, height: 10 },
  { x: 500, y: 330, width: 80, height: 50 },
];
