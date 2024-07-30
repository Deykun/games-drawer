import clsx from 'clsx';

import Canvas from '../../app/Canvas'

import { defaultMap, flatMap } from './const/map';
import { runGame, useControls } from './game';

const Rover01 = () => {
  const { activeAction, setActionMode, setGameMap } = useControls();

  return (
      <>
        <Canvas runGame={runGame} height={400} width={600} className="bg-[#5eb22d] mx-auto" />
        <div className="max-w-[600px] mx-auto mt-5 flex gap-5">
          <button onClick={() => setActionMode('rotate')} className={clsx({ 'font-bold': activeAction === 'rotate' })}>Rotate</button>
          <button onClick={() => setActionMode('random')} className={clsx({ 'font-bold': activeAction === 'random' })}>Random</button>
          <button onClick={() => setActionMode('remove')} className={clsx({ 'font-bold': activeAction === 'remove' })}>Remove</button>
          <button onClick={() => setActionMode('build')} className={clsx({ 'font-bold': activeAction === 'build' })}>Build</button>
          <button onClick={() => setGameMap(defaultMap)} className="ml-auto">Default map</button>
          <button onClick={() => setGameMap(flatMap)}>Flat map</button>
          
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

export default Rover01;
