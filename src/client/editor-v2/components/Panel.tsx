import {PropsWithChildren} from 'react';

import clsx from 'clsx';

type PanelProps = PropsWithChildren<{
  className?: string;
}>;

export const Panel = ({children, className}: PanelProps) => {
  return (
    <div
      className={clsx(
        'absolute rounded-[5px] w-[230px] border border-gray-800 bg-gray-900 h-[calc(100svh_-_120px)]',
        className,
      )}>
      {children}
    </div>
  );
};
