import Canvas from '../../app/Canvas'

import { runGame } from './game';

const Rover01 = () => {
  return (
      <>
        <h1>01 Rover01</h1>
        <Canvas runGame={runGame} className="bg-[#ffb78c] mx-auto" />
      </>
  );
};

export default Rover01;
