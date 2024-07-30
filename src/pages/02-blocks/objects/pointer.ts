import { IsometricObject } from './meta/isometric_object'
import ImagePointer from '../assets/pointer.png';

export class Pointer extends IsometricObject {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image?: HTMLImageElement;

  constructor ({ canvas, ctx, z, x, y }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, z: number, x: number, y: number}) {
    super({ z, x, y });

    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw() {  
    this.image = new Image();
    this.image.src = ImagePointer;

    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
