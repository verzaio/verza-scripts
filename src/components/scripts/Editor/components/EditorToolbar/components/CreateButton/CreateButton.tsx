import styles from './CreateButton.module.scss';

import {ComponentType, useCallback, useRef} from 'react';

import PlusIcon from './res/plus-icon.svg';
import UploadIcon from './res/upload-icon.svg';

import {useEditor} from '@app/components/scripts/Editor/EditorProvider';
import {OBJECTS_INFO} from '@app/components/scripts/Editor/misc/constants';
import useOnClickOutside from '@app/hooks/useOnClickOutside';
import {ObjectType} from '@verza/sdk';
import {useEngine, useEvent, useObjects} from '@verza/sdk/react';
import {useDropzone} from 'react-dropzone';

const CreateButton = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  useOnClickOutside(containerRef, () => {
    containerRef.current.classList.remove(styles.active);
  });

  useEvent('onPointerDown', () => {
    containerRef.current.classList.remove(styles.active);
  });

  return (
    <>
      <div
        className={styles.container}
        ref={containerRef}
        onClick={e =>
          (e.currentTarget as HTMLDivElement).classList.toggle(styles.active)
        }>
        <div className={styles.create}>
          <span className={styles.icon}>
            <PlusIcon />
          </span>

          <span>Create</span>
        </div>

        <Dropdown />
      </div>
    </>
  );
};

const Dropdown = () => {
  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown}>
        <UploadButton />

        {Object.entries(OBJECTS_INFO).map(([type, {label, Icon}]) => (
          <DropdownItem
            key={type}
            type={type as ObjectType}
            label={label}
            Icon={Icon}
          />
        ))}
      </div>
    </div>
  );
};

type DropdownItemProps = {
  type: ObjectType;
  label: string;
  Icon: ComponentType;
};

const DropdownItem = ({type, label, Icon}: DropdownItemProps) => {
  const engine = useEngine();
  const objects = useObjects();

  const editor = useEditor();

  const onClick = useCallback(async () => {
    const location = engine.localPlayer.location.clone();

    location.translateZ(3);

    location.lookAt(engine.localPlayer.position);

    location.translateY(1);

    const object = objects.create(type, {
      position: location.position,
      rotation: location.quaternion,
    });

    // save it
    object.save();

    // wait for object to stream-in
    await object.waitForStream();

    editor.editObject(object);
  }, [editor, engine, objects, type]);

  return (
    <button className={styles.item} onClick={onClick}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.label}>{label}</div>
    </button>
  );
};

const UploadButton = () => {
  const editor = useEditor();

  const onDrop = useCallback(
    async (files: File[]) => {
      if (!files.length) return;

      // TODO: Support multiple files upload

      await editor.uploadGltf(files[0]);
    },
    [editor],
  );

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
    //accept: '*',
    onDrop,
  });

  return (
    <div className={styles.item} {...(getRootProps() as any)}>
      <input {...getInputProps()} />

      <div className={styles.icon}>
        <UploadIcon />
      </div>
      <div className={styles.label}>Upload GLTF</div>
    </div>
  );
};

export default CreateButton;
