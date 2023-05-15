import {useObjects} from '@verza/sdk/react';
import {useControls} from 'leva';

const EditorPanelSettings = () => {
  const objects = useObjects();

  useControls(
    'Settings',
    () => ({
      axis: {
        label: 'Show Axis',
        value: false,

        onChange: value => {
          objects.setEditAxes({
            showX: true,
            showY: true,
            showZ: true,

            showRX: value,
            showRY: true,
            showRZ: value,

            showSX: value,
            showSY: value,
            showSZ: value,
          });
        },
      },
    }),
    {
      order: 0,
    },
  );

  return null;
};

export default EditorPanelSettings;
