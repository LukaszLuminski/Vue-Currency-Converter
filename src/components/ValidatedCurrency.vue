<template>
  <v-select
    v-if="this.$vuetify.breakpoint.xs"
    :value="value"
    hide-details="auto"
    :items="currenciesNames"
    :disabled="disabled"
    auto-select-first
    :placeholder="placeholder"
    outlined
    dense
    class="mb-2"
    @change="getInput"
  />
  <v-autocomplete
    v-else
    :value="value"
    hide-details="auto"
    :items="currenciesNames"
    :disabled="disabled"
    auto-select-first
    :placeholder="placeholder"
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
    placeholder: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    flow: {
      type: String,
    },
  },
  data() {
    return {
      currenciesNames: [],
      currenciesCodes: [],
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
      this.$emit('update', [this.flow, currencyName, currencyCode]);
    },
  },
};
</script>

<style></style>
