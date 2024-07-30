import Canvas from '../../app/Canvas'

import { runGame } from './game';

const Rover01 = () => {
  return (
      <>
        <Canvas runGame={runGame} height={400} width={600} className="bg-[#ffb78c] mx-auto" />
      </>
  );
};

export default Rover01;
