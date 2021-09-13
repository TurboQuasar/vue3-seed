import { AppRouteRecordRaw } from 'router/types';

export const HomeRoute: AppRouteRecordRaw = {
  path: '/home',
  name: 'home',
  meta: {
    title: '首页',
    icon: '',
    keepAlive: true,
    hideInMenu: true,
  },
  redirect: '/home/login-register',
  component: () => import('layouts/HomeLayout.vue'),
  children: [
    {
      path: 'login-register',
      name: 'login-register',
      meta: {
        title: '登录/注册',
        icon: '',
        keepAlive: true,
        hideInMenu: true,
      },
      component: () => import('pages/home/LoginRegister/Index.vue'),
    },
    {
      path: 'link/:id',
      name: 'link',
      meta: {
        title: '协议',
        icon: '',
        keepAlive: false,
        hideInMenu: true,
        hideFooter: true,
        hideHeader: true,
      },
      props: true,
      component: () => import('pages/home/Link/Index.vue'),
    },
  ],
};
