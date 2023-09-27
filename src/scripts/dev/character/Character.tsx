import {useCallback, useEffect, useState} from 'react';

import FileContainer from '@app/components/shared/FileContainer/FileContainer';
import {
  ParsedResult,
  parseFbx,
  parseGltf,
  parseMask,
} from '@app/utils/parser.utils';
import {CommandParam} from '@verza/sdk';
import {useCommand, useEngine, useEvent} from '@verza/sdk/react';

export const Character = () => {
  const engine = useEngine();

  const [render, setRender] = useState(false);

  useCommand('play', [new CommandParam('name', 'string')]).on(
    async (player, {name}) => {
      const anim = await engine.animations.getAnimation(name);

      if (!anim) {
        player.sendMessage(`Animation "${name}" not found`);
        return;
      }

      player.playAnimation(name, {
        loop: 'repeat',
      });
    },
  );

  useCommand('list').on(async player => {
    const anims = await engine.animations.getAnimations();

    if (!anims.length) {
      player.sendMessage('No available animations');
      return;
    }

    player.sendMessage('Available animations:');
    anims.forEach(anim => {
      player.sendMessage(
        `Name: "${anim.id}" | Duration: ${anim.duration.toFixed(2)}s`,
      );
    });
  });

  useCommand('stop').on(player => {
    player.stopAnimations();
  });

  useEvent('onDragEnter', () => {
    engine.ui.show();
    setRender(true);
  });
  useEvent('onDragLeave', () => {
    engine.ui.hide();
    setRender(false);
  });

  // configure UI
  useEffect(() => {
    engine.localPlayer.sendMessage(
      '{fuchsia}[Animations] Commands: /play [name], /stop, /list',
    );

    engine.ui.setProps({
      zIndex: 10001,
    });
  }, [engine]);

  const onDropFiles = useCallback(
    async (files: File[]) => {
      engine.ui.hide();
      setRender(false);

      const result: ParsedResult = {
        animations: [],
        clothes: [],
        masks: [],
      };

      await Promise.all(
        files.map(async file => {
          engine.localPlayer.sendMessage(
            `{yellow}[Character] Parsing file ${file.name}`,
          );

          const isImage = file.type.includes('image');

          const isGltf =
            file.name.includes('.glb') || file.name.includes('.gltf');

          const isFbx = file.name.includes('.fbx');

          if (isImage) {
            await parseMask(file, result);
            return;
          }

          if (isGltf) {
            await parseGltf(engine.utils.gltfLoader, file, result);
            return;
          }

          if (isFbx) {
            await parseFbx(file, result);
            return;
          }

          engine.localPlayer.sendMessage(
            `{red}[Character] Unsupported file type ${file.name} (${
              file.type ?? 'unknown'
            })`,
          );
        }),
      );

      const hasAssets =
        !!result.masks.length ||
        !!result.animations.length ||
        !!result.clothes.length;

      if (!hasAssets) {
        engine.localPlayer.sendMessage('{red}[Character] No assets found');
        return;
      }

      console.log('result', result);

      const {clothes, animations, masks} = result;

      if (masks.length) {
        engine.localPlayer.sendMessage(
          `{yellow}[Character] Adding masks: ${masks
            .map(e => e.id)
            .join(', ')}`,
        );

        masks.forEach(mask => engine.clothes.addSkinMask(mask));
      }

      if (!clothes.length && masks.length) {
        clothes.push({
          id: 'empty',
        });
      }

      if (clothes.length) {
        engine.localPlayer.sendMessage(
          `{lime}[Character] Adding clothes: ${clothes
            .map(e => e.id)
            .join(', ')}`,
        );

        clothes.forEach(clothe => {
          clothe.masks = masks
            .filter(e => !e.id.endsWith('head') && !e.id.endsWith('color'))
            .map(e => e.id);

          clothe.colorMasks = masks
            .filter(e => e.id.endsWith('color'))
            .map(e => e.id);

          clothe.headMasks = masks
            .filter(e => e.id.endsWith('head'))
            .map(e => e.id);
        });

        console.log(masks);

        clothes.map(clothe => engine.clothes.addClothe(clothe));

        engine.localPlayer.addClothes(clothes, true);
      }

      if (animations.length) {
        engine.localPlayer.sendMessage(
          `{yellow}[Character] Adding animations...`,
        );

        await Promise.all(
          animations.map(async animation => {
            const anims = await engine.animations.addAnimations(animation);

            engine.localPlayer.sendMessage(
              `{lime}[Character] Added ${anims.length} animations. Use /play [name]`,
            );

            anims.forEach(anim => {
              engine.localPlayer.sendMessage(
                `{lime}[Animation] Name: ${anim.id}`,
              );
            });
          }),
        );
      }
    },
    [engine],
  );

  if (!render) return null;

  return (
    <div className="absolute flex h-[50vh] w-[100vw] top-[50vh] items-center justify-center">
      <FileContainer
        onDropFiles={onDropFiles}
        label="Drop Clothes or Animations"
      />
    </div>
  );
};
