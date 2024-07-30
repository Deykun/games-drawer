const maxZ = 5;

const topPadding = 20;
const leftPadding = 50;

const tileWidth = 16;
const tileHeight = 8;
const scaleFactor = 3;

export const getCanvasPositionFromIsometricPosition = ({ x, y, z }: { x: number, y: number, z: number }) => {
  if (this !== undefined) {
    return;
  }

  this.x = tileWidth * x * scaleFactor + leftPadding;
  if (y % 2 === 1) {
    this.x = this.x + ((tileWidth * scaleFactor) / 2)
  }
  this.y = topPadding + Math.floor(tileHeight * y * scaleFactor / 2) + ((maxZ - z) * tileHeight * scaleFactor);
}
