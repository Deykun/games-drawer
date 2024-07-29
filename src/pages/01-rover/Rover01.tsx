import Canvas from '../../app/Canvas'

import { runGame } from './game';

const Rover01 = () => {
  return (
      <>
        <h1>01 Rover01</h1>
        <Canvas runGame={runGame} height={300} width={300} className="bg-[#ffb78c] mx-auto" />
      </>
  );
};

export default Rover01;
