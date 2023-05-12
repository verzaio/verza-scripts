import {IntersectsResult, PointerEvent} from '@verza/sdk';
import {useEngine, useEvent} from '@verza/sdk/react';
import {MutableRefObject} from 'react';
import {isUneditable} from '../EditorHandler';

let timeoutId: ReturnType<typeof setTimeout> | null = null;
let lastPointerEvent: PointerEvent | null = null;

type EntitySelectorProps = {
  onEntitySelected: (intersects: IntersectsResult) => void;
  isUpdating: MutableRefObject<boolean>;
};

const EntitySelector = ({
  onEntitySelected,
  isUpdating: isUpating,
}: EntitySelectorProps) => {
  const engine = useEngine();

  const canUpdate = () =>
    !(engine.ui.isSystemMenu() || engine.ui.cursorLock || isUpating.current);

  const highlightItem = async (event: PointerEvent) => {
    const result = await engine.world.raycaster.raycastScreenPoint(
      event.x,
      event.y,
      null,
      {
        filterEntityTypes: ['object'],
      },
    );

    const object = result.object?.entity;

    if (!object || (await isUneditable(object))) {
      return;
    }

    result;
  };

  const checkHighlight = (event: PointerEvent) => {
    if (!canUpdate()) return;

    if (timeoutId) {
      lastPointerEvent = event;
      return;
    }

    lastPointerEvent = null;

    timeoutId = setTimeout(async () => {
      await highlightItem(event);

      timeoutId = null;

      if (lastPointerEvent) {
        checkHighlight(lastPointerEvent);
      }
    }, 50);
  };

  checkHighlight;

  //useEvent('onPointerMove', checkHighlight);

  useEvent('onPointerDown', async event => {
    if (!canUpdate()) return;

    const result = await engine.world.raycaster.raycastScreenPoint(
      event.x,
      event.y,
      null,
      {
        filterEntityTypes: ['object'],
      },
    );

    onEntitySelected(result);
  });

  return null;
};

export default EntitySelector;
