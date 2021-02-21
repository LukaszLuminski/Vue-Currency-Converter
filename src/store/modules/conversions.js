/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Vue from 'vue';

const state = {
  conversions: {
  },
  idNumber: 1,
};

const mutations = {
  initialiseStore(state) {
    if (localStorage.getItem('store')) {
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store'))),
      );
    }
  },
  deleteConversion(state, id) {
    Vue.delete(state.conversions, id);
  },
  deleteCurrentData(state) {
    state.currentData = null;
  },
  addConversion(state, payload) {
    Vue.set(state.conversions, payload.id, payload.conversion);
  },
  incrementIdNumber(state) {
    state.idNumber += 1;
  },
};

const actions = {
  deleteConversion({ commit }, id) {
    commit('deleteConversion', id);
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
  state,
  getters,
  actions,
  mutations,
};
