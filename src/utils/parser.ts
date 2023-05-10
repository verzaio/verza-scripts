import {fileToDataUrl, ClotheItem, SkinMaskItem} from '@verza/sdk';

import {GLTF, GLTFLoader, THREE} from '@verza/sdk/utils';

export type ParsedResult = {
  animations: string[];
  clothes: ClotheItem[];
  masks: SkinMaskItem[];
};

export const parseGltf = async (
  gltfLoader: GLTFLoader,
  file: File,
  result: ParsedResult,
) => {
  let gltf: GLTF = null!;

  try {
    gltf = await gltfLoader.parseAsync(await file.arrayBuffer(), '');
  } catch (e) {
    console.warn(e);
    return result;
  }

  const hasAnimations = !!gltf.animations.length;

  let hasSkeleton = false;

  gltf.scene.traverse((e: unknown) => {
    if ((e as THREE.SkinnedMesh).isSkinnedMesh) {
      hasSkeleton = true;
    }
  });

  if (!hasAnimations && !hasSkeleton) {
    return;
  }

  // debug
  console.log('gltf', gltf);

  if (hasAnimations) {
    const url = await fileToDataUrl(file);

    result.animations.push(url);
    return;
  }

  if (hasSkeleton) {
    const clotheId = file.name.split('.')[0];
    const url = await fileToDataUrl(file);

    result.clothes.push({
      id: clotheId,
      url: url,
    });
    return;
  }
};

export const parseMask = async (file: File, result: ParsedResult) => {
  const url = await fileToDataUrl(file);

  const parts = file.name.split('.')[0];

  const [id, x, y] = parts.split('_');

  result.masks.push({
    id: id,
    url: url,
    position: [+(x ?? 0), +(y ?? 0)],
  });
};
