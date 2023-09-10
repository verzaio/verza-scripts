import {PropsWithChildren} from 'react';

import {EngineProviderProps, useEngine} from '@verza/sdk/react';
import dynamic from 'next/dynamic';

const ProviderDynamic = dynamic(() => import('./ProviderDynamic'), {
  ssr: false,
});

const Provider = ({
  children,
  params,
}: PropsWithChildren<EngineProviderProps>) => {
  const engine = useEngine();

  if (engine) {
    return <>{children}</>;
  }

  return <ProviderDynamic params={params}>{children}</ProviderDynamic>;
};

export default Provider;
