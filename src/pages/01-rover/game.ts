export const runGame = ({ ctx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => {
  ctx.fillStyle = '#ede'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  
  ctx!.beginPath();
  ctx!.arc(95, 50, 40, 0, 2 * Math.PI);
  ctx!.stroke();

  return;
};
