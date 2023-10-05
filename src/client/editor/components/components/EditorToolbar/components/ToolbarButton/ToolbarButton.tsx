import {ReactNode} from 'react';

import clsx from 'clsx';

import styles from './ToolbarButton.module.css';

type ToolbarButtonProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const ToolbarButton = ({children, className, ...props}: ToolbarButtonProps) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  );
};

export default ToolbarButton;
