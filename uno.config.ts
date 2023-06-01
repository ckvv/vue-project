import { readFileSync } from 'node:fs';
import { defineConfig, presetAttributify, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';

const loadIcons = (names: string[]) => {
  return names.reduce((pre, cur) => {
    pre[cur] = readFileSync(`./src/assets/icons/${cur}.svg`).toString();
    return pre;
  }, {} as Record<typeof names[number], string>);
};

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
        b: loadIcons(['home']),
      },
    }),
  ],
});
