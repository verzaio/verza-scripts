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
import {ObjectsInfo, ObjectMaterial, ObjectMaterialOption} from './types';
import {createSliderProps} from './utils';

import {formatUrl} from '@app/utils/misc';
import {
  AddOperation,
  BackSide,
  ClampToEdgeWrapping,
  DoubleSide,
  EquirectangularReflectionMapping,
  EquirectangularRefractionMapping,
  FrontSide,
  LinearFilter,
  LinearMipmapLinearFilter,
  LinearMipmapNearestFilter,
  LinearSRGBColorSpace,
  MirroredRepeatWrapping,
  MixOperation,
  MultiplyOperation,
  NearestFilter,
  NearestMipmapLinearFilter,
  NearestMipmapNearestFilter,
  NoColorSpace,
  ObjectSpaceNormalMap,
  ObjectTexture,
  PickObjectProps,
  RepeatWrapping,
  SRGBColorSpace,
  TangentSpaceNormalMap,
  UVMapping,
} from '@verza/sdk';

export const PANEL_GROUP_OBJECT = 'object';

export const HIGHLIGHT_ACTIVE_COLOR = '#068bff';

export const HIGHLIGHT_INACTIVE_COLOR = '#aeaeae';

export const TOOLBAR_TOGGLE_FREE_LOOK_ID = 'editor_free_look';

export const TOOLBAR_GROUND_ID = 'editor_ground';

export const TOOLBAR_IN_FRONT_ID = 'editor_in_front';

export const TOOLBAR_RESET_ID = 'editor_reset';

export const TOOLBAR_DUPLICATE_ID = 'editor_duplicate';

export const TOOLBAR_DESTROY_ID = 'editor_destroy';

const SIZE_STEP = 0.01;
const MIN_SIZE = 0.1;
const MAX_SIZE = 50;
const M_SEGMENTS = 50;

export const EDITOR_FOLDERS_REL: Record<string, string> = {
  Settings: 'Settings',
  Object: 'Object',
  Transforms: 'Transforms',
  Material: 'Material',
  Properties: 'Properties',
  Texture: 'Material.Texture',
  'Normal Map': 'Material.Normal Map',
  'Environment Map': 'Material.Environment Map',
  'Light Map': 'Material.Light Map',
  'Rougness Map': 'Material.Rougness Map',
  'Displacement Map': 'Material.Displacement Map',
  'Bump Map': 'Material.Bump Map',
  'Specular Map': 'Material.Specular Map',
  'Specular Intensity Map': 'Material.Specular Intensity Map',
  'Specular Color Map': 'Material.Specular Color Map',
  'Metalness Map': 'Material.Metalness Map',
  'Ambient Occlusion Map': 'Material.Ambient Occlusion Map',
  'Alpha Map': 'Material.Alpha Map',
  'Clearcoat Map': 'Material.Clearcoat Map',
  'Clearcoat Roughness Map': 'Material.Clearcoat Roughness Map',
  'Clearcoat Normal Map': 'Material.Clearcoat Normal Map',
  'Transmission Map': 'Material.Transmission Map',
  'Thickness Map': 'Material.Thickness Map',
  'Sheen Color Map': 'Material.Sheen Color Map',
  'Sheen Roughness Map': 'Material.Sheen Roughness Map',
  'Emissive Map': 'Material.Emissive Map',
};

const FONTS: Record<string, string | null> = {
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
};

