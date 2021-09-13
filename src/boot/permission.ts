import LoadingBar from 'components/LoadingBar/LoadingBar';
import { constantRoutes } from 'router/routes';
import { config } from 'boot/config';
import { setBreadcrumbs } from 'utils/BreadcrumbsUtils';
import { addTagView } from 'utils/TagViewUtils';
/**
 * Navigation guard and permission verification
 * @param app
 * @param router
 * @param Vue
 * @param store
 * @returns {Promise<void>}
 */
export default ({ app, router, store }) => {
  router.beforeEach((to, from, next) => {
    // Process TAGVIEW and breadcrumbs after successful login
    handleTagViewAndBreadcrumbsAndKeepAlive(from, to, store, app);
    // Simulate obtaining token
    const token = store.state.auth.token;
    const role = store.state.auth.role;
    // There is a token indicating that you have logged in
    if (token) {
      // You cannot access the login interface after logging in
      // There is user authority, and the route is not empty, then let go
      if (role && store.getters['auth/getRoutes'].length) {
        next();
      } else {
        // And set the corresponding route according to the permissions
        store.commit('auth/SET_ROUTES');
        store.getters['auth/getRoutes'].forEach((route) => {
          router.addRoute(route);
        });
        // If addRoutes is not completed, the guard will execute it again
        next({ path: to.path, replace: true });
      }
    } else {
      // go to a route that does not require authorization
      if (
        // constantRoutes.some((item) => {
        //   return item.path === to.path;
        // })
        getIsMatchRoute(constantRoutes, to)
      ) {
        next();
      } else {
        next({ path: '/home' });
      }
    }
  });
  router.afterEach(() => {
    // Use multiple stop() to ensure that LoadingBar is properly closed after dynamically adding routes
    LoadingBar.stop();
    LoadingBar.stop();
  });
};

function getIsMatchRoute(arr, route) {
  return arr.some((item) => {
    if (item?.children?.length) {
      return getIsMatchRoute(item.children, route);
    } else {
      return item.name === route.name;
    }
  });
}

/**
 * Processing tagView and breadcrumbs
 * @param from
 * @param to
 * @param store
 * @param app
 */
function handleTagViewAndBreadcrumbsAndKeepAlive(from, to, store, app) {
  if (to.name) {
    document.title = to.meta.title + config.$title;
    LoadingBar.start();
    // constantRoutes skip
    // for (let i = 0; i < constantRoutes.length; i++) {
    //   if (constantRoutes[i].path === to.path) {
    //     return;
    //   }
    // }
    if (from.fullPath !== to.fullPath) {
      addTagView(to, store);
    }
    setBreadcrumbs(to.matched, to.query, store);
    handleKeepAlive(to);
  }
}

/**
 * Handle redundant layout: router-view and keep the current component under the first layer index <router-view>
 * This method cannot filter the on-demand loading <layout> used for nested routing
 * @param to
 */
function handleKeepAlive(to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i];
      if (element.components.default.name === 'layout') {
        to.matched.splice(i, 1);
        handleKeepAlive(to);
      }
    }
  }
}

/**
 * This method can filter on-demand loading <layout> used for nested routing
 * @param to
 */
// async function handleKeepAlive (to) {
//   if (to.matched && to.matched.length > 2) {
//     for (let i = 0; i < to.matched.length; i++) {
//       const element = to.matched[i]
//       if (element.components.default.name === 'Layout') {
//         to.matched.splice(i, 1)
//         await handleKeepAlive(to)
//       }
//       if (typeof element.components.default === 'function') {
//         await element.components.default()
//         await handleKeepAlive(to)
//       }
//     }
//   }
// }
