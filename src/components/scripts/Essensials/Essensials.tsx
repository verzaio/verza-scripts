import Provider from '@app/components/core/Provider';
import Editor from '../Editor/Editor';
import FlyMode from '../FlyMode/FlyMode';

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
