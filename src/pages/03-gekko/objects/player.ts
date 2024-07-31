import { clamp } from '../../../utils/math';
import PlayerImageWalkLeft from '../assets/walk-left.png'
import PlayerImageWalkRight from '../assets/walk-right.png'

import { scaleFactor, gravity, jumpPower } from '../constants';
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
    this.state = PLAYER_STATES.default;
    this.animationType = PLAYER_ANIMATIONS.default;
    this.animationFrame = 0;
    this.prevX = x;
    this.prevY = y;
    this.direction = 'right';
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = gravity;
    this.height = 12 * scaleFactor;
    this.width = 10 * scaleFactor;
    this.prevTime = (new Date().getTime());
  }

  drawFrame({ image, frame = 0, x, y }: { image: HTMLImageElement, frame: number, x: number, y: number}) {
    const frameWidth = 10;
    const frameHeight = 12;
    const frameX = frame * frameWidth;
    const frameY = 0; // all inline


    this.ctx.drawImage(
      image,
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      x,
      y,
      frameWidth * scaleFactor,
      frameHeight * scaleFactor,
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

  unstuck({ x, y, didFall = false, didHitWall = false }: { x?: number, y?: number, didFall?: boolean, didHitWall?: boolean } = {}) {
    if (didHitWall) {
      this.x = x ?? this.prevX;
      this.dy = gravity;
      this.state = PLAYER_STATES.default;
    }

    if (didFall) {
      this.y = y ?? this.prevY;
      this.dx = 0;
      this.state = PLAYER_STATES.default;
    }
  }

  move(pressedKeys: SupportedKeys) {
    this.prevX = this.x;
    this.prevY = this.y;

    const isMovingX = [pressedKeys.ArrowLeft, pressedKeys.ArrowRight].filter(Boolean).length;

    const timeDiffrenceInMs = (new Date().getTime()) - this.prevTime;
    if (timeDiffrenceInMs > 100) {
      if (isMovingX) {
        this.animationFrame += 1;
      } else {
        this.animationType = PLAYER_ANIMATIONS.default;
        this.animationFrame = 0;
      }

      // TODO: move to onClick and animate
      const playerDidJump = this.state !== PLAYER_STATES.air && pressedKeys.Spacebar;
      if (playerDidJump) {
        this.dy = jumpPower;
        this.state = PLAYER_STATES.air;
      } else if (this.state === PLAYER_STATES.air) {
        // this.dy = Math.min(this.dy + gravity, gravity);
        this.dy = gravity;
      }

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
      if (this.dx) {
        this.x += this.dx;
        this.dx = 0.05 * this.dx;
      }
    }

    if (isMovingX) {    
      this.animationType = PLAYER_ANIMATIONS.walk;
      if (pressedKeys.ArrowLeft) {
        this.x = this.x - 3 + this.dx;
        this.direction = 'left';
      }
  
      if (pressedKeys.ArrowRight) {
        this.x = this.x + 3 + this.dx;
        this.direction = 'right';
      }
    }

    const maxX = this.canvas.width - this.width;
    const maxY = this.canvas.height - this.height;

    this.x = clamp(0, this.x, maxX);
    this.y = clamp(0, this.y, maxY);
    this.dx = clamp(-4, this.dx, 4);
    this.dy = clamp(jumpPower, this.dy, gravity);
  }
}