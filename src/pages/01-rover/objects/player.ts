import { clamp } from '../../../utils/math';
import PlayerImageX from '../assets/rover-x.png'
import PlayerImageY from '../assets/rover-y.png'

import { SupportedKeys } from '../types'

export class Player {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  speed: number;
  currentSpeed: number;
  maxSpeed: number;
  direction: 'x' | 'y';
  height: number;
  width: number;

  prevX: number;
  prevY: number;
  prevTime: number;

  constructor ({ canvas, ctx, x, y }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.prevX = x;
    this.prevY = y;
    this.direction = 'x';
    this.x = x;
    this.y = y;
    this.speed = 0.6;
    this.currentSpeed = 0.06;
    this.maxSpeed = 4;
    this.height = 22;
    this.width = 27;
    this.prevTime = (new Date().getTime());
  }

  draw() {
    const image = new Image();
    image.src = this.direction === 'x' ? PlayerImageX : PlayerImageY;

    this.ctx.drawImage(image, this.x, this.y, this.width * 2, this.height * 2);
  }

  move(pressedKeys: SupportedKeys) {
    this.prevX = this.x;
    this.prevY = this.y;

    const isMovingY = [pressedKeys.ArrowUp, pressedKeys.ArrowDown].filter(Boolean).length;
    const isMovingX = [pressedKeys.ArrowLeft, pressedKeys.ArrowRight].filter(Boolean).length;
    const isMoving = isMovingY || isMovingX;

    const timeDiffrenceInMs = (new Date().getTime()) - this.prevTime;
    if (timeDiffrenceInMs > 300) {
      if (isMoving) {
        this.currentSpeed += 0.02;
      } else if (this.currentSpeed > this.speed) {
        this.currentSpeed -= 0.04;
      }
      this.prevTime = (new Date().getTime());
      this.currentSpeed = clamp(this.speed, this.currentSpeed, this.maxSpeed);
    }

    if (!isMoving) {
      return;
    }

    const maxX = this.canvas.width - this.width * 2;
    const maxY = this.canvas.height - this.height * 2;

    if (pressedKeys.ArrowUp) {
      if (this.y === 0 || this.x === 0) {
        return;
      }

      this.y -= this.currentSpeed;
      this.x -= this.currentSpeed * 1.5;
      this.direction = 'y'
    }

    if (pressedKeys.ArrowDown) {
      if (this.y === maxY || this.x === maxX) {
        return;
      }

      this.y += this.currentSpeed;
      this.x += this.currentSpeed  * 1.5;
      this.direction = 'y'
    }

    // One direction at once
    if (!isMovingY) {
      if (pressedKeys.ArrowLeft) {
        if (this.y === maxY || this.x === 0) {
          return;
        }

        this.y += this.currentSpeed;
        this.x -= this.currentSpeed  * 1.5;
        this.direction = 'x'
      }
  
      if (pressedKeys.ArrowRight) {
        if (this.y === 0 || this.x === maxX) {
          return;
        }

        this.y -= this.currentSpeed;
        this.x += this.currentSpeed * 1.5;
        this.direction = 'x'
      }
    }


    this.x = clamp(0, this.x, maxX);
    this.y = clamp(0, this.y, maxY);
  }

  unstuck() {
    this.x = this.prevX;
    this.y = this.prevY;
    this.currentSpeed = this.speed;
  }
}