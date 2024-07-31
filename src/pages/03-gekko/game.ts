import { SupportedKeys } from './types'
import { level1 } from './constants';
import { Platform } from './objects/platform'
import { Player } from './objects/player'

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let player = undefined as unknown as Player;

const levelLayout: Platform[] = [];

const pressedKeys: SupportedKeys = {
  Spacebar: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const allowedKeys = Object.keys(pressedKeys);

const drawLevel = () => {
  levelLayout.forEach((object) => {
    object.draw();
  });
};

const drawPlayer = () => {
  if (!player) {
    player = new Player({ canvas, ctx, x: 100, y: 250 });
  }

  player.draw();

  levelLayout.forEach((object) => {
    const { isCollision, didFall, didHitWall, x, y } = object.checkCollision(player);

    if (isCollision) {
      player.unstuck({
        didFall, didHitWall, x, y,
      });
    }
  });

  player.move(pressedKeys)

}

const renderFrame = () => {
  window.requestAnimationFrame(renderFrame);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLevel();
  drawPlayer();
}

const initEventListeners = () => {
  window.addEventListener('keydown', (e) => {
    const key = e.key === ' ' ? 'Spacebar' : e.key;

    if (allowedKeys.includes(key)) {
      pressedKeys[key as keyof SupportedKeys] = true;
    }
  })

  window.addEventListener('keyup', (e) => {
    const key = e.key === ' ' ? 'Spacebar' : e.key;

    if (allowedKeys.includes(key)) {
      pressedKeys[key as keyof SupportedKeys] = false;
    }
  })
}

export const runGame = ({ canvas: gameCanvas, ctx: gameCtx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => {
  canvas = gameCanvas;
  ctx = gameCtx;
  ctx.imageSmoothingEnabled = false;

  level1.forEach((point) => {
    levelLayout.push(new Platform({
      canvas,
      ctx,
      y: point.y === 'max' ? canvas.height - point.height : point.y,
      x: point.x === 'max' ? canvas.width - point.width : point.x,
      width: point.width === 'max' ? canvas.width : point.width,
      height: point.height === 'max' ? canvas.height : point.height,
    }));
  })

  renderFrame();
  initEventListeners();
};
