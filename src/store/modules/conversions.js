/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';

const state = {
  conversions: {
    id1: {
      value_from: '1',
      value_to: '1.15',
      currency_from: 'Pound sterling',
      currency_to: 'Euro',
      rate_date: '2020/12/19',
      rate_time: '12:01',
    },
    id2: {
      value_from: '1.15',
      value_to: '1',
      currency_from: 'Euro',
      currency_to: 'Pound sterling',
      rate_date: '2020/12/20',
      rate_time: '12:01',
    },
  },
  idNumber: 3,
};

const mutations = {
  deleteConversion(state, id) {
    Vue.delete(state.conversions, id);
  },
  addConversion(state, payload) {
    Vue.set(state.conversions, payload.id, payload.conversion);
  },
  incrementIdNumber(state) {
    state.idNumber += 1;
  },
};

const actions = {
  deleteConversion({ commit }, number) {
    commit('deleteConversion', number);
  },
  addConversion({ commit }, conversion) {
    commit('incrementIdNumber');
    commit('addConversion', {
      id: `id${state.idNumber}`,
      conversion,
    });
  },
};

const getters = {
  getConversions(state) {
    return state.conversions;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
