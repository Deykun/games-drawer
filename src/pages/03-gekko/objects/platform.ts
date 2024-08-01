import { gravity, scaleFactor } from '../constants';

const fallThreshold = gravity + 1;
const hoveringThreshold = 4 * scaleFactor;

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
    // this.ctx.textBaseline = "top";
    // this.ctx.fillStyle = 'white';
    // this.ctx.fillText(`${this.width}x${this.height}`, this.x, this.y);
  }

  didCollide(object?: { x: number, y: number, prevY: number, dy: number, height: number, width: number }) {
    this.color = "#505040";
  
    if (!object) {
      return false;
    }

    const isInRangeOfX = object.x + object.width >= this.x && object.x <= this.x + this.width;
    const isInRangeOfY = object.y + object.height >= this.y && object.y <= this.y + this.height;

    const wasCollisionAvoided = !isInRangeOfX || !isInRangeOfY;
    if (wasCollisionAvoided) {
      return false;
    }

    return true;
  }

  checkCollision(object?: { x: number, y: number, prevX: number, prevY: number, dx: number, dy: number, height: number, width: number }) {
    const didCollide = this.didCollide(object);
    if (!object || !didCollide) {
      return { isCollision: false };
    }

    this.color = '#23291d';

    const isInRangeOfX = object.x + object.width >= this.x && object.x <= this.x + this.width;
    const isInRangeOfXWithThreshold = object.x + object.width - hoveringThreshold >= this.x && object.x <= this.x + this.width - hoveringThreshold;
    const wasInRangeOfX = object.prevX >= this.x && object.prevX <= this.x + this.width;

    const didHitFromBelow = isInRangeOfX && wasInRangeOfX && object.y <= this.y + this.height && object.prevY > this.y + this.height;
    const didFall = isInRangeOfXWithThreshold && !didHitFromBelow && object.y < this.y && object.y + (object.height - fallThreshold) < this.y;

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
    
    if (didHitFromBelow) {
      y = object.y - object.dy - gravity;
      x = object.x - object.dx;
    }

    return { isCollision: true, didFall, didHitFromBelow, didHitWall, x, y };
  }
}