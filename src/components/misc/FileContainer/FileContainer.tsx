import styles from './FileContainer.module.scss';

import {DragEvent, useCallback, useRef} from 'react';

import FileIcon from './res/file-icon.svg';

type FileContainerProps = {
  onDropFiles?: (files: File[]) => void;
  label?: string;
};

const FileContainer = ({onDropFiles, label}: FileContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null!);

  const onDrop = useCallback(
    (event: DragEvent) => {
      if (!onDropFiles) return;

      event.preventDefault();
      event.stopPropagation();

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
      onPointerDown={e => e.stopPropagation()}
      onPointerUp={e => e.stopPropagation()}
      onDragOver={() => containerRef.current.classList.add(styles.active)}
      onDragEnter={() => containerRef.current.classList.add(styles.active)}
      onDragLeave={() => containerRef.current.classList.remove(styles.active)}
      onDragEnd={e => {
        if (onDropFiles) {
          e.preventDefault();
          e.stopPropagation();
        }

        console.log('here?');
      }}
      onDrop={onDrop}>
      <FileIcon className={styles.icon} />

      <span className={styles.label}>{label ?? 'Drop File'}</span>
    </div>
  );
};

export default FileContainer;
