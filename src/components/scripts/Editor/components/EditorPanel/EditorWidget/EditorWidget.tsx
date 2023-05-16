import styles from './EditorWidget.module.scss';

import {MouseEvent, useCallback} from 'react';

import PanelWidget from '@app/components/core/PanelWidget';
import clsx from 'clsx';
import {levaStore} from 'leva';

const FOLDERS = ['Settings', 'Object', 'Transforms', 'Material', 'Properties'];

const EditorWidget = () => {
  // yay, it's a hack to keep track of opened folders
  const onClick = useCallback((event: MouseEvent) => {
    let el = (
      (event.target as HTMLDivElement).tagName !== 'DIV'
        ? (event.target as HTMLDivElement).closest('div')?.children[1]
        : (event.target as HTMLDivElement)
    ) as HTMLDivElement;

    if (el?.children?.length) {
      el = el.children[1] as HTMLDivElement;
    }

    // hehe, it's our selector, who's your neighbour?
    if (el?.previousElementSibling?.tagName !== 'svg') return;

    const folderName = el.innerText;
    if (!FOLDERS.includes(folderName)) return;

    const folder = levaStore.getFolderSettings(folderName);
    if (!folder) return;

    folder.collapsed = !folder.collapsed;
  }, []);

  return (
    <div
      onClick={onClick}
      className={clsx(styles.container, 'fade-in')}
      onPointerMove={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}
      onPointerUp={e => e.stopPropagation()}>
      <PanelWidget
        title="Editor"
        position={{
          x: 0,
          y: 0,
        }}
        fill
        flat
        drag={false}
      />
    </div>
  );
};

export default EditorWidget;
