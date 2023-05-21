import {useCallback, useMemo, useRef} from 'react';

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
import equal from 'fast-deep-equal';
import {useControls, buttonGroup, levaStore} from 'leva';

const EditorPanelObject = () => {
  const editor = useEditor();

  const isFirstRender = useRef(true);

  const isEditingRef = useRef(false);

  const updateControls = useCallback(
    (object: ObjectManager) => {
      if (!editor.activeObject || isEditingRef.current) return;

      const location = object.worldLocation;

      const values: any = {
        'Object.id': object.id,
        'Object.type': object.objectType,

        'Transforms.position': {
          x: location.position.x,
          y: location.position.y,
          z: location.position.z,
        },

        'Transforms.rotation': {
          x: MathUtils.radToDeg(location.rotation.x),
          y: MathUtils.radToDeg(location.rotation.y),
          z: MathUtils.radToDeg(location.rotation.z),
        },

        'Transforms.scale': {
          x: location.scale.x,
          y: location.scale.y,
          z: location.scale.z,
        },

        ...(object.supportsCollision && {
          'Transforms.collision': !!object.collision,
        }),
      };

      // materials
      if (doesObjectSupportMaterial(object.objectType)) {
        const materialProps = OBJECTS_MATERIAL_PROPS;

        const props =
          (object.props as ObjectManager<'box'>['props']).material ?? {};

        const materialType = getObjectMaterialType(editor.activeObject);

        setControlsValue(
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

      // remove unchanged values
      Object.keys(values).forEach(key => {
        if (equal(levaStore.get(key), values[key])) {
          delete values[key];
        }
      });

      if (Object.keys(values).length) {
        levaStore.set(values, true);
      }
    },
    [editor],
  );

  const onEditStart = useCallback(() => (isEditingRef.current = true), []);
  const onEditEnd = useCallback(() => {
    if (isFirstRender.current) return;

    isEditingRef.current = false;

    updateControls(editor.activeObject);
  }, [editor, updateControls]);

  const on = useCallback(
    (handler: (...args: any[]) => void) =>
      (...args: any[]) => {
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
    }),
    {
      order: 25,

      collapsed: true,

      render: () => !!editor.activeObject,
    },
  );

  useControls(
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

          console.log('position:onChange');

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

            //console.log('new value', newValue);

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
                if (props.setterFromParent) {
                  editor.activeObject?.setProps({
                    material: {
                      [parts[1]]: newValue,
                    },
                  });
                  break;
                }

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
        true,
      );
      return;
    }

    if (updateTimeoutId.current) return;

    if (Date.now() - lastUpdate.current < 200) {
      updateTimeoutId.current = setTimeout(() => {
        isFirstRender.current = true;
        updateControls(object);
        isFirstRender.current = false;

        updateTimeoutId.current = null;
      }, 200);
      return;
    }

    lastUpdate.current = Date.now();

    isFirstRender.current = true;
    updateControls(object);
    isFirstRender.current = false;
  });

  return null;
};

export default EditorPanelObject;
