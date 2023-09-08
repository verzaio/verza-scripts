import {useEffect, useRef, useState} from 'react';

import {ParticlesManager, ParticlesOptions} from '@verza/sdk';
import {useEngine} from '@verza/sdk/react';
import {button, useControls} from 'leva';

const DEFAULT_OPTIONS = {
  shape: {
    label: 'Shape',
    value: 'square',
    options: {
      Square: 'square',
      Sphere: 'sphere',
    },
  },

  amount: {
    step: 50,
    value: 25,
    min: 1,
    max: 20000,
  },

  position: {
    step: 0.3,
    value: [0, 2, 0],
  },

  direction: {
    step: 0.1,
    value: [0, 1, 0],
  },

  radius: {
    value: 0.5,
    step: 0.5,
    min: 0,
    max: 128,
  },

  distance: {
    value: 1,
    step: 0.2,
    min: 0,
    max: 128,
  },

  spreadAngle: {
    value: 0,
    min: 0,
    max: 90,
  },

  lifetime: {
    step: 0.1,
    value: 1,
    min: 0.1,
    max: 20,
  },

  delay: {
    step: 0.1,
    value: 1,
    min: 0.1,
    max: 20,
  },

  velocity: {
    step: 0.1,
    value: [1, 1.5],
    min: 0,
    max: 10,
  },

  color: '#2b00ff',

  opacity: {
    step: 0.1,
    value: [1, 1],
    min: 0,
    max: 1,
  },

  transparency: {
    step: 0.1,
    value: [0.3, 0.7],
    min: 0,
    max: 1,
  },

  bloom: false,

  size: {
    step: 0.1,
    value: [0.5, 1],
    min: 0.1,
    max: 64,
  },

  zoom: {
    step: 0.1,
    value: [0.3, 0.7],
    min: 0,
    max: 1,
  },

  phi: {
    value: [0, Math.PI],

    step: 0.1,
    min: 0,
    max: Math.PI,
  },

  theta: {
    value: [0, Math.PI * 2],
    step: 0.1,
    min: 0,
    max: Math.PI * 2,
  },
} as const;

export const EditorParticles = () => {
  const {effects} = useEngine();

  const [particles, setParticles] = useState<ParticlesManager | null>(null);

  useEffect(() => {
    const particles = effects.createParticles();
    setParticles(particles);

    return () => {
      setParticles(() => {
        particles.destroy();
        return particles;
      });
    };
  }, [effects]);

  return (
    <>{particles && <Particles key={particles.id} particles={particles} />}</>
  );
};

type ParticlesProps = {
  particles: ParticlesManager;
};

const Particles = ({particles}: ParticlesProps) => {
  const engine = useEngine();

  const propsRef = useRef(DEFAULT_OPTIONS);
  const [props] = useControls('Particles Editor', () => ({
    ...(DEFAULT_OPTIONS as any),

    'Copy Options': button(() => {
      const options = JSON.stringify(propsRef.current, null, 2);

      navigator.clipboard.writeText(options);

      engine.localPlayer.sendSuccessNotification('Copied to clipboard');
    }),
  }));

  delete props['Copy Options'];
  propsRef.current = props as typeof DEFAULT_OPTIONS;

  useEffect(() => {
    particles.setOptions(props as ParticlesOptions);
  }, [particles, props]);

  return null;
};
