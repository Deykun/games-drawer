import { clamp } from '../../../utils/math';
import PlayerImageWalkLeft from '../assets/walk-left.png'
import PlayerImageWalkRight from '../assets/walk-right.png'

import { SupportedKeys } from '../types'

const scaleFactor = 5;

const PLAYER_STATES = {
  default: 'default',
  walk: 'walk',
} as const;

type TYPE_PLAYER_STTES = keyof typeof PLAYER_STATES

export class Player {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  state: TYPE_PLAYER_STTES;
  x: number;
  y: number;
  direction: 'left' | 'right';
  height: number;
  width: number;
  prevX: number;
  prevY: number;
  prevTime: number;

  constructor ({ canvas, ctx, x, y }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.state = PLAYER_STATES.default;
    this.prevX = x;
    this.prevY = y;
    this.direction = 'right';
    this.x = x;
    this.y = y;
    this.height = 12;
    this.width = 10;
    this.prevTime = (new Date().getTime());
  }

  drawFrame({ image, frame = 0, x, y }: { image: HTMLImageElement, frame: number, x: number, y: number}) {
    const frameX = frame * this.width;
    const frameY = 0; // all inline
    const frameWidth = 10;
    const frameHeight = 12;

    this.ctx.drawImage(
      image,
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      x,
      y,
      frameWidth * scaleFactor,
      frameHeight * scaleFactor
    );
  }

  draw() {
    if (this.state === PLAYER_STATES.default) {
      const image = new Image();
      image.src = this.direction === 'left' ? PlayerImageWalkLeft : PlayerImageWalkRight;

      this.drawFrame({ image, frame: 0, x: this.x, y: this.y });
    }
  }

  unstuck() {
    this.x = this.prevX;
    this.y = this.prevY;
  }

  move(pressedKeys: SupportedKeys) {
    this.prevX = this.x;
    this.prevY = this.y;



    const isMovingX = [pressedKeys.ArrowLeft, pressedKeys.ArrowRight].filter(Boolean).length;
    if (!isMovingX) {
      return;
    }

    const maxX = this.canvas.width - this.width * scaleFactor;
    const maxY = this.canvas.height - this.height * scaleFactor;

    console.log(pressedKeys)
    console.log({
      maxX,
      maxY,
    })

    if (pressedKeys.ArrowLeft) {
      this.x -= 10;
      this.direction = 'left';
    }

    if (pressedKeys.ArrowRight) {
      this.x += 10;
      this.direction = 'right';
    }

    this.x = clamp(0, this.x, maxX);
    this.y = clamp(0, this.y, maxY);
  }
}