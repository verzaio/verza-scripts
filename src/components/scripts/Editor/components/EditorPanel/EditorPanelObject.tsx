import {useCallback, useEffect, useRef} from 'react';

import {useEditor} from '../../EditorProvider';
import {getObjectMaterialType} from '../../managers/editor-manager';
import {OBJECTS_INFO, OBJECTS_MATERIAL_PROPS} from '../../misc/constants';
import {ObjectMaterialOption} from '../../misc/types';
import {
  doesObjectSupportMaterial,
  isSliderControl,
  parseControls,
  setControlsValue,
} from '../../misc/utils';

import {ObjectManager, Euler, Vector3} from '@verza/sdk';
import {useEvent} from '@verza/sdk/react';
import {MathUtils} from '@verza/sdk/utils';
import {buttonGroup, levaStore, useControls} from 'leva';

const EditorPanelObject = () => {
  const editor = useEditor();

  const isFirstRender = useRef(true);

  const isEditingRef = useRef(false);

  const onEditStart = () => (isEditingRef.current = true);
  const onEditEnd = () => {
    if (isFirstRender.current) return;

    isEditingRef.current = false;

    updateControls(editor.activeObject);
  };

  const on =
    (handler: (...args: any[]) => void) =>
    (...args: any[]) => {
      if (!editor.activeObject || isFirstRender.current) return;

      handler(...args);
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

          editor.saveObject();
        }),

        render: () => !!editor.activeObject?.supportsCollision,
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

  useControls(
    'Material',
    () => {
      const fields: any = {};

      const canRender = (
        props: ObjectMaterialOption,
        get: (name: string) => any,
      ) => {
        if (!props.types) return true;

        const materialType = getObjectMaterialType(
          editor.activeObject,
          get('Material.mat_type'),
        );

        return props.types.includes(materialType);
      };

      parseControls(
        'mat',
        OBJECTS_MATERIAL_PROPS,
        {
          onEditStart: onEditStart,
          onEditEnd: onEditEnd,

          folderRender: canRender,
          itemRender: canRender,

          onChange: on(
            async (props: ObjectMaterialOption, name: string, value: any) => {
              if (isSliderControl(props) && !isEditingRef.current) return;

              let newValue = value;

              if (props.isAsset) {
                if (!value) {
                  newValue = null;
                } else if (value instanceof File) {
                  const assetId = await editor.uploadTexture(value);

                  if (!assetId) return;

                  newValue = assetId;
                }
              }

              const parts = name.split('_');

              console.log('new value', newValue);

              switch (parts.length) {
                case 1: {
                  editor.activeObject?.setProps({
                    material: {
                      [name]: newValue,
                    },
                  });
                  break;
                }
                case 2: {
                  editor.activeObject?.setProps({
                    material: {
                      [parts[0]]: {
                        [parts[1]]: newValue,
                      },
                    },
                  });
                  break;
                }
              }

              editor.saveObject();
            },
          ),
        },
        fields,
      );

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

        parseControls(
          objectType,
          entry.props,
          {
            onEditStart: onEditStart,
            onEditEnd: onEditEnd,

            itemRender: () => editor.activeObject?.objectType === objectType,

            onChange: on(
              (props: ObjectMaterialOption, name: string, value: any) => {
                if (isSliderControl(props) && !isEditingRef.current) return;

                editor.activeObject?.setProps({
                  [name]: value,
                });

                editor.saveObject();
              },
            ),
          },
          fields,
        );
      });

      return fields;
    },
    {
      order: 225,

      collapsed: false,
    },
  );

  const updateControls = useCallback(
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

        ...(object.supportsCollision && {
          collision: !!object.collision,
        }),
      });

      // materials
      if (doesObjectSupportMaterial(object.objectType)) {
        const materialProps = OBJECTS_MATERIAL_PROPS;

        const props =
          (object.props as ObjectManager<'box'>['props']).material ?? {};

        setControlsValue(
          materialProps,
          props,
          levaStore.set,
          ['Material'],
          'mat',
        );
      }

      // props
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
    [setTransforms, setObject, setProps],
  );

  // initial update
  useEffect(() => {
    if (!editor.activeObject || !isFirstRender.current) return;

    updateControls(editor.activeObject);

    setTimeout(() => {
      isFirstRender.current = false;
    }, 50);
  }, [updateControls, editor, editor.activeObject]);

  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isUpdatePending = useRef(false);

  // keep controls in sync
  useEvent('onObjectEdit', (object, type) => {
    if (isEditingRef.current) return;
    if (type === 'unselect') return;

    if (timeoutIdRef.current) {
      isUpdatePending.current = true;

      return;
    }

    isFirstRender.current = true;

    updateControls(object);

    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = null;
      isFirstRender.current = false;

      if (isUpdatePending.current) {
        isUpdatePending.current = false;
        updateControls(object);
      }
    }, 100);
  });

  return null;
};

export default EditorPanelObject;
