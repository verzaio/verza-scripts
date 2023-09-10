import {MouseEvent, useCallback, useMemo} from 'react';

import {useEditor} from '../../EditorProvider';
import {usePopin} from '../hooks/usePopin';
import type {FileProps} from './file-types';
import {
  DropZone,
  FileContainer,
  FilePreview,
  Instructions,
  FileLargePreview,
  Remove,
} from './StyledFile';

import {useInputContext, Components} from 'leva/plugin';
import {useDropzone} from 'react-dropzone';

const {Label, Portal, Overlay, Row} = Components;

export function FileComponent() {
  const {label, value, onUpdate, disabled} = useInputContext<FileProps>();
  const {popinRef, wrapperRef, shown, show, hide} = usePopin();
  const editor = useEditor();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) onUpdate(acceptedFiles[0]);
    },
    [onUpdate],
  );

  const clear = useCallback(
    (e: MouseEvent) => {
      e.nativeEvent.stopImmediatePropagation();
      onUpdate(undefined);
    },
    [onUpdate],
  );

  const {getRootProps, getInputProps, isDragAccept} = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    onDrop,
    disabled,
  });

  const valuePreview = useMemo(() => {
    if (!value) return;

    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    return editor.formatUrl(value);
  }, [value, editor]);

  // TODO fix any in DropZone
  return (
    <Row input>
      <Label>{label}</Label>
      <FileContainer>
        <FilePreview
          ref={popinRef}
          hasImage={!!value}
          onPointerDown={() => !!value && show()}
          onPointerUp={hide}
          style={{backgroundImage: value ? `url(${valuePreview})` : 'none'}}
        />
        {shown && !!value && (
          <Portal>
            <Overlay onPointerUp={hide} style={{cursor: 'pointer'}} />
            <FileLargePreview
              ref={wrapperRef}
              style={{backgroundImage: `url(${valuePreview})`}}
            />
          </Portal>
        )}
        <DropZone {...(getRootProps({isDragAccept}) as any)}>
          <input {...getInputProps()} />
          <Instructions>select</Instructions>
        </DropZone>
        <Remove onClick={clear} disabled={!value} />
      </FileContainer>
    </Row>
  );
}
