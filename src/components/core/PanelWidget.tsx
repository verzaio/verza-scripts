import {Leva} from 'leva';
import {ReactNode} from 'react';

type PanelWidgetProps = {
  title?: ReactNode;

  collapsed?: boolean;

  drag?: boolean;

  filter?: boolean;

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
}: PanelWidgetProps) => {
  return (
    <Leva
      titleBar={{
        title,
        drag,
        filter,
        position,
      }}
      collapsed={collapsed}
      hideCopyButton
    />
  );
};

export default PanelWidget;
