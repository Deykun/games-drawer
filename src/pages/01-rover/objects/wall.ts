export class Wall {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  height: number;
  width: number;

  constructor ({ canvas, ctx, x, y, height, width }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number, height: number, width: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x * 2;
    this.y = y * 2;
    this.height = height * 2;
    this.width = width * 2;
  }

  draw() {
    this.ctx.fillStyle = "transparent"
    // this.ctx.fillStyle = "red"
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  isCollision(object?: { x: number, y: number, height: number, width: number}) {
    if (!object) {
      return false;
    }

    if (object.x > this.x + this.width || object.x + object.width < this.x || object.y > this.y + this.height || object.height + object.y < this.y) {
      return false;
    }

    return true;
  }
}