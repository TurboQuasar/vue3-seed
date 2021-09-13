import { store as st } from 'quasar/wrappers';
import { createStore } from 'vuex';
import auth from './auth';
import { IAuthState } from './auth/state';
import { AppRouteRecordRaw } from 'router/types';
import createPersistedState from 'vuex-persistedstate';
import { i18n } from 'boot/i18n';

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const sessionState = createPersistedState({
  key: 'lzb',
  paths: ['auth.token', 'auth.role', 'auth.tagView', 'auth.user'],
  storage: window.sessionStorage,
});
const localState = createPersistedState({
  key: 'lzb',
  paths: ['auth.lang', 'auth.account', 'auth.password', 'auth.is_remember_pwd'],
  storage: window.localStorage,
});

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  // example: unknown;
  auth: IAuthState;
  route: AppRouteRecordRaw;
}
const store = createStore<StateInterface>({
  modules: {
    // example
    auth,
  },
  plugins: [sessionState, localState],
  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: !!process.env.DEBUGGING,
});
// sync tagView and keepAlive list
store.watch(
  (state, getters) => {
    return state.auth.tagView;
  },
  (newVal) => {
    store.commit('auth/SET_KEEPALIVE_LIST', newVal);
  },
  {
    immediate: true,
    deep: true,
  }
);
// switch lang
store.watch(
  (state, getters) => {
    return state.auth.lang;
  },
  (newVal) => {
    console.log('change to ' + newVal);
    i18n.global.locale = newVal;
  },
  {
    immediate: true,
  }
);
export default st(function (/* { ssrContext } */) {
  return store;
});
export { store };
