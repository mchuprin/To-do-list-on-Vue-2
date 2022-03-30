<template>
  <div
    class="user"
    @mouseover="toggleCard(true)"
    @mouseleave="toggleCard(false)" >
    <v-card
      dark
      color="#1e1e1e99"
      tile
      class="px-5 py-1 d-flex flex-row align-center"
    >
      <Avatar
          :user="user"
      />
      <v-card-text
          class="user__name"
      >{{ user.login }}</v-card-text>
    </v-card>
    <UsersOneCard v-show="showCard" :user="user"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Avatar from '@/components/common/AppAvatar.vue';
import UsersOneCard from '@/components/users/UsersOneCard.vue';

@Component({
  props: ['user'],
  components: {
    Avatar,
    UsersOneCard,
  },
})
export default class User extends Vue {
  showCard = false

  toggleCard(payload: boolean) {
    this.showCard = payload;
  }
}
</script>

<style lang="scss" scoped>
.user {
  position: relative;
  &__name {
    width: 40%;
  }
}


</style>
