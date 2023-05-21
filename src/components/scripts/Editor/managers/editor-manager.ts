import {
  MODELS_EXTENSIONS,
  TOOLBAR_TOGGLE_FREE_LOOK_ID,
} from '../misc/constants';
import {isObjectUneditable} from '../misc/utils';

import {
  EngineManager,
  IntersectsResult,
  ObjectManager,
  ObjectMaterialType,
  Vector3,
  createControllerManager,
  createFileTransferFromFile,
} from '@verza/sdk';
import {ObjectEditActionType} from '@verza/sdk/index';

const MAX_SIZE = 50; // meters

const SCALE_SIZE = 2; // meters

const FLOOR_DISTANCE = 200; // meters

const FRONT_DISTANCE = 2;

const FRONT_FLOOR_DISTANCE = 2;

class EditorManager {
  private _engine: EngineManager;

  controller = createControllerManager({
    enabled: false,

    editing: false,

    updating: false,
  });

  get activeObject() {
    return this._engine.objects.editingObject;
  }

  private get _objects() {
    return this._engine.objects;
  }

  private get _player() {
    return this._engine.localPlayer;
  }

  private get _raycaster() {
    return this._engine.world.raycaster;
  }

  private get _ui() {
    return this._engine.ui;
  }

  set enabled(status: boolean) {
    if (this.enabled === status) return;

    if (status) {
      this._ui.show();

      this.setCursor(true);
    } else {
      this._ui.hide();

      this.setCursor(false);

      this.cancelEdit();

      this.editing = false;
    }

    this.controller.enabled = status;
  }

  get enabled() {
    return this.controller.enabled;
  }

  set editing(status: boolean) {
    if (this.editing === status) return;

    this._ui.setProps({
      zIndex: 100,
    });

    this.controller.editing = status;
  }

  get editing() {
    return this.controller.editing;
  }

  get updating() {
    return this.controller.updating;
  }

  set updating(status: boolean) {
    if (this.updating === status) return;

    this.controller.updating = status;
  }

  constructor(engine: EngineManager) {
    this._engine = engine;

    this._init();

    engine.ui.setProps({
      width: '100%',
      height: '100%',

      top: '0px',
      left: '0px',

      zIndex: 100,
    });
  }

  private _init() {
    // set initial config
    this._objects.setEditSnaps(null, null, null);

    this._objects.setEditAxes({
      showX: true,
      showY: true,
      showZ: true,

      showRX: false,
      showRY: true,
      showRZ: false,

      showSX: false,
      showSY: false,
      showSZ: false,
    });
  }

  setCursor(status: boolean) {
    if (status) {
      this._ui.addInterface(TOOLBAR_TOGGLE_FREE_LOOK_ID);
    } else {
      this._ui.removeInterface(TOOLBAR_TOGGLE_FREE_LOOK_ID);
    }
  }

  onObjectEdit = (object: ObjectManager, type: ObjectEditActionType) => {
    switch (type) {
      case 'start': {
        this.updating = true;
        break;
      }
      case 'end': {
        this.updating = false;

        //console.log('END', object.permanent);

        object.sync();

        if (object.permanent) {
          object.saveVolatile();
        }
        break;
      }
      case 'update': {
        //console.log('UPDATE', object.permanent);

        object.sync();
        break;
      }
      case 'select': {
        this.editing = true;
        this.updating = false;
        break;
      }
      case 'unselect': {
        if (this.activeObject && this.activeObject.id !== object.id) {
          break;
        }

        this.editing = false;
        this.updating = false;
        break;
      }
    }
  };

  onEntitySelected = async (intersects: IntersectsResult) => {
    // cancel if no object was selected
    if (!intersects.object) {
      this.cancelEdit();
      return;
    }

    const object = intersects.object.entity;

    // edit if not selected
    if (object.id === this.activeObject?.id) return;

    if (await isObjectUneditable(object)) {
      this.cancelEdit();
      return;
    }

    this.editObject(object);
  };

  private _timeoutId: ReturnType<typeof setTimeout> | null = null;

  saveObject() {
    const object = this.activeObject;

    if (!object?.permanent) return;

    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }

    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;

