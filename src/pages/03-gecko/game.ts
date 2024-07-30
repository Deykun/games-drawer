import { SupportedKeys } from './types'
import { Player } from './objects/player'

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let player = undefined as unknown as Player;

const pressedKeys: SupportedKeys = {
  ArrowLeft: false,
  ArrowRight: false,
};

const allowedKeys = Object.keys(pressedKeys);

const drawPlayer = () => {
  if (!player) {
    player = new Player({ canvas, ctx, x: 100, y: 250 });
  }

  player.draw();
  player.move(pressedKeys)
}

const renderFrame = () => {
  window.requestAnimationFrame(renderFrame);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawBackground();
  drawPlayer();
  // drawForeground();
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
  ctx.imageSmoothingEnabled = false;

  renderFrame();
  initEventListeners();
};
