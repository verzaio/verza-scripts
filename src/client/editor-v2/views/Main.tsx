import {Toolbar} from '../components/Toolbar';
import {MainPanel} from './MainPanel';
import {PropertiesPanel} from './PropertiesPanel';

export const Main = () => {
  return (
    <>
      <MainPanel />

      <PropertiesPanel />

      <Toolbar />
    </>
  );
};
