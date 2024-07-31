import { gravity } from '../constants';
export class Platform {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;

  constructor ({ canvas, ctx, x, y, height, width }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = "#505040";
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  checkCollision(object?: { x: number, y: number, height: number, width: number}) {
    this.color = "#505040";

    if (!object) {
      return { isCollision: false };
    }

    const isObjectAbove = object.y > this.y + this.height;
    const isObjectOnLeft = object.x + object.width < this.x;
    const isObjectOnRight = object.x > this.x + this.width;
    const isObjectBelow =  object.y + object.height < this.y;

    const wasCollisionAvoided = isObjectAbove || isObjectOnLeft || isObjectOnRight || isObjectBelow;
    if (wasCollisionAvoided) {
      return { isCollision: false };
    }

    this.color = '#23291d';

    // const percentageAbove = 0.8;
    const fallThreshold = gravity + 1;
    const didFall = object.y < this.y && object.y + (object.width - fallThreshold) < this.y;
    const didHitFromBelow = object.y > this.y
    
    const isWallOnLeft = !didFall && object.x > this.x;
    const isWallOnRight = !didFall && object.x < this.x;

    const didHitWall = isWallOnLeft || isWallOnRight;

    let x, y;
    if (didFall) {
      y = this.y - object.height;
    }

    if (didHitWall) {
      if (isWallOnRight) {
        x = this.x - object.width;
      } else {
        x = this.x + this.width;
      }
    }

    return { isCollision: true, didFall, didHitWall, x, y };
  }
}