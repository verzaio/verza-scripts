import Provider from '@app/components/core/Provider';
import {PlayerControls, Object3D, Vector3} from '@verza/sdk';
import {
  useStreamedLocalPlayer,
  useCamera,
  useCommand,
  useFrame,
  useKey,
  useToolbar,
  useEvent,
  useMainToolbarItem,
} from '@verza/sdk/react';
import {useRef, useState} from 'react';

const TOOLBAR_ID = 'flymode_toolbar';

const TOOLBAR_CANCEL_ID = 'fly_mode_cancel';

const _LOCATION = new Object3D();

const _LAST_POS = new Vector3();

const _ROTATE_Y = new Vector3(0, 1, 0);

const _DIR1 = new Vector3();
const _DIR2 = new Vector3();

const MODEL_ROTATION = Math.PI; // 180 degrees

const FlyMode = () => {
  return (
    <Provider
      params={{
        syncCameraPosition: true,
      }}>
      <FlyModeBase />
    </Provider>
  );
};

const FlyModeBase = () => {
  const player = useStreamedLocalPlayer();
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const toggle = (setStatus?: boolean) => {
    const newStatus = setStatus ?? !enabled;
    if (newStatus === enabled) return;

    if (!player.hasAccess('fly')) return;

    setEnabled(newStatus);

    const toggleStatus = !newStatus;

    player.setMovements(toggleStatus);
    player.setVisible(toggleStatus);
    player.setTranslations(toggleStatus, toggleStatus, toggleStatus);
    player.setLinearVelocity([0, 0, 0]);

    _LOCATION.position.copy(player.position);
    _LOCATION.quaternion.copy(player.rotation);
  };

  // hooks
  useCommand('fly').on(() => toggle());

  useKey('Tab', () => toggle());
  useKey('Tab', () => toggle(false), {
    ignoreFlags: true,
  });

  useMainToolbarItem({
    id: 'fly-mode',
    name: 'Fly Mode',
    key: 'Tab',
  });

  if (!enabled) return null;

  return <FlyModeRender toggle={toggle} />;
};

type FlyModeRenderProps = {
  toggle: () => void;
};

const FlyModeRender = ({toggle}: FlyModeRenderProps) => {
  const player = useStreamedLocalPlayer();
  const camera = useCamera();

  useEvent('onToolbarItemPress', id => {
    if (id === TOOLBAR_CANCEL_ID) {
      toggle();
    }
  });

  useToolbar({
    id: TOOLBAR_ID,
    position: 'right',
    items: [
      {
        name: 'Movement',
        key: ['W', 'A', 'S', 'D'],
      },
      {
        name: 'Up / Down',
        key: ['Space', 'Shift'],
      },
      {
        name: 'Normal Speed',
        key: 'Cap Lock',
      },
      {
        name: 'Speed of Light',
        key: 'Control',
      },
      {
        id: TOOLBAR_CANCEL_ID,
        name: 'Exit Fly Mode',
        key: 'Tab',
      },
    ],
  });

  useFrame(delta => {
    if (!player) return;

    _LOCATION.quaternion.copy(camera.quaternion);

    const velocity = player.controls.control
      ? 40
      : !player.controls.caps
      ? 3
      : 10;

    // calculate X/Y
    if (player.isMovingControl) {
      const directionOffset = calcDirectionOffset(player.controls);

      if (directionOffset === null) return;

      // get normalized direction
      camera.camera.getWorldDirection(_DIR1);
      _LOCATION.getWorldDirection(_DIR2);

      const angleYCameraDirection = Math.atan2(
        _DIR2.x - _DIR1.x,
        _DIR2.z - _DIR1.z,
      );

      const finalRotation =
        angleYCameraDirection + directionOffset + MODEL_ROTATION;

      _LOCATION.quaternion.setFromAxisAngle(_ROTATE_Y, finalRotation);

      _LOCATION.translateZ(velocity * delta);
    }

    // set up/down
    if (player.controls.jump || player.controls.sprint) {
      _LOCATION.translateY(velocity * delta * (player.controls.jump ? 1 : -1));
    }

    // ignore if same position
    if (_LAST_POS.equals(_LOCATION.position)) return;

    // set
    player.setPosition(_LOCATION.position);
  });

  return null;
};

// Thanks to https://github.com/tamani-coding/threejs-character-controls-example/blob/main/src/characterControls.ts
export const calcDirectionOffset = (controls: PlayerControls) => {
  let directionOffset = null; // w

  if (controls.forward) {
    if (controls.left) {
      directionOffset = Math.PI / 4; // w+a
    } else if (controls.right) {
      directionOffset = -Math.PI / 4; // w+d
    } else {
      directionOffset = 0;
    }
  } else if (controls.backward) {
    if (controls.left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
    } else if (controls.right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
    } else {
      directionOffset = Math.PI; // s
    }
  } else if (controls.left) {
    directionOffset = Math.PI / 2; // a
  } else if (controls.right) {
    directionOffset = -Math.PI / 2; // d
  }

  return directionOffset;
};

export default FlyMode;
