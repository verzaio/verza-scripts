import {useMemo} from 'react';

import FlyModeManager from './managers/fly-mode.manager';
import {FLY_ACTION} from './utils/constants';

import Provider from '@app/components/core/Provider';
import {CommandParam} from '@verza/sdk';
import {
  useCommand,
  useFrame,
  useKey,
  useToolbar,
  useEvent,
  useMainToolbarItem,
  useEngine,
  useControllerProp,
} from '@verza/sdk/react';

const TOOLBAR_ID = 'flymode_toolbar';

const TOOLBAR_CANCEL_ID = 'flymode_cancel';

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
  const engine = useEngine();

  const flyMode = useMemo(
    () => new FlyModeManager(engine),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [FlyModeManager.constructor],
  );

  const enabled = useControllerProp(flyMode.controller, 'enabled');

  useCommand(FLY_ACTION).on(() => flyMode.toggle());

  useCommand('flyspeed', [new CommandParam('speed', 'float')]).on(
    (player, {speed}) => {
      if (speed < 0 || speed > 100) {
        player.sendMessage('{red}Speed must be between 0 and 100');
        return;
      }

      flyMode.customSpeed = speed;

      player.sendMessage(`{green}Fly speed set to ${speed}`);
    },
  );

  useKey('KeyQ', () => flyMode.toggle());

  return (
    <>
      {engine.localPlayer.hasAccess(FLY_ACTION) && <MainToolbarItem />}

      {enabled && <FlyModeRender flyMode={flyMode} />}
    </>
  );
};

const MainToolbarItem = () => {
  useMainToolbarItem({
    id: 'flymode',
    name: 'Fly Mode',
    key: 'Q',
  });

  return null;
};

type FlyModeRenderProps = {
  flyMode: FlyModeManager;
};

const FlyModeRender = ({flyMode}: FlyModeRenderProps) => {
  const engine = useEngine();

  const speed = useControllerProp(flyMode.controller, 'speed');
  const customSpeed = useControllerProp(flyMode.controller, 'customSpeed');

  useToolbar({
    id: TOOLBAR_ID,
    position: 'right',
    items: [
      {
        id: 'flymode_movement',
        name: 'Movement',
        key: ['W', 'A', 'S', 'D'],
      },
      {
        id: 'flymode_up_down',
        name: 'Up / Down',
        key: ['Space', 'Shift'],
      },
      {
        id: 'flymode_speed',
        name: `Speed (${customSpeed ? `${customSpeed}` : speed + 1}x)`,
        key: 'Caps Lock',
      },
      {
        id: 'flymode_auto_move',
        name: 'Auto Move',
        key: '2',
      },
      {
        id: TOOLBAR_CANCEL_ID,
        name: 'Exit Fly Mode',
        key: 'Q',
      },
    ],
  });

  useEvent('onToolbarItemPress', id => {
    if (id === TOOLBAR_CANCEL_ID) {
      flyMode.toggle();
    }
  });

  useFrame(delta => flyMode.updateFrame(delta));

  // CapsLock only fires on keydown or keyup once per keystroke
  useKey('CapsLock', () => flyMode.speed++, {
    event: 'keyup',
  });
  useKey('CapsLock', () => flyMode.speed++, {
    event: 'keydown',
  });

  /* useKey('Digit1', () => {
    flyMode.setMode('world');

    if (flyMode.mode === 'player') {
      engine.localPlayer.sendMessage('{yellow}Camera mode: player');
    } else {
      engine.localPlayer.sendMessage('{yellow}Camera mode: world');
    }
  }); */

  useKey('Digit2', () => {
    if (flyMode.autoMove) {
      engine.localPlayer.sendMessage('{red}Auto move disabled');
    } else {
      engine.localPlayer.sendMessage('{green}Auto move enabled');
    }

    flyMode.autoMove = !flyMode.autoMove;
  });

  return null;
};

export default FlyMode;
