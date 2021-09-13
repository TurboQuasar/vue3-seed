import Layout from 'components/Layout/Layout.vue';
import { AppRouteRecordRaw } from 'router/types';

export const DemoRoute: AppRouteRecordRaw = {
  name: 'demo',
  path: '/demo',
  redirect: '/demo/book',
  component: Layout,
  meta: {
    title: '示例',
    hideChildrenInMenu: true,
  },
  children: [
    {
      name: 'demo-book',
      path: 'book',
      meta: {
        title: '书籍管理',
      },
      component: Layout,
      children: [
        {
          name: 'demo-book-index',
          path: '',
          meta: {
            title: '书籍管理',
          },
          component: () => import('pages/demo/Book/Index.vue'),
        },
      ],
    },
  ],
};
