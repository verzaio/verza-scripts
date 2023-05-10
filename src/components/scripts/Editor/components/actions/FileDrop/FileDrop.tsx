import styles from './FileDrop.module.scss';

import {ObjectManager, Vector3, createFileTransferFromFile} from '@verza/sdk';
import {
  useAssets,
  useEngine,
  useEvent,
  useObjects,
  useRaycaster,
} from '@verza/sdk/react';
import {bringToFront} from '../../utils/all';
import {useCallback, useEffect, useState} from 'react';
import FileContainer from '@app/components/misc/FileContainer/FileContainer';

const MAX_SIZE = 50; // meters

const SCALE_SIZE = 2; // meters

const FileDrop = () => {
  const objects = useObjects();
  const engine = useEngine();
  const raycaster = useRaycaster();

  const assets = useAssets();

  const [render, setRender] = useState(false);

  // configure UI
  useEffect(() => {
    engine.ui.setSize({
      width: '100%',
      height: '50%',

      top: '0px',

      zIndex: 1000,
    });
  }, [engine]);

  useEvent('onDragEnter', () => {
    engine.ui.show();
    setRender(true);
  });

  useEvent('onDragLeave', () => {
    engine.ui.hide();
    setRender(false);
  });

  const onDropFiles = useCallback(
    async (files: File[]) => {
      engine.ui.hide();
      setRender(false);

      if (!files.length) return;

      // TODO: Support multiple files upload

      const _bringToFront = (object: ObjectManager) => {
        return bringToFront(engine.localPlayer, object, raycaster);
      };

      let assetId: string = null!;

      try {
        const file = await createFileTransferFromFile(files[0]);

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

      const object = objects.create('gltf', {
        u: assetId,
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
      await _bringToFront(object);

      // make permanent
      object.save();
    },
    [engine, assets, objects, raycaster],
  );

  if (!render) return null;

  return (
    <div className={styles.container}>
      <FileContainer onDropFiles={onDropFiles} label="Drop GLTF Model" />
    </div>
  );
};

export default FileDrop;