import Image0001 from '../assets/0001.png';
import Image0011 from '../assets/0011.png';
import Image0100 from '../assets/0100.png';
import Image0110 from '../assets/0110.png';
import Image0111 from '../assets/0111.png';
import Image1000 from '../assets/1000.png';
import Image1001 from '../assets/1001.png';
import Image1011 from '../assets/1011.png';
import Image1100 from '../assets/1100.png';
import Image1101 from '../assets/1101.png';
import Image1110 from '../assets/1110.png';
import Image1111 from '../assets/1111.png';

const BlockByType: {
  [key: string]: string,
} = {
  '0001': Image0001,
  '0011': Image0011,
  '0100': Image0100,
  '0110': Image0110,
  '0111': Image0111,
  '1000': Image1000,
  '1001': Image1001,
  '1011': Image1011,
  '1100': Image1100,
  '1101': Image1101,
  '1110': Image1110,
  '1111': Image1111,
}

export const BlockTypes = Object.keys(BlockByType) as string[];

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
  image?: HTMLImageElement;

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
  
    this.image = new Image();
    this.image.src = BlockByType[this.type];

    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  wasClicked(object?: { x: number, y: number }) {
    if (!object || !this.image) {
      return false;
    }

    if (object.x > this.x + this.width || object.x < this.x || object.y > this.y + this.height || object.y < this.y) {
      return false;
    }

    const xInImage = object.x - this.x;
    const yInImage = object.y - this.y;

    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = this.width * scaleFactor;
    canvas.height = this.height * scaleFactor;
    var context = canvas.getContext("2d");
    if (context) {
      context.drawImage(this.image, 0, 0, this.width, this.height);
      canvas.remove();
  
      return context.getImageData(xInImage, yInImage, 1, 1).data[3] > 0
    }

    canvas.remove();

    return false;
  }

  changeType(type: string) {
    this.type = type;
  }
}