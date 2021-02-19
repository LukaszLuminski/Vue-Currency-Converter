<template>
  <v-app>
    <app-bar />
    <drawer :key="$vuetify.breakpoint.xs"/>
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import AppFooter from './components/AppFooter.vue';
import Drawer from './components/Drawer.vue';

export default {
  components: { Drawer, AppBar, AppFooter },
  name: 'App',
};
</script>
