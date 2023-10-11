import {useMainToolbarItem} from '@verza/sdk/react';

export const MainToolbarItem = () => {
  useMainToolbarItem({
    id: 'editor',
    name: 'Editor',
    key: 'R',
  });

  return null;
};
