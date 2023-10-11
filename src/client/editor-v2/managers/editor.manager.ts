import {EngineManager, createControllerManager} from '@verza/sdk';

import {TOOLBAR_TOGGLE_FREE_LOOK_ID} from 'editor/constants';

export class EditorManager {
  private _engine: EngineManager;

  private get _ui() {
    return this._engine.ui;
  }

  props = createControllerManager({});

  constructor(engine: EngineManager) {
    this._engine = engine;
  }

  activate() {
    this._ui.setProps({
      width: '100%',
    });
    this._ui.show();
    this._ui.hideComponent('toolbar_right');
    this._ui.hideComponent('chat');
    this._ui.addInterface(TOOLBAR_TOGGLE_FREE_LOOK_ID);
  }

  deactivate() {
    this._ui.hide();
    this._ui.showComponent('toolbar_right');
    this._ui.showComponent('chat');
    this._ui.removeInterface(TOOLBAR_TOGGLE_FREE_LOOK_ID);
  }
}
