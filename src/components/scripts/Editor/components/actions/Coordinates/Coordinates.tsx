import Widget from '@app/components/core/Widget';
import {useControls} from 'leva';
import styles from './Coordinates.module.scss';

const Coordinates = () => {
  //const object = useObjects();

  const [, set] = useControls(() => ({
    position: {
      label: 'Position',

      value: {
        x: 8,
        y: 2,
        z: 1,
      },
    },
  }));

  //position;
  set;

  return (
    <>
      <div className={styles.container}>
        <span>The coordintates</span>
      </div>

      <div onPointerDown={e => e.stopPropagation()}>
        <Widget />
      </div>
    </>
  );
};

export default Coordinates;
