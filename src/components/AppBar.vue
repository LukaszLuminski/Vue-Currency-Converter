<template>
  <v-system-bar
    id="default-app-bar"
    app
    class="v-bar--underline on-top"
    height="75"
  >
  <v-app-bar absolute color="primary" height="75">
    <v-icon class="white--text ml-2 mr-3" large>mdi-swap-horizontal</v-icon>
    <v-toolbar-title class="white--text font-weight-light text-h6 text-sm-h5">
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
