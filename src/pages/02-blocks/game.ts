import { useEffect, useState } from 'react';
import { getRandomItem } from '../../utils/math'
import { Block, BlockTypes } from './objects/block'

const objects: Block[] = [];

type ActionModes = 'random' | 'rotate' | 'remove' | 'build';
let activeMode: ActionModes = 'random';


let canvas = undefined as unknown as HTMLCanvasElement;
let ctx = undefined as unknown as CanvasRenderingContext2D;

const mapLayers: string[][][] = [
  [
    ['0000', '0000', '1001'],
  ],
  [
    ['0000', '0000', '1111'],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ['0000', '0000', '0000', '0000', '0000', '0000', '0000', '0000', '0110'],
  ],
  [
    ['0000', '0000', '1111'],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ['0000', '0000', '0000', '0000', '0000', '0000', '0000', '0000', '1111'],
  ],
  [
    ['0000', '0100', '1111', '1111', '0001', '0100', '1111', '0001', '0000', '0000'],
    ['0000', '1100', '1111', '1001', '0000', '1100', '1001', '0000', '0000', '0000'],
    ['0000', '0000', '1100', '1001', '0000', '0000', '1000', '0000', '0000', '0000'],
    ['0000', '0000', '1000', '0000', '0000', '0000', '0000', '0000', '0000', '0000'],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ['0000', '0000', '0000', '0000', '0000', '0000', '0000', '0000', '1111'],
  ],
  [
    ['0000', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1011'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '0001'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1011'],
    ['1100', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '0001'],
    ['1100', '1111', '1111', '1111', '1111', '1111', '1111', '1001'],
    ['0000', '1100', '1101', '1101', '1101', '1101', '1101', '1001'],
    ['0000', '1000', '1000', '1000', '1000', '1000', '1000', '0000'],
    [],
    [],
    [],
    ['0000', '0000', '0000', '0000', '0000', '0000', '0000', '0000', '1111'],
  ],
  [
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1101', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1011', '1110', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '0111', '1111', '1111', '1111', '1111', '1111'],
    ['1111', '1111', '1111', '1111', '1111', '1101', '1101', '1101', '1101', '1001'],
    ['0000', '0000', '0000', '0000', '0000', '1000', '1000', '1000', '1000', '1000'],
  ]
].reverse();

const drawMap = () => {
  objects.forEach((object) => {
    object.draw();
  });
}

const renderFrame = () => {
  window.requestAnimationFrame(renderFrame);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
}

const initEventListeners = () => {
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
          const object = new Block({ canvas, ctx, type: '1111', ...position, z: position.z + 1 });

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

  mapLayers.forEach((z, zIndex) => {
    z.forEach((y, yIndex) => {
      y.forEach((type, xIndex) => {
        const object = new Block({ canvas, ctx, type, z: zIndex, x: xIndex, y: yIndex });

        objects.push(object);
      });
    });
  });

  drawMap();
  renderFrame();
  initEventListeners();
};

export const useControls = () => {
  const [activeAction, setActionMode] = useState(activeMode);

  useEffect(() => {
    activeMode = activeAction;
  }, [activeAction])

  return {
    activeAction,
    setActionMode,
  }
};
