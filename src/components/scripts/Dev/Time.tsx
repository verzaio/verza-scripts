import PanelWidget from '@app/components/core/PanelWidget';
import Provider from '@app/components/core/Provider';
import {useFrame, useUI, useWorld} from '@verza/sdk/react';
import {useControls} from 'leva';
import {useEffect, useRef} from 'react';

const Time = () => {
  return (
    <Provider>
      <TimeRender />
    </Provider>
  );
};

const TimeRender = () => {
  const world = useWorld();
  const ui = useUI();

  const originalTime = useRef(14 * 4600);

  const {time, interiorMode, autoTime} = useControls({
    time: {
      value: originalTime.current / 60,
      min: 0,
      max: 60 * 24,
      step: 1,
    },

    interiorMode: false,

    autoTime: false,
  });

  useFrame(delta => {
    if (!autoTime) return;

    const newTime = 1000 * delta + originalTime.current;

    if (newTime > 24 * 3600) {
      originalTime.current = 0;
    } else {
      originalTime.current = newTime;
    }

    world.setTime(originalTime.current);
  });

  useEffect(() => {
    world.setTimeMode('fixed');
    world.setTime(time * 60);
    world.setInteriorMode(interiorMode);
  }, [world, time, interiorMode]);

  // show/hide ui
  useEffect(() => {
    ui.setProps({
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',

      zIndex: 1,
    });
    ui.show();

    return () => {
      return ui.hide();
    };
  }, [ui]);

  return (
    <>
      <div
        className="fade-in"
        onPointerDown={e => e.stopPropagation()}
        onPointerUp={e => e.stopPropagation()}>
        <PanelWidget
          collapsed
          title="Time"
          position={{
            x: 0,
            y: 400,
          }}
        />
      </div>
    </>
  );
};

export default Time;
