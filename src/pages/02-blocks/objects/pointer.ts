import { IsometricObject } from './meta/isometric_object'
import ImagePointer from '../assets/pointer.png';
import ImagePointerBuild from '../assets/pointer-build.png';
import ImagePointerRemove from '../assets/pointer-remove.png';
import ImagePointerRotate from '../assets/pointer-rotate.png';

import { ActionModes } from '../constants';

const PointerByActiveMode: {
  [key: string]: string,
} = {
  'build': ImagePointerBuild,
  'remove': ImagePointerRemove,
  'rotate': ImagePointerRotate,
}

export class Pointer extends IsometricObject {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image?: HTMLImageElement;

  constructor ({ canvas, ctx, z, x, y }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, z: number, x: number, y: number}) {
    super({ z, x, y });

    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw({ activeMode }: { activeMode?: ActionModes } = {}) {  
    this.image = new Image();
    this.image.src = PointerByActiveMode[activeMode || ''] || ImagePointer;

    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
