import PanelWidget from '@app/components/core/PanelWidget';
import {button, useControls} from 'leva';
import {useCallback, useEffect, useRef} from 'react';
import {useEngine, useEvent, useObjects} from '@verza/sdk/react';

import {ObjectManager, Euler, Vector3} from '@verza/sdk';

import {MathUtils} from '@verza/sdk/utils';
import {useEditor} from '../EditorProvider';

const EditorPanel = () => {
  const objects = useObjects();
  const engine = useEngine();
  const editor = useEditor();

  const isEditingRef = useRef(false);

  const onEditStart = () => (isEditingRef.current = true);
  const onEditEnd = () => (isEditingRef.current = false);

  const [, set] = useControls(() => ({
    position: {
      label: 'Position',
      step: 0.01,
      value: {
        x: 0,
        y: 0,
        z: 0,
      },

      onEditStart,
      onEditEnd,
      onChange: (value: Vector3) => {
        if (!isEditingRef.current || !editor.activeObject) return;

        editor.activeObject.setPositionFromWorldSpace([
          value.x,
          value.y,
          value.z,
        ]);
      },
    },

    rotation: {
      label: 'Rotation',
      step: 1,
      min: -360,
      max: 360,
      value: {
        x: 0,
        y: 0,
        z: 0,
      },

      onEditStart,
      onEditEnd,
      onChange: (value: Euler) => {
        if (!isEditingRef.current || !editor.activeObject) return;

        editor.activeObject.setRotationFromWorldSpace([
          MathUtils.degToRad(value.x),
          MathUtils.degToRad(value.y),
          MathUtils.degToRad(value.z),
        ]);
      },
    },

    scale: {
      label: 'Scale',
      step: 0.01,
      min: 0.01,
      max: 150,
      value: {
        x: 1,
        y: 1,
        z: 1,
      },

      onEditStart,
      onEditEnd,
      onChange: (value: Vector3) => {
        if (!isEditingRef.current || !editor.activeObject) return;

        editor.activeObject.setScale([value.x, value.y, value.z]);
      },
    },

    axis: {
      label: 'Show All Axis',
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
    'Toggle Collision': button(() => {
      if (!editor.activeObject) return;

      const newStatus = editor.activeObject.collision ? null : 'static';

      editor.activeObject.setCollision(newStatus);

      if (editor.activeObject.permanent) {
        editor.activeObject.save();
      }

      if (newStatus) {
        engine.localPlayer.sendSuccessNotification('Collision Enabled');
      } else {
        engine.localPlayer.sendErrorNotification('Collision Disabled');
      }
    }),
  }));

  const updatePanel = useCallback(
    async (object: ObjectManager) => {
      if (isEditingRef.current) return;

      const location = await object.worldLocation;

      set({
        position: {
          x: location.position.x,
          y: location.position.y,
          z: location.position.z,
        },
      });

      set({
        rotation: {
          x: MathUtils.radToDeg(location.rotation.x),
          y: MathUtils.radToDeg(location.rotation.y),
          z: MathUtils.radToDeg(location.rotation.z),
        },
      });

      set({
        scale: {
          x: location.scale.x,
          y: location.scale.y,
          z: location.scale.z,
        },
      });
    },
    [set],
  );

  // initial update
  useEffect(() => {
    if (!editor.activeObject) return;

    updatePanel(editor.activeObject);
  }, [updatePanel, editor]);

  // keep panel updated
  useEvent('onObjectEdit', object => {
    updatePanel(object);
  });

  return (
    <>
      <div
        className="fade-in"
        onPointerDown={e => e.stopPropagation()}
        onPointerUp={e => e.stopPropagation()}>
        <PanelWidget
          drag={false}
          title={`${
            editor.activeObject?.objectType
          } (${editor.activeObject?.id.substring(0, 10)})`}
          position={{
            x: 0,
            y: 10,
          }}
        />
      </div>
    </>
  );
};

export default EditorPanel;
