import styles from './EditorToolbar.module.scss';

import CreateButton from './components/CreateButton/CreateButton';
import HistoryButton from './components/HistoryButton/HistoryButton';

const EditorToolbar = () => {
  return (
    <div
      className={styles.container}
      onPointerMove={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}>
      <div className={styles.toolbar}>
        <CreateButton />

        <HistoryButton />
      </div>
    </div>
  );
};

export default EditorToolbar;
