import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import presetIcons from '@unocss/preset-icons';

import { defineConfig, presetAttributify, presetUno } from 'unocss';

export default defineConfig({
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex items-center justify-center',
  },
  presets: [
    presetAttributify({}),
    presetUno(),
    presetIcons({
      collections: {
        b: FileSystemIconLoader('./src/assets/icons'),
      },
    }),
  ],
});
