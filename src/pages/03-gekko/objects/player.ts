import { clamp } from '../../../utils/math';
import PlayerImageWalkLeft from '../assets/walk-left.png'
import PlayerImageWalkRight from '../assets/walk-right.png'

import { SupportedKeys } from '../types'

const scaleFactor = 3;

const PLAYER_STATES = {
  default: 'default',
  walk: 'walk',
} as const;

type TYPE_PLAYER_STTES = keyof typeof PLAYER_STATES

export class Player {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  state: TYPE_PLAYER_STTES;
  animationFrame: number;
  x: number;
  y: number;
  speed: {
    x: number;
    y: number;
  };
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
    this.animationFrame = 0;
    this.prevX = x;
    this.prevY = y;
    this.direction = 'right';
    this.speed = {
      x: 0,
      y: 0,
    };
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

  drawWalking() {
    const image = new Image();
    image.src = this.direction === 'left' ? PlayerImageWalkLeft : PlayerImageWalkRight;

    console.log('this.animationFrame', this.animationFrame)
    if (this.animationFrame >= 6) {
      this.animationFrame = 0;
    }

    this.drawFrame({ image, frame: this.animationFrame, x: this.x, y: this.y });
  }

  draw() {
    if (this.state === PLAYER_STATES.default) {
      const image = new Image();
      image.src = this.direction === 'left' ? PlayerImageWalkLeft : PlayerImageWalkRight;

      this.drawFrame({ image, frame: 0, x: this.x, y: this.y });
    
      return;
    }

    if (this.state === PLAYER_STATES.walk) {
      this.drawWalking();
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


    const timeDiffrenceInMs = (new Date().getTime()) - this.prevTime;
    if (timeDiffrenceInMs > 100) {
      if (isMovingX) {
        this.animationFrame += 1;
      }

      if (pressedKeys.ArrowLeft) {
        this.speed.x = this.speed.x - 0.5;
      }
  
      if (pressedKeys.ArrowRight) {
        this.speed.x = this.speed.x + 0.5;
      }

      this.prevTime = (new Date().getTime());
    }

    if (!isMovingX) {
      this.state = PLAYER_STATES.default;
      
      if (this.speed.x) {
        this.x += this.speed.x;

        this.speed.x = 0.05 * this.speed.x;
      }
  
      return;
    }

    this.state = PLAYER_STATES.walk;

    const maxX = this.canvas.width - this.width * scaleFactor;
    const maxY = this.canvas.height - this.height * scaleFactor;


    if (pressedKeys.ArrowLeft) {
      this.x = this.x - 3 + this.speed.x;
      this.direction = 'left';
    }

    if (pressedKeys.ArrowRight) {
      this.x = this.x + 3 + this.speed.x;
      this.direction = 'right';
    }

    this.x = clamp(0, this.x, maxX);
    this.y = clamp(0, this.y, maxY);
    this.speed.x = clamp(-4, this.speed.x, 4);
  }
}