<template>
  <v-autocomplete
    :value="value"
    ref="currencyAutocomplete"
    :flow="flow"
    hide-details="auto"
    :items="currenciesNames"
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
  props: ['value', 'flow'],
  data() {
    return {
      currenciesNames: [],
      currenciesCodes: [],
      oldValue: null,
    };
  },
  created() {
    worldCurrencies.forEach((el) => {
      this.currenciesNames.push(el.name);
      this.currenciesCodes.push(el.cc);
    });
  },
  methods: {
    getInput(currencyName) {
      const currencyCode = this.currenciesCodes[this.currenciesNames.indexOf(currencyName)]
        .toLowerCase();
      this.$emit('update', [currencyName, currencyCode]);
    },
  },
};
</script>

<style></style>
