import BoxIcon from './res/objects/box.svg';
import CapsuleIcon from './res/objects/capsule.svg';
import CircleIcon from './res/objects/circle.svg';
import ConeIcon from './res/objects/cone.svg';
import CylinderIcon from './res/objects/cylinder.svg';
import DodecahedronIcon from './res/objects/dodecahedron.svg';
import IcosahedronIcon from './res/objects/icosahedron.svg';
import OctahedronIcon from './res/objects/octahedron.svg';
import PlaneIcon from './res/objects/plane.svg';
import SphereIcon from './res/objects/sphere.svg';
import TetrahedronIcon from './res/objects/tetrahedron.svg';
import TextIcon from './res/objects/text.svg';
import TorusIcon from './res/objects/torus.svg';
import {ObjectsInfo} from './types';
import {createSliderProps} from './utils';

import {formatUrl} from '@app/utils/misc';

export const PANEL_GROUP_OBJECT = 'object';

export const HIGHLIGHT_ACTIVE_COLOR = '#068bff';

export const HIGHLIGHT_INACTIVE_COLOR = '#aeaeae';

export const TOOLBAR_TOGGLE_FREE_LOOK_ID = 'editor_free_look';

export const TOOLBAR_GROUND_ID = 'editor_ground';

export const TOOLBAR_IN_FRONT_ID = 'editor_in_front';

export const TOOLBAR_RESET_ID = 'editor_reset';

export const TOOLBAR_DUPLICATE_ID = 'editor_duplicate';

export const TOOLBAR_DESTROY_ID = 'editor_destroy';

const SIZE_STEP = 0.1;
const MIN_SIZE = 0.1;
const MAX_SIZE = 50;
const M_SEGMENTS = 50;

