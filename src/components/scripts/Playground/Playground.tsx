import Provider from '@app/components/core/Provider';
import Boxes from './components/Boxes';
import Boxes2 from './components/Boxes2';
import Boxes3 from './components/Boxes3';
import Models from './components/Models';
import Plane from './components/Plane';
import Stairs from './components/Stairs';

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
      <Models />

      {/* <MovingPlatforms /> */}

      <Stairs />

      <Boxes />

      <Boxes2 />

      <Boxes3 />

      <Plane />
    </>
  );
};

export default Playground;
