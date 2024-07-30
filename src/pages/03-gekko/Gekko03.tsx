import Canvas from '../../app/Canvas'

import { runGame } from './game';

const Gekko03 = () => {
  return (
      <>
        <Canvas runGame={runGame} height={400} width={600} className="bg-[#c97e49] mx-auto" />
      </>
  );
};

export default Gekko03;
