import { useEffect, useState, useCallback } from 'react';
import { getRandomItem, clamp, round } from '../../utils/math'
import { defaultMap, ActionModes, SavedPoint, SupportedKeys } from './constants'
import { getClickPrelimits } from './utils/isometric';
import { Block, BlockTypes } from './objects/block'
import { Pointer } from './objects/pointer'

let objectsByPosition: {
  [location: string]: Block,
} = {};
let objectsSortedForRender: Block[] = [];
let pointer: Pointer | undefined = undefined;

let activeMode: ActionModes = 'build';

let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;
let screenOffsetX = 0;
let screenOffsetY = 0;

let zoomLevel = 2;

const refreshObjectsForRender = () => {
  objectsSortedForRender = Object.values(objectsByPosition).sort((a, b) => a.renderIndex - b.renderIndex);
}

const rotateMap = () => {
  const newObjectsByPostion: {
    [location: string]: Block,
  } = {};

  Object.values(objectsByPosition).forEach((object) => {
    const newLocation = object.transpose();

    newObjectsByPostion[newLocation] = object;
  })

  objectsByPosition = newObjectsByPostion;

  refreshObjectsForRender();
};

const setNewZoomLevel = () => {
  Object.values(objectsByPosition).forEach((object) => {
    object.setZoom(zoomLevel);
  })

  refreshObjectsForRender();
};

const setMap = (points: SavedPoint[]) => {
  objectsByPosition = {};

  points.forEach((point) => {
      const object = new Block({ ctx, ...point, zoomLevel });

      objectsByPosition[object.location] = object;
  });

  refreshObjectsForRender();
}

const drawMap = () => {
  objectsSortedForRender.forEach((object) => {
    object.draw({ screenOffsetX, screenOffsetY });
  })

  if (pointer) {
    pointer.draw({ activeMode, screenOffsetX, screenOffsetY });
  }
}

const fps = 40;
const renderFrame = () => {
  setTimeout(() => {
    if (pressedKeys.ArrowLeft || pressedKeys.ArrowRight) {
      screenOffsetX = pressedKeys.ArrowRight ? screenOffsetX - 5 : screenOffsetX + 5;
    }

    if (pressedKeys.ArrowUp || pressedKeys.ArrowDown) {
      screenOffsetY = pressedKeys.ArrowDown ? screenOffsetY - 5 : screenOffsetY + 5;
    }

    window.requestAnimationFrame(renderFrame);
  }, 1000 / fps);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
}

const pressedKeys: SupportedKeys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const allowedKeys = Object.keys(pressedKeys);

const setPointer = ({ x, y }: { x: number, y: number}) => {
  const { YXDiffMin, YXDiffMax } = getClickPrelimits({ x, y, zoomLevel });
  const hoveredObjectIndex = objectsSortedForRender.findLastIndex((object) => {
    const objectYXDiff = object.position.y - object.position.x;
    if (objectYXDiff < YXDiffMin || objectYXDiff > YXDiffMax) {
      return false;
    }

    return object.isRenderedAt({ x, y })
  });

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
      pointer = new Pointer({ ctx, zoomLevel, ...newPosition });

      return;
    }

    pointer.move(newPosition);
  }
};

const onClick = (event: MouseEvent) => {
  const x = event.offsetX - screenOffsetX;
  const y = event.offsetY - screenOffsetY;

  const { YXDiffMin, YXDiffMax } = getClickPrelimits({ x, y, zoomLevel });
  const clickedObjectIndex = objectsSortedForRender.findLastIndex((object) => {
    const objectYXDiff = object.position.y - object.position.x;
    if (objectYXDiff < YXDiffMin || objectYXDiff > YXDiffMax) {
      return false;
    }

    return object.isRenderedAt({ x, y })
  });

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

        setPointer({ x, y });
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
        const object = new Block({ ctx, type: '1111', zoomLevel, ...newPosition });

        objectsByPosition[objectAboveLocation] = object;

        refreshObjectsForRender();
      }
    }
  }
}

const initEventListeners = () => {
  window.addEventListener('keydown', (e) => {
    if (allowedKeys.includes(e.key)) {
      pressedKeys[e.key as keyof SupportedKeys] = true;
    }
  });

  window.addEventListener('keyup', (e) => {
    if (allowedKeys.includes(e.key)) {
      pressedKeys[e.key as keyof SupportedKeys] = false;
    }
  });

  let isMousePressed = false;
  canvas.addEventListener('mousedown', () => {
    isMousePressed = true;
  });

  canvas.addEventListener('mouseup', () => {
    isMousePressed = false;
  })

  canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX - screenOffsetX;
    const y = event.offsetY - screenOffsetY;

    setPointer({ x, y });

    if (isMousePressed) {
      onClick(event);
    }
  });

  canvas.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
      zoomLevel = round(zoomLevel + 0.5, 1);
    } else {
      zoomLevel = round(zoomLevel - 0.5, 1);
    }

    zoomLevel = clamp(0.5, zoomLevel, 8);

    pointer = undefined;

    setNewZoomLevel();
  });

  canvas.addEventListener('mouseleave', () => {
    pointer = undefined;
  });

  canvas.addEventListener('click', onClick);
}

export const runGame = ({ canvas: gameCanvas, ctx: gameCtx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => {
  canvas = gameCanvas;
  ctx = gameCtx;
  ctx.imageSmoothingEnabled = false;

  screenOffsetX = -25 + Math.floor(canvas.width / 2);
  screenOffsetY = 50 + Math.floor(canvas.height / 2);

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

  const setGameMap = useCallback((map: SavedPoint[]) => {
    setMap(map);
  }, []);

  const rotateGameMap = useCallback(() => {
    rotateMap();
  }, []);

  return {
    activeAction,
    setActionMode,
    setGameMap,
    rotateGameMap,
  }
};


declare global {
  interface Window { savePoints: () => string; }
}

window.savePoints = () => {
  const compressedObjects = Object.values(objectsByPosition).map((object) => ({
    ...object.position,
    type: object.type,
  }));

  return JSON.stringify(compressedObjects);
}
