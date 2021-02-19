<template>
  <v-autocomplete
    :value="value"
    ref="currencyAutocomplete"
    :flow="flow"
    hide-details="auto"
    :items="currencies"
    auto-select-first
    outlined
    dense
    class="mb-2"
    @change="getInput"
  />
</template>

<script>
import worldCurrencies from '../utils/worldCurrencies';

export default {
  name: 'ValidatedCurrency',
  props: {
    value: {
      type: String,
    },
    flow: {
      type: String,
    },
  },
  data() {
    return {
      currencies: [],
      oldValue: null,
    };
  },
  created() {
    worldCurrencies.forEach((el) => {
      this.currencies.push(el.name);
    });
  },
  methods: {
    getInput(val) {
      this.$emit('update', val);
    },
  },
};
</script>

<style></style>
