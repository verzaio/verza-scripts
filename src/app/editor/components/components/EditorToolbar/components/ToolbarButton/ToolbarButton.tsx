import styles from './ToolbarButton.module.scss';

import {ReactNode} from 'react';

import clsx from 'clsx';

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
