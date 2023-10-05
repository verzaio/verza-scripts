import {PropsWithChildren} from 'react';

import {EngineProvider, EngineProviderProps, useEngine} from '@verza/sdk/react';

const DEFAULT_SCRIPT_NAME = 'Core';

const ProviderDynamic = ({
  params,
  children,
}: PropsWithChildren<EngineProviderProps>) => {
  const engine = useEngine();

  if (engine) {
    return <>{children}</>;
  }

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

export default ProviderDynamic;
