import {FLY_ACTION, FLY_SPEEDS} from '../utils/constants';
import {calcDirectionOffset} from '../utils/misc';
import {FlyModeMode} from '../utils/types';

import {
  EngineManager,
  Object3D,
  Vector3,
  createControllerManager,
} from '@verza/sdk';

const _LOCATION = new Object3D();

const _LAST_POS = new Vector3();

const _ROTATE_Y = new Vector3(0, 1, 0);

const _DIR1 = new Vector3();
const _DIR2 = new Vector3();

const MODEL_ROTATION = Math.PI; // 180 degrees

class FlyModeManager {
  private _engine: EngineManager;

  autoMove = false;

  controller = createControllerManager({
    enabled: false,

    speed: 0,

    customSpeed: 0,

    mode: 'player' as FlyModeMode,
  });

  get enabled() {
    return this.controller.enabled;
  }

  get customSpeed() {
    return this.controller.customSpeed;
  }

  set customSpeed(speed: number) {
    this.controller.customSpeed = speed;
  }

  get speed() {
    return this.controller.speed;
  }

  set speed(speed: number) {
    if (this.customSpeed) {
      this.controller.customSpeed = 0;
      return;
    }

    if (speed > FLY_SPEEDS.length - 1) {
      this.controller.speed = 0;
      return;
    }

    this.controller.speed = speed;
  }

  get resolvedSpeed() {
    return this.customSpeed || FLY_SPEEDS[this.speed];
  }

  get mode() {
    return this.controller.mode;
  }

  private get _camera() {
    return this._engine.camera;
  }

  private get _player() {
    return this._engine.localPlayer;
  }

  constructor(engine: EngineManager) {
    this._engine = engine;
  }

  toggle() {
    this.setStatus(!this.enabled);
  }

  private _beforeInterfaces = new Set<string>();
  setStatus(status: boolean) {
    if (status === this.enabled) return;

    if (!this._player.hasAccess(FLY_ACTION)) return;

    // swap interafces
    if (!this.enabled) {
      this._beforeInterfaces = new Set(this._engine.ui.interfaces);
      this._engine.ui.removeAllInterfaces();
    } else {
      this._beforeInterfaces.forEach(tag => this._engine.ui.addInterface(tag));
    }

    const toggleStatus = !status;

    this._player.setMovements(toggleStatus);
    this._player.setVisible(toggleStatus);
    this._player.setTranslations(toggleStatus, toggleStatus, toggleStatus);
    this._player.setLinearVelocity([0, 0, 0]);

    _LOCATION.position.copy(this._player.position);
    _LOCATION.quaternion.copy(this._player.location.quaternion);

    this.controller.enabled = status;

    this.autoMove = false;

    this._player.camera.setMode('player');
  }

  setMode(mode: FlyModeMode) {
    this.controller.mode = mode;

    this._player.camera.setMode(mode);
  }

  updateFrame(delta: number) {
    _LOCATION.quaternion.copy(this._camera.quaternion);

    const speed = this.resolvedSpeed;

    // calculate X/Y
    if (this.autoMove || this._player.isMovingControl) {
      let directionOffset = calcDirectionOffset(this._player.controls)!;

      if (!this.autoMove && directionOffset === null) {
        return;
      }

      if (this.autoMove) {
        directionOffset = 0;
      }

      // get normalized direction
      this._camera.camera.getWorldDirection(_DIR1);
      _LOCATION.getWorldDirection(_DIR2);

      const angleYCameraDirection = Math.atan2(
        _DIR2.x - _DIR1.x,
        _DIR2.z - _DIR1.z,
      );

      const finalRotation =
        angleYCameraDirection + directionOffset + MODEL_ROTATION;

      _LOCATION.quaternion.setFromAxisAngle(_ROTATE_Y, finalRotation);

      _LOCATION.translateZ(speed * delta);
    }

    // set up/down
    if (this._player.controls.jump || this._player.controls.sprint) {
      _LOCATION.position.y +=
        speed * delta * (this._player.controls.jump ? 1 : -1);
    }

    // ignore if same position
    if (_LAST_POS.equals(_LOCATION.position)) return;

    // set
    this._player.setPosition(_LOCATION.position);
  }
}

export default FlyModeManager;
