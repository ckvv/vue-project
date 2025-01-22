import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';

import { name } from './package.json';

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
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
