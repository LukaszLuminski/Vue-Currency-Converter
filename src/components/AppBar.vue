<template>
  <v-system-bar
    id="default-app-bar"
    app
    class="v-bar--underline on-top"
    height="85"
  >
  <v-app-bar absolute color="primary" height="85">
    <v-icon class="white--text ml-2 mr-3" large>mdi-swap-horizontal</v-icon>
    <v-toolbar-title class="white--text font-weight-light text-h5">
      Vue Currency Converter
    </v-toolbar-title>

    <v-spacer />
    </v-app-bar>
  </v-system-bar>
</template>

<script>
export default {
  name: 'AppBar',
};
</script>

<style scoped>
 .on-top {
   z-index: 100;
 }
</style>
