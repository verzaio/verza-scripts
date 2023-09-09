'use client';

import EditorPage from '../editor/page';
import FlyModePage from '../fly-mode/page';

import Provider from '@app/components/core/Provider';

const EssentialsPage = () => {
  return (
    <Provider
      params={{
        syncCameraPosition: true,
      }}>
      <FlyModePage />

      <EditorPage />
    </Provider>
  );
};

export default EssentialsPage;
