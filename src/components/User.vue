<template>
  <v-card
    dark
    color="#1e1e1e99"
    tile
    class="user px-5 py-1 d-flex flex-row align-center"
  >
    <Avatar
      :user="user"
    />
    <v-card-text
        class="user__name"
    >{{ user.login }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';

@Component({
  props: ['user'],
  components: {
    Avatar
  }
})
export default class User extends Vue {}
</script>

<style lang="scss" scoped>
.user {
  &__name {
    width: 40%;
  }
}
</style>
