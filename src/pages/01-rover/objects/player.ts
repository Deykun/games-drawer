import PlayerImage from '../assets/player.png'

export class Player {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  height: number;
  width: number;

  constructor (ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = 30;
    this.width = 30;
  }

  draw() {
    const image = new Image();
    image.src = PlayerImage;

    this.ctx.drawImage(image, this.x, this.y);
  }
}