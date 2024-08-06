import { ObjectType } from '../../constants';
import { IsometricObject } from './isometric_object';

export class MovableObject extends IsometricObject {
  ctx: CanvasRenderingContext2D;
  image?: HTMLImageElement;

  constructor ({ ctx, z, x, y, zoomLevel, type }: {
    ctx: CanvasRenderingContext2D,
    z: number,
    x: number,
    y: number,
    zoomLevel: number,
    type?: ObjectType,
  }) {
    super({ z, x, y, zoomLevel, type });

    this.ctx = ctx;
  }
}