import { IsometricObject } from './meta/isometric_object';
import { ObjectType } from '../constants';

import Image0001 from '../assets/block/0001.png';
import Image0010 from '../assets/block/0010.png';
import Image0011 from '../assets/block/0011.png';
import Image0100 from '../assets/block/0100.png';
import Image0110 from '../assets/block/0110.png';
import Image0111 from '../assets/block/0111.png';
import Image1000 from '../assets/block/1000.png';
import Image1001 from '../assets/block/1001.png';
import Image1011 from '../assets/block/1011.png';
import Image1100 from '../assets/block/1100.png';
import Image1101 from '../assets/block/1101.png';
import Image1110 from '../assets/block/1110.png';
import Image1111 from '../assets/block/1111.png';
import Image1111Flat from '../assets/block/1111-flat.png';

const DEV = {
  SHOULD_SHOW_POSITION: false,
  SHOULD_SHOW_ELEVATION: false,
}

const BlockByEvelation: {
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

export const BlockTypes = Object.keys(BlockByEvelation) as string[];

export class Block extends IsometricObject {
  ctx: CanvasRenderingContext2D;
  evelation: string;
  image?: HTMLImageElement;

  constructor ({ ctx, evelation, z, x, y, zoomLevel, type }: {
    ctx: CanvasRenderingContext2D,
    evelation: string,
    z: number,
    x: number,
    y: number,
    zoomLevel: number,
    type?: ObjectType,
  }) {
    super({ z, x, y, zoomLevel, type });

    this.ctx = ctx;
    this.evelation = evelation;
  }

  draw({ screenOffsetX = 0, screenOffsetY = 0 }: { screenOffsetX?: number, screenOffsetY?: number } = {}) {
    if (this.evelation === '0000') {
      return;
    }
  
    this.image = new Image();
    const isGround = this.type === 'ghost' && this.evelation === '1111';
    this.image.src = isGround ? Image1111Flat : BlockByEvelation[this.evelation];

    this.ctx.drawImage(this.image, this.x + screenOffsetX, this.y + screenOffsetY, this.width, this.height);

    if (DEV.SHOULD_SHOW_ELEVATION) {
      const corners = this.evelation.split('');

      const padding = 6 * this.zoomLevel;
      const dotSize = 1 * this.zoomLevel;
  
      const minX = padding - (dotSize / 2);
      const midX = (this.width / 2) - (dotSize / 2);
      const maxX = (this.width) - padding - (dotSize / 2);
      const minY = (padding / 2) - (dotSize / 2);
      const midY = (this.width / 4) - (dotSize / 4);
      const maxY = (this.width / 2) - (padding / 2) - (dotSize / 2);
  
      [
        { x: midX, y: minY },
        { x: maxX, y: midY },
        { x: midX, y: maxY },
        { x: minX, y: midY },
      ].forEach((cornerPosition, index) => {
        // this.ctx.fillStyle = "transparent"
        this.ctx.fillStyle = corners[index] === '1' ? "#7dff11" : "#ff0505";
        this.ctx.fillRect(this.x + screenOffsetX + cornerPosition.x, this.y + screenOffsetY + cornerPosition.y, dotSize, dotSize)
      });
    }

    if (DEV.SHOULD_SHOW_POSITION) {
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = 'white';
      this.ctx.font = `9px Arial`;
      const x = this.width / 2 - 8;
      const y = this.width / 4 - 5;
      this.ctx.fillText(`${this.position.x},${this.position.y}`, this.x + screenOffsetX + x, this.y + screenOffsetY + y);
      }
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

  changeEvelation(evelation: string) {
    this.evelation = evelation;
  }

  changeCornersNumber(modifyByNumber: -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4) {
    const currentCornerCount = (this.evelation.match(new RegExp("1", "g")) || []).length;

    const newCornerCount = currentCornerCount + modifyByNumber;

    const isValidChange = newCornerCount >= 0 && newCornerCount <= 4;
    if (!isValidChange) {
      return { isEmpty: false };
    }

    let newType = this.evelation;
    if (modifyByNumber > 0) {
      for (let i = 0; i < modifyByNumber; i++) {
        newType = newType.replace('0', '1');
      }
    } else {
      // Not all two corner evelations are supported
      if (currentCornerCount === 3) {
        if (this.evelation.startsWith('11')) {
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

    this.evelation = newType;

    return { isEmpty: newType === '0000' };
  }

  rotate() {
    const rotationArray = [
      ['1000', '0100', '0010', '0001'],
      ['1100', '0110', '0011', '1001'],
      ['1110', '0111', '1011', '1101'],
      ['1111'],
    ].find((arr) => arr.includes(this.evelation));
    if (Array.isArray(rotationArray)) {
      const currentIndex = rotationArray.findIndex((evelation) => this.evelation === evelation);

      const newType = rotationArray[(currentIndex + 1) % rotationArray.length];

      this.changeEvelation(newType);

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
