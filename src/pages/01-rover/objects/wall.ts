import { clamp } from '../../../utils/math';
import PlayerImage from '../assets/player.png'

import { SupportedKeys } from './types'

export class Wall {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  height: number;
  width: number;

  constructor ({ canvas, ctx, x, y }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
  }

  draw() {
    this.ctx.fillStyle = "red"
    this.ctx.fillRect(this.x, this.y, this.height, this.width)

    // const image = new Image();
    // image.src = PlayerImage;

    // this.ctx.drawImage(image, this.x, this.y);
  }

  isCollision(object?: { x: number, y: number, height: number, width: number}) {
    if (!object) {
      return false;
    }

    if (object.x < this.x + this.width && object.x + object.width > this.x && object.y < this.y + this.height && object.height + object.y > this.y) {
      return true;
    }
  }
}