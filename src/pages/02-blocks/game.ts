import { Block } from './objects/block'

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;

const mapLayers: string[][][] = [
  [
    ['1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111'],
  ]
];

const drawMap = () => {
  const mapLayersFromGroundUp = mapLayers.reverse();

  mapLayersFromGroundUp.reverse().forEach((z, zIndex) => {
    z.forEach((y, yIndex) => {
      y.forEach((x, xIndex) => {
        // const image = new Image();
        // image.src = Image1111;
        // ctx.drawImage(image, 0, 0);

        const wall = new Block({ canvas, ctx, z: zIndex, x: xIndex, y: yIndex });
        wall.draw();
      });
    });
  })
}

const renderFrame = () => {
  window.requestAnimationFrame(renderFrame);

  drawMap();
}


export const runGame = ({ canvas: gameCanvas, ctx: gameCtx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => {
  canvas = gameCanvas;
  ctx = gameCtx;
  ctx.imageSmoothingEnabled = false;


  renderFrame();
};
