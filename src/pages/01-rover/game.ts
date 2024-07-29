import { SupportedKeys } from './types'
import { Wall } from './objects/wall'
import { Player } from './objects/player'

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let player = undefined as unknown as Player;

const pressedKeys: SupportedKeys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const allowedKeys = Object.keys(pressedKeys);

const world = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 2, 0, 0],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

const tileHeight = 60;
const tileWidth = 60;

const drawWorld = () => {
  world.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === 1) {
        const wall = new Wall({ canvas, ctx, x: tileWidth * columnIndex, y: tileHeight * rowIndex });
        wall.draw();
        const didCollide = wall.isCollision(player);
        if (didCollide) {
          player.unstuck();
        }
      } else {
        ctx.fillStyle = "green"
        ctx.fillRect(tileWidth * columnIndex, tileHeight * rowIndex, tileHeight, tileWidth)
      }
    });
  })
}

const drawPlayer = () => {
  if (!player) {
    player = new Player({ canvas, ctx, x: 100, y: 100 });
  }

  player.draw();
  player.move(pressedKeys)
}

const renderFrame = () => {
  window.requestAnimationFrame(renderFrame);

  drawWorld();
  drawPlayer();
}

const initEventListeners = () => {
  window.addEventListener('keydown', (e) => {
    if (allowedKeys.includes(e.key)) {
      pressedKeys[e.key as keyof SupportedKeys] = true;
    }
  })

  window.addEventListener('keyup', (e) => {
    if (allowedKeys.includes(e.key)) {
      pressedKeys[e.key as keyof SupportedKeys] = false;
    }
  })
}


export const runGame = ({ canvas: gameCanvas, ctx: gameCtx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => {
  canvas = gameCanvas;
  ctx = gameCtx;

  renderFrame();
  initEventListeners();
};