export const OBJECTS_INFO: Partial<ObjectsInfo> = {
  box: {
    label: 'Box',
    Icon: BoxIcon,
    props: {
      width: createSliderProps('Width', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      height: createSliderProps('Height', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      depth: createSliderProps('Depth', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      radius: createSliderProps('Radius', 0, 1, SIZE_STEP, 0),
      widthSegments: createSliderProps('Width Segments', 1, M_SEGMENTS, 1, 1),
      heightSegments: createSliderProps('Height Segments', 1, M_SEGMENTS, 1, 1),
      depthSegments: createSliderProps('Depth Segments', 1, M_SEGMENTS, 1, 1),
    },
  },
  sphere: {
    label: 'Sphere',
    Icon: SphereIcon,
    props: {
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      widthSegments: createSliderProps('Width Segments', 1, M_SEGMENTS, 1, 1),
      heightSegments: createSliderProps('Height Segments', 1, M_SEGMENTS, 1, 1),
    },
  },
  plane: {
    label: 'Plane',
    Icon: PlaneIcon,
    props: {
      width: createSliderProps('Width', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      height: createSliderProps('Height', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      widthSegments: createSliderProps('Width Segments', 1, M_SEGMENTS, 1, 1),
      heightSegments: createSliderProps('Height Segments', 1, M_SEGMENTS, 1, 1),
      surface: {
        label: 'Is Surface?',
        value: false,
      },
    },
  },
  capsule: {
    label: 'Capsule',
    Icon: CapsuleIcon,
    props: {
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      length: createSliderProps('Length', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      capSegments: createSliderProps('Cap Segments', 1, M_SEGMENTS, 1, 4),
      radialSegments: createSliderProps('Radial Segments', 2, M_SEGMENTS, 1, 8),
    },
  },
  cylinder: {
    label: 'Cylinder',
    Icon: CylinderIcon,
    props: {
      radiusTop: createSliderProps(
        'Radius Top',
        MIN_SIZE,
        MAX_SIZE,
        SIZE_STEP,
        1,
      ),
      radiusBottom: createSliderProps(
        'Radius Bottom',
        MIN_SIZE,
        MAX_SIZE,
        SIZE_STEP,
        1,
      ),
      height: createSliderProps('Height', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      radialSegments: createSliderProps(
        'Radial Segments',
        2,
        M_SEGMENTS,
        1,
        32,
      ),
      heightSegments: createSliderProps('Height Segments', 1, M_SEGMENTS, 1, 1),
      openEnded: {
        label: 'Open Ended',
        value: false,
      },
      thetaStart: createSliderProps('Theta Start', 0, Math.PI * 2, 0.1, 0),
      thetaLength: createSliderProps(
        'Theta Length',
        0,
        Math.PI * 2,
        0.1,
        Math.PI * 2,
      ),
    },
  },
  circle: {
    label: 'Circle',
    Icon: CircleIcon,
    props: {
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      segments: createSliderProps('Segments', 1, M_SEGMENTS, 1, 32),
      thetaStart: createSliderProps('Theta Start', 0, Math.PI * 2, 0.1, 0),
      thetaLength: createSliderProps(
        'Theta Length',
        0,
        Math.PI * 2,
        0.1,
        Math.PI * 2,
      ),
    },
  },
  cone: {
    label: 'Cone',
    Icon: ConeIcon,
    props: {
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      height: createSliderProps('Height', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      radialSegments: createSliderProps(
        'Radial Segments',
        2,
        M_SEGMENTS,
        1,
        32,
      ),
      heightSegments: createSliderProps('Height Segments', 1, M_SEGMENTS, 1, 1),
      openEnded: {
        label: 'Open Ended',
        value: false,
      },
      thetaStart: createSliderProps('Theta Start', 0, Math.PI * 2, 0.1, 0),
      thetaLength: createSliderProps(
        'Theta Length',
        0,
        Math.PI * 2,
        0.1,
        Math.PI * 2,
      ),
    },
  },
  torus: {
    label: 'Torus',
    Icon: TorusIcon,
    props: {
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      tube: createSliderProps('Tube', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      radialSegments: createSliderProps(
        'Radial Segments',
        2,
        M_SEGMENTS,
        1,
        12,
      ),
      tubularSegments: createSliderProps(
        'Tubular Segments',
        2,
        M_SEGMENTS,
        1,
        48,
      ),
      arc: createSliderProps('Arc', 0, Math.PI * 2, 0.1, Math.PI * 2),
    },
  },
  tetrahedron: {
    label: 'Tetrahedron',
    Icon: TetrahedronIcon,
    props: {
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      detail: createSliderProps('Detail', 0, 8, 1, 0),
    },
  },
  dodecahedron: {
    label: 'Dodecahedron',
    Icon: DodecahedronIcon,
    props: {
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      detail: createSliderProps('Detail', 0, 8, 1, 0),
    },
  },
  octahedron: {
    label: 'Octahedron',
    Icon: OctahedronIcon,
    props: {
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      detail: createSliderProps('Detail', 0, 8, 1, 0),
    },
  },
  icosahedron: {
    label: 'Icosahedron',
    Icon: IcosahedronIcon,
    props: {
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      detail: createSliderProps('Detail', 0, 8, 1, 0),
    },
  },
  text: {
    label: 'Text',
    Icon: TextIcon,
    props: {
      text: {
        label: 'Text',
        value: 'Text',
        rows: 3,
      },
      color: {
        label: 'Color',
        value: '#FFFFFF',
      },

      fontSize: createSliderProps('Font Size', 0.1, 10, 0.1, 1),

      font: {
        label: 'Font Family',
        options: {
          Default: null,
          Allura: formatUrl('editor/fonts/Allura.ttf'),
          AmaticSC: formatUrl('editor/fonts/AmaticSC.ttf'),
          Bangers: formatUrl('editor/fonts/Bangers.ttf'),
          Cinzel: formatUrl('editor/fonts/Cinzel.ttf'),
          Cookie: formatUrl('editor/fonts/Cookie.ttf'),
          GloriaHallelujah: formatUrl('editor/fonts/GloriaHallelujah.ttf'),
          GreatVibes: formatUrl('editor/fonts/GreatVibes.ttf'),
          HomemadeApple: formatUrl('editor/fonts/HomemadeApple.ttf'),
          KaushanScript: formatUrl('editor/fonts/KaushanScript.ttf'),
          LibreBaskerville: formatUrl('editor/fonts/LibreBaskerville.ttf'),
          LobsterTwo: formatUrl('editor/fonts/LobsterTwo.ttf'),
          Macondo: formatUrl('editor/fonts/Macondo.ttf'),
          PressStart2P: formatUrl('editor/fonts/PressStart2P.ttf'),
          PTSerif: formatUrl('editor/fonts/PTSerif.ttf'),
          Roboto: formatUrl('editor/fonts/Roboto.ttf'),
          RobotoCondensed: formatUrl('editor/fonts/RobotoCondensed.ttf'),
          Sacramento: formatUrl('editor/fonts/Sacramento.ttf'),
          ShadowsInto: formatUrl('editor/fonts/ShadowsInto.ttf'),
          SpecialElite: formatUrl('editor/fonts/SpecialElite.ttf'),
          Tangerine: formatUrl('editor/fonts/Tangerine.ttf'),
          Yellowtail: formatUrl('editor/fonts/Yellowtail.ttf'),
          MontserratThin: formatUrl('editor/fonts/MontserratThin.ttf'),
          LatoBlack: formatUrl('editor/fonts/LatoBlack.ttf'),
          LatoBlackItalic: formatUrl('editor/fonts/LatoBlackItalic.ttf'),
          LatoRegular: formatUrl('editor/fonts/LatoRegular.ttf'),
          LatoThin: formatUrl('editor/fonts/LatoThin.ttf'),
          MontserratAlternatesBlack: formatUrl(
            'editor/fonts/MontserratAlternatesBlack.ttf',
          ),
          MontserratAlternatesRegular: formatUrl(
            'editor/fonts/MontserratAlternatesRegular.ttf',
          ),
          MontserratAlternatesThin: formatUrl(
            'editor/fonts/MontserratAlternatesThin.ttf',
          ),
          MontserratBlack: formatUrl('editor/fonts/MontserratBlack.ttf'),
          MontserratRegular: formatUrl('editor/fonts/MontserratRegular.ttf'),
          MontserratSubrayadaBold: formatUrl(
            'editor/fonts/MontserratSubrayadaBold.ttf',
          ),
        },

        value: null,
      },

      maxWidth: createSliderProps('Max Width', 0.1, 10, 0.1, 1),

      lineHeight: createSliderProps('Line Height', 0.1, 10, 0.1, 1),

      letterSpacing: createSliderProps('Letter Spacing', 0.1, 10, 0.1, 1),

      textAlign: {
        label: 'Text Align',
        options: ['center', 'left', 'right', 'justify'],
        value: 'left',
      },

      anchorX: {
        label: 'Anchor X',
        options: ['center', 'left', 'right'],
        value: 'center',
      },

      anchorY: {
        label: 'Anchor Y',
        options: ['bottom', 'top', 'middle', 'top-baseline', 'bottom-baseline'],
        value: 'middle',
      },

      direction: {
        label: 'Direction',
        options: ['auto', 'ltr', 'rtl'],
        value: 'auto',
      },

      overflowWrap: {
        label: 'Overflow Wrap',
        options: ['normal', 'break-word'],
        value: 'normal',
      },

      whiteSpace: {
        label: 'White Space',
        options: ['normal', 'nowrap', 'overflowWrap'],
        value: 'normal',
      },

      outlineWidth: createSliderProps('Outline Width', 0, 1, 0.01, 0),

      outlineOffsetX: createSliderProps('Outline Offset X', 0, 5, 0.01, 0),

      outlineOffsetY: createSliderProps('Outline Offset Y', 0, 5, 0.01, 0),

      outlineBlur: createSliderProps('Outline Blur', 0, 5, 0.01, 0),

      outlineColor: {
        label: 'Outline Color',
        value: '#FFFFFF',
      },

      outlineOpacity: createSliderProps('Outline Opacity', 0, 1, 0.01, 1),

      strokeWidth: createSliderProps('Stroke Width', 0, 1, 0.01, 0),

      strokeColor: {
        label: 'Stroke Color',
        value: '#FFFFFF',
      },

      strokeOpacity: createSliderProps('Stroke Opacity', 0, 1, 0.01, 1),

      fillOpacity: createSliderProps('Fill Opacity', 0, 1, 0.01, 1),
    },
  },
};
