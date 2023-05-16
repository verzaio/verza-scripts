import {useRef} from 'react';

import {useEditor} from '../../EditorProvider';

import {useObjects, useWorld} from '@verza/sdk/react';
import {useControls} from 'leva';

const EditorPanelSettings = () => {
  const objects = useObjects();
  const world = useWorld();

  const editor = useEditor();

  const originalTime = useRef(14 * 4600);

  const isFirstRender = useRef(true);

  useControls(
    'Settings',
    () => ({
      axis: {
        label: 'Show All Axes',
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
      snap: {
        label: 'Snaps',
        step: 0.01,
        min: 0,
        max: 2,
        value: 0,

        onChange: value => {
          if (!value) {
            objects.setEditSnaps(null, null, null);
            return;
          }

          objects.setEditSnaps(value, value, value);
        },
      },
      time: {
        label: 'Time',
        value: originalTime.current / 60,
        min: 0,
        max: 60 * 24,
        step: 1,

        onEditStart: () => {
          isFirstRender.current = false;
        },
        onChange: (time: number) => {
          if (isFirstRender.current) return;

          world.setTimeMode('fixed');
          world.setTime(time * 60);
        },
      },
    }),
    {
      order: 500,
      collapsed: editor.settingsCollapsed,
    },
  );

  return null;
};

export default EditorPanelSettings;
