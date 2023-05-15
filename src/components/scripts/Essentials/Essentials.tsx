import Editor from '../Editor/Editor';
import FlyMode from '../FlyMode/FlyMode';

import Provider from '@app/components/core/Provider';

const Essentials = () => {
  return (
    <Provider
      params={{
        syncCameraPosition: true,
      }}>
      <FlyMode />

      <Editor />
    </Provider>
  );
};

export default Essentials;
