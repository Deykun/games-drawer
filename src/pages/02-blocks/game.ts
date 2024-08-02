import { useEffect, useState, useCallback } from 'react';
import { getRandomItem } from '../../utils/math'
import { defaultMap, ActionModes, Orientation } from './constants'
import { IsometricObject } from './objects/meta'
import { Block, BlockTypes } from './objects/block'
import { Pointer } from './objects/pointer'

let objectsByPosition: {
  [location: string]: Block,
} = {};
let objectsSortedForRender: IsometricObject[] = [];
let mapOrientation: 0 | 1 | 2 | 3 = 0;
let pointer: Pointer | undefined = undefined;

let activeMode: ActionModes = 'random';

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;

const refreshObjectsForRender = () => {
  objectsSortedForRender = Object.values(objectsByPosition).sort((a, b) => a.renderIndex - b.renderIndex);
}

const setMapOrientation = (orientation: Orientation) => {
  const newObjectsByPostion: {
    [location: string]: Block,
  } = {}
  Object.values(objectsByPosition).forEach((object) => {
    const newLocation = object.transpose(orientation);

    newObjectsByPostion[newLocation] = object;
  })

  objectsByPosition = newObjectsByPostion;

  refreshObjectsForRender();
};

const setMap = (map: string[][][]) => {
  objectsByPosition = {};

  map.forEach((z, zIndex) => {
    z.forEach((y, yIndex) => {
      y.forEach((type, xIndex) => {
        const object = new Block({ canvas, ctx, type, z: zIndex, x: xIndex, y: yIndex, orientation: mapOrientation });

        objectsByPosition[`${xIndex}x${yIndex}x${zIndex}`] = object;
      });
    });
  });

  refreshObjectsForRender();
}

const drawMap = () => {
  objectsSortedForRender.forEach((object) => {
    object.draw();
  })

  if (pointer) {
    pointer.draw({ activeMode })
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

    const hoveredObjectIndex = objectsSortedForRender.findLastIndex((object) => object.wasClicked({ x, y }));
    const hoveredObject = objectsSortedForRender[hoveredObjectIndex];

    if (hoveredObject) {
      const position = hoveredObject.position;
      const newPosition = {
        ...position,
        z: position.z + 1
      };

      const objectAboveLocation = `${position.x}x${position.y}x${newPosition.z}`;
      const isBlocked = objectsByPosition[objectAboveLocation] && objectsByPosition[objectAboveLocation].type !== '0000';
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

    const clickedObjectIndex = objectsSortedForRender.findLastIndex((object) => object.wasClicked({ x, y }));
    const clickedObject = objectsSortedForRender[clickedObjectIndex];

    if (clickedObject) {
      if (activeMode === 'rotate') {
        clickedObject?.rotate();
      }

      if (activeMode === 'remove') {
        delete objectsByPosition[clickedObject.location];

        refreshObjectsForRender();
      }
      
      if (activeMode === 'random') {
        clickedObject.changeType(getRandomItem(BlockTypes) ?? '1111')
      }

      if (activeMode === 'decrease') {
        const { isEmpty } = clickedObject.changeCornersNumber(-1);

        if (isEmpty) {
          delete objectsByPosition[clickedObject.location];

          refreshObjectsForRender();
        }
      }

      if (activeMode === 'increase') {
        clickedObject.changeCornersNumber(1);
      }

      if (activeMode === 'build') {
        const position = clickedObject.position;
        const newPosition = {
          ...position,
          z: position.z + 1
        };

        const objectAboveLocation = `${position.x}x${position.y}x${newPosition.z}`;
        const isBlocked = objectsByPosition[objectAboveLocation] && objectsByPosition[objectAboveLocation].type !== '0000';
        if (!isBlocked) {
          const object = new Block({ canvas, ctx, type: '1111', ...newPosition });

          objectsByPosition[objectAboveLocation] = object;

          refreshObjectsForRender();
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

  const setGameMapOrientation = useCallback((newOrientation: 0 | 1 | 2 | 3) => {
    setMapOrientation(newOrientation);
  }, []);

  return {
    activeAction,
    setActionMode,
    setGameMap,
    setGameMapOrientation,
  }
};
