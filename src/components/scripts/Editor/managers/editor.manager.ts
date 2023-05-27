import {
  MODELS_EXTENSIONS,
  TOOLBAR_TOGGLE_FREE_LOOK_ID,
} from '../misc/constants';
import {isObjectUneditable} from '../misc/utils';
import CommandHistoryManager from './command-history.manager';

import {
  CreateObjectProps,
  EngineManager,
  EntityCollisionType,
  IntersectsResult,
  ObjectEditTransform,
  ObjectManager,
  ObjectMaterialType,
  ObjectType,
  PickObjectProps,
  QuaternionArray,
  Vector3,
  Vector3Array,
  createControllerManager,
  createFileTransferFromFile,
} from '@verza/sdk';
import {ObjectEditActionType} from '@verza/sdk/index';
import {uuid} from '@verza/sdk/utils';
import equal from 'fast-deep-equal';

const _VECTOR = new Vector3();

const MAX_SIZE = 50;

const SCALE_SIZE = 2;

const FLOOR_DISTANCE = 200;

const FRONT_DISTANCE = 2;

const FRONT_FLOOR_DISTANCE = 2;

const EQUALS_PRECISION = 6;

class EditorManager {
  private _engine: EngineManager;

  history: CommandHistoryManager;

  controller = createControllerManager({
    enabled: false,

    editing: false,

    updating: false,
  });

