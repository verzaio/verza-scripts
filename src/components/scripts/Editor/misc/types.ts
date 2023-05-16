import {ComponentType} from 'react';

import {ObjectType, PickObject} from '@verza/sdk';

export type ObjectControlProps = {
  label?: string;
  step?: number;
  min?: number;
  max?: number;
  options?:
    | unknown[]
    | {
        [key: string]: unknown;
      };
  value?: unknown;
  rows?: number;
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
