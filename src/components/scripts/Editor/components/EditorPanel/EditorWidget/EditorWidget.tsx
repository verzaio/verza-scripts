import styles from './EditorWidget.module.scss';

import PanelWidget from '@app/components/core/PanelWidget';
import clsx from 'clsx';

const EditorWidget = () => {
  return (
    <div
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
