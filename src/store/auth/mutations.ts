import { MutationTree, useStore } from 'vuex';
import { IAuthState } from './state';
import { cloneDeep } from 'lodash';
import { asyncRoutes } from 'router/routes';
import { resetRouter, router } from 'router/index';
import { AppRouteRecordRaw } from 'router/types';
import { store } from 'store/index';
import CryptoJS from 'crypto-js';
import { removeATagView, removeOneSide } from 'utils/TagViewUtils';

/**
 * 用于根据用户角色，生成过滤后的路由
 * 构造符合权限的路由，将不符合权限的路由过滤 （广度优先）
 * @param router 未过滤的路由 因为最外层有一层用来做布局的 {index} 路由，{index} 路由不参与权限过滤，所以传的是 index[0].children
 * @param t 暂存变量
 * @returns {*} 过滤后的路由
 */
function constructionRouters(router, t: AppRouteRecordRaw[] = []) {
  const role = store.getters['auth/getRole'];
  t = router.filter((item) => {
    // 如果 roles 没有被设置，则所有人均可访问
    if (!item.meta.roles || item.meta.roles.length === 0) return true;
    return item.meta.roles.indexOf(role) !== -1;
  });
  for (const i in t) {
    if (t[i].children) {
      t[i].children = constructionRouters(t[i].children);
    }
  }
  return t;
}

const mutation: MutationTree<IAuthState> = {
  SET_TOKEN: (state, payload) => {
    state.token = payload;
  },

  SET_LANG: (state, payload) => {
    state.lang = payload;
  },

  SET_ROLE: (state, payload) => {
    state.role = payload;
  },

  SET_USER: (state, payload) => {
    state.user = payload;
  },

  /**
   * Set the user type, and obtain authorized routing according to permissions
   * @param state
   * @param payload
   * @constructor
   */
  SET_ROUTES: (state, payload) => {
    const accessRoutes = cloneDeep(asyncRoutes);
    accessRoutes[0].children = constructionRouters(accessRoutes[0].children);
    state.routes = accessRoutes;
  },

  /**
   * sign out
   * @param state
   * @param payload
   * @constructor
   */
  LOGOUT: (state, payload) => {
    state.token = '';
    state.role = '';
    state.routes = [];
    state.tagView = [];
    resetRouter();
  },

  /**
   * Add tagView
   * @param state
   * @param payload
   * @constructor
   */
  ADD_TAG_VIEW: (state, payload) => {
    const size = state.tagView.length;
    // When entering or refreshing the page for the first time & the current route is not the root route
    if (!size && payload.fullPath !== '/') {
      state.tagView.push(payload);
      return;
    }
    // To avoid adding tagView repeatedly. Construct an array t[] identified by fullPath
    const t: string[] = [];
    for (let i = 0; i < size; i++) {
      t.push(state.tagView[i].fullPath);
    }
    // If there is no current route in t[]
    if (t.indexOf(payload.fullPath) === -1) {
      state.tagView.push(payload);
    }
  },

  /**
   * set tagView
   * @param state
   * @param payload
   * @constructor
   */
  SET_TAG_VIEW: (state, payload) => {
    state.tagView = payload;
  },

  /**
   * remove tagView
   * case 'undefined' : Remove all tagView
   * case 'object' : Remove one side tagView
   * default 'The subscript i of the element to be deleted ' : Remove the i-th tagView
   *          If the first tagView is removed, jump to the current first tagView
   *          If the last tagView is removed, jump to the current last tagView
   * @param state
   * @param payload
   * @constructor
   */
  REMOVE_TAG_VIEW: (state, payload) => {
    switch (typeof payload) {
      case 'undefined':
        // remove all tagView
        state.tagView = [];
        router.push('/');
        break;
      case 'object':
        removeOneSide(state, payload);
        break;
      default:
        removeATagView(state, payload);
        break;
    }
  },

  /**
   * Set breadcrumbs
   * @param state
   * @param payload
   * @constructor
   */
  SET_BREADCRUMBS: (state, payload) => {
    state.breadcrumbs = payload;
  },

  /**
   * Set cache list according to tagView
   * @param state
   * @param payload tagView[]
   */
  SET_KEEPALIVE_LIST: (state, payload) => {
    state.keepAliveList = [];
    for (let i = 0; i < payload.length; i++) {
      if (payload[i].keepAlive) {
        state.keepAliveList.push(payload[i].name);
      }
    }
    // If you need to cache the homepage, as shown below,
    // push the corresponding routing component name at the end of the method.
    // state.keepAliveList.push('home')
  },

  SET_ACCOUNT_PASSWORD: (
    state,
    payload: { account: string; password: string }
  ) => {
    state.account = payload.account;
    state.password = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(payload.password)
    );
  },
  SET_IS_REMEMBER_PWD: (state, payload: number) => {
    state.is_remember_pwd = payload;
  },
};

export default mutation;
