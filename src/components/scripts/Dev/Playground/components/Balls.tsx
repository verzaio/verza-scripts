import {Group, Sphere} from '@verza/sdk/react';

const Balls = () => {
  return (
    <>
      <Sphere
        collision="static"
        drawDistance="low"
        position={[0, 1, 7]}
        radius={1}
        heightSegments={50}
        widthSegments={50}
        material={{
          color: '#1dc725',
          roughness: 0,
          metalness: 0.1,
        }}
      />

      <Sphere
        collision="static"
        drawDistance="mid"
        position={[3, 1, 7]}
        radius={1}
        heightSegments={50}
        widthSegments={50}
        material={{
          color: '#1dc725',
          roughness: 0,
          metalness: 0.1,
        }}
      />

      <Sphere
        collision="static"
        position={[-3, 1, 7]}
        radius={1}
        heightSegments={50}
        widthSegments={50}
        material={{
          color: '#777777',
          roughness: 0,
          metalness: 0.1,
        }}
      />

      <Sphere
        collision="static"
        position={[6, 1, 7]}
        radius={1}
        heightSegments={50}
        widthSegments={50}
        material={{
          color: 'green',
          roughness: 0,
          metalness: 0.1,
          emissive: 'red',
          emissiveIntensity: 5,
        }}
      />

      <Group position={[5, 1, -3]}>
        <Sphere
          collision="static"
          position={[0, 0, 0]}
          radius={1}
          heightSegments={50}
          widthSegments={50}
          color="white"
        />

        <Sphere
          collision="static"
          position={[0.5, 0, 0]}
          radius={1}
          heightSegments={50}
          widthSegments={50}
          color="white"
        />

        <Sphere
          collision="static"
          position={[0.5, 0.5, 0]}
          radius={1}
          heightSegments={50}
          widthSegments={50}
          color="white"
        />

        <Sphere
          collision="static"
          position={[0.5, 0.5, 0.5]}
          radius={1}
          heightSegments={50}
          widthSegments={50}
          color="white"
        />

        <Sphere
          collision="static"
          position={[0, 0.5, 0.5]}
          radius={1}
          heightSegments={50}
          widthSegments={50}
          color="white"
        />

        <Sphere
          collision="static"
          position={[0, 0.5, 0]}
          radius={1}
          heightSegments={50}
          widthSegments={50}
          color="white"
        />

        <Sphere
          collision="static"
          position={[0, 0, 0.5]}
          radius={1}
          heightSegments={50}
          widthSegments={50}
          color="white"
        />
      </Group>
    </>
  );
};

export default Balls;
