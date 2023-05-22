import {ObjectManager, createControllerManager} from '@verza/sdk';

//const MAX_COMMAND_HISTORY = 256;

type CommandHistoryType =
  | 'position'
  | 'rotation'
  | 'scale'
  | 'property'
  | 'collision';

type CommandHistory = {
  type: CommandHistoryType;
  object: ObjectManager;
  undo: () => void;
  redo: () => void;
};

class CommandHistoryManager {
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

    //console.log('newCommands', newCommands.length, currentCommands);

    console.log('push', this.currentIndex, this.stack.length);
  }

  undo() {
    const command = this.stack[this.currentIndex];

    if (!command) return;

    if (command.object.destroyed) {
      console.debug(`[editor] object destroyed (undo): ${command.object.id}`);
    } else {
      command.undo();
    }

    this.currentIndex--;

    console.log('undo', this.currentIndex, this.stack.length);
  }

  redo() {
    const command = this.stack[this.currentIndex + 1];

    if (!command) return;

    if (command.object.destroyed) {
      console.debug(`[editor] object destroyed (redo): ${command.object.id}`);
    } else {
      command.redo();
    }

    this.currentIndex++;

    console.log('redo', this.currentIndex, this.stack.length);
  }

  clear() {
    this.stack = [];
    this.currentIndex = -1;
  }
}

export default CommandHistoryManager;
