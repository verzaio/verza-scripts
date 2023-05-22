import file from '../plugins/File';
import {
  ObjectControlFields,
  ObjectControlProps,
  ObjectControlValues,
} from './types';

import {ObjectManager, ObjectType} from '@verza/sdk';
import {folder} from 'leva';

export const isObjectUneditable = async (
  object: ObjectManager,
): Promise<boolean> => {
  if (!object) return false;

  if (object.userData.uneditable) {
    return true;
  }

  return isObjectUneditable((await object.resolveParent())!);
};

export const doesObjectSupportMaterial = (type: ObjectType) => {
  return !(
    type === 'group' ||
    type === 'gltf' ||
    type === 'model' ||
    type === 'text'
  );
};

export const createSliderProps = (
  label: string,
  min: number,
  max: number,
  step: number,
  value?: number,
): ObjectControlProps => {
  return {
    label,
    min,
    max,
    step,
    value,
  };
};

type ParseControlsFieldsOptions = {
  onEditStart?: (isSlider: boolean, value: unknown, path: any) => void;
  onEditEnd?: () => void;
  onChange?: (props: ObjectControlProps, name: string, ...args: any[]) => void;
  itemRender?: (
    props: ObjectControlProps,
    get: (name: string) => any,
  ) => boolean;
  folderRender?: (
    props: ObjectControlProps,
    get: (name: string) => any,
  ) => boolean;
};

type ControlsList<T extends ObjectControlProps> = {
  [name: string]: T;
};

export const parseControls = <
  A extends ObjectControlProps = ObjectControlProps,
  T extends ControlsList<A> = ControlsList<A>,
>(
  _prefix: string,
  controls: T,
  options: ParseControlsFieldsOptions,
  fields: any = {},
) => {
  const prefix = !_prefix ? '' : `${_prefix}_`;

  const parseField = (name: string, allProps: A, fields: any) => {
    const {folder: folderProps, collapsed, ...props} = allProps;

    if (folderProps) {
      const folderItems: any = {};

      Object.entries(folderProps).forEach(([itemName, props]) =>
        parseField(`${name}_${itemName}`, props as A, folderItems),
      );

      const folderName = props.label ?? name;

      fields[folderName] = folder(folderItems, {
        render: (get: any) => {
          if (options.folderRender) {
            return options.folderRender(props, get);
          }

          return true;
        },

        collapsed: !!collapsed,
      });

      return;
    }

    const isSlider = isSliderControl(props);

    const baseProps = {
      onEditStart: (value: unknown, path: string) =>
        options.onEditStart?.(isSlider, value, path),

      ...(isSlider && {
        onEditEnd: options.onEditEnd,
      }),

      render: (get: any) => {
        if (options.itemRender) {
          return options.itemRender(props, get);
        }

        return true;
      },

      onChange: (...args: any[]) => {
        if (options.onChange) {
          options.onChange(props, name, ...args);
        }
      },
    };

    let field: any;

    if ('file' in props) {
      field = file({
        ...props,

        ...baseProps,
      } as any);
    } else {
      field = {
        ...props,

        ...baseProps,
      };
    }

    fields[`${prefix}${name}`] = field;
  };

  Object.entries(controls).forEach(([name, props]) =>
    parseField(name, props, fields),
  );

  return fields;
};

export const setControlValues = (
  filter: (props: ObjectControlProps) => boolean,
  fields: ObjectControlFields,
  values: ObjectControlValues,
  resultValues: any = {},
  parentNames: string[] = [],
  prefix?: string,
  parentValues?: ObjectControlValues,
) => {
  Object.entries(fields).forEach(([name, value]) => {
    if (value.folder) {
      const folderParentNames = [...parentNames, value.label!];

      setControlValues(
        filter,
        value.folder,
        values[name],
        resultValues,
        folderParentNames,
        `${prefix}_${name}`,
        values,
      );
      return;
    }

    if (!filter(value)) return;

    const path = `${parentNames.join('.')}.${prefix}_${name}`;

    let currentValue = values?.[name] ?? value.value;

    if (value.setterFromParent) {
      currentValue = parentValues?.[name] ?? value.value;
    }

    resultValues[path] = currentValue;
  });
};

export const isSliderControl = (props: ObjectControlProps) => {
  return props.min !== undefined || props.max !== undefined;
};
