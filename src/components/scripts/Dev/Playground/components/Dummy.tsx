import {useEffect} from 'react';

import {EngineProvider, useEngine} from '@verza/sdk/react';

const ClientScript = () => {
  return (
    <EngineProvider>
      <Script />
    </EngineProvider>
  );
};

const Script = () => {
  const engine = useEngine();

  useEffect(() => {
    engine.localPlayer.sendMessage('Welcome to my server!');
  }, [engine]);

  return null;
};

export default ClientScript;
