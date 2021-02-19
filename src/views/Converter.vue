<template>
  <v-container>
    <v-card class="mx-auto mt-10 mt-sm-13" max-width="365">
      <v-card-text>
        <div class="pb-1">
          1 Pound sterling equals
        </div>
        <p class="display-1 text--primary mb-1">
          1.15 Euro
        </p>
        <p>19 Feb, 07:10 UTC</p>
        <v-row>
          <v-col class="pr-2">
            <validated-value
              :value="valueFrom"
            />
           <validated-value
              :value="valueTo"
            />
            </v-col>
          <v-col class="pl-2">
            <validated-currency
              ref="currencyFrom"
              v-model="currencyFrom"
              flow="from"
              @update="checkInputFrom"
            />
            <validated-currency
              ref="currencyTo"
              v-model="currencyTo"
              flow="to"
              @update="checkInputTo"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="teal accent-4" @click="reveal = true">
          Learn More
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ValidatedCurrency from '../components/ValidatedCurrency.vue';
import ValidatedValue from '../components/ValidatedValue.vue';

export default {
  name: 'Converter',
  components: { ValidatedValue, ValidatedCurrency },
  data: () => ({
    valueFrom: 1,
    valueTo: 1.16,
    currencyFrom: 'Pound sterling',
    currencyTo: 'Euro',
  }),
  methods: {
    checkInputFrom(val) {
      const oldValue = this.currencyFrom;
      this.currencyFrom = val;
      if (this.currencyFrom === this.currencyTo) this.currencyTo = oldValue;
    },
    checkInputTo(val) {
      const oldValue = this.currencyTo;
      this.currencyTo = val;
      if (this.currencyTo === this.currencyFrom) this.currencyFrom = oldValue;
    },
  },
};
</script>
