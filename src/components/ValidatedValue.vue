<template>
  <v-text-field
    @keypress="isNumber($event)"
    hide-details="auto"
    outlined
    class="mb-2"
    :placeholder="placeholder"
    :disabled="flow === 'to' ? disabled : false"
    dense
    :value="value"
    @input="update"
  />
</template>

<script>
export default {
  name: 'ValidatedValue',
  props: ['value', 'placeholder', 'disabled', 'flow'],
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
