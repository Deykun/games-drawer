import clsx from 'clsx';

import Canvas from '../../app/Canvas'

import { exampleMap, flatMap, microMap, ActionModes } from './constants';
import { runGame, useControls } from './game';

const actions: {
  action: ActionModes,
  label: string,
  className?: string,
}[] = [
  { action: 'rotate', label: 'Rotate' },
  { action: 'random', label: 'Random' },
  { action: 'remove', label: 'Remove' },
  { action: 'increase', label: '+', className: 'ml-auto' },
  { action: 'build', label: 'Build' },
  { action: 'decrease', label: '-' },
]

const Blocks02 = () => {
  const { activeAction, setActionMode, setGameMap, setGameMapOrientation } = useControls();

  return (
      <>
        <Canvas runGame={runGame} height={400} width={600} className="bg-[#5eb22d] mx-auto" />
        <div className="max-w-[600px] mx-auto mt-5 flex gap-5">
          {actions.map(({ action, label, className }) => 
            <button
              key={action}
              onClick={() => setActionMode(action)}
              className={clsx({ 'font-bold': activeAction === action, [className || '']: className })}
            >
              {label}
            </button>
          )}
          <button onClick={() => setGameMap(exampleMap)} className="ml-auto">Default</button>
          <button onClick={() => setGameMap(flatMap)}>Flat</button>
          <button onClick={() => setGameMap(microMap)}>Micro</button>
          <button onClick={() => setGameMapOrientation(1)}>y</button>
        </div>
        <details className="mt-10">
          <summary>What works?</summary>
          <ul className="list-disc ml-10">
            <li>Isometric rendering.</li>
            <li>Detecting clicked block.</li>
          </ul>
        </details>
      </>
  );
};

export default Blocks02;
