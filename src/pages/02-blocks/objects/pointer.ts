import { IsometricObject } from './meta/isometric_object'
import ImagePointer from '../assets/pointer.png';
import ImagePointerBuild from '../assets/pointer-build.png';
import ImagePointerDecrase from '../assets/pointer-decrease.png';
import ImagePointerIncrase from '../assets/pointer-increase.png';
import ImagePointerRemove from '../assets/pointer-remove.png';
import ImagePointerRotate from '../assets/pointer-rotate.png';

import { ActionModes } from '../constants';

const PointerByActiveMode: {
  [key: string]: string,
} = {
  'build': ImagePointerBuild,
  'decrease': ImagePointerDecrase,
  'increase': ImagePointerIncrase,
  'remove': ImagePointerRemove,
  'rotate': ImagePointerRotate,
}

export class Pointer extends IsometricObject {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  image?: HTMLImageElement;

  constructor ({ canvas, ctx, z, x, y, zoomLevel }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, z: number, x: number, y: number, zoomLevel: number }) {
    super({ canvas, z, x, y, zoomLevel });

    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw({ activeMode, screenOffsetX = 0, screenOffsetY = 0 }: { activeMode?: ActionModes, screenOffsetX?: number, screenOffsetY?: number } = {}) {  
    this.image = new Image();
    this.image.src = PointerByActiveMode[activeMode || ''] || ImagePointer;

    this.ctx.drawImage(this.image, this.x + screenOffsetX, this.y + screenOffsetY, this.width, this.height);
  }
}
