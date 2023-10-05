import '@app/styles.css';

import {initReactEngine} from '@verza/sdk/react/client';

import {DEFAULT_SCRIPT_NAME} from '@app/shared/constants';

import {Editor} from '../editor/components/Editor';
import {FlyMode} from '../fly-mode/components/FlyMode';

export default async function script(id: string) {
  const [render] = await initReactEngine({
    id,
    name: DEFAULT_SCRIPT_NAME,
    syncCameraPosition: true,
  });

  render(
    <>
      <FlyMode />

      <Editor />
    </>,
  );
}

const styles = document.createElement('link');
styles.rel = 'stylesheet';
styles.href = 'http://localhost:8085/assets/style-4975151.css';
document.head.appendChild(styles);
;(() => {
  const url = 'http://localhost:8085/assets/style-8259079.css';

  if (document.getElementById(url)) return;

  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.href = url;
  styles.id = styles.href;

  document.head.appendChild(styles);
})();
;(() => {
  const url = 'http://localhost:8085/assets/style-5535395.css';

  if (document.getElementById(url)) return;

  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.href = url;
  styles.id = styles.href;

  document.head.appendChild(styles);
})();
;(() => {
  const url = 'http://localhost:8085/assets/style-3151848.css';

  if (document.getElementById(url)) return;

  const styles = document.createElement('link');
  styles.rel = 'stylesheet';
  styles.href = url;
  styles.id = styles.href;

  document.head.appendChild(styles);
})();