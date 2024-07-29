import { clamp } from '../../../utils/math';
import PlayerImage from '../assets/player.png'

import { SupportedKeys } from './types'

export class Player {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  speed: number;
  height: number;
  width: number;

  constructor ({ canvas, ctx, x, y }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.height = 30;
    this.width = 30;
  }

  draw() {
    const image = new Image();
    image.src = PlayerImage;

    this.ctx.drawImage(image, this.x, this.y);
  }

  move(pressedKeys: SupportedKeys) {
    if (pressedKeys.ArrowUp) {
      this.y -= this.speed;
    }

    if (pressedKeys.ArrowDown) {
      this.y += this.speed;
    }

    if (pressedKeys.ArrowLeft) {
      this.x -= this.speed;
    }

    if (pressedKeys.ArrowRight) {
      this.x += this.speed;
    }

    this.x = clamp(0, this.x, this.canvas.width - this.width);
    this.y = clamp(0, this.y, this.canvas.height - this.height);
  }
}