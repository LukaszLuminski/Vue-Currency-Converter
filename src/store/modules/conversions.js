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
    delete state.currentData;
  },
  addConversion(state, payload) {
    Vue.set(state.conversions, payload.id, payload.conversion);
  },
  addCurrentData(state, payload) {
    Vue.set(state, 'currentData', payload);
  },
  incrementIdNumber(state) {
    state.idNumber += 1;
  },
};

const actions = {
  deleteConversion({ commit }, id) {
    commit('deleteConversion', id);
  },
  deleteCurrentData({ commit }) {
    commit('deleteCurrentData');
  },
  addConversion({ commit }, conversion) {
    commit('incrementIdNumber');
    commit('addConversion', {
      id: `id${state.idNumber}`,
      conversion,
    });
  },
  addCurrentData({ commit }, payload) {
    commit('addCurrentData', payload);
  },
};

const getters = {
  getConversions(state) {
    return state.conversions;
  },
  getCurrentData(state) {
    let data;
    if (state.currentData) {
      data = state.currentData;
    } else {
      data = null;
    }
    return data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
