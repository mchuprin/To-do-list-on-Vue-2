<template>
  <v-avatar
      color="#3b3955"
  >
    <img
        v-if="user.avatar"
        :src="user.avatar"
    >
    <span v-else>{{ user.login[0].toUpperCase() }}</span>
  </v-avatar>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  props: ['user']
})
export default class Avatar extends Vue {}
</script>

<style lang="scss" scoped></style>
