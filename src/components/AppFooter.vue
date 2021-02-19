<template>
  <v-footer app class="white bordered d-flex d-sm-none justify-center py-5">
    <div class="border-top" />
    <div v-for="([icon, text, to], i) in items" :key="i">
      <v-btn
        text
        link
        @click="$router.push({ path: to })"
        ><v-icon left> {{ icon }} </v-icon>{{ text }}</v-btn
      >
    </div>
  </v-footer>
</template>

<script>
import navItems from '../utils/navItems';

export default {
  name: 'AppFooter',
  data: () => ({
    items: navItems,
  }),
};
</script>

<style lang="scss" scoped>
 .border-top {
   position: absolute;
   top: 0;
   width: 100%;
   height: 1px;
  background-color: rgba(0, 0, 0, 0.12)
 }
</style>
