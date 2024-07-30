import Canvas from '../../app/Canvas'

import { runGame } from './game';

const Rover01 = () => {
  return (
      <>
        <Canvas runGame={runGame} height={400} width={600} className="bg-[#5eb22d] mx-auto" />
      </>
  );
};

export default Rover01;
