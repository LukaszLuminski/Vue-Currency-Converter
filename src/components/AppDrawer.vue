<template>
  <v-navigation-drawer
      width="235px"
      :permanent="$vuetify.breakpoint.xs ? false : true"
      app
      class="d-none d-sm-flex"
    >
      <v-list class="pt-3 pl-3">
        <v-list-item
          v-for="([icon, text, to], i) in items"
          :key="i"
          link
          @click="$router.push({ path: to })"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import navItems from '../utils/navItems';

export default {
  name: 'AppDrawer',
  data: () => ({
    items: navItems,
  }),
};
</script>

<style lang="scss" scoped>
.bg-img {
    opacity: .6;
}
</style>
