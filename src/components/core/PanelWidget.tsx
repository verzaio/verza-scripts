import {ReactNode} from 'react';

import {Leva} from 'leva';

type PanelWidgetProps = {
  title?: ReactNode;

  collapsed?: boolean;

  drag?: boolean;

  filter?: boolean;

  fill?: boolean;

  position?: {
    x?: number;
    y?: number;
  };
};

const PanelWidget = ({
  title,
  collapsed,
  drag,
  position,
  filter = false,
  fill,
}: PanelWidgetProps) => {
  return (
    <Leva
      titleBar={{
        title,
        drag,
        filter,
        position,
      }}
      fill={fill}
      collapsed={collapsed}
      hideCopyButton
    />
  );
};

export default PanelWidget;
