import { URL, fileURLToPath } from 'node:url';

import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Pages from 'vite-plugin-pages';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';
import { presetAttributify, presetUno } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import { name } from './package.json';

const loadIcons = (names: ('home')[]) => {
  return names.reduce((pre, cur) => {
    pre[cur] = readFileSync(`./src/assets/icons/${cur}.svg`).toString();
    return pre;
  }, {} as Record<typeof names[number], string>);
};

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${name}/`,
  plugins: [
    vue(),
    vueJsx(),
    Pages({
      dirs: 'src/views',
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    UnoCSS({
      shortcuts: {},
      presets: [
        presetAttributify({}),
        presetUno(),
        presetIcons({
          collections: {
            b: loadIcons(['home']),
          },
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
