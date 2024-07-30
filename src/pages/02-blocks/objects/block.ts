import Image1111 from '../assets/1111.png';

const tileWidth = 16;
const scaleFactor = 2;

export class Block {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  height: number;
  width: number;

  constructor ({ canvas, ctx, x, y }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, z: number, x: number, y: number}) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = tileWidth * x * scaleFactor;
    this.y = y;
    this.height = 17 * scaleFactor;
    this.width = 16 * scaleFactor;
  }

  draw() {
    const image = new Image();
    image.src = Image1111;

    this.ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }
}