import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { IAuthState } from './state';
import CryptoJS from 'crypto-js';

const getters: GetterTree<IAuthState, StateInterface> = {
  getLang: (state) => {
    return state.lang;
  },
  getToken: (state) => {
    return state.token;
  },
  getRole: (state) => {
    return state.role;
  },
  getRoutes: (state) => {
    return state.routes;
  },
  getTagView: (state) => {
    return state.tagView;
  },
  getBreadcrumbs: (state) => {
    return state.breadcrumbs;
  },
  getKeepAliveList: (state) => {
    return state.keepAliveList;
  },

  getAccountPassword: (state) => {
    return {
      account: state.account,
      password: state.password
        ? CryptoJS.enc.Base64.parse(state.password).toString(CryptoJS.enc.Utf8)
        : state.password,
    };
  },

  getIsRememberPwd: (state) => {
    return state.is_remember_pwd;
  },

  getAccount: (state) => {
    return state.user?.user;
  },
};

export default getters;
