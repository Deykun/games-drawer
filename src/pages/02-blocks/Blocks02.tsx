import Canvas from '../../app/Canvas'

import { runGame } from './game';

const Rover01 = () => {
  return (
      <>
        <Canvas runGame={runGame} height={400} width={600} className="bg-[#5eb22d] mx-auto" />
        <details className="mt-10">
          <summary>What works?</summary>
          <ul className="list-disc ml-10">
            <li>Isometric rendering.</li>
          </ul>
        </details>
      </>
  );
};

export default Rover01;
