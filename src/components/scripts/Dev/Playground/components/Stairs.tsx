import SampleBox from './SampleBox';

import {formatUrl} from '@app/utils/misc';
import {EulerArray, Vector3, Vector3Array} from '@verza/sdk';
import {Box, Gltf} from '@verza/sdk/react';

const Stairs = () => {
  const pos = new Vector3(-5, 0, -5);
  const size: [number, number, number] = [4, 0.2, 5];

  return (
    <>
      <Gltf
        collision="static"
        url={formatUrl('dev/playground/models/stairs/double_stairs.glb')}
        position={[-20, 0, 5]}
        scale={0.02}
        userData={{
          uneditable: true,
        }}
      />

      <Gltf
        collision="static"
        url={formatUrl('dev/playground/models/stairs/double_stairs.glb')}
        position={[-26, 0, 5]}
        scale={0.016}
        userData={{
          uneditable: true,
        }}
      />

      <Gltf
        collision="static"
        url={formatUrl('dev/playground/models/stairs/double_stairs.glb')}
        position={[-31, 0, 5]}
        scale={0.013}
        userData={{
          uneditable: true,
        }}
      />

      {new Array(100).fill(null).map((_, idx) => {
        return (
          <SampleBox
            key={idx}
            size={size}
            position={pos
              .clone()
              .add(new Vector3(-0.4 * idx, 0.2 * idx, 0))
              .toArray()}
            color="green"
          />
        );
      })}

      {/* <Group position={[5, 0, 30]}>
        <StairsLow />
      </Group>

      <Group position={[10, 0, 30]}>
        <StairsMedium />
      </Group>

      <Group position={[15, 0, 30]}>
        <StairsHigh />
      </Group> */}
    </>
  );
};

type StairProps = {
  width: number;
  height: number;
  depth: number;
  position: Vector3Array;
  rotation: EulerArray;
};

const Stair = ({width, height, depth, position, rotation}: StairProps) => (
  <Box
    collision="static"
    width={width}
    height={height}
    depth={depth}
    position={position}
    rotation={rotation}
    color="blue"
    userData={{
      uneditable: true,
    }}
  />
);

type StairsBlockProps = {
  stairCount: number;
  stairWidth: number;
  stairHeight: number;
  stairDepth: number;
};

const StairsBlock = ({
  stairCount,
  stairWidth,
  stairHeight,
  stairDepth,
}: StairsBlockProps) => {
  const stairs = [];
  for (let i = 0; i < stairCount; i++) {
    stairs.push(
      <Stair
        key={i}
        width={stairWidth}
        height={stairHeight}
        depth={stairDepth}
        position={[0, stairHeight * i, stairDepth * i]}
        rotation={[0, 0, 0]}
      />,
    );
  }
  return <>{stairs}</>;
};

export const StairsLow = () => (
  <StairsBlock
    stairCount={30}
    stairWidth={5}
    stairHeight={0.2}
    stairDepth={0.3}
  />
);

export const StairsMedium = () => (
  <StairsBlock
    stairCount={30}
    stairWidth={5}
    stairHeight={0.2}
    stairDepth={0.3}
  />
);

export const StairsHigh = () => (
  <StairsBlock
    stairCount={30}
    stairWidth={5}
    stairHeight={0.2}
    stairDepth={0.3}
  />
);

export default Stairs;
