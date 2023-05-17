import styles from './EditorToolbar.module.scss';

import CreateButton from './components/CreateButton/CreateButton';

const EditorToolbar = () => {
  return (
    <div
      className={styles.container}
      onPointerMove={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}>
      <div className={styles.toolbar}>
        <CreateButton />
      </div>
    </div>
  );
};

export default EditorToolbar;
