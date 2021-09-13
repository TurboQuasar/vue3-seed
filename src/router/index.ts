import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
  useRouter,
} from 'vue-router';
import { StateInterface } from '../store';
import { constantRoutes, ErrorRoute } from './routes';
import { AppRouteRecordRaw } from 'router/types';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
  ? createWebHistory
  : createWebHashHistory;
const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [...constantRoutes, ErrorRoute] as unknown as RouteRecordRaw[],

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(
    process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
  ),
});
export default route<StateInterface>(function ({ store }) {
  return router;
});

// reset router
export function resetRouter() {
  const WHITE_NAME_LIST = flatRoutes(constantRoutes);
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
function flatRoutes(arr: AppRouteRecordRaw[]) {
  const newArr: string[] = [];
  arr.forEach((_) => {
    newArr.push(_.name as string);
    _.children && newArr.push(...flatRoutes(_.children));
  });
  return newArr;
}

export { router };
