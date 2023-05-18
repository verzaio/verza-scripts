import styles from './EditorWidget.module.scss';

import {KeyboardEvent, MouseEvent, useCallback} from 'react';

import {EDITOR_FOLDERS_REL} from '../../../misc/constants';

import PanelWidget from '@app/components/core/PanelWidget';
import clsx from 'clsx';
import {levaStore} from 'leva';

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
    if (!EDITOR_FOLDERS_REL[folderName]) return;

    const folder = levaStore.getFolderSettings(EDITOR_FOLDERS_REL[folderName]);

    if (!folder) return;

    folder.collapsed = !folder.collapsed;
  }, []);

  // yay, it's another hack to trigger input events on `keyup`
  const onKeyUp = useCallback((event: KeyboardEvent) => {
    const el = event.target as HTMLInputElement;

    if (el.nodeName !== 'INPUT' && el.nodeName !== 'TEXTAREA') return;

    const input = levaStore.getInput(el.id);

    if (input) {
      levaStore.set(
        {
          [el.id]: el.value,
        },
        false,
      );
    }
  }, []);

  return (
    <div
      onClick={onClick}
      onKeyUp={onKeyUp}
      className={clsx(styles.container, 'fade-in')}
      onPointerMove={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}>
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
