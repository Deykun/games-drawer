import { Orientation } from '../../constants'

const maxZ = 5;

const topPadding = 20;
const leftPadding = 200;

const tileWidth = 16;
const tileHeight = 8;
export const scaleFactor = 3;

export class IsometricObject {
  x: number;
  y: number;
  position: {
    x: number
    y: number
    z: number
  };
  location: string;
  orientation?: Orientation;
  renderIndex: number;
  height: number;
  width: number;

  setCanvasDrawData({ x, y, z }: { x: number, y: number, z: number }) {
    this.x = tileWidth * x * scaleFactor + leftPadding;
    if (y % 2 === 1) {
      this.x = this.x + ((tileWidth * scaleFactor) / 2)
    }
    this.y = topPadding + Math.floor(tileHeight * y * scaleFactor / 2) + ((maxZ - z) * tileHeight * scaleFactor);
    this.location = `${x}x${y}x${z}`
    this.renderIndex = (1000 * z) + (10 * y) + x;
  }

  constructor ({ z, x, y, orientation }: { z: number, x: number, y: number, orientation?: Orientation }) {

    this.position = {
      x,
      y,
      z,
    };
    this.orientation = orientation;

    this.height = 17 * scaleFactor;
    this.width = 16 * scaleFactor;

    /* Temporary is set by metod below */
    this.x = 0;
    this.y = 0;
    this.location = `0x0x0`;
    this.renderIndex = 0;
    this.setCanvasDrawData(this.position)
  }

  move({ x, y, z }: { x: number, y: number, z: number}) {
    this.position = { x, y, z };

    this.x = tileWidth * x * scaleFactor + leftPadding;
    if (y % 2 === 1) {
      this.x = this.x + ((tileWidth * scaleFactor) / 2)
    }
    this.y = topPadding + Math.floor(tileHeight * y * scaleFactor / 2) + ((maxZ - z) * tileHeight * scaleFactor);
  }

  transpose() {
    const oldX = this.position.x;
    const oldY = this.position.y;

    this.position.x = -oldY;
    this.position.y = oldX;

    console.log({
      old: [oldX, oldY].join(', '),
      new: [this.position.x, this.position.y].join(', '),
    })

    // 0,0 -> 0,0
    // 1,0 -> 0,1
    // 2,0 -> 0,2
    // 1,1 -> -1, 1
    // 1,2 -> -1, 2

    this.setCanvasDrawData(this.position)

    return this.location;
  }
}
