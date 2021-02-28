<template>
  <v-container class="converter-container">
    <v-card
      v-if="initialResponse"
      :class="loading ? 'hidden' : ''"
      class="mx-auto mt-10 mt-sm-13 transition"
      max-width="300"
    >
      <v-card-text class="pb-3">
        <div class="pb-1">
          {{ formatPrice(updatedValueFrom) + " " + updatedCurrencyFromName + " equals" }}
        </div>
        <p class="text-h5 text--primary mb-1">
          {{ formatPrice(updatedValueTo) + " " + updatedCurrencyToName }}
        </p>
        <v-row
          ><v-col class="pb-0"
            ><p class="text-no-wrap">
              {{ date }}
            </p></v-col
          ><v-col class="py-0 mt-1">
            <v-progress-circular
              indeterminate
              v-if="converting"
              color="primary"
              class="mr-8"/>
          </v-col></v-row
        >
        <v-row class="converter-inputs">
          <v-col class="py-0 col-12">
            <validated-value :value="valueFrom" placeholder="Amount" @update="updateValueFrom" />
          </v-col>
          <v-col class="py-0 col-12">
            <validated-currency
              flow="from"
              placeholder="Currency from"
              v-model="currencyFromName"
              :disabled="valueFrom ? false : true"
              @update="updateCurrency"
            />
          </v-col>
          <v-col class="pt-0 col-12">
            <validated-currency
              flow="to"
              v-model="currencyToName"
              :disabled="currencyFromName && valueFrom ? false : true"
              placeholder="Currency to"
              @update="updateCurrency"
            />
          </v-col>
        </v-row>
        <v-btn
          class="mt-3 mb-2"
          block
          :disabled="valueFrom && currencyFromName && currencyToName ? false : true"
          color="primary"
          large
          @click="convert"
          >Convert</v-btn
        >
      </v-card-text>
    </v-card>
    <div
      class="loading transition"
      :class="loading ? 'd-flex justify-center align-center mt-4' : 'hidden d-none'"
    >
      <v-progress-circular
        :size="90"
        :width="7"
        indeterminate
        color="primary"
        class="mx-auto transition"
      />
    </div>
    <error-dialog
      :show="errorDialog"
      :max-width="'450px'"
      :message="message"
      @input="closeError"
      @close="closeError"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axiosCall from '../utils/axiosCall';
import ValidatedCurrency from '../components/ValidatedCurrency.vue';
import ValidatedValue from '../components/ValidatedValue.vue';
import ErrorDialog from '../components/ErrorDialog.vue';

export default {
  name: 'Converter',
  components: { ValidatedValue, ValidatedCurrency, ErrorDialog },
  data: () => ({
    errorDialog: false,
    message: null,
    valueFrom: null,
    valueTo: null,
    updatedValueFrom: null,
    updatedValueTo: null,
    updatedCurrencyFromName: null,
    updatedCurrencyToName: null,
    currencyFromName: null,
    currencyToName: null,
    currencyFromCode: null,
    currencyToCode: null,
    loading: false,
    converting: false,
    rate: null,
    date: null,
    initialResponse: false,
  }),
  computed: {
    ...mapGetters(['getCurrentData']),
  },
  async created() {
    this.getData();
  },
  methods: {
    ...mapActions(['addConversion', 'addCurrentData']),
    resetForm() {
      this.currencyToName = null;
      this.valueFrom = null;
      this.currencyFromName = 'Pound sterling';
    },
    getData() {
      this.currencyFromCode = 'gbp';
      this.resetForm();
      if (this.getCurrentData) {
        const data = this.getCurrentData;
        this.updatedValueFrom = data.value_from;
        this.updatedValueTo = data.value_to;
        this.updatedCurrencyFromName = data.currency_from;
        this.updatedCurrencyToName = data.currency_to;
        this.date = `${data.rate_date} ${data.rate_time}`;
        this.initialResponse = true;
      } else {
        this.getInitialData();
      }
    },
    async getInitialData() {
      this.loading = true;
      try {
        const res = await axiosCall('GET', 'gbp');
        this.currencyToCode = 'eur';
        this.updatedValueFrom = 1;
        this.updatedValueTo = (this.updatedValueFrom * res.data[this.currencyToCode].rate).toFixed(
          2,
        );
        this.updatedCurrencyFromName = 'Pound sterling';
        this.updatedCurrencyToName = 'Euro';
        this.date = res.data.eur.date.toString().slice(4);
        this.initialResponse = true;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.errorDialog = true;
        this.message = err;
      }
    },
    closeError() {
      this.errorDialog = false;
      this.getData();
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    updateValueFrom(val) {
      this.valueFrom = val;
    },
    async updateCurrency(val) {
      const direction = val[0];
      const newName = val[1];
      const newCode = val[2];
      let oldName;
      if (direction === 'from') {
        oldName = this.currencyFromName;
        this.currencyFromName = newName;
        this.currencyFromCode = newCode;
        if (this.currencyFromName === this.currencyToName) {
          this.currencyToName = oldName;
        }
      } else {
        oldName = this.currencyToName;
        this.currencyToName = newName;
        this.currencyToCode = newCode;
        if (this.currencyToName === this.currencyFromName) {
          this.currencyFromName = oldName;
        }
      }
    },
    async convert() {
      const curr1 = this.currencyFromCode;
      const curr2 = this.currencyToCode;
      this.converting = true;
      try {
        const conversionRate = await axiosCall('GET', curr1);
        this.updatedValueFrom = this.valueFrom;
        this.updatedValueTo = (this.valueFrom * conversionRate.data[curr2].rate).toFixed(2);
        this.updatedCurrencyFromName = this.currencyFromName;
        this.updatedCurrencyToName = this.currencyToName;
        this.date = conversionRate.data[curr2].date.toString().slice(4);
        const obj = {
          value_from: this.valueFrom,
          value_to: this.updatedValueTo,
          currency_from: this.currencyFromName,
          currency_to: this.currencyToName,
          rate_date: conversionRate.data[curr2].date.toString().slice(5, 16),
          rate_time: conversionRate.data[curr2].date.toString().slice(17, 29),
        };
        this.addConversion(obj);
        this.addCurrentData(obj);
        this.resetForm();
        this.loading = false;
        this.converting = false;
      } catch (err) {
        this.loading = false;
        this.converting = false;
        this.errorDialog = true;
        this.message = err;
      }
    },
  },
};
</script>

<style lang="scss">
.transition {
  transition: 0.4s;
}
.hidden {
  opacity: 0;
}
.loading {
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  bottom: 0;
}
.converter-container {
  position: relative;
}
</style>
