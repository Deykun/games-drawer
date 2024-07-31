import { SupportedKeys } from './types'
import { Wall } from './objects/wall'
import { Player } from './objects/player'
import ImageBackground from './assets/background.png';
import ImageForeground from './assets/foreground.png';

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

const mapWalls: { x: number, y: number, height: number, width: number }[] = [
  { x: 20, y: 20, width: 10, height: 10 },
  { x: 180, y: 0, width: 40, height: 20 },
  { x: 210, y: 10, width: 30, height: 40 },
  { x: 280, y: 55, width: 20, height: 20 },
  { x: 295, y: 55, width: 40, height: 30 },
  { x: 264, y: 105, width: 10, height: 10 },
];

const drawBackground = () => {
  const image = new Image();
  image.src = ImageBackground;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  mapWalls.forEach((mapWalls) => {
      const wall = new Wall({ canvas, ctx, ...mapWalls });
      wall.draw();
      const didCollide = wall.isCollision(player);

      if (didCollide) {
        player.unstuck();
      }
  })
}

const drawForeground = () => {
  const image = new Image();
  image.src = ImageForeground;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
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

  drawBackground();
  drawPlayer();
  drawForeground();
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
