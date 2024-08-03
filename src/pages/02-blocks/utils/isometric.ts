import { tileWidth, tileHeight } from '../objects/meta/isometric_object';

export const getPositionFromXY = ({
  x,
  y,
  screenOffsetX,
  screenOffsetY,
  zoomLevel,
}: { x: number, y: number, screenOffsetX: number, screenOffsetY: number, zoomLevel: number }) => {
  const canvasTileWidth = zoomLevel * tileWidth;
  // const canvasTileWidth = tileWidth;

  const canvasX = x - screenOffsetX;
  const canvasY = y - screenOffsetY;

  // const positionX = (canvasY - canvasX) / canvasTileWidth;
  // const positionY = (canvasX + canvasY) / canvasTileWidth;

  const positionX = Math.floor((canvasY - canvasX) / canvasTileWidth) + 1;
  const positionY = Math.floor((canvasX + canvasY) / canvasTileWidth) + 4;

  const location = `${Math.floor(positionX)}x${Math.floor(positionY)}`;

  console.log({
    type: 'new',
    location,
  });

  return {
    diff: positionY - positionX,
    x: positionX,
    y: positionY,
  }
};