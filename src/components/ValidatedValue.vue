<template>
  <v-text-field
    @keypress="isNumber($event)"
    hide-details="auto"
    outlined
    class="mb-2"
    :placeholder="placeholder"
    dense
    :value="value"
    @input="update"
  />
</template>

<script>
export default {
  name: 'ValidatedValue',
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  methods: {
    isNumber(evt) {
      const event = evt || window.event;
      const charCode = event.which ? event.which : event.keyCode;
      if (
        (charCode === 46 && evt.path[0].value.includes('.'))
        || (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46)
      ) {
        event.preventDefault();
      }
    },
    update(val) {
      this.$emit('update', val);
    },
  },
};
</script>

<style></style>
