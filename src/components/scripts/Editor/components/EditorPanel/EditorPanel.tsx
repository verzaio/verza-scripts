//import styles from './EditorPanel.module.scss';

import PanelWidget from '@app/components/core/PanelWidget';
import {useControls} from 'leva';
import {useCallback, useEffect, useRef} from 'react';
import {useEvent, useObjects, useUI} from '@verza/sdk/react';

import {Euler, MathUtils, ObjectManager, Vector3} from '@verza/sdk';

const EditorPanel = () => {
  const objects = useObjects();
  const ui = useUI();

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
        if (!isEditingRef.current || !objects.editingObject) return;

        objects.editingObject.setPositionFromWorldSpace([
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
        if (!isEditingRef.current || !objects.editingObject) return;

        objects.editingObject.setRotationFromWorldSpace([
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
        if (!isEditingRef.current || !objects.editingObject) return;

        objects.editingObject.setScale([value.x, value.y, value.z]);
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
  }));

  // show/hide ui
  useEffect(() => {
    ui.setSize({
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
    });
    ui.show();

    return () => {
      return ui.hide();
    };
  }, [ui]);

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
    if (!objects.editingObject) return;

    updatePanel(objects.editingObject);
  }, [updatePanel, objects]);

  // keep panel updated
  useEvent('onObjectEdit', object => {
    updatePanel(object);
  });

  return (
    <>
      <div className="fade-in" onPointerDown={e => e.stopPropagation()}>
        <PanelWidget
          title={`${
            objects.editingObject?.objectType
          } (${objects.editingObject?.id.substring(0, 10)})`}
          position={{
            x: 0,
            y: 400,
          }}
        />
      </div>
    </>
  );
};

export default EditorPanel;
