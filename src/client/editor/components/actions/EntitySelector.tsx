import {useEffect, useRef} from 'react';

import {ObjectManager, PointerEvent} from '@verza/sdk';
import {useEngine, useEvent} from '@verza/sdk/react';

import {useEditor} from '../EditorProvider';
import {HIGHLIGHT_INACTIVE_COLOR} from '../misc/constants';
import {isObjectUneditable} from '../misc/utils';

let timeoutId: ReturnType<typeof setTimeout> | null = null;
let lastPointerEvent: PointerEvent | null = null;

const EntitySelector = () => {
  const engine = useEngine();
  const editor = useEditor();

  const canUpdate = () =>
    !(engine.ui.isSystemMenu() || engine.input.cursorLock || editor.updating);

  const hoverObjectRef = useRef<ObjectManager | null>(null);

  const clearHighlight = () => {
    const object = hoverObjectRef.current;

    if (!object || engine.objects.editingObject?.id === object.id) {
      return;
    }

    hoverObjectRef.current = null;
    object?.disableHighlight();
  };

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

    if (!object || (await isObjectUneditable(object))) {
      clearHighlight();
      return;
    }

    if (engine.objects.editingObject?.id === object?.id) {
      return;
    }

    if (hoverObjectRef.current === object) {
      return;
    }

    clearHighlight();

    object.enableHighlight({
      color: HIGHLIGHT_INACTIVE_COLOR,
    });

    hoverObjectRef.current = object;
  };

  const checkHighlight = (event: PointerEvent) => {
    if (timeoutId) {
      lastPointerEvent = event;
      return;
    }

    if (!canUpdate()) {
      clearHighlight();
      return;
    }

    lastPointerEvent = null;

    timeoutId = setTimeout(async () => {
      await highlightItem(event);

      timeoutId = null;

      if (lastPointerEvent) {
        checkHighlight(lastPointerEvent);
      }
    }, 20);
  };

  useEvent('onPointerMove', checkHighlight);

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

    editor.onEntitySelected(result);
  });

  // clear highlight on unmount
  useEffect(() => {
    return () => {
      hoverObjectRef.current?.disableHighlight();
      hoverObjectRef.current = null;
    };
  }, []);

  return null;
};

export default EntitySelector;
