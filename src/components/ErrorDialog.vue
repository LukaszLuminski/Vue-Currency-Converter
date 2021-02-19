<template>
  <v-dialog
    :value="show"
    :max-width="maxWidth"
    @input="closeDialog"
  >
    <v-card class="pt-5 pb-3">
      <v-card-title class="headline red--text d-flex justify-center">
        {{ message }}
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="closeDialog"
        >
          Close
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ErrorDialog',

  props: {
    show: {
      type: Boolean,
    },
    maxWidth: {
      type: String,
    },
    message: {
      type: null,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    },
  },
};
</script>
