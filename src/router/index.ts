import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';

export const defaultRoutePath = '/home';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
