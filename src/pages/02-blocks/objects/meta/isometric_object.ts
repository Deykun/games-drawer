import { Orientation } from '../../constants'

export const scaleFactor = 2;

export class IsometricObject {
  canvas: HTMLCanvasElement;
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
    const paddingTop = Math.floor(this.canvas.height/ 2);
    const paddingLeft = Math.floor(this.canvas.width / 2);
    const isoX = x * this.width / 2;
    const isoY = y * this.width / 2;
    const isoZ = z * this.width / 2;

    this.x = paddingLeft + (isoY - isoX);
    this.y = paddingTop + (isoX + isoY) / 2 - isoZ;

    this.location = `${x}x${y}x${z}`
    this.renderIndex = (1000 * z) + (10 * y) + x;
  }

  constructor ({ canvas, z, x, y, orientation }: {     canvas: HTMLCanvasElement, z: number, x: number, y: number, orientation?: Orientation }) {
    this.canvas = canvas;
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

    this.setCanvasDrawData(this.position)
  }

  transpose() {
    const oldX = this.position.x;
    const oldY = this.position.y;

    this.position.x = oldY;
    this.position.y = -oldX;

    this.setCanvasDrawData(this.position)

    return this.location;
  }
}
