import {ObjectManager, Vector3} from '@verza/sdk';
import {
  useAssets,
  useEngine,
  useEvent,
  useObjects,
  useRaycaster,
} from '@verza/sdk/react';
import {bringToFront} from '../utils/all';

const MAX_SIZE = 50; // meters

const SCALE_SIZE = 2; // meters

const FileDrop = () => {
  const objects = useObjects();
  const engine = useEngine();
  const raycaster = useRaycaster();

  const assets = useAssets();

  const _bringToFront = (object: ObjectManager) => {
    return bringToFront(engine.localPlayer, object, raycaster);
  };

  useEvent('onDrop', async file => {
    if (!file) return;

    let assetId: string = null!;

    try {
      assetId = await assets.upload(file);
    } catch (e) {
      console.error(e);

      const isExternalStorage =
        (e as any)?.message === 'asset/external-storage-not-allowed';

      if (isExternalStorage) {
        engine.localPlayer.sendErrorNotification(
          'Invalid GLTF Model. Make sure your GLTF model is not using any external resource.',
          6000,
        );
        return;
      }

      engine.localPlayer.sendErrorNotification(
        'Invalid GLTF Model. Make sure you uploaded the correct model file.',
      );
      return;
    }

    const object = objects.createGltf(assetId, {
      position: [0, 0, 0],
    });

    // wait for object to stream-in
    await object.waitForStream();

    const box = await object.computeBoundingBox();
    const distance = box.max.distanceTo(box.min);

    // scale it down
    if (distance > MAX_SIZE) {
      engine.localPlayer.sendSuccessNotification('Object scaled down');

      const scaledMeters = (distance / 100) * SCALE_SIZE;
      const scaledSize = (scaledMeters * 100) / distance;

      const scaledVector = new Vector3(
        scaledSize,
        scaledSize,
        scaledSize,
      ).divideScalar(100);
      object.setScale(scaledVector);
    }

    // then bring to front
    _bringToFront(object);

    // make permanent
    object.save();
  });

  return null;
};

export default FileDrop;
