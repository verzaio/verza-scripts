import {Leva} from 'leva';
import {ReactNode} from 'react';

type PanelWidgetProps = {
  title?: ReactNode;

  drag?: boolean;

  position?: {
    x?: number;
    y?: number;
  };
};

const PanelWidget = ({title, drag, position}: PanelWidgetProps) => {
  return (
    <Leva
      titleBar={{
        title,
        drag,
        filter: false,
        position,
      }}
      flat
      hideCopyButton
    />
  );
};

export default PanelWidget;
