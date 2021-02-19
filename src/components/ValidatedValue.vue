<template>
  <v-text-field
    @keypress="isNumber($event)"
    hide-details="auto"
    outlined
    class="mb-2"
    dense
    :value="value"
  />
</template>

<script>
export default {
  name: 'ValidatedValue',
  props: {
    value: {
      type: Number,
    },
  },
  methods: {
    isNumber(evt) {
      const event = evt || window.event;
      let bool;
      const charCode = event.which ? event.which : event.keyCode;
      if (
        (charCode === 46 && evt.path[0].value.includes('.'))
        || (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46)
      ) {
        event.preventDefault();
        bool = false;
      } else {
        bool = true;
      }
      console.log(evt.path[0].value);
      return bool;
    },
  },
};
</script>

<style></style>
