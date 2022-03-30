<template>
  <v-card
    dark
    background-color="#1e1e1e99"
    tile
    class="card pa-4"
  >
    <div class="d-flex flex-column card__1column align-center">
      <v-avatar>
        <Avatar :user="user" />
      </v-avatar>
      <v-card-text class="pa-0">{{ user.login }}</v-card-text>
      <v-spacer></v-spacer>
      <v-card-actions class="pa-0">
        <v-btn @click="addFriend" small class="text-none">
          <v-icon>mdi-account-plus</v-icon>
          Add
        </v-btn>
      </v-card-actions>
    </div>
    <div class="card__2column pl-4 d-flex flex-column">
      <v-card-text class="text-start pa-0">
        About yourself:<br>{{ user.biography }}
      </v-card-text>
      <v-spacer></v-spacer>
      <div class="card__stats d-flex flex-row pa-0">
        <v-card-text class="pa-0 text-start">Friends: {{ user.friends }}</v-card-text>
        <v-card-text class="pa-0 text-start">Active tasks: {{ user.activeTasks }}</v-card-text>
      </div>
    </div>

  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Avatar from '@/components/common/AppAvatar.vue';
import friendService from '@/services/friend.service';

@Component({
  props: ['user'],
  components: {
    Avatar,
  },
})
export default class UsersOneCard extends Vue {
  addFriend() {
    friendService.addFriend(this.$props.user._id)
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  width: 350px;
  height: 150px;
  top: -160px;
  left: 0;
  background-color: #1E1E1EFF;
  color: #fff;
  text-align: center;
  position: absolute;
  z-index: 1;
  &__1column {
    flex-basis: 20%;
  }
  &__2column {
    flex-basis: 80%;
  }
}
.card::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  bottom: -10px;
  left: 33px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #1E1E1EFF;
}

</style>
