import Canvas from '../../app/Canvas'

import { level1, level2 } from './constants';
import { runGame, useControls } from './game';

const Gekko03 = () => {
  const { setGameLevel } = useControls();

  return (
      <>
        <Canvas id="game" runGame={runGame} height={400} width={600} className="bg-[#afa978] mx-auto" />
        <div className="max-w-[600px] mx-auto mt-5 flex gap-5">
          <button onClick={() => setGameLevel(level1)} >Level 1</button>
          <button onClick={() => setGameLevel(level2)} >Level 2</button>
        </div>
        <details className="mt-10">
          <summary>What works?</summary>
          <ul className="list-disc ml-10">
            <li>Collision detection.</li>
            <li>Jumping.</li>
            <li>Level generation.</li>
          </ul>
        </details>
      </>
  );
};

export default Gekko03;
