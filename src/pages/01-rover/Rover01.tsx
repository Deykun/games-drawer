import Canvas from '../../app/Canvas'

import { runGame } from './game';

const Rover01 = () => {
  return (
      <>
        <Canvas runGame={runGame} height={400} width={600} className="bg-[#c97e49] mx-auto" />

        <details className="mt-10">
          <summary>What works?</summary>
          <ul className="list-disc ml-10">
            <li>Isometric movement.</li>
            <li>Swapping image to match direction.</li>
            <li>Collision detection.</li>
            <li>The acceleration of the rover.</li>
          </ul>
        </details>
      </>
  );
};

export default Rover01;
