import {ImageInput} from 'leva/plugin';

export const sanitize = (v: any): File | string | undefined => {
  if (v === undefined) return undefined;
  if (v === null) return undefined;
  if (v instanceof File) {
    try {
      return v;
    } catch (e) {
      return undefined;
    }
  }
  if (typeof v === 'string') return v;

  throw Error(`Invalid image format [undefined | blob | File].`);
};

export const schema = (_o: any, s: any) => typeof s === 'object' && 'file' in s;

export const normalize = ({image}: ImageInput) => {
  return {value: image};
};
