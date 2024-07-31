import { scaleFactor } from '../constants';

export class Platform {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  height: number;
  width: number;

  constructor ({ canvas, ctx, x, y, height, width }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  draw() {
    // this.ctx.fillStyle = "transparent"
    this.ctx.fillStyle = "#505040"
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  isCollision(object?: { x: number, y: number, height: number, width: number}) {
    if (!object) {
      return false;
    }

    if (object.x > this.x + this.width || object.x + (object.width * scaleFactor) < this.x || object.y > this.y + this.height || (object.height * scaleFactor) + object.y < this.y) {
      return false;
    }

    return true;
  }
}