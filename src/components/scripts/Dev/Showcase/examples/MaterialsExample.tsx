import Description from '../components/Description';
import Label from '../components/Label';
import SceneTitle from '../components/SceneTitle';
import {SHOWCASE_LOCATION, SHOWCASE_SIZE} from '../Showcase';

import {formatUrl} from '@app/utils/misc';
import {Group, Sphere} from '@verza/sdk/react';
import {uuid} from '@verza/sdk/utils';

const format = (name: string) =>
  formatUrl(`showcase/textures/textures/${name}`);

const MaterialsExample = () => {
  const loc = SHOWCASE_LOCATION.clone();
  loc.translateZ(SHOWCASE_SIZE.y / 2 - 0.15);
  loc.translateX(-32);
  loc.rotateY(Math.PI);

  return (
    <Group key={uuid()} position={loc.position} rotation={loc.quaternion}>
      <SceneTitle position={[4, 3.3, 0]}>Materials</SceneTitle>

      <Description position={[4, 2.5, 0]}>Full PBR Support</Description>

      <Scene />
    </Group>
  );
};

const Scene = () => {
  return (
    <>
      <Group position={[-4, 1.2, 4]}>
        <Label position={[0, 1.2, 0]}>1</Label>

        <Sphere
          collision="static"
          radius={0.7}
          widthSegments={100}
          heightSegments={100}
          material={{
            map: format(
              'RustMixedOnPaint012/RustMixedOnPaint012_COL_VAR1_1K.jpg',
            ),
            normalMap: format(
              'RustMixedOnPaint012/RustMixedOnPaint012_NRM_1K.jpg',
            ),
            metalness: 0.3,
            roughness: 0.5,
            metalnessMap: format(
              'RustMixedOnPaint012/RustMixedOnPaint012_REFL_1K.jpg',
            ),
          }}
        />
      </Group>

      <Group position={[0, 1.2, 4]}>
        <Label position={[0, 1.2, 0]}>2</Label>

        <Sphere
          collision="static"
          radius={0.7}
          widthSegments={100}
          heightSegments={100}
          material={{
            map: format('GroundTireTracks001/GroundTireTracks001_COL_2K.jpg'),
            aoMap: format('GroundTireTracks001/GroundTireTracks001_AO_2K.jpg'),
            metalnessMap: format(
              'GroundTireTracks001/GroundTireTracks001_GLOSS_2K.jpg',
            ),
          }}
        />
      </Group>

      <Group position={[4, 1.2, 4]}>
        <Label position={[0, 1.2, 0]}>3</Label>

        <Sphere
          collision="static"
          radius={0.7}
          widthSegments={100}
          heightSegments={100}
          material={{
            map: format(
              'MetalSpottyDiscoloration001/MetalSpottyDiscoloration001_COL_2K_METALNESS.jpg',
            ),
            metalness: 0.3,
            metalnessMap: format(
              'MetalSpottyDiscoloration001/MetalSpottyDiscoloration001_METALNESS_2K_METALNESS.jpg',
            ),
            roughnessMap: format(
              'MetalSpottyDiscoloration001/MetalSpottyDiscoloration001_ROUGHNESS_2K_METALNESS.jpg',
            ),
          }}
        />
      </Group>

      <Group position={[8, 1.2, 4]}>
        <Label position={[0, 1.2, 0]}>4</Label>

        <Sphere
          collision="static"
          radius={0.7}
          widthSegments={100}
          heightSegments={100}
          material={{
            map: format(
              'MetalCorrugatedIronSheet002/MetalCorrugatedIronSheet002_COL_2K_METALNESS.jpg',
            ),
            aoMap: format(
              'MetalCorrugatedIronSheet002/MetalCorrugatedIronSheet002_AO_2K_METALNESS.jpg',
            ),
            roughnessMap: format(
              'MetalCorrugatedIronSheet002/MetalCorrugatedIronSheet002_ROUGHNESS_2K_METALNESS.jpg',
            ),
            metalnessMap: format(
              'MetalCorrugatedIronSheet002/MetalCorrugatedIronSheet002_METALNESS_2K_METALNESS.jpg',
            ),
          }}
        />
      </Group>

      <Group position={[12, 1.2, 4]}>
        <Label position={[0, 1.2, 0]}>5</Label>

        <Sphere
          collision="static"
          radius={0.7}
          widthSegments={100}
          heightSegments={100}
          material={{
            map: format('WoodFlooring044/WoodFlooring044_COL_2K.jpg'),
            //normalMap: format('WoodFlooring044/WoodFlooring044_NRM_2K.jpg'),
            roughnessMap: format('WoodFlooring044/WoodFlooring044_REFL_2K.jpg'),
          }}
        />
      </Group>
    </>
  );
};

export default MaterialsExample;