export const OBJECTS_INFO: Partial<ObjectsInfo> = {
  box: {
    label: 'Box',
    Icon: BoxIcon,
    props: {
      width: createSliderProps('Width', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      height: createSliderProps('Height', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      depth: createSliderProps('Depth', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1),
      radius: createSliderProps('Radius', 0, 1, 0.01, 0),
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
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 0.6),
      length: createSliderProps('Length', MIN_SIZE, MAX_SIZE, SIZE_STEP, 1.5),
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
        0.5,
      ),
      radiusBottom: createSliderProps(
        'Radius Bottom',
        MIN_SIZE,
        MAX_SIZE,
        SIZE_STEP,
        0.5,
      ),
      height: createSliderProps('Height', MIN_SIZE, MAX_SIZE, SIZE_STEP, 2),
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
      radius: createSliderProps('Radius', MIN_SIZE, MAX_SIZE, SIZE_STEP, 0.5),
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
      tube: createSliderProps('Tube', 0.01, MAX_SIZE, 0.01, 1),
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
        options: FONTS,

        value: null,
      },

      textAlign: {
        label: 'Text Align',
        options: [
          'center',
          'left',
          'right',
          'justify',
        ] satisfies PickObjectProps<'text'>['textAlign'][],
        value: 'left',
      },

      maxWidth: createSliderProps('Max Width', 0.1, 10, 0.1, 1),

      lineHeight: createSliderProps('Line Height', 0.1, 10, 0.1, 1),

      letterSpacing: createSliderProps('Letter Spacing', 0.1, 10, 0.1, 1),

      anchorX: {
        label: 'Anchor X',
        options: [
          'center',
          'left',
          'right',
        ] satisfies PickObjectProps<'text'>['anchorX'][],
        value: 'center',
      },

      anchorY: {
        label: 'Anchor Y',
        options: [
          'bottom',
          'top',
          'middle',
          'top-baseline',
          'bottom-baseline',
        ] satisfies PickObjectProps<'text'>['anchorY'][],
        value: 'middle',
      },

      direction: {
        label: 'Direction',
        options: [
          'auto',
          'ltr',
          'rtl',
        ] satisfies PickObjectProps<'text'>['direction'][],
        value: 'auto',
      },

      overflowWrap: {
        label: 'Overflow Wrap',
        options: [
          'normal',
          'break-word',
        ] satisfies PickObjectProps<'text'>['overflowWrap'][],
        value: 'normal',
      },

      whiteSpace: {
        label: 'White Space',
        options: [
          'normal',
          'nowrap',
          'overflowWrap',
        ] satisfies PickObjectProps<'text'>['whiteSpace'][],
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

const COLOR_OPTIONS = {
  'No Color': NoColorSpace,
  sRGB: SRGBColorSpace,
  'Linear sRGB': LinearSRGBColorSpace,
  //'Display P3': DisplayP3ColorSpace,
};

const TEXTURE_SHARED_OPTIONS: Partial<
  Record<keyof ObjectTexture, ObjectMaterialOption>
> = {
  magFilter: {
    label: 'Mag Filter',
    options: {
      Linear: LinearFilter,
      Nearest: NearestFilter,
    },
    value: LinearFilter,
  },

  minFilter: {
    label: 'Min Filter',
    options: {
      Linear: LinearFilter,
      Nearest: NearestFilter,
      'Nearest Mipmap Nearest': NearestMipmapNearestFilter,
      'Nearest Mipmap Linear': NearestMipmapLinearFilter,
      'Linear Mipmap Nearest': LinearMipmapNearestFilter,
      'Linear Mipmap Linear': LinearMipmapLinearFilter,
    },
    value: LinearMipmapLinearFilter,
  },

  /* anisotropy: {
    label: 'Anisotropy',
    min: 0,
    max: 1,
    step: 0.01,
    value: 1,
  }, */
};

export const TEXTURE_NO_COLOR_OPTION: Partial<
  Record<keyof ObjectTexture, ObjectMaterialOption>
> = {
  source: {
    label: 'Source',
    file: null,
    isAsset: true,
  },

  colorSpace: {
    label: 'Color Space',
    options: COLOR_OPTIONS,
    value: NoColorSpace,
  },
};

export const TEXTURE_SRGB_OPTION: Partial<
  Record<keyof ObjectTexture, ObjectMaterialOption>
> = {
  source: {
    label: 'Source',
    file: null,
    isAsset: true,
  },

  colorSpace: {
    label: 'Color Space',
    options: COLOR_OPTIONS,
    value: SRGBColorSpace,
  },
};

export const TEXTURE_OPTION = () => {
  const options: Partial<Record<keyof ObjectTexture, ObjectMaterialOption>> = {
    source: {
      label: 'Source',
      file: null,
      isAsset: true,
    },

    offset: {
      label: 'Offset',
      step: 0.1,
      value: [0, 0],
      joystick: false,
    },

    repeat: {
      label: 'Repeat',
      step: 0.1,
      value: [1, 1],
      joystick: false,
    },

    center: {
      label: 'Center',
      step: 0.1,
      value: [0, 0],
      joystick: false,
    },

    rotation: {
      label: 'Rotation',
      min: 0,
      max: Math.PI * 2,
      step: 0.1,
      value: Math.PI * 2,
    },

    wrapS: {
      label: 'Wrap S',
      options: {
        Repeat: RepeatWrapping,
        'Clamp To Edge': ClampToEdgeWrapping,
        'Mirrored Repeat': MirroredRepeatWrapping,
      },
      value: ClampToEdgeWrapping,
    },

    wrapT: {
      label: 'Wrap T',
      options: {
        Repeat: RepeatWrapping,
        'Clamp To Edge': ClampToEdgeWrapping,
        'Mirrored Repeat': MirroredRepeatWrapping,
      },
      value: ClampToEdgeWrapping,
    },

    ...TEXTURE_SHARED_OPTIONS,

    colorSpace: {
      label: 'Color Space',
      options: COLOR_OPTIONS,
      value: SRGBColorSpace,
    },

    mapping: {
      label: 'Mapping',
      options: {
        UV: UVMapping,
        'Equirectangular Reflection': EquirectangularReflectionMapping,
        'Equirectangular Refraction': EquirectangularRefractionMapping,
      },
      value: UVMapping,
    },

    flipY: {
      label: 'Flip Y',
      value: true,
    },
  };

  return options;
};

export const OBJECTS_MATERIAL_PROPS: Partial<ObjectMaterial> = {
  wireframe: {
    label: 'Wireframe',
    value: false,
  },

  type: {
    label: 'Type',
    options: {
      Basic: 'basic',
      Standard: 'standard',
      Physical: 'physical',
      Normal: 'normal',
      Depth: 'depth',
    },
    value: 'standard',
  },

  side: {
    label: 'Side',
    options: {
      Front: FrontSide,
      Back: BackSide,
      Both: DoubleSide,
    },
    value: FrontSide,
  },

  color: {
    label: 'Color',
    value: '#ffffff',
    types: ['basic', 'standard', 'physical'],
  },

  transparent: {
    label: 'Transparent',
    value: false,
  },

  opacity: {
    label: 'Opacity',
    step: 0.01,
    min: 0,
    max: 1,
    value: 1,
  },

  /* alphaTest: {
    label: 'Alpha Test',
    step: 0.01,
    min: 0,
    max: 1,
    value: 0,
  }, */

  roughness: {
    label: 'Roughness',
    step: 0.01,
    min: 0,
    max: 1,
    value: 1,

    types: ['standard', 'physical'],
  },

  metalness: {
    label: 'Metalness',
    step: 0.01,
    min: 0,
    max: 1,
    value: 0,

    types: ['standard', 'physical'],
  },

  reflectivity: {
    label: 'Reflectivity ',
    step: 0.01,
    min: 0,
    max: 1,
    value: 1,

    types: ['basic', 'physical'],
  },

  refractionRatio: {
    label: 'Refraction Ratio',
    step: 0.01,
    min: 0,
    max: 0.98,
    value: 1,

    types: ['basic'],
  },

  combine: {
    label: 'Combine',
    options: {
      Multiply: MultiplyOperation,
      Mix: MixOperation,
      Add: AddOperation,
    },
    value: MultiplyOperation,

    types: ['basic'],
  },

  ior: {
    label: 'Clearcoat',
    step: 0.01,
    min: 0,
    max: 2.333,
    value: 1.5,

    types: ['physical'],
  },

  sheen: {
    label: 'Sheen',
    step: 0.01,
    min: 0,
    max: 1,
    value: 0,

    types: ['physical'],
  },

  sheenRoughness: {
    label: 'Sheen Roughness',
    step: 0.01,
    min: 0,
    max: 1,
    value: 0,

    types: ['physical'],
  },

  sheenColor: {
    label: 'Sheen Color',
    value: '#ffffff',

    types: ['physical'],
  },

  clearcoat: {
    label: 'Clearcoat',
    step: 0.01,
    min: 0,
    max: 1,
    value: 0,

    types: ['physical'],
  },

  clearcoatRoughness: {
    label: 'Clearcoat Roughness',
    step: 0.01,
    min: 0,
    max: 1,
    value: 0,

    types: ['physical'],
  },

  thickness: {
    label: 'Thickness',
    step: 0.01,
    min: 0,
    max: 1,
    value: 0,

    types: ['physical'],
  },

  transmission: {
    label: 'Transmission',
    step: 0.01,
    min: 0,
    max: 1,
    value: 0,

    types: ['physical'],
  },

  specularColor: {
    label: 'Specular Color',
    value: '#ffffff',

    types: ['physical'],
  },

  map: {
    label: 'Texture',

    folder: {
      ...TEXTURE_OPTION(),
    },

    types: ['standard', 'physical', 'basic'],
  },

  normalMap: {
    label: 'Normal Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      normalScale: {
        label: 'Scale',
        step: 0.01,
        value: [1, 1],
        joystick: false,

        setterFromParent: true,
      },

      normalMapType: {
        label: 'Type',
        options: {
          'Tangent Space': TangentSpaceNormalMap,
          'Object Space': ObjectSpaceNormalMap,
        },
        value: TangentSpaceNormalMap,

        setterFromParent: true,
      },

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical'],
  },

  envMap: {
    label: 'Environment Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      envMapIntensity: {
        label: 'Intensity',
        step: 0.01,
        min: 0,
        max: 1,
        value: 1,

        setterFromParent: true,
      },

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical', 'basic'],
  },

  lightMap: {
    label: 'Light Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      lightMapIntensity: {
        label: 'Intensity',
        step: 0.01,
        min: 0,
        max: 1,
        value: 1,

        setterFromParent: true,
      },

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical', 'basic'],
  },

  roughnessMap: {
    label: 'Rougness Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical'],
  },

  displacementMap: {
    label: 'Displacement Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      displacementScale: {
        label: 'Scale',
        step: 0.1,
        min: -5,
        max: 5,
        value: 1,

        setterFromParent: true,
      },

      displacementBias: {
        label: 'Bias',
        step: 0.1,
        min: -5,
        max: 5,
        value: 0,

        setterFromParent: true,
      },

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical'],
  },

  bumpMap: {
    label: 'Bump Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      bumpMapScale: {
        label: 'Scale',
        step: 0.01,
        value: [1, 1],
        joystick: false,

        setterFromParent: true,
      },

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical'],
  },

  specularMap: {
    label: 'Specular Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['basic'],
  },

  specularIntensityMap: {
    label: 'Specular Intensity Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      specularIntensity: {
        label: 'Intensity',
        step: 0.01,
        min: 0,
        max: 1,
        value: 1,

        setterFromParent: true,
      },

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['physical'],
  },

  specularColorMap: {
    label: 'Specular Color Map',

    folder: {
      ...TEXTURE_SRGB_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['physical'],
  },

  metalnessMap: {
    label: 'Metalness Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical'],
  },

  aoMap: {
    label: 'Ambient Occlusion Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      aoMapIntensity: {
        label: 'Intensity',
        step: 0.01,
        min: 0,
        max: 1,
        value: 1,

        setterFromParent: true,
      },

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical', 'basic'],
  },

  alphaMap: {
    label: 'Alpha Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical', 'basic'],
  },

  clearcoatMap: {
    label: 'Clearcoat Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['physical'],
  },

  clearcoatRoughnessMap: {
    label: 'Clearcoat Roughness Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['physical'],
  },

  clearcoatNormalMap: {
    label: 'Clearcoat Normal Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      clearcoatNormalScale: {
        label: 'Scale',
        step: 0.01,
        value: [1, 1],
        joystick: false,

        setterFromParent: true,
      },

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['physical'],
  },

  transmissionMap: {
    label: 'Transmission Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['physical'],
  },

  thicknessMap: {
    label: 'Thickness Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['physical'],
  },

  sheenColorMap: {
    label: 'Sheen Color Map',

    folder: {
      ...TEXTURE_SRGB_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['physical'],
  },

  sheenRoughnessMap: {
    label: 'Sheen Roughness Map',

    folder: {
      ...TEXTURE_NO_COLOR_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['physical'],
  },

  emissiveMap: {
    label: 'Emissive Map',

    folder: {
      ...TEXTURE_SRGB_OPTION,

      ...TEXTURE_SHARED_OPTIONS,
    },

    collapsed: true,

    types: ['standard', 'physical'],
  },

  emissive: {
    label: 'Emissive Color',
    value: '#000000',

    types: ['standard', 'physical'],
  },

  emissiveIntensity: {
    label: 'Emissive Intensity',
    step: 0.01,
    min: 0,
    max: 1,
    value: 1,

    types: ['standard', 'physical'],
  },

  flatShading: {
    label: 'Flat Shading',
    value: false,

    types: ['standard', 'physical', 'normal'],
  },

  colorWrite: {
    label: 'Other',

    folder: {
      depthTest: {
        label: 'Depth Test',
        value: true,

        setterFromParent: true,
      },
      depthWrite: {
        label: 'Depth Write',
        value: true,

        setterFromParent: true,
      },
      colorWrite: {
        label: 'Color Write',
        value: true,

        setterFromParent: true,
      },
      vertexColors: {
        label: 'Vertex Colors',
        value: false,

        setterFromParent: true,
      },
    },

    collapsed: true,
  },
};
