import Vue from 'vue';
import Vuex from 'vuex';
import conversions from './modules/conversions';

Vue.use(Vuex);

export default function () {
  const Store = new Vuex.Store({
    modules: {
      conversions,
    },
  });

  return Store;
}
