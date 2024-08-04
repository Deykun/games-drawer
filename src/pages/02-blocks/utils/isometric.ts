import { tileWidth, tileHeight } from '../objects/meta/isometric_object';

const canvasWidth = 600;

export const getPositionFromXY = ({
  x: canvasX,
  y: canvasY,
  screenOffsetX,
  screenOffsetY,
  zoomLevel,
}: { x: number, y: number, screenOffsetX: number, screenOffsetY: number, zoomLevel: number }) => {
  
  const canvasTileWidth = zoomLevel * tileWidth;
  const canvasTileHeigh = zoomLevel * tileHeight;
  // const canvasTileWidth = tileWidth;

  // 0,0 - start of 0,0,0 tile
  // const canvasX = (x + screenOffsetX - canvasTileWidth) / zoomLevel;
  // // const canvasY = (y + screenOffsetY) / zoomLevel;
  // // const canvasY = (y + screenOffsetY) / zoomLevel;
  // const canvasY = (screenOffsetY / zoomLevel) - ((screenOffsetY / zoomLevel) - y);

  // 0x3

  const differenceBetwenXandY = (canvasY - (canvasX * 2)) / canvasTileWidth;

  const calculatedOffsetX = canvasX / canvasTileWidth;
  const calculatedOffsetY = canvasY / canvasTileHeigh / 2;
  // const calculatedOffsetY = (canvasY * zoomLevel) / canvasTileWidth;
  // const calculatedOffsetY = 0;


  const positionX = Math.floor(calculatedOffsetX);
  const positionY = Math.floor(calculatedOffsetY);

  console.log({
    cX: calculatedOffsetX,
    // cY: calculatedOffsetY,
    location: `${positionX}x${positionY}`,
    // differenceBetwenXandY,
    canvasX,
    canvasY,
    // canvasTileWidth,
    // canvasTileHeigh,
  });



  // const location = `${Math.floor(positionX)}x${Math.floor(positionY)}`;

  // console.log({
  //   type: 'new',
  //   location,
  // });



   // Calculate isoX and isoY
  //  const isoX = canvasY - (canvasX / 2);
  //  const isoY = canvasY + (canvasX / 2);
   
  //  // Calculate x and y
  //  const positionXraw = (2 * isoX) / canvasTileWidth;
  //  const positionYraw = (2 * isoY) / canvasTileWidth;

  //   // Calculate x and y
  //   const positionX = positionXraw + 1;
  //   const positionY = positionYraw + 4;
   
  //  return { x, y };


  // const positionX = (canvasY - canvasX) / canvasTileWidth;
  // const positionY = (canvasX + canvasY) / canvasTileWidth;

  // const positionX = Math.floor((canvasY - canvasX) / canvasTileWidth) + 1;
  // const positionY = Math.floor((canvasX + canvasY) / canvasTileWidth) + 4;


  return {
    diff: positionY - positionX,
    x: positionX,
    y: positionY,
  }
};