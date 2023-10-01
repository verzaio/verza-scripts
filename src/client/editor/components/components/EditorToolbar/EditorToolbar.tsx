import styles from './EditorToolbar.module.scss';

import CreateButton from './components/CreateButton/CreateButton';
import HistoryButton from './components/HistoryButton/HistoryButton';
import Separator from './components/Separator/Separator';

const EditorToolbar = () => {
  return (
    <div
      className={styles.container}
      onPointerMove={e => e.nativeEvent.stopImmediatePropagation()}
      onPointerDown={e => e.nativeEvent.stopImmediatePropagation()}>
      <div className={styles.toolbar}>
        <CreateButton />

        <Separator />

        <HistoryButton />
      </div>
    </div>
  );
};

export default EditorToolbar;
