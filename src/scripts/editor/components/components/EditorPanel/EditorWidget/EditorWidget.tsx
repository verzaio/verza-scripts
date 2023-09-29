import styles from './EditorWidget.module.scss';

import {KeyboardEvent, MouseEvent, useCallback, useEffect} from 'react';

import {useEngine} from '@verza/sdk/react';
import clsx from 'clsx';
import {levaStore} from 'leva';

import PanelWidget from '@app/components/core/PanelWidget';

import {EDITOR_FOLDERS_REL} from '../../../misc/constants';

const EditorWidget = () => {
  const engine = useEngine();

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

  // yay, it's another hack to trigger input events on `keyup` for 'textarea'
  const onKeyUp = useCallback((event: KeyboardEvent) => {
    const el = event.target as HTMLInputElement;

    if (el.nodeName !== 'TEXTAREA') return;

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

  // blur inputs if clicks outside
  useEffect(() => {
    const onClick = () => {
      if (engine.input.isActiveInput) {
        engine.input.activeInput?.blur();
      }
    };

    document.addEventListener('pointerdown', onClick);

    return () => {
      document.removeEventListener('pointerdown', onClick);
    };
  }, [engine]);

  return (
    <div
      onClick={onClick}
      onKeyUp={onKeyUp}
      className={clsx(styles.container, 'fade-in')}
      onPointerMove={e => e.nativeEvent.stopImmediatePropagation()}
      onPointerDown={e => e.nativeEvent.stopImmediatePropagation()}>
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
