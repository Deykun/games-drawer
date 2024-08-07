export const scaleFactor = 4;

export const gravity = 7;
export const jumpPower = -20;

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

export type LevelPoint = PointX & PointY

const levelBorders: LevelPoint[] = [
  { x: 0, y: 0, width: 'max', height: 20 },
  { x: 0, y: 0, width: 20, height: 'max' },
  { x: 'max', y: 0, width: 20, height: 'max' },
  { x: 0, y: 'max', width: 'max', height: 20 }
];

export const level1: LevelPoint[] = [
  ...levelBorders,
  { x: 20, y: 235, width: 150, height: 80 },
  { x: 280, y: 120, width: 75, height: 30 },
  { x: 280, y: 250, width: 150, height: 30 },
  { x: 240, y: 370, width: 20, height: 10 },
  { x: 500, y: 330, width: 80, height: 50 },
];

export const level2: LevelPoint[] = [
  ...levelBorders,
  { x: 20, y: 350, width: 200, height: 30 },
  { x: 20, y: 320, width: 150, height: 30 },
  { x: 20, y: 290, width: 100, height: 30 },
  { x: 20, y: 260, width: 50, height: 30 },
  { x: 150, y: 140, width: 350, height: 30 },
  { x: 450, y: 170, width: 50, height: 80 },
  { x: 380, y: 250, width: 200, height: 30 },
];