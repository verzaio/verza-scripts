import {ComponentType} from 'react';

import {
  ObjectMaterialMix,
  ObjectMaterialType,
  ObjectType,
  PickObject,
} from '@verza/sdk';

export type ObjectControlFields = {
  [name: string]: ObjectControlProps;
};

export type ObjectControlValues = {
  [name: string]: any;
};

export type ObjectControlProps = {
  label?: string;
  file?: string | null;
  step?: number;
  min?: number;
  max?: number;
  options?:
    | unknown[]
    | {
        [key: string]: unknown;
      };
  value?: unknown;
  joystick?: boolean;
  rows?: number;
  collapsed?: boolean;
  folder?: ObjectControlFields;
  isAsset?: boolean;
  setterFromParent?: boolean;
  types?: ObjectMaterialType[];
};

export type ObjectItem<T extends ObjectType> = {
  label: string;
  Icon: ComponentType;
  props?: {
    [key in keyof PickObject<T>['o']]: ObjectControlProps;
  };
};

export type ObjectsInfo = {
  [name in ObjectType]: ObjectItem<name>;
};

export type ObjectMaterialOption = ObjectControlProps;

export type ObjectMaterial = {
  [name in keyof ObjectMaterialMix]: ObjectMaterialOption;
};
