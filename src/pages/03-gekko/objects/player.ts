import { clamp } from '../../../utils/math';
import PlayerImageWalkLeft from '../assets/walk-left.png'
import PlayerImageWalkRight from '../assets/walk-right.png'

import { scaleFactor, gravity } from '../constants';
import { SupportedKeys } from '../types'

const PLAYER_ANIMATIONS = {
  default: 'default',
  walk: 'walk',
} as const;

const PLAYER_STATES = {
  default: 'default',
  air: 'air',
} as const;

type TypePlayerAnimations = keyof typeof PLAYER_ANIMATIONS
type TypePlayerStates = keyof typeof PLAYER_STATES

export class Player {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  state: TypePlayerStates;
  animationType: TypePlayerAnimations;
  animationFrame: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  direction: 'left' | 'right';
  height: number;
  width: number;
  prevX: number;
  prevY: number;
  prevTime: number;

  constructor ({ canvas, ctx, x, y }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.state = PLAYER_STATES.air;
    this.animationType = PLAYER_ANIMATIONS.default;
    this.animationFrame = 0;
    this.prevX = x;
    this.prevY = y;
    this.direction = 'right';
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
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

    if (this.animationFrame >= 6) {
      this.animationFrame = 0;
    }

    this.drawFrame({ image, frame: this.animationFrame, x: this.x, y: this.y });
  }

  draw() {
    if (this.animationType === PLAYER_ANIMATIONS.default) {
      const image = new Image();
      image.src = this.direction === 'left' ? PlayerImageWalkLeft : PlayerImageWalkRight;

      this.drawFrame({ image, frame: 0, x: this.x, y: this.y });
    
      return;
    }

    if (this.animationType === PLAYER_ANIMATIONS.walk) {
      this.drawWalking();
    }
  }

  unstuck() {
    this.x = this.prevX;
    this.y = this.prevY;
    this.dx = 0;
    this.dy = 0;
    this.state = PLAYER_STATES.default;
  }

  move(pressedKeys: SupportedKeys) {
    this.prevX = this.x;
    this.prevY = this.y;

    const isMovingX = [pressedKeys.ArrowLeft, pressedKeys.ArrowRight].filter(Boolean).length;

    const timeDiffrenceInMs = (new Date().getTime()) - this.prevTime;
    if (timeDiffrenceInMs > 10) {
      if (isMovingX) {
        this.animationFrame += 1;
      }

      console.log('pressedKeys', pressedKeys);

      if (pressedKeys.Spacebar) {
        this.dy = -10;
      } else {
        this.dy = gravity;
      }

      console.log('this.dy', this.dy);

      if (pressedKeys.ArrowLeft) {
        this.dx = this.dx - 0.5; 
      }
  
      if (pressedKeys.ArrowRight) {
        this.dx = this.dx + 0.5;
      }

      this.prevTime = (new Date().getTime());
    }

    this.y = this.y + this.dy;

    if (!isMovingX) {
      if (this.animationType === PLAYER_ANIMATIONS.walk) {
        this.animationType = PLAYER_ANIMATIONS.default;
      }
      
      if (this.dx) {
        this.x += this.dx;
        this.dx = 0.05 * this.dx;
      }
  
      return;
    }

    if (this.animationType === PLAYER_ANIMATIONS.default) {
      this.animationType = PLAYER_ANIMATIONS.walk;
    }



    const maxX = this.canvas.width - this.width * scaleFactor;
    const maxY = this.canvas.height - this.height * scaleFactor;

    if (pressedKeys.ArrowLeft) {
      this.animationType = PLAYER_ANIMATIONS.walk;
      this.x = this.x - 3 + this.dx;
      this.direction = 'left';
    }

    if (pressedKeys.ArrowRight) {
      this.animationType = PLAYER_ANIMATIONS.walk;
      this.x = this.x + 3 + this.dx;
      this.direction = 'right';
    }

    this.x = clamp(0, this.x, maxX);
    this.y = clamp(0, this.y, maxY);
    this.dx = clamp(-4, this.dx, 4);
  }
}