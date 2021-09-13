import { AppRouteRecordRaw } from 'router/types';
import { HomeRoute } from 'router/modules/HomeRoute';
import { DemoRoute } from 'router/modules/DemoRoute';
export const asyncRoutesChildren: AppRouteRecordRaw[] = [];
export const asyncRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    meta: {
      title: '',
      icon: '',
    },
    redirect: '/demo/book',
    component: () => import('layouts/MainLayout.vue'),
    children: asyncRoutesChildren,
  },
];
// Always leave this as last one,
// but you can also remove it
export const ErrorRoute: AppRouteRecordRaw = {
  path: '/:catchAll(.*)*',
  component: () => import('pages/Error404.vue'),
  name: 'error404',
  meta: {
    title: '',
  },
};
export const constantRoutes: AppRouteRecordRaw[] = [HomeRoute];
if (process.env.DEV) {
  asyncRoutesChildren.push(DemoRoute);
}
