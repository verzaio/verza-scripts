import {TOOLBAR_TOGGLE_FREE_LOOK_ID} from '../misc/constants';
import {isObjectUneditable} from '../misc/utils';

import {
  EngineManager,
  IntersectsResult,
  ObjectManager,
  createControllerManager,
} from '@verza/sdk';
import {ObjectEditActionType} from '@verza/sdk/index';

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

  private get _ui() {
    return this._engine.ui;
  }

  set enabled(status: boolean) {
    if (status) {
      this._ui.show();

      this.setCursor(true);
    } else {
      this._ui.hide();

      this.setCursor(false);

      this.cancelEdit();

      this.controller.editing = false;
    }

    this.controller.enabled = status;
  }

  get enabled() {
    return this.controller.enabled;
  }

  set editing(status: boolean) {
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
        this.editing = false;
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

    this._objects.cancelEdit();
  }
}

export default EditorManager;
