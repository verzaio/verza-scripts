import {ReactNode} from 'react';

import {Leva} from 'leva';

type PanelWidgetProps = {
  title?: ReactNode;

  collapsed?: boolean;

  drag?: boolean;

  filter?: boolean;

  fill?: boolean;

  flat?: boolean;

  position?: {
    x?: number;
    y?: number;
  };

  hidden?: boolean;
};

const PanelWidget = ({
  title,
  collapsed,
  drag,
  position,
  filter = false,
  fill,
  flat = true,
  hidden = false,
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
      flat={flat}
      collapsed={collapsed}
      hideCopyButton
      hidden={hidden}
    />
  );
};

export default PanelWidget;
