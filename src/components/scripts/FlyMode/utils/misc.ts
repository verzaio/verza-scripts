import {PlayerControls} from '@verza/sdk';

// Thanks to https://github.com/tamani-coding/threejs-character-controls-example/blob/main/src/characterControls.ts
export const calcDirectionOffset = (controls: PlayerControls) => {
  let directionOffset = null; // w

  if (controls.forward) {
    if (controls.left) {
      directionOffset = Math.PI / 4; // w+a
    } else if (controls.right) {
      directionOffset = -Math.PI / 4; // w+d
    } else {
      directionOffset = 0;
    }
  } else if (controls.backward) {
    if (controls.left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
    } else if (controls.right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
    } else {
      directionOffset = Math.PI; // s
    }
  } else if (controls.left) {
    directionOffset = Math.PI / 2; // a
  } else if (controls.right) {
    directionOffset = -Math.PI / 2; // d
  }

  return directionOffset;
};
