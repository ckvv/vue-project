import { createRouter, createWebHashHistory } from 'vue-router';
import routes from '~pages';

export const defaultRoutePath = '/home';
const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    redirect: defaultRoutePath,
  },
  ...routes,
  {
    path: '/:pathMatch(.*)*',
    redirect: defaultRoutePath,
  }],
});

export default router;
