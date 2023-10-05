import {useCallback, useMemo, useRef} from 'react';

import {
  ObjectManager,
  Euler,
  Vector3,
  Quaternion,
  QuaternionArray,
} from '@verza/sdk';
import {PickObjectProps} from '@verza/sdk';
import {useEvent} from '@verza/sdk/react';
import {MathUtils} from '@verza/sdk/utils';
import deepEqual from 'deep-equal';
import {useControls, buttonGroup, levaStore} from 'leva';

import {useEditor} from '../../EditorProvider';
import {getObjectMaterialType} from '../../managers/editor.manager';
import {OBJECTS_INFO, OBJECTS_MATERIAL_PROPS} from '../../misc/constants';
import {ObjectMaterialOption} from '../../misc/types';
import {
  doesObjectSupportMaterial,
  isSliderControl,
  parseControls,
  setControlValues,
} from '../../misc/utils';

const EditorPanelObject = () => {
  const editor = useEditor();

  const isFirstRender = useRef(true);

  const isEditingRef = useRef(false);

  const fieldValues = useRef<{[name: string]: any}>({});

  const updateControls = useCallback(
    (object: ObjectManager, forceUpdate?: boolean) => {
      if (!editor.activeObject || isEditingRef.current) return;

      const location = object.worldLocation;

      const objectUpdate = {
        'Object.id': object.id,
        'Object.type': object.objectType,

        ...(object.supportsCollision && {
          'Object.collision': !!object.collision,
        }),

        ...(object.supportsShadows && {
          'Object.shadows': object.shadows,
        }),

        ...(object.supportsBloom && {
          'Object.bloom': object.bloom,
        }),
      };

      const values: any = {
        ...objectUpdate,

        'Transform.position': {
          x: location.position.x,
          y: location.position.y,
          z: location.position.z,
        },

        'Transform.rotation': {
          x: MathUtils.radToDeg(location.rotation.x),
          y: MathUtils.radToDeg(location.rotation.y),
          z: MathUtils.radToDeg(location.rotation.z),
        },

        'Transform.scale': {
          x: location.scale.x,
          y: location.scale.y,
          z: location.scale.z,
        },
      };

      // materials
      if (doesObjectSupportMaterial(object.objectType)) {
        const materialProps = OBJECTS_MATERIAL_PROPS;

        const props =
          (object.props as ObjectManager<'box'>['props']).material ?? {};

        const materialType = getObjectMaterialType(editor.activeObject);

        setControlValues(
          props => {
            if (!props.types) return true;

            return props.types.includes(materialType);
          },
          materialProps,
          props,
          values,
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
            values[`Properties.${object.objectType}_${name}`] = currentValue;
          }
        });
      }

      // update field values
      Object.assign(fieldValues, values);

      // remove unchanged values
      Object.keys(values).forEach(key => {
        if (deepEqual(levaStore.get(key), values[key])) {
          delete values[key];
        }
      });

      if (Object.keys(values).length) {
        levaStore.set(values, false);
      } else if (forceUpdate) {
        levaStore.set(objectUpdate, false);
      }
    },
    [editor],
  );

  const onEditStart = useCallback(
    (isSlider: boolean, value: unknown, path: string) => {
      fieldValues.current[path] = value;

      if (isSlider) {
        isEditingRef.current = true;
      }
    },
    [],
  );
  const onEditEnd = useCallback(() => {
    if (isFirstRender.current) return;

    isEditingRef.current = false;

    updateControls(editor.activeObject);
  }, [editor, updateControls]);

  const on = useCallback(
    (handler: (...args: any[]) => void) =>
      (...args: any[]) => {
        // ignore initial render
        if (args[args.length - 1]?.initial) return;

        if (!editor.activeObject || isFirstRender.current) return;

        handler(...args);
      },
    [editor],
  );

  useControls(
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

      collision: {
        label: 'Collision',
        value: true,

        onChange: on((value: boolean) => {
          editor.setCollision(value ? 'static' : null);
        }),

        render: () => !!editor.activeObject?.supportsCollision,
      },

      shadows: {
        label: 'Shadows',
        value: true,

        onChange: on((value: boolean) => {
          editor.setShadows(value);
        }),

        render: () => !!editor.activeObject?.supportsShadows,
      },

      bloom: {
        label: 'Bloom',
        value: false,

        onChange: on((value: boolean) => {
          editor.setBloom(value);
        }),

        render: () => !!editor.activeObject?.supportsBloom,
      },

      optimized: {
        label: 'Optimized',
        value: 'Yes',
        editable: false,

        render: () => {
          const object = editor.activeObject;
          if (object?.objectType !== 'gltf') {
            return false;
          }

          const url = (object.props as PickObjectProps<'gltf'>)?.u;

          return !!(url?.includes('o-geo') || url?.includes('o-tex'));
        },
      },
    }),
    {
      order: 25,

      collapsed: true,

      render: () => !!editor.activeObject,
    },
  );

  useControls(
    'Transform',
    () => ({
      position: {
        label: 'Position',
        step: 0.01,
        value: {
          x: 0,
          y: 0,
          z: 0,
        },

        onEditStart: (value, path) => onEditStart(true, value, path),
        onEditEnd,
        onChange: on((value: Vector3) => {
          if (!isEditingRef.current) return;

          editor.setPosition([value.x, value.y, value.z]);
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

        onEditStart: (value, path) => onEditStart(true, value, path),
        onEditEnd,
        onChange: on((value: Euler) => {
          if (!isEditingRef.current) return;

          const quaternion = new Quaternion().setFromEuler(
            new Euler(
              MathUtils.degToRad(value.x),
              MathUtils.degToRad(value.y),
              MathUtils.degToRad(value.z),
            ),
          );
          editor.setRotation(quaternion.toArray() as QuaternionArray);
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

        onEditStart: (value, path) => onEditStart(true, value, path),
        onEditEnd,
        onChange: on((value: Vector3) => {
          if (!isEditingRef.current) return;

          editor.setScale([value.x, value.y, value.z]);
        }),
      },

      scale_buttons: buttonGroup({
        label: ' ',
        opts: {
          '0.1': () => {
            editor.setScale([0.1, 0.1, 0.1]);
          },
          '0.25': () => {
            editor.setScale([0.25, 0.25, 0.25]);
          },
          '0.5': () => {
            editor.setScale([0.5, 0.5, 0.5]);
          },
          '0.75': () => {
            editor.setScale([0.75, 0.75, 0.75]);
          },
          reset: () => {
            editor.setScale([1, 1, 1]);
          },
        },
      }),
    }),
    {
      order: 100,

      render: () => !!editor.activeObject,
    },
  );

  const materialFields = useMemo(() => {
    const fields: any = {};

    const canRender = (
      prop: ObjectMaterialOption,
      get: (name: string) => any,
    ) => {
      if (!prop.types) return true;

      const materialType = getObjectMaterialType(
        editor.activeObject,
        get('Material.mat_type'),
      );

      return prop.types.includes(materialType);
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
          async (
            props: ObjectMaterialOption,
            name: string,
            value: any,
            path: string,
          ) => {
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

            //console.log('new value', newValue);

            switch (parts.length) {
              case 1: {
                editor.setProps(
                  {
                    material: {
                      [name]: newValue,
                    },
                  },
                  {
                    material: {
                      [name]: fieldValues.current[path],
                    },
                  },
                );

                /* console.log({
                  name: fieldValues.current[path],
                }); */

                fieldValues.current[path] = newValue;
                break;
              }
              case 2: {
                if (props.setterFromParent) {
                  editor.setProps(
                    {
                      material: {
                        [parts[1]]: newValue,
                      },
                    },
                    {
                      material: {
                        [parts[1]]: fieldValues.current[path],
                      },
                    },
                  );

                  fieldValues.current[path] = newValue;
                  break;
                }

                editor.setProps(
                  {
                    material: {
                      [parts[0]]: {
                        [parts[1]]: newValue,
                      },
                    },
                  },
                  {
                    material: {
                      [parts[0]]: {
                        [parts[1]]: fieldValues.current[path],
                      },
                    },
                  },
                );

                fieldValues.current[path] = newValue;
                break;
              }
            }
          },
        ),
      },
      fields,
    );

    return fields;
  }, [editor, onEditStart, onEditEnd, on]);

  const propertyFields = useMemo(() => {
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
            (
              props: ObjectMaterialOption,
              name: string,
              value: any,
              path: string,
            ) => {
              if (isSliderControl(props) && !isEditingRef.current) return;

              editor.setProps(
                {
                  [name]: value,
                },
                {
                  [name]: fieldValues.current[path],
                },
              );

              fieldValues.current[path] = value;
            },
          ),
        },
        fields,
      );
    });

    return fields;
  }, [editor, on, onEditStart, onEditEnd]);

  useControls('Material', () => materialFields, {
    order: 150,

    collapsed: true,

    render: () => {
      return (
        editor.activeObject &&
        doesObjectSupportMaterial(editor.activeObject?.objectType)
      );
    },
  });

  useControls('Properties', () => propertyFields, {
    order: 225,

    collapsed: false,
  });

  const lastUpdate = useRef(0);
  const updateTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  // keep controls in sync
  useEvent('onObjectEdit', (object, type) => {
    if (isEditingRef.current || editor.updating) return;
    if (type === 'unselect') {
      levaStore.set(
        {
          'Object.id': editor.activeObject?.id ?? '-',
        },
        false,
      );
      return;
    }

    if (updateTimeoutId.current) return;

    const forceUpdate = type === 'select';

    if (Date.now() - lastUpdate.current < 200) {
      updateTimeoutId.current = setTimeout(() => {
        isFirstRender.current = true;
        updateControls(object, forceUpdate);
        isFirstRender.current = false;

        updateTimeoutId.current = null;
      }, 200);
      return;
    }

    lastUpdate.current = Date.now();

    isFirstRender.current = true;
    updateControls(object, forceUpdate);
    isFirstRender.current = false;
  });

  return null;
};

export default EditorPanelObject;
