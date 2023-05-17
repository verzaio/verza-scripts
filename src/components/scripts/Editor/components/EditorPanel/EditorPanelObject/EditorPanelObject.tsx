import {useCallback, useEffect, useRef} from 'react';

import {useEditor} from '../../../EditorProvider';
import {OBJECTS_INFO, OBJECTS_MATERIAL_PROPS} from '../../../misc/constants';
import {doesObjectSupportMaterial} from '../../../misc/utils';

import {ObjectManager, Euler, Vector3} from '@verza/sdk';
import {useEvent} from '@verza/sdk/react';
import {MathUtils} from '@verza/sdk/utils';
import {buttonGroup, useControls} from 'leva';

const EditorPanelObject = () => {
  const editor = useEditor();

  const isFirstRender = useRef(true);

  const isEditingRef = useRef(false);

  const onEditStart = () => (isEditingRef.current = true);
  const onEditEnd = () => {
    if (isFirstRender.current) return;

    isEditingRef.current = false;

    updatePanel(editor.activeObject);
  };

  const on = (handler: (value: any) => void) => (value: unknown) => {
    if (!editor.activeObject || isFirstRender.current) return;

    handler(value);
  };

  const [, setObject] = useControls(
    'Object',
    () => ({
      id: {
        label: 'Id',
        value: '-',
        editable: false,
      },

      type: {
        label: 'Type',
        value: '-',
        editable: false,
      },
    }),
    {
      order: 25,

      collapsed: true,
    },
  );

  const [, setTransforms] = useControls(
    'Transforms',
    () => ({
      collision: {
        label: 'Collision',
        value: true,

        onChange: on((value: boolean) => {
          editor.activeObject.setCollision(value ? 'static' : null);

          editor.save();
        }),

        render: () => !!editor.activeObject?.hasCollision,
      },

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

      scale_buttons: buttonGroup({
        label: ' ',
        opts: {
          '0.1': () => {
            editor.activeObject.setScale([0.1, 0.1, 0.1]);
          },
          '0.25': () => {
            editor.activeObject.setScale([0.25, 0.25, 0.25]);
          },
          '0.5': () => {
            editor.activeObject.setScale([0.5, 0.5, 0.5]);
          },
          '0.75': () => {
            editor.activeObject.setScale([0.75, 0.75, 0.75]);
          },
          reset: () => {
            editor.activeObject.setScale([1, 1, 1]);
          },
        },
      }),
    }),
    {
      order: 100,
    },
  );

  const [, setMaterial] = useControls(
    'Material',
    () => {
      const fields: any = {};
      Object.entries(OBJECTS_MATERIAL_PROPS).forEach(([name, props]) => {
        const isSlider =
          props.step !== undefined ||
          props.min !== undefined ||
          props.max !== undefined;

        fields[`mat_${name}`] = {
          ...props,

          ...(isSlider && {
            onEditStart: onEditStart,
            onEditEnd: onEditEnd,
          }),

          render: (get: (name: string) => any) => {
            if (!props.types) return true;

            const object = editor.activeObject as ObjectManager<'box'>;

            const materialType =
              get('Material.mat_type') ??
              object?.props?.material?.type ??
              'standard';

            return props.types.includes(materialType);
          },

          onChange: on((value: any) => {
            if (isSlider && !isEditingRef.current) return;

            editor.activeObject?.setProps({
              material: {
                [name]: value,
              },
            });

            editor.save();
          }),
        };
      });

      return fields;
    },
    {
      order: 150,

      collapsed: true,

      render: () => {
        return doesObjectSupportMaterial(editor.activeObject?.objectType);
      },
    },
  );

  const [, setProps] = useControls(
    'Properties',
    () => {
      const fields: any = {};
      Object.entries(OBJECTS_INFO).forEach(([objectType, entry]) => {
        if (!entry.props) return;

        Object.entries(entry.props).forEach(([name, props]) => {
          const isSlider =
            props.step !== undefined ||
            props.min !== undefined ||
            props.max !== undefined;

          fields[`${objectType}_${name}`] = {
            ...props,

            ...(isSlider && {
              onEditStart: onEditStart,
              onEditEnd: onEditEnd,
            }),

            render: () => editor.activeObject?.objectType === objectType,

            onChange: on((value: any) => {
              if (isSlider && !isEditingRef.current) return;

              editor.activeObject?.setProps({
                [name]: value,
              });

              editor.save();
            }),
          };
        });
      });

      return fields;
    },
    {
      order: 225,

      collapsed: false,
    },
  );

  const updatePanel = useCallback(
    async (object: ObjectManager) => {
      if (isEditingRef.current) return;

      const location = await object.worldLocation;

      setObject({
        id: object.id,

        type: object.objectType,
      });

      setTransforms({
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

        ...(object.hasCollision && {
          collision: !!object.collision,
        }),
      });

      if (doesObjectSupportMaterial(object.objectType)) {
        const materialProps = OBJECTS_MATERIAL_PROPS;

        const props =
          (object.props as ObjectManager<'box'>['props']).material ?? {};

        Object.entries(materialProps).forEach(([name, value]) => {
          let currentValue = (props as any)[name];

          if (currentValue === undefined) {
            currentValue = value.value;
          }

          if (currentValue !== undefined) {
            setMaterial({
              [`mat_${name}`]: currentValue,
            });
          }
        });
      }

      const objectProperties = OBJECTS_INFO[object.objectType]?.props;

      if (objectProperties) {
        Object.entries(objectProperties).forEach(([name, value]) => {
          let currentValue = (object.props as any)[name];

          if (currentValue === undefined) {
            currentValue = value.value;
          }

          if (currentValue !== undefined) {
            setProps({
              [`${object.objectType}_${name}`]: currentValue,
            });
          }
        });
      }
    },
    [setTransforms, setMaterial, setObject, setProps],
  );

  // initial update
  useEffect(() => {
    if (!editor.activeObject || !isFirstRender.current) return;

    updatePanel(editor.activeObject);

    setTimeout(() => {
      isFirstRender.current = false;
    }, 50);
  }, [updatePanel, editor, editor.activeObject]);

  // keep panel updated
  useEvent('onObjectEdit', (object, type) => {
    if (isEditingRef.current) return;
    if (type === 'unselect') return;

    if (type === 'select') {
      isFirstRender.current = true;
    }

    updatePanel(object);

    if (type === 'select') {
      setTimeout(() => {
        isFirstRender.current = false;
      }, 50);
    }
  });

  return null;
};

export default EditorPanelObject;
