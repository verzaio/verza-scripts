import {DragEvent, useCallback, useRef} from 'react';

import styles from './FileContainer.module.css';
import FileIcon from './res/file-icon.svg?react';

type FileContainerProps = {
  onDropFiles?: (files: File[]) => void;
  label?: string;
};

const FileContainer = ({onDropFiles, label}: FileContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  const onDrop = useCallback(
    (event: DragEvent) => {
      if (!onDropFiles) return;

      event.nativeEvent.preventDefault();
      event.nativeEvent.stopPropagation();

      const filesList = event.dataTransfer?.files;

      if (!filesList) return;

      const files: File[] = [];

      for (let i = 0; i < filesList.length; i++) {
        files.push(filesList.item(i)!);
      }

      onDropFiles(files);
    },
    [onDropFiles],
  );

  return (
    <div
      className={styles.fileContainer}
      ref={containerRef}
      onPointerDown={e => e.nativeEvent.stopImmediatePropagation()}
      onPointerUp={e => e.nativeEvent.stopImmediatePropagation()}
      onDragOver={() => containerRef.current.classList.add(styles.active)}
      onDragEnter={() => containerRef.current.classList.add(styles.active)}
      onDragLeave={() => containerRef.current.classList.remove(styles.active)}
      onDragEnd={e => {
        if (onDropFiles) {
          e.nativeEvent.preventDefault();
          e.nativeEvent.stopPropagation();
        }
      }}
      onDrop={onDrop}>
      <div className={styles.icon}>
        <FileIcon />
      </div>

      <span className={styles.label}>{label ?? 'Drop File'}</span>
    </div>
  );
};

export default FileContainer;
