import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IAuthState } from './state';
import { AccessLogin } from 'models/AccessLogin';
import { Account } from 'models/Account';
import { User } from 'models/User';
const actions: ActionTree<IAuthState, StateInterface> = {
  removeTagView({ commit, state }, payload) {
    commit('REMOVE_TAG_VIEW', payload);
  },
  addTagView({ commit, state }, payload) {
    commit('ADD_TAG_VIEW', payload);
  },
  async login({ commit, dispatch }, payload) {
    const { token } = await AccessLogin.do(payload);
    commit('SET_TOKEN', token);
    commit('SET_ROLE', 'admin');
    await dispatch('updateUser');
  },

  async logout({ commit }, payload) {
    await Account.logout();
    commit('LOGOUT', payload);
  },

  async updateUser({ commit }) {
    const user = await User.get();
    commit('SET_USER', user);
  },
};

export default actions;
