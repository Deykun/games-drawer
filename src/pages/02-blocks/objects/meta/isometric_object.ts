const maxZ = 5;

const topPadding = 20;
const leftPadding = 50;

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
  renderIndex: number;
  height: number;
  width: number;

  constructor ({ z, x, y }: { z: number, x: number, y: number }) {

    this.position = {
      x,
      y,
      z,
    };
    this.renderIndex = (1000 * z) + (10 * y) + x;
    this.x = tileWidth * x * scaleFactor + leftPadding;
    if (y % 2 === 1) {
      this.x = this.x + ((tileWidth * scaleFactor) / 2)
    }
    this.y = topPadding + Math.floor(tileHeight * y * scaleFactor / 2) + ((maxZ - z) * tileHeight * scaleFactor);
    this.height = 17 * scaleFactor;
    this.width = 16 * scaleFactor;
  }

  move({ x, y, z }: { x: number, y: number, z: number}) {
    this.position = { x, y, z };

    this.x = tileWidth * x * scaleFactor + leftPadding;
    if (y % 2 === 1) {
      this.x = this.x + ((tileWidth * scaleFactor) / 2)
    }
    this.y = topPadding + Math.floor(tileHeight * y * scaleFactor / 2) + ((maxZ - z) * tileHeight * scaleFactor);
  }
}
