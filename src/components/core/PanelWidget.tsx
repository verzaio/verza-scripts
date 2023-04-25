import {Leva} from 'leva';
import {ReactNode} from 'react';

type PanelWidgetProps = {
  title?: ReactNode;

  collapsed?: boolean;

  drag?: boolean;

  position?: {
    x?: number;
    y?: number;
  };
};

const PanelWidget = ({title, collapsed, drag, position}: PanelWidgetProps) => {
  return (
    <Leva
      titleBar={{
        title,
        drag,
        filter: false,
        position,
      }}
      collapsed={collapsed}
      flat
      hideCopyButton
    />
  );
};

export default PanelWidget;
