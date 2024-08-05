import { tileWidth } from '../objects/meta/isometric_object';

export const getClickPrelimits = ({
  x: canvasX,
  // y: canvasY,
  zoomLevel,
}: { x: number, y: number, zoomLevel: number }) => {
  const canvasTileWidth = zoomLevel * tileWidth;

  const diffrenceBetwenYAndX = Math.round(canvasX * 2 / canvasTileWidth);

  return {
    YXDiffMin: diffrenceBetwenYAndX - 1,
    YXDiffMax: diffrenceBetwenYAndX + 1,
  }
}

// It's tricky

// export const getPositionFromXY = ({
//   x: canvasX,
//   y: canvasY,
//   zoomLevel,
// }: { x: number, y: number, zoomLevel: number }) => {
  
//   const canvasTileWidth = zoomLevel * tileWidth;
//   const canvasTileHeigh = zoomLevel * tileHeight;

//   const restX = canvasX * 2 / canvasTileWidth;
//   const restY = canvasY / canvasTileHeigh;
//   const diffrenceBetwenXAndY = Math.round(restX);

 
//   // const positionX = 0;
//   const positionXRaw = (canvasX / canvasTileWidth);
//   const positionYRaw = (positionXRaw + diffrenceBetwenXAndY) - 1;

//   const verticalOffsetRaw = (canvasY / canvasTileWidth * 2);
//   const verticalOffset = Math.round(verticalOffsetRaw);

//   const positionX = Math.round(positionXRaw) - diffrenceBetwenXAndY + verticalOffset;
//   const positionY = Math.round(positionYRaw) - diffrenceBetwenXAndY + verticalOffset;

//   return {
//     diff: positionY - positionX,
//     x: positionX,
//     y: positionY,
//   }
// };