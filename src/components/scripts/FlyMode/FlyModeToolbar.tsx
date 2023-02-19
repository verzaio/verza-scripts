import {useToolbar} from '@verza/sdk/react';

const TOOLBAR_ID = 'flymode_toolbar';

const TOOLBAR_CANCEL_ID = 'cancel';

const FlyModeToolbar = () => {
  useToolbar({
    id: TOOLBAR_ID,
    position: 'bottom',
    items: [
      {
        id: TOOLBAR_CANCEL_ID,
        name: 'Disable Fly Mode',
        key: 'TAB',
      },
    ],
  });
};

export default FlyModeToolbar;
