import {useCallback, useEffect, useRef} from 'react';

import {useEditor} from '../../EditorProvider';
import {doesObjectSupportMaterial} from '../../misc/utils';

import {ObjectManager, Euler, Vector3, ColorType} from '@verza/sdk';
import {useEvent} from '@verza/sdk/react';
import {MathUtils} from '@verza/sdk/utils';
import {useControls} from 'leva';

const EditorPanelObject = () => {
  const editor = useEditor();

  const isFirstRender = useRef(true);

  const isEditingRef = useRef(false);

  const onEditStart = () => (isEditingRef.current = true);
  const onEditEnd = () => (isEditingRef.current = false);

  const on = (handler: (value: any) => void) => (value: unknown) => {
    if (!editor.activeObject || isFirstRender.current) return;

    handler(value);
  };

  const [, setObject] = useControls(
    'Object',
    () => ({
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
        onChange: on((value: Vector3) => {
          if (!isEditingRef.current) return;

          editor.activeObject.setPositionFromWorldSpace([
            value.x,
            value.y,
            value.z,
          ]);
        }),
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
        onChange: on((value: Euler) => {
          if (!isEditingRef.current) return;

          editor.activeObject.setRotationFromWorldSpace([
            MathUtils.degToRad(value.x),
            MathUtils.degToRad(value.y),
            MathUtils.degToRad(value.z),
          ]);
        }),
      },

      scale: {
        label: 'Scale',
        step: 0.01,
        min: 0.001,
        max: 300,
        value: {
          x: 1,
          y: 1,
          z: 1,
        },

        onEditStart,
        onEditEnd,
        onChange: on((value: Vector3) => {
          if (!isEditingRef.current) return;

          editor.activeObject.setScale([value.x, value.y, value.z]);
        }),
      },

      /* collision: {
        label: 'Collision',
        options: ['none', 'static'],

        onChange: on((value: EntityCollisionType) => {
          if ((value as string) === 'none') {
            editor.activeObject.setCollision(null);
            return;
          }

          editor.activeObject.setCollision(value);
        }),
      }, */
    }),
    {
      order: 100,
    },
  );

  const isMaterial = doesObjectSupportMaterial(editor.activeObject?.objectType);

  const [, setMaterial] = useControls(
    'Material',
    () => ({
      ...(isMaterial && {
        wireframe: {
          label: 'Wireframe',
          value: false,

          onChange: on((value: boolean) => {
            editor.activeObject.setProps({
              material: {
                wireframe: value,
              },
            });
          }),
        },

        color: {
          label: 'Color',
          value: '#ffffff',

          onChange: on((value: ColorType) => {
            editor.activeObject.setProps({
              color: value,
            });
          }),
        },

        roughness: {
          label: 'Roughness',
          step: 0.01,
          min: 0,
          max: 1,
          value: 1,

          onEditStart,
          onEditEnd,

          onChange: on((value: number) => {
            if (!isEditingRef.current) return;

            editor.activeObject.setProps({
              material: {
                roughness: value,
              },
            });
          }),
        },

        metalness: {
          label: 'Metalness',
          step: 0.01,
          min: 0,
          max: 1,
          value: 0,

          onEditStart,
          onEditEnd,

          onChange: on((value: number) => {
            if (!isEditingRef.current) return;

            editor.activeObject.setProps({
              material: {
                metalness: value,
              },
            });
          }),
        },

        emissive: {
          label: 'Emissive Color',
          value: '#000000',

          onChange: on((value: number) => {
            editor.activeObject.setProps({
              material: {
                emissive: value,
              },
            });
          }),
        },

        emissiveIntensity: {
          label: 'Emissive Intensity',
          step: 0.01,
          min: 0,
          max: 1,
          value: 1,

          onEditStart,
          onEditEnd,

          onChange: on((value: number) => {
            if (!isEditingRef.current) return;

            editor.activeObject.setProps({
              material: {
                emissiveIntensity: value,
              },
            });
          }),
        },

        opacity: {
          label: 'Opacity',
          step: 0.01,
          min: 0,
          max: 1,
          value: 1,

          onEditStart,
          onEditEnd,

          onChange: on((value: number) => {
            if (!isEditingRef.current) return;

            editor.activeObject.setProps({
              material: {
                opacity: value,
              },
            });
          }),
        },

        transparent: {
          label: 'Transparent',
          value: false,

          onChange: on((value: boolean) => {
            editor.activeObject.setProps({
              material: {
                transparent: value,
              },
            });
          }),
        },
      }),
    }),
    {
      order: 100,
    },
  );

  const updatePanel = useCallback(
    async (object: ObjectManager) => {
      if (isEditingRef.current) return;

      const location = await object.worldLocation;

      setObject({
        position: {
          x: location.position.x,
          y: location.position.y,
          z: location.position.z,
        },

        rotation: {
          x: MathUtils.radToDeg(location.rotation.x),
          y: MathUtils.radToDeg(location.rotation.y),
          z: MathUtils.radToDeg(location.rotation.z),
        },

        scale: {
          x: location.scale.x,
          y: location.scale.y,
          z: location.scale.z,
        },

        //collision: object.collision ?? 'none',
      });

      if (isMaterial) {
        const props = object.props as ObjectManager<'box'>['props'];

        setMaterial({
          color: props.color ?? '#ffffff',

          roughness: props.material?.roughness ?? 1,

          metalness: props.material?.metalness ?? 0,

          emissive: props.material?.emissive ?? '#000000',

          emissiveIntensity: props.material?.emissiveIntensity ?? 1,

          opacity: props.material?.opacity ?? 1,

          transparent: props.material?.transparent ?? false,

          wireframe: props.material?.wireframe ?? false,

          //side: props.material?.side ?? 'front',
        });
      }
    },
    [setObject, setMaterial, isMaterial],
  );

  // initial update
  useEffect(() => {
    if (!editor.activeObject || !isFirstRender.current) return;

    updatePanel(editor.activeObject);

    setTimeout(() => {
      isFirstRender.current = false;
    }, 100);
  }, [updatePanel, editor]);

  // keep panel updated
  useEvent('onObjectEdit', object => {
    updatePanel(object);
  });

  return null;
};

export default EditorPanelObject;
