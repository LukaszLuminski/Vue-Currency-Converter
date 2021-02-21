<template>
  <v-container>
    <v-card class="mt-10">
      <v-card-text>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          class="ml-auto"
          hide-details
          label="Search conversions"
          single-line
          style="max-width: 250px;"
        />

        <v-divider class="mt-3" />
        <v-data-table :headers="headers" :items="Object.values(getConversions)" :search="search"
          ><template v-slot:item.actions="{ item }">
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    color="error"
                    elevation="0"
                    min-width="0"
                    small
                    text
                    v-on="on"
                    @click.stop="deleteItem(item)"
                  >
                    <v-icon v-text="'mdi-delete'" />
                  </v-btn>
                </template>
                <span>Remove</span>
              </v-tooltip>
            </td>
          </template></v-data-table
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Table',
  data() {
    return {
      search: undefined,
      headers: [
        {
          align: ' d-none',
          text: 'Id',
          value: 'id',
        },
        {
          text: 'Value from',
          value: 'value_from',
        },
        {
          text: 'Currency from',
          value: 'currency_from',
        },
        {
          text: 'Value to',
          value: 'value_to',
        },
        {
          text: 'Currency to',
          value: 'currency_to',
        },
        {
          text: 'Rate date',
          value: 'rate_date',
        },
        {
          text: 'Rate time',
          value: 'rate_time',
        },
        {
          sortable: false,
          text: 'Actions',
          value: 'actions',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['getConversions']),
  },
  methods: {
    ...mapActions(['deleteConversion']),
    deleteItem(item) {
      const key = Object.keys(this.getConversions).find((k) => this.getConversions[k] === item);
      this.deleteConversion(key);
    },
  },
};
</script>

<style lang="scss">
.v-data-table {
  &__mobile-row:first-child {
    display: none !important;
  }
}

.v-data-table-header th.sortable .v-data-table-header__icon {
  display: none;
}

.v-data-table-header th.sortable {
  position: relative;
}

.v-data-table-header th.sortable:hover .v-data-table-header__icon {
  display: initial;
  position: absolute;
  left: -5px;
  top: 15px;
}
</style>
