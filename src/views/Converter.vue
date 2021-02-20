<template>
  <v-container class="converter-container">
    <v-card
      :class="loading ? 'hidden' : ''"
      class="mx-auto mt-10 mt-sm-13 transition"
      max-width="365"
    >
      <v-card-text class="pb-3">
        <div class="pb-1">{{ response ? previousValueFrom + ' '
          + currencyFromName + " equals" : 'An error has occured...'}} </div>
        <p class="display-1 text--primary mb-1">
          {{ response ? previousValueTo + ' ' + currencyToName : 'Sorry about that!'}}
        </p>
        <p>{{ response ? date : 'But don\'t worry! We\'ll be back soon.'}}</p>
        <v-row>
          <v-col class="pr-2">
            <validated-value :value="valueFrom" @update="updateValueFrom" />
            <validated-value :value="valueTo" @update="updateValueTo" />
          </v-col>
          <v-col class="pl-2">
            <validated-currency
              ref="currencyFromName"
              v-model="currencyFromName"
              flow="from"
              @update="updateCurrencyFromName"
            />
            <validated-currency
              ref="currencyToName"
              v-model="currencyToName"
              flow="to"
              @update="updateCurrencyToName"
            />
          </v-col>
        </v-row>
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
      @close="errorDialog = false"
    />
  </v-container>
</template>

<script>
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
    valueFrom: 1,
    valueTo: null,
    previousValueFrom: 1,
    previousValueTo: null,
    currencyFromName: 'Pound sterling',
    currencyToName: 'Euro',
    currencyFromCode: null,
    currencyToCode: null,
    loading: false,
    rate: null,
    date: null,
    response: false,
    currencyChange: false,
  }),
  async created() {
    this.loading = true;
    await axiosCall('GET', 'gbp')
      .then((res) => {
        this.currencyFromCode = 'gbp';
        this.currencyToCode = 'eur';
        const value = (this.previousValueFrom * res.data[this.currencyToCode].rate)
          .toFixed(2);
        this.valueTo = value;
        this.previousValueTo = value;
        this.date = res.data.eur.date.toString().slice(4);
        this.response = true;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.errorDialog = true;
        this.message = err;
      });
  },
  watch: {
    currencyChange(val) {
      if (val) {
        this.previousValueFrom = this.valueFrom;
        this.previousValueTo = this.valueTo;
      }
    },
  },
  methods: {
    updateValueFrom(val) {
      this.valueFrom = val;
      if (this.valueFrom) this.convert('from');
    },
    updateValueTo(val) {
      this.valueTo = val;
      if (this.valueTo) this.convert('to');
    },
    updateCurrencyFromName(val) {
      const newName = val[0];
      const newCode = val[1];
      const oldName = this.currencyFromName;
      const oldCode = this.currencyFromCode;
      this.currencyFromName = newName;
      this.currencyFromCode = newCode;
      if (this.currencyFromName === this.currencyToName) {
        this.currencyToName = oldName;
        this.currencyToCode = oldCode;
      }
      this.currencyChange = true;
      this.convert('from');
    },
    updateCurrencyToName(val) {
      const newName = val[0];
      const newCode = val[1];
      const oldName = this.currencyToName;
      const oldCode = this.currencyToCode;
      this.currencyToName = newName;
      this.currencyToCode = newCode;
      if (this.currencyToName === this.currencyFromName) {
        this.currencyFromName = oldName;
        this.currencyFromCode = oldCode;
      }
      this.currencyChange = true;
      this.convert('to');
    },
    async convert(val) {
      let curr1;
      let curr2;
      if (val === 'from') {
        curr1 = this.currencyFromCode;
        curr2 = this.currencyToCode;
      } else {
        curr1 = this.currencyToCode;
        curr2 = this.currencyFromCode;
      }
      await axiosCall('GET', curr1)
        .then((res) => {
          if (val === 'from') {
            this.valueTo = (this.valueFrom * res.data[curr2].rate).toFixed(2);
          } else {
            this.valueFrom = (this.valueTo * res.data[curr2].rate).toFixed(2);
          }
          this.date = res.data[curr2].date.toString().slice(4);
          this.response = true;
          this.loading = false;
          this.currencyChange = false;
        })
        .catch((err) => {
          this.loading = false;
          this.errorDialog = true;
          this.message = err;
          this.currencyChange = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.transition {
  transition: 0.4s;
}
.hidden {
  opacity: 0;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.converter-container {
  position: relative;
}
</style>
