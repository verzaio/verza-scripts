import {forwardRef} from 'react';

import {ColorType, ObjectManager} from '@verza/sdk';
import {Box} from '@verza/sdk/react';

type SampleBoxProps = {
  size?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: ColorType;
};

const SampleBox = forwardRef<ObjectManager<'box'>, SampleBoxProps>(
  ({color, position, rotation, size}: SampleBoxProps, ref) => {
    return (
      <Box
        collision="static"
        ref={ref}
        width={size?.[0] ?? 1}
        height={size?.[1] ?? 1}
        depth={size?.[2] ?? 1}
        position={position}
        rotation={rotation}
        material={{
          color: color ?? 'black',
          opacity: 0.8,
          transparent: true,
        }}
        userData={{
          uneditable: true,
        }}
      />
    );
  },
);

SampleBox.displayName = 'SampleBox';

export default SampleBox;
