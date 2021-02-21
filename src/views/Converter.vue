<template>
  <v-container class="converter-container">
    <v-card
      :class="loading ? 'hidden' : ''"
      class="mx-auto mt-10 mt-sm-13 transition"
      max-width="365"
    >
      <v-card-text class="pb-3">
        <div class="pb-1">
          {{
            initialResponse
              ? formatPrice(previousValueFrom) + " " + previousCurrencyFromName + " equals"
              : "An error has occured..."
          }}
        </div>
        <p class="display-1 text--primary mb-1">
          {{
            initialResponse ? formatPrice(previousValueTo)
            + " " + previousCurrencyToName : "Sorry about that!"
          }}
        </p>
        <v-row
          ><v-col class="pb-0"
            ><p class="text-no-wrap">
              {{ initialResponse ? date : "But don't worry! We'll be back soon." }}
            </p></v-col
          ><v-col class="py-0 mt-1">
            <v-progress-circular
              indeterminate
              v-if="currencyChange && currencyToName"
              color="primary"
              class="mr-8"/></v-col
        ></v-row>
        <v-row>
          <v-col class="pr-2 pt-0">
            <validated-value
              :value="valueFrom"
              placeholder="Amount from"
              flow="from"
              @update="updateValueFrom"
            />
            <validated-value
              :value="valueTo"
              placeholder="--"
              :disabled="started ? false : true"
              flow="to"
              @update="updateValueTo"
            />
          </v-col>
          <v-col class="pl-2 pt-0">
            <validated-currency
              ref="currencyFromName"
              placeholder="Currency from"
              v-model="currencyFromName"
              :disabled="valueFrom ? false : true"
              flow="from"
              @update="updateCurrencyFromName"
            />
            <validated-currency
              ref="currencyToName"
              v-model="currencyToName"
              :disabled="currencyFromName ? false : true"
              placeholder="Currency to"
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
import { mapActions } from 'vuex';
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
    previousValueFrom: null,
    previousValueTo: null,
    previousCurrencyFromName: null,
    previousCurrencyToName: null,
    currencyFromName: '',
    currencyToName: null,
    currencyFromCode: null,
    currencyToCode: null,
    loading: false,
    rate: null,
    date: null,
    initialResponse: false,
    currencyChange: false,
    started: false,
  }),
  async created() {
    this.loading = true;
    await axiosCall('GET', 'gbp')
      .then((res) => {
        this.currencyFromCode = 'gbp';
        this.currencyToCode = 'eur';
        this.previousValueFrom = 1;
        this.previousValueTo = (
          this.previousValueFrom * res.data[this.currencyToCode].rate
        ).toFixed(2);
        this.previousCurrencyFromName = 'Pound sterling';
        this.previousCurrencyToName = 'Euro';
        // this.date = res.data.eur.date.toString().slice(4);
        this.date = res.data.eur.date.toString().slice(4);
        this.initialResponse = true;
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
      if (val && this.valueFrom && this.currencyFromName && this.currencyToName) {
        this.previousValueFrom = this.valueFrom;
        this.previousValueTo = this.valueTo;
        this.previousCurrencyFromName = this.currencyFromName;
        this.previousCurrencyToName = this.currencyToName;
      }
    },
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    ...mapActions(['addConversion', 'addCurrentData']),
    updateValueFrom(val) {
      this.valueFrom = val;
      this.convert('from');
    },
    updateValueTo(val) {
      this.valueTo = val;
      this.convert('to');
    },
    async updateCurrencyFromName(val) {
      const newName = val[0];
      const newCode = val[1];
      this.currencyFromName = newName;
      this.currencyFromCode = newCode;
      if (this.currencyFromName === this.currencyToName) {
        if (this.currencyToName !== 'Pound sterling') {
          this.currencyToName = 'Pound sterling';
          this.currencyToCode = 'gbp';
        } else {
          this.currencyToName = 'Euro';
          this.currencyToCode = 'eur';
        }
      }
      this.currencyChange = true;
      if (this.valueFrom && this.currencyToName) {
        this.previousValueFrom = this.valueFrom;
        this.previousCurrencyFromName = this.currencyFromName;
        this.previousCurrencyToName = this.currencyToName;
        await this.convert('from').then(() => {
          this.previousValueTo = this.valueTo;
        });
      }
    },
    async updateCurrencyToName(val) {
      const newName = val[0];
      const newCode = val[1];
      this.currencyToName = newName;
      this.currencyToCode = newCode;
      if (this.currencyToName === this.currencyFromName) {
        if (this.currencyFromName !== 'Pound sterling') {
          this.currencyFromName = 'Pound sterling';
          this.currencyFromCode = 'gbp';
        } else {
          this.currencyFromName = 'Euro';
          this.currencyFromCode = 'eur';
        }
      }
      this.currencyChange = true;
      if (this.valueTo) {
        this.previousValueTo = this.valueTo;
        this.previousCurrencyFromName = this.currencyFromName;
        this.previousCurrencyToName = this.currencyToName;
        await this.convert('to').then(() => {
          this.previousValueFrom = this.valueFrom;
        });
      } else {
        this.previousValueFrom = this.valueFrom;
        this.previousCurrencyFromName = this.currencyFromName;
        this.previousCurrencyToName = this.currencyToName;
        await this.convert('from').then(() => {
          this.previousValueTo = this.valueTo;
        });
      }
    },
    async convert(val) {
      this.waiting = false;
      if (this.valueFrom && this.currencyFromName && this.currencyToName) {
        this.started = true;
      }
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
            if (this.currencyFromName && this.currencyToName) {
              this.valueTo = (this.valueFrom * res.data[curr2].rate).toFixed(2);
            }
          } else if (this.valueTo) {
            this.valueFrom = (this.valueTo * res.data[curr2].rate).toFixed(2);
          }
          this.date = res.data[curr2].date.toString().slice(4);
          if (this.currencyChange) {
            const obj = {
              value_from: this.valueFrom,
              value_to: this.valueTo,
              currency_from: this.currencyFromName,
              currency_to: this.currencyToName,
              rate_date: res.data[curr2].date.toString().slice(5, 16),
              rate_time: res.data[curr2].date.toString().slice(17, 29),
            };
            this.addConversion(obj);
          }
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
