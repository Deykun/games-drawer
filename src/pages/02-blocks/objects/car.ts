import { MovableObject } from './meta/movable_object'


import Image0011 from '../assets/car/0011.png';
import Image0110 from '../assets/car/0110.png';
import Image1001 from '../assets/car/1001.png';
import Image1100 from '../assets/car/1100.png';

const CarByOrientation: {
  [key: string]: string,
} = {
  '0011': Image0011,
  '0110': Image0110,
  '1001': Image1001,
  '1100': Image1100,
} as const;

export class Car extends MovableObject {
  ctx: CanvasRenderingContext2D;
  orientation: string;

  constructor ({ ctx, z, x, y, zoomLevel }: {
    ctx: CanvasRenderingContext2D,
    z: number,
    x: number,
    y: number,
    zoomLevel: number
  }) {
    super({ ctx, z, x, y, zoomLevel });

    this.ctx = ctx;
    this.orientation = '0011';
  }

  draw({ screenOffsetX = 0, screenOffsetY = 0 }: { screenOffsetX?: number, screenOffsetY?: number } = {}) {  
    this.image = new Image();
    this.image.src = CarByOrientation[this.orientation];

    this.ctx.drawImage(this.image, this.x + screenOffsetX, this.y + screenOffsetY, this.width, this.height);
  }
}
