import Balls from './components/Balls';
import Boxes from './components/Boxes';
import Boxes2 from './components/Boxes2';
import Boxes3 from './components/Boxes3';
import Models from './components/Models';
import MovingPlatforms from './components/MovingPlatforms';
import Plane from './components/Plane';
import Poles from './components/Poles';
import Stairs from './components/Stairs';

import Provider from '@app/components/core/Provider';

const DEBUG = false;

const Playground = () => {
  return (
    <Provider>
      <PlaygroundRender />
    </Provider>
  );
};

const PlaygroundRender = () => {
  return (
    <>
      <MovingPlatforms />

      {!DEBUG && (
        <>
          <Models />

          <Poles />

          <Stairs />

          <Boxes />

          <Boxes2 />

          <Boxes3 />

          <Plane />

          <Balls />
        </>
      )}
    </>
  );
};

export default Playground;
