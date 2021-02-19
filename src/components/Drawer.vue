<template>
  <v-navigation-drawer
      width="250px"
      :permanent="$vuetify.breakpoint.xs ? false : true"
      app
      class="d-none d-sm-flex"
    >
      <v-list class="pt-2">
        <v-list-item
          v-for="([icon, text], i) in items"
          :key="i"
          link
          @click="i === 0 ?
          $router.push({ path: '/'}) : $router.push({ path: '/saved-conversions'})"
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
export default {
  data: () => ({
    items: [
      ['mdi-cash-multiple', 'Converter'],
      ['mdi-format-list-bulleted', 'Saved conversions'],
    ],
  }),
};
</script>

<style lang="scss" scoped>
.bg-img {
    opacity: .6;
}
</style>
