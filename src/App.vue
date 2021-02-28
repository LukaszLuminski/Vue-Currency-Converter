<template>
  <v-app >
    <app-bar />
    <app-drawer :key="!$vuetify.breakpoint.xs"/>
    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
    <app-footer :key="$vuetify.breakpoint.xs"/>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import AppBar from './components/AppBar.vue';
import AppDrawer from './components/AppDrawer.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: { AppBar, AppFooter, AppDrawer },
  name: 'App',
  created() {
    this.$store.commit('initialiseStore');
    this.$store.subscribe((mutation, state) => {
      localStorage.setItem('store', JSON.stringify(state));
    });
    this.deleteCurrentData();
  },
  methods: {
    ...mapActions(['deleteCurrentData']),
  },
};
</script>

<style lang="scss">
  body {
    background: grey;
  }
</style>
