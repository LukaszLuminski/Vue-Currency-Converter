<template>
  <v-container class="converter-container">
    <v-card
      :class="loading ? 'hidden' : ''"
      class="mx-auto mt-10 mt-sm-13 transition"
      max-width="365"
    >
      <v-card-text>
        <div class="pb-1">{{ response ? valueFrom + ' '
          + currencyFrom + " equals" : 'An error has occured...'}} </div>
        <p class="display-1 text--primary mb-1">
          {{ response ? rate + ' ' + currencyTo : 'I\'m sorry about that!'}}
        </p>
        <p>{{ response ? date : 'But don\'t worry! We\'ll be back soon.'}}</p>
        <v-row>
          <v-col class="pr-2">
            <validated-value :value="valueFrom" />
            <validated-value :value="valueTo" />
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
    valueTo: 1.16,
    currencyFrom: 'Pound sterling',
    currencyTo: 'Euro',
    loading: false,
    rate: null,
    date: null,
    response: false,
  }),
  async created() {
    this.loading = true;
    await axiosCall('GET', 'gbp')
      .then((res) => {
        this.rate = res.data.eur.rate.toFixed(2);
        this.date = new Date(res.data.eur.date).toLocaleString();
        this.response = true;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.errorDialog = true;
        this.message = err;
      });
  },
  methods: {
    checkInputFrom(val) {
      const newValue = val[0];
      const code = val[1];
      const oldValue = this.currencyFrom;
      this.currencyFrom = newValue;
      if (this.currencyFrom === this.currencyTo) this.currencyTo = oldValue;
    },
    checkInputTo(val) {
      const newValue = val[0];
      const code = val[1];
      const oldValue = this.currencyTo;
      this.currencyTo = newValue;
      if (this.currencyTo === this.currencyFrom) this.currencyFrom = oldValue;
    },
    async convert(currencyCode) {
      await axiosCall('GET', currencyCode)
        .then((res) => {
          this.rate = res.data[currencyCode].rate.toFixed(2);
          this.date = new Date(res.data[currencyCode].date).toLocaleString();
          this.response = true;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.errorDialog = true;
          this.message = err;
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
