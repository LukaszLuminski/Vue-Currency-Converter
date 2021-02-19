<template>
  <v-footer app class="d-flex d-sm-none justify-center py-5">
      <div v-for="([icon, text], i) in items" :key="i">
        <v-btn text link
          ><v-icon left>
            {{ icon }} </v-icon
          >{{ text }}</v-btn
        >
      </div>
    </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data: () => ({
    items: [
      ['mdi-cash-multiple', 'Converter'],
      ['mdi-format-list-bulleted', 'Saved conversions'],
    ],
  }),

};
</script>

<style>

</style>
