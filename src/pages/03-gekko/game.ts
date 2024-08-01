import { useCallback } from 'react';
import { SupportedKeys } from './types'
import { LevelPoint, level1 } from './constants';
import { Platform } from './objects/platform'
import { Player, PLAYER_STATES } from './objects/player'

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let player = undefined as unknown as Player;

let levelLayout: Platform[] = [];

const pressedKeys: SupportedKeys = {
  Spacebar: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const allowedKeys = Object.keys(pressedKeys);

const setLevel = (level: LevelPoint[]) => {
  levelLayout = [];

  level.forEach((point) => {
    levelLayout.push(new Platform({
      canvas,
      ctx,
      y: point.y === 'max' ? canvas.height - point.height : point.y,
      x: point.x === 'max' ? canvas.width - point.width : point.x,
      width: point.width === 'max' ? canvas.width : point.width,
      height: point.height === 'max' ? canvas.height : point.height,
    }));
  })
}

const drawLevel = () => {
  levelLayout.forEach((object) => {
    object.draw();
  });
};

const drawPlayer = () => {
  if (!player) {
    player = new Player({ canvas, ctx, x: 50, y: 100 });
  }
  
  player.move(pressedKeys)

  const collidedObjects = levelLayout.filter((object) => {
    return object.didCollide(player);
  }).filter(Boolean);


  let isFalling = false;
  collidedObjects.forEach((object) => {
    const collision = object.checkCollision(player);

    if (collision.didFall) {
      isFalling = true;
    }

    if (collision.isCollision) {
      player.unstuck(collision);
    }
  });

  if (!isFalling && player.state !== PLAYER_STATES.air) {
    player.setState(PLAYER_STATES.air);
  }

  player.draw();
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

  setLevel(level1);

  renderFrame();
  initEventListeners();
};


export const useControls = () => {
  const setGameLevel = useCallback((level: LevelPoint[]) => {
    setLevel(level);
    player.setPosition({ x: 50, y: 100 });
    (document.activeElement as HTMLElement)?.blur();
  }, []);

  return {
    setGameLevel,
  }
};
