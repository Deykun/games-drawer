import { Player } from './objects/player'

const game: {
  player?: Player,
} = {};

const world = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 2, 0, 0],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

const tileHeight = 60;
const tileWidth = 60;

const drawWorld = ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
  world.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === 1) {
        ctx.fillStyle = "red"
        ctx.fillRect(tileWidth * columnIndex, tileHeight * rowIndex, tileHeight, tileWidth)
      } else {
        ctx.fillStyle = "green"
        ctx.fillRect(tileWidth * columnIndex, tileHeight * rowIndex, tileHeight, tileWidth)
      }
    });
  })
}

const drawPlayer = ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
  if (!game.player) {
    game.player = new Player(ctx, 100, 100);
  }

  game.player.draw();
}

const renderFrame = ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
  window.requestAnimationFrame(() => renderFrame({ ctx }));

  drawWorld({ ctx });
  drawPlayer({ ctx });
}


export const runGame = ({ ctx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => {
  renderFrame({ ctx });
};