      object.save();
    }, 100);
  }

  editObject(object: ObjectManager) {
    this.activeObject?.disableHighlight();

    object.edit();

    object.disableHighlight();

    /* object.enableHighlight({
      color: HIGHLIGHT_ACTIVE_COLOR,
    }); */
  }

  cancelEdit() {
    this.activeObject?.disableHighlight();

    // delay it a bit in case any input is focused
    this._objects.cancelEdit();
  }

  async placeOnGround(object: ObjectManager) {
    const worldLocation = await object.worldLocationAsync;
    const fromLocation = worldLocation.position.clone();
    const toLocation = worldLocation.position.clone();

    // first ray | origin -> down
    toLocation.y -= FLOOR_DISTANCE;

    let result = await this._raycaster.raycastPoints(fromLocation, toLocation, {
      filterEntityTypes: ['object'],
      excludeObjectIds: [object.id],
    });

    if (!result.hit) {
      // second ray | top -> origin -> down
      toLocation.y -= -FLOOR_DISTANCE;
      fromLocation.y += FLOOR_DISTANCE;

      result = await this._raycaster.raycastPoints(fromLocation, toLocation, {
        filterEntityTypes: ['object'],
        excludeObjectIds: [object.id],
      });
    }

    // abort if hit not found
    if (!result.hit) return;

    // set hit position
    toLocation.set(...result.hit.point);

    // get bounding box and set it from its base
    const box = await object.computeBoundingBox();
    toLocation.y += worldLocation.position.y - box.min.y;

    // set from world space, hits are always in world-space
    object.setPositionFromWorldSpace(toLocation);
  }

  async placeInFront(object: ObjectManager) {
    const frontLocation = this._player.location
      .clone()
      .translateZ(FRONT_DISTANCE);

    frontLocation.lookAt(this._player.location.position);

    const fromLocation = frontLocation.position.clone();
    const toLocation = frontLocation.position.clone();

    fromLocation.y += FRONT_FLOOR_DISTANCE;
    toLocation.y -= -FRONT_FLOOR_DISTANCE;

    const result = await this._raycaster.raycastPoints(
      fromLocation,
      toLocation,
      {
        filterEntityTypes: ['object'],
        excludeObjectIds: [object.id],
      },
    );

    if (result.hit) {
      frontLocation.position.set(...result.hit.point);
    }

    // put to floor level
    const worldPosition = await object.worldLocationAsync;

    const box = await object.computeBoundingBox();
    frontLocation.position.y += worldPosition.position.y - box.min.y;

    object.setPositionFromWorldSpace(frontLocation.position);
    object.setRotationFromWorldSpace(frontLocation.quaternion);
  }

  formatUrl(url: string) {
    return this._engine.assets.formatUrl(url);
  }

  isAcceptedFile(file: File) {
    return MODELS_EXTENSIONS.some(ext => file.name.endsWith(`.${ext}`));
  }

  async uploadTexture(rawFile: File) {
    let assetId: string = null!;

    const indicatorId = `${Math.random()}`;

    try {
      this._engine.ui.showIndicator(indicatorId, 'Uploading texture...');
      const file = await createFileTransferFromFile(rawFile);

      assetId = await this._engine.assets.upload(file);
    } catch (e) {
      console.error(e);

      this._engine.localPlayer.sendErrorNotification(
        'Invalid Texture. Make sure you uploaded the correct texture file.',
      );
    } finally {
      this._engine.ui.hideIndicator(indicatorId);
    }

    return assetId;
  }

  async uploadGltf(rawFile: File) {
    if (!this.isAcceptedFile(rawFile)) {
      this._engine.localPlayer.sendErrorNotification(
        'Only GLTF/GLB files are supported.',
      );
      return;
    }

    let assetId: string = null!;

    const indicatorId = `${Math.random()}`;

    try {
      this._engine.ui.showIndicator(indicatorId, 'Uploading model...');
      const file = await createFileTransferFromFile(rawFile);

      assetId = await this._engine.assets.upload(file);
    } catch (e) {
      this._engine.ui.hideIndicator(indicatorId);

      console.error(e);

      const isExternalStorage =
        (e as any)?.message === 'asset/external-storage-not-allowed';

      if (isExternalStorage) {
        this._engine.localPlayer.sendErrorNotification(
          'Invalid GLTF Model. Make sure your GLTF model is not using any external resource.',
          6000,
        );
        return;
      }

      this._engine.localPlayer.sendErrorNotification(
        'Invalid GLTF Model. Make sure you uploaded the correct model file.',
      );
      return;
    }

    try {
      const frontLocation = this._engine.localPlayer.location
        .clone()
        .translateZ(2);

      const object = this._objects.create('gltf', {
        u: assetId,
        position: frontLocation.position.toArray(),
      });

      // wait for object to stream-in
      await object.waitForStream();

      const box = await object.computeBoundingBox();
      const distance = box.max.distanceTo(box.min);

      // scale it down
      if (distance > MAX_SIZE) {
        this._player.sendSuccessNotification('Object scaled down');

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
      await this.placeInFront(object);

      // make permanent
      object.save();
    } catch (e) {
      console.error(e);

      this._player.sendErrorNotification('Failed to process object');
    }

    // hide indicator
    this._engine.ui.hideIndicator(indicatorId);
  }
}

export const getObjectMaterialType = (
  object: ObjectManager | null,
  currentValue?: ObjectMaterialType,
) => {
  return (
    currentValue ??
    (object as ObjectManager<'box'>)?.props?.material?.type ??
    'standard'
  );
};

export default EditorManager;
