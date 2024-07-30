import { useRef, useEffect } from 'react';

type Props = {
  className?: string,
  height?: number,
  width?: number,
  runGame: ({ canvas, ctx }: { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D }) => void,
}

const Canvas = ({ className, height = 400, width = 700, runGame }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current;

      if (ctx) {
        runGame({ canvas: canvasRef.current, ctx })
      }
    }
  }, []);

  return (
      <canvas ref={canvasRef} height={height} width={width} className={className} />
  );
}

export default Canvas