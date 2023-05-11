import styles from './FileDrop.module.scss';

import {
  CORE_ACTION_EDITOR,
  Vector3,
  createFileTransferFromFile,
} from '@verza/sdk';
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

type FileDropProps = {
  setEnabled: (state: boolean) => void;
  enabled: boolean;
};

const FileDrop = ({setEnabled, enabled}: FileDropProps) => {
  const objects = useObjects();
  const engine = useEngine();
  const raycaster = useRaycaster();

  const assets = useAssets();

  const [render, setRender] = useState(false);

  // configure UI
  useEffect(() => {
    engine.ui.setProps({
      width: '100%',
      height: '50%',

      top: '0px',

      zIndex: 1000,
    });
  }, [engine]);

  useEvent('onDragEnter', () => {
    console.log(
      'onDragEnter',
      engine.localPlayer.hasAccess(CORE_ACTION_EDITOR),
    );

    if (!engine.localPlayer.hasAccess(CORE_ACTION_EDITOR)) return;

    engine.ui.show();

    setRender(true);
  });

  useEvent('onDragLeave', () => {
    setRender(false);

    engine.ui.setProps({
      zIndex: 100,
    });

    if (!enabled) {
      engine.ui.hide();
    }
  });

  const onDropFiles = useCallback(
    async (files: File[]) => {
      engine.ui.hide();
      setRender(false);

      if (!files.length) return;

      // TODO: Support multiple files upload

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

      const frontLocation = engine.localPlayer.location.clone().translateZ(2);

      const object = objects.create('gltf', {
        u: assetId,
        position: frontLocation.position.toArray(),
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

      //setEnabled(true);
      setEnabled;

      // then bring to front
      await bringToFront(engine.localPlayer, object, raycaster);

      // make permanent
      object.save();
    },
    [setEnabled, engine, assets, objects, raycaster],
  );

  if (!render) return null;

  return (
    <div className={styles.container}>
      <FileContainer onDropFiles={onDropFiles} label="Drop GLTF Model" />
    </div>
  );
};

export default FileDrop;