  get activeObject() {
    return this.editing ? this._engine.objects.editingObject : null!;
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

    this.history = new CommandHistoryManager(engine, this);

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

      showRX: true,
      showRY: true,
      showRZ: true,

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

  private _startTransform: {
    object: ObjectManager | null;
    transform: ObjectEditTransform;
  } | null = null;

  onObjectEdit = (
    object: ObjectManager,
    type: ObjectEditActionType,
    prevTransform: ObjectEditTransform,
  ) => {
    switch (type) {
      case 'start': {
        this.updating = true;

        /* console.log(
          'start',
          oldTransform.position.map(e => e.toFixed(2)),
        ); */

        this._startTransform = {
          object: object,
          transform: prevTransform,
        };
        break;
      }
      case 'end': {
        // update transform
        if (this.updating) {
          if (this._startTransform?.object?.id === object.id) {
            /* console.log(
              'end',
              this._startTransform.transform.position.map(e => e.toFixed(2)),
            ); */
            this.saveTransformHistory(object, this._startTransform.transform);
          }

          this._startTransform = null;
        }

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

  saveObjectAndSync(object: ObjectManager) {
    object = object ?? this.activeObject;

    object?.sync();

    if (object?.permanent) {
      object.saveVolatile();
    }
  }

  async createObject(type: ObjectType) {
    const objectId = uuid();

    const location = this._engine.localPlayer.location.clone();

    location.translateZ(3);

    location.lookAt(this._engine.localPlayer.position);

    location.translateY(1);

    const creationProps = {
      id: objectId,
      position: location.position,
      rotation: location.quaternion,
    };

    const object = this._objects.create(type, creationProps);
    object.save();

    // wait for object to stream-in
    await object.waitForStream();

    this.editObject(object);

    this.history.push({
      type: 'create',
      object: object,
      undo: object => this._objects.destroy(object),
      redo: () => {
        const object = this._objects.create(type, creationProps);
        object.save();
      },
      save: false,
      checkDestroyed: false,
    });
  }

  destroyObject(object?: ObjectManager) {
    object = object ?? this.activeObject;

    const creationProps = object.toData();

    const isPermanent = object.permanent;

    this._destroyObject(object);

    this.history.push({
      type: 'create',
      object: object,
      undo: () => {
        const object = this._objects.createFromData(creationProps);

        if (isPermanent) {
          object.save();
        }
      },
      redo: object => this._destroyObject(object),
      save: false,
      checkDestroyed: false,
    });
  }

  async _destroyObject(object: ObjectManager) {
    if (!object.permanent) {
      object.destroy();
    } else {
      const parent = object.parent;

      // hide object
      object.setVisible(false);

      // if parent, then destroy child and keep parent
      if (parent) {
        object.destroy();
        parent.save();
      } else {
        // if not, then just delete it
        object.delete();
      }
    }

    if (object.id === this.activeObject?.id) {
      this.cancelEdit();
    }
  }

  async cloneObject(fromObject?: ObjectManager) {
    fromObject = fromObject ?? this.activeObject;

    const object = await fromObject.clone();

    const objectData = object.toData();

    // select to edit
    this.editObject(object);

    const isPermanent = fromObject.permanent;

    if (isPermanent) {
      object.save();
    }

    this.history.push({
      type: 'create',
      object: object,
      undo: object => this._destroyObject(object),

      redo: () => {
        const object = this._objects.createFromData(objectData);

        if (isPermanent) {
          object.save();
        }
      },
      save: false,
      checkDestroyed: false,
    });
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

  async placeOnGround(object: ObjectManager, addToHistory = true) {
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

    box.getSize(_VECTOR);

    toLocation.y += _VECTOR.y / 2;

    // set from world space, hits are always in world-space
    this.setPosition(toLocation.toArray(), object, addToHistory);
  }

  async placeInFront(object: ObjectManager, addToHistory = true) {
    const box = await object.computeBoundingBox();

    box.getSize(_VECTOR);

    const distance = _VECTOR.z
      ? _VECTOR.z / 2 + FRONT_DISTANCE
      : FRONT_DISTANCE;

    const frontLocation = this._player.location.clone().translateZ(distance);

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
    frontLocation.position.y += _VECTOR.y / 2;

    this.setPosition(frontLocation.position.toArray(), object, addToHistory);
    this.setRotation(
      frontLocation.quaternion.toArray() as QuaternionArray,
      object,
      addToHistory,
    );
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
        .translateZ(6);

      const objectId = uuid();

      const creationProps: CreateObjectProps = {
        id: objectId,
        u: assetId,
        position: frontLocation.position.toArray(),
      };

      const object = this._objects.create('gltf', creationProps);

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
      await this.placeInFront(object, false);

      // make permanent
      object.save();

      creationProps.position = object.worldLocation.position.toArray();
      creationProps.rotation =
        object.worldLocation.quaternion.toArray() as QuaternionArray;
      creationProps.scale = object.worldLocation.scale.toArray();

      this.history.push({
        type: 'create',
        object: object,
        undo: object => this._objects.destroy(object),
        redo: () => {
          const object = this._objects.create('gltf', creationProps);
          object.save();
        },
        save: false,
        checkDestroyed: false,
      });
    } catch (e) {
      console.error(e);

      this._player.sendErrorNotification('Failed to process object');
    }

    // hide indicator
    this._engine.ui.hideIndicator(indicatorId);
  }

  /* actions */
  setPosition(
    position: Vector3Array,
    object?: ObjectManager,
    addToHistory = true,
  ) {
    object = object! ?? this.activeObject;

    const currentPos = object.worldLocation.position.toArray();

    object.setPositionFromWorldSpace(position);
    this.saveObjectAndSync(object);

    if (!addToHistory) return;

    if (
      equal(
        position.map(e => e.toFixed(EQUALS_PRECISION)),
        currentPos.map((e: number) => e.toFixed(EQUALS_PRECISION)),
      )
    ) {
      return;
    }

    this.history.push({
      type: 'position',
      object: object,
      undo: object => object.setPositionFromWorldSpace(currentPos),
      redo: object => object.setPositionFromWorldSpace(position),
    });
  }

  setRotation(
    rotation: QuaternionArray,
    object?: ObjectManager,
    addToHistory = true,
  ) {
    object = object! ?? this.activeObject;

    const currentRot =
      object.worldLocation.quaternion.toArray() as QuaternionArray;

    object.setRotationFromWorldSpace(rotation);
    this.saveObjectAndSync(object);

    if (!addToHistory) return;

    if (
      equal(
        rotation.map(e => e.toFixed(EQUALS_PRECISION)),
        currentRot.map(e => e.toFixed(EQUALS_PRECISION)),
      )
    ) {
      return;
    }

    this.history.push({
      type: 'rotation',
      object: object,
      undo: object => object.setRotationFromWorldSpace(currentRot),
      redo: object => object.setRotationFromWorldSpace(rotation),
    });
  }

  setScale(scale: Vector3Array, object?: ObjectManager, addToHistory = true) {
    object = object ?? this.activeObject;

    const currentScale = object.scale.toArray();

    object.setScale(scale);
    this.saveObjectAndSync(object);

    if (!addToHistory) return;

    if (
      equal(
        scale.map(e => e.toFixed(EQUALS_PRECISION)),
        currentScale.map((e: number) => e.toFixed(EQUALS_PRECISION)),
      )
    ) {
      return;
    }

    this.history.push({
      type: 'scale',
      object: object,
      undo: object => {
        object.setScale(currentScale);
      },
      redo: object => {
        object.setScale(scale);
      },
    });
  }

  setProps(
    props: PickObjectProps<'box'>,
    currentProps: PickObjectProps<'box'>,
    object?: ObjectManager,
  ) {
    object = object ?? this.activeObject;

    object.setProps(props);
    this.saveObjectAndSync(object);

    if (equal(props, currentProps)) return;

    this.history.push({
      type: 'property',
      object: object,
      undo: object => object.setProps(currentProps),
      redo: object => object.setProps(props),
    });
  }

  setShadows(status: boolean, object?: ObjectManager) {
    object = object ?? this.activeObject;

    const currentShadows = object.shadows;

    object.setShadows(status);
    this.saveObjectAndSync(object);

    this.history.push({
      type: 'shadows',
      object: object,
      undo: object => object.setShadows(currentShadows),
      redo: object => object.setShadows(status),
    });
  }

  setCollision(collision: EntityCollisionType | null, object?: ObjectManager) {
    object = object ?? this.activeObject;

    const currentProps = object.collision;

    object.setCollision(collision);
    this.saveObjectAndSync(object);

    this.history.push({
      type: 'collision',
      object: object,
      undo: object => object.setCollision(currentProps),
      redo: object => object.setCollision(collision),
    });
  }

  saveTransformHistory(object: ObjectManager, transform: ObjectEditTransform) {
    const currentPos = object.worldLocation.position.toArray();
    const currentRot =
      object.worldLocation.quaternion.toArray() as QuaternionArray;
    const currentScale = object.scale.toArray();

    // check if transform has changed
    if (
      equal(
        [
          currentPos.map((e: number) => e.toFixed(EQUALS_PRECISION)),
          currentRot.map((e: number) => e.toFixed(EQUALS_PRECISION)),
          currentScale.map((e: number) => e.toFixed(EQUALS_PRECISION)),
        ],
        [
          transform.position.map(e => e.toFixed(EQUALS_PRECISION)),
          transform.rotation.map(e => e.toFixed(EQUALS_PRECISION)),
          transform.scale.map(e => e.toFixed(EQUALS_PRECISION)),
        ],
      )
    ) {
      return;
    }

    this.history.push({
      type: 'collision',
      object: object,
      undo: object => {
        object.setPositionFromWorldSpace(transform.position);
        object.setRotationFromWorldSpace(transform.rotation);
        object.setScale(transform.scale);
      },
      redo: object => {
        object.setPositionFromWorldSpace(currentPos);
        object.setRotationFromWorldSpace(currentRot);
        object.setScale(currentScale);
      },
    });
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
