import { useEffect, useState, useCallback } from 'react';
import { getRandomItem } from '../../utils/math'
import { defaultMap } from './const/map'
import { Block, BlockTypes } from './objects/block'
import { Pointer } from './objects/pointer'

let objects: Block[] = [];
let pointer: Pointer | undefined = undefined;

type ActionModes = 'random' | 'rotate' | 'remove' | 'build';
let activeMode: ActionModes = 'random';

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;

const setMap = (map: string[][][]) => {
  objects = [];

  map.forEach((z, zIndex) => {
    z.forEach((y, yIndex) => {
      y.forEach((type, xIndex) => {
        const object = new Block({ canvas, ctx, type, z: zIndex, x: xIndex, y: yIndex });

        objects.push(object);
      });
    });
  });
}

const drawMap = () => {
  objects.forEach((object) => {
    object.draw();
  });

  if (pointer) {
    pointer.draw()
  }
}

const fps = 25;
const renderFrame = () => {
  setTimeout(() => {
    window.requestAnimationFrame(renderFrame);
  }, 1000 / fps);


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
}

const initEventListeners = () => {
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedObjectIndex = objects.findLastIndex((object) => object.wasClicked({ x, y }));
    const clickedObject = objects[clickedObjectIndex];

    if (clickedObject) {
      const position = clickedObject.position;
      const newPosition = {
        ...position,
        z: position.z + 1
      };

      const isBlocked = objects.some((object) => !(object.position.z !== newPosition.z || object.position.y !== newPosition.y  || object.position.x !== newPosition.x));

      if (isBlocked) {
        pointer = undefined;

        return;
      }

      if (!pointer) {
        pointer = new Pointer({ canvas, ctx, ...newPosition });

        return;
      }

      pointer.move(newPosition);
    }
  });

  canvas.addEventListener('mouseleave', () => {
    if (pointer) {
      pointer = undefined;
    }
  });

  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedObjectIndex = objects.findLastIndex((object) => object.wasClicked({ x, y }));
    const clickedObject = objects[clickedObjectIndex];

    if (clickedObject) {
      if (activeMode === 'rotate') {
        clickedObject?.rotate();
      }

      if (activeMode === 'remove') {
        objects.splice(clickedObjectIndex, 1);
      }
      
      if (activeMode === 'random') {
        clickedObject.changeType(getRandomItem(BlockTypes) ?? '1111')
      }

      if (activeMode === 'build') {
        const position = clickedObject.position;
        const newPosition = {
          ...position,
          z: position.z + 1
        };

        const isBlocked = objects.some((object) => !(object.position.z !== newPosition.z || object.position.y !== newPosition.y  || object.position.x !== newPosition.x));

        if (!isBlocked) {
          const object = new Block({ canvas, ctx, type: '1111', ...newPosition });

          objects.push(object);

          objects.sort((a, b) => a.renderIndex - b.renderIndex);
        }
      }

      renderFrame();
    }
  })
}

export const runGame = ({ canvas: gameCanvas, ctx: gameCtx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => {
  canvas = gameCanvas;
  ctx = gameCtx;
  ctx.imageSmoothingEnabled = false;

  setMap(defaultMap);

  drawMap();
  renderFrame();
  initEventListeners();
};

export const useControls = () => {
  const [activeAction, setActionMode] = useState(activeMode);

  useEffect(() => {
    activeMode = activeAction;
  }, [activeAction]);

  const setGameMap = useCallback((map: string[][][]) => {
    setMap(map);
  }, []);

  return {
    activeAction,
    setActionMode,
    setGameMap,
  }
};
