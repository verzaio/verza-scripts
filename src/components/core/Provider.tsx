import {EngineProvider, EngineProviderProps} from '@verza/sdk/react';
import {PropsWithChildren} from 'react';

const DEFAULT_SCRIPT_NAME = 'Core';

const Provider = ({
  params,
  children,
}: PropsWithChildren<EngineProviderProps>) => {
  return (
    <EngineProvider
      params={{
        name: DEFAULT_SCRIPT_NAME,

        ...params,
      }}>
      {children}
    </EngineProvider>
  );
};

export default Provider;
