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
      axes: {
        label: 'Show Scale Axes',
        value: false,

        onChange: (value, _, context) => {
          if (context.initial) return;

          objects.setEditAxes({
            showX: true,
            showY: true,
            showZ: true,

            showRX: true,
            showRY: true,
            showRZ: true,

            showSX: value,
            showSY: value,
            showSZ: value,
          });
        },
      },
      optimize: {
        label: 'Optimize Assets on Upload',
        value: true,

        onChange: (value, _, context) => {
          if (context.initial) return;

          editor.optimizeAssets = value;
        },
      },

      /* snap: {
        label: 'Snaps',
        step: 0.01,
        min: 0,
        max: 2,
        value: 0,

        onEditStart: () => {
          isFirstRender.current = false;
        },

        onChange: value => {
          if (isFirstRender.current) return;

          if (!value) {
            objects.setEditSnaps(null, null, null);
            return;
          }

          objects.setEditSnaps(value, value, value);
        },
      }, */
      time: {
        label: 'Time',
        value: originalTime.current / 60,
        min: 0,
        max: 60 * 24,
        step: 1,

        onEditStart: () => {
          isFirstRender.current = false;
        },

        onChange: (time, _, context) => {
          if (context.initial) return;
          if (isFirstRender.current) return;

          world.setTimeMode('fixed');
          world.setTime(time * 60);
        },
      },

      viewport: {
        label: 'Viewport Render',
        value: 'render',

        options: {
          Render: 'render',
          Solid: 'solid',
          Normal: 'normal',
          Wireframe: 'wireframe',
          'Wireframe Normal': 'wireframe-normal',
        },

        onChange: (type, _, context) => {
          if (context.initial) return;

          world.setViewportRender(type);
        },
      },
    }),
    {
      order: 0,
      collapsed: true,
    },
  );

  return null;
};

export default EditorPanelSettings;
