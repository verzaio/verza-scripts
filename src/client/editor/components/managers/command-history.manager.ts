import {
  EngineManager,
  ObjectManager,
  createControllerManager,
} from '@verza/sdk';

import EditorManager from './editor.manager';

//const MAX_COMMAND_HISTORY = 256;

type CommandHistoryType =
  | 'position'
  | 'rotation'
  | 'scale'
  | 'property'
  | 'collision'
  | 'shadows'
  | 'bloom'
  | 'create';

type CommandHistory = {
  type: CommandHistoryType;
  object: ObjectManager;
  undo: (object: ObjectManager) => void;
  redo: (object: ObjectManager) => void;
  save?: boolean;
  checkDestroyed?: boolean;
};

class CommandHistoryManager {
  private _engine: EngineManager;

  private _editor: EditorManager;

  stack: CommandHistory[] = [];

  private timeoutIds: Map<string, ReturnType<typeof setTimeout>> = new Map();

  controller = createControllerManager({
    currentIndex: -1,
  });

  set currentIndex(value: number) {
    this.controller.currentIndex = value;
  }

  get currentIndex() {
    return this.controller.currentIndex;
  }

  get canUndo() {
    return !!this.stack[this.currentIndex];
  }

  get canRedo() {
    return !!this.stack[this.currentIndex + 1];
  }

  constructor(engine: EngineManager, editor: EditorManager) {
    this._engine = engine;
    this._editor = editor;
  }

  push(command: CommandHistory, groupId?: string) {
    const _groupId = groupId ?? command.object.id;

    const timeoutId = this.timeoutIds.get(_groupId);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      this.timeoutIds.delete(_groupId);

      this._push(command);
    }, 150);

    this.timeoutIds.set(_groupId, newTimeoutId);
  }

  private _push(command: CommandHistory) {
    this.stack.splice(this.currentIndex + 1);

    this.stack.push(command);

    this.currentIndex++;

    //console.log('push', this.currentIndex, this.stack.length);
  }

  undo() {
    const command = this.stack[this.currentIndex];

    if (!command) return;

    command.object =
      this._engine.objects.get(command.object.id) ?? command.object;

    if (command.checkDestroyed !== false && command.object.destroyed) {
      console.debug(`[editor] object destroyed (undo): ${command.object.id}`);
    } else {
      command.undo(command.object);

      if (command.save !== false) {
        this._editor.saveObjectAndSync(command.object);
      }
    }

    this.currentIndex--;

    //console.log('undo', this.currentIndex, this.stack.length);
  }

  redo() {
    const command = this.stack[this.currentIndex + 1];

    if (!command) return;

    command.object =
      this._engine.objects.get(command.object.id) ?? command.object;

    if (command.checkDestroyed !== false && command.object.destroyed) {
      console.debug(`[editor] object destroyed (redo): ${command.object.id}`);
    } else {
      command.redo(command.object);

      if (command.save !== false) {
        this._editor.saveObjectAndSync(command.object);
      }
    }

    this.currentIndex++;

    //console.log('redo', this.currentIndex, this.stack.length);
  }

  clear() {
    this.stack = [];
    this.currentIndex = -1;
  }
}

export default CommandHistoryManager;
