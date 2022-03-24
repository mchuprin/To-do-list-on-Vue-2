<template>
  <v-dialog
    v-model="error"
    dark
  >
    <v-card
    >
      <v-card-title class="text-h5">
        Oooops, unexpectable error
      </v-card-title>
      <v-card-text>
        {{ error }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click.stop="clearError()"
          color="red"
          text
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { TaskI } from '@/interfaces/task.interface';
import {taskStore} from '@/store/store';

@Component({})
export default class ErrorModal extends Vue {
  get error() {
    return taskStore.whatError
  }
  clearError() {
    taskStore.addError('')
  }
}
</script>

<style lang="scss" scoped></style>
