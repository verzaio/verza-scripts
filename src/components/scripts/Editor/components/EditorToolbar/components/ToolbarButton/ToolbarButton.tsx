import styles from './ToolbarButton.module.scss';

import {ReactNode} from 'react';

type ToolbarButtonProps = {
  icon: ReactNode;
};

const ToolbarButton = ({icon}: ToolbarButtonProps) => {
  return <div className={styles.button}>{icon}</div>;
};

export default ToolbarButton;
