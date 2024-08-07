import { IsometricObject } from './meta/isometric_object';

import Image0001 from '../assets/0001.png';
import Image0010 from '../assets/0010.png';
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
  '0010': Image0010,
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

export class Block extends IsometricObject {
  ctx: CanvasRenderingContext2D;
  type: string;
  image?: HTMLImageElement;

  constructor ({ ctx, type, z, x, y, zoomLevel }: {
    ctx: CanvasRenderingContext2D,
    type: string,
    z: number,
    x: number,
    y: number,
    zoomLevel: number,
  }) {
    super({ z, x, y, zoomLevel });

    this.ctx = ctx;
    this.type = type;
  }

  draw({ screenOffsetX = 0, screenOffsetY = 0 }: { screenOffsetX?: number, screenOffsetY?: number } = {}) {
    if (this.type === '0000') {
      return;
    }
  
    this.image = new Image();
    this.image.src = BlockByType[this.type];

    this.ctx.drawImage(this.image, this.x + screenOffsetX, this.y + screenOffsetY, this.width, this.height);

    // this.ctx.textBaseline = "top";
    // this.ctx.fillStyle = 'white';
    // this.ctx.font = `9px Arial`;
    // const x = this.width / 2 - 8;
    // const y = this.width / 4 - 5;
    // this.ctx.fillText(`${this.position.x},${this.position.y}`, this.x + screenOffsetX + x, this.y + screenOffsetY + y);
  }

  isRenderedAt(object?: { x: number, y: number }) {
    if (!object || !this.image) {
      return false;
    }

    if (object.x > this.x + this.width || object.x < this.x || object.y > this.y + this.height || object.y < this.y) {
      return false;
    }

    const xInImage = object.x - this.x;
    const yInImage = object.y - this.y;

    const canvas = document.createElement("canvas");

    try {
      document.body.appendChild(canvas);
      canvas.width = this.width * this.zoomLevel;
      canvas.height = this.height * this.zoomLevel;
      const context = canvas.getContext("2d");

      if (context) {
        context.drawImage(this.image, 0, 0, this.width, this.height);
        canvas.remove();
    
        return context.getImageData(xInImage, yInImage, 1, 1).data[3] > 0
      }
    } catch {
    }
    
    canvas.remove();

    return false;
  }

  changeType(type: string) {
    this.type = type;
  }

  changeCornersNumber(modifyByNumber: -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4) {
    const currentCornerCount = (this.type.match(new RegExp("1", "g")) || []).length;

    const newCornerCount = currentCornerCount + modifyByNumber;

    const isValidChange = newCornerCount >= 0 && newCornerCount <= 4;
    if (!isValidChange) {
      return { isEmpty: false };
    }

    let newType = this.type;
    if (modifyByNumber > 0) {
      for (let i = 0; i < modifyByNumber; i++) {
        newType = newType.replace('0', '1');
      }
    } else {
      // Not all two corner types are supported
      if (currentCornerCount === 3) {
        if (this.type.startsWith('11')) {
          newType = '1100';
        } else {
          newType = '0011';
        }
      } else {
        for (let i = 0; i < Math.abs(modifyByNumber); i++) {
          newType = newType.replace('1', '0');
        }
      }
    }

    this.type = newType;

    return { isEmpty: newType === '0000' };
  }

  rotate() {
    const rotationArray = [
      ['1000', '0100', '0010', '0001'],
      ['1100', '0110', '0011', '1001'],
      ['1110', '0111', '1011', '1101'],
      ['1111'],
    ].find((arr) => arr.includes(this.type));
    if (Array.isArray(rotationArray)) {
      const currentIndex = rotationArray.findIndex((type) => this.type === type);

      const newType = rotationArray[(currentIndex + 1) % rotationArray.length];

      this.changeType(newType);

      return true;
    }

    return false;
  }

  transpose() {
    const newLocation = super.transpose();

    this.rotate();
    
    return newLocation;
  }
}
