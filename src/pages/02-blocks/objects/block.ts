import Image0001 from '../assets/0001.png';
import Image0011 from '../assets/0011.png';
import Image0100 from '../assets/0100.png';
import Image0110 from '../assets/0110.png';
import Image1000 from '../assets/1000.png';
import Image1001 from '../assets/1001.png';
import Image1100 from '../assets/1100.png';
import Image1111 from '../assets/1111.png';

const BlockByType: {
  [key: string]: string,
} = {
  '0001': Image0001,
  '0011': Image0011,
  '0100': Image0100,
  '0110': Image0110,
  '1000': Image1000,
  '1001': Image1001,
  '1100': Image1100,
  '1111': Image1111,
}

const maxZ = 5;

const topPadding = 20;
const leftPadding = 50;

const tileWidth = 16;
const tileHeight = 8;
const scaleFactor = 3;

export class Block {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  type: string;
  x: number;
  y: number;
  height: number;
  width: number;

  constructor ({ canvas, ctx, type, z, x, y }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, type: string, z: number, x: number, y: number}) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.type = type;
    this.x = tileWidth * x * scaleFactor + leftPadding;
    if (y % 2 === 1) {
      this.x = this.x + ((tileWidth * scaleFactor) / 2)
    }
    this.y = topPadding + Math.floor(tileHeight * y * scaleFactor / 2) + ((maxZ - z) * tileHeight * scaleFactor);
    this.height = 17 * scaleFactor;
    this.width = 16 * scaleFactor;
  }

  draw() {
    if (this.type === '0000') {
      return;
    }
  
    const image = new Image();
    image.src = BlockByType[this.type];

    this.ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }
}