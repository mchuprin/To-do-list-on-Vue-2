<template>
  <body>
    <h1>Search user</h1>
    <div class="d-flex flex-row top-input">
      <v-text-field
        ref="topInput"
        v-model="inputValue"
        @keypress.enter="searchUsers"
        label="Enter login..."
        color="white"
        background-color="grey darken-3"
        hint="Enter no more than 50 characters"
        maxlength="50"
        class="rounded-0"
        autofocus
        dark
        solo
      ></v-text-field>
      <v-btn
        class="rounded-0"
        @click="searchUsers"
        height="48"
        dark
        color="rgba(238, 194, 58, 0.50)"
      >search</v-btn>
    </div>
    <div class="mb-8">
      <div
        class="pb-2 d-flex flex-column"
        v-for="user in users"
        :key="user._id"
      >
        <User
          :user="user"
        />
      </div>
      <v-btn
        v-if="isNextPage"
        class="text-none mt-2 "
        tile
        dark
        @click="addMoreUsers"
        :disabled="isButtonDisabled"
      >
        Следующие 5 пользователей
      </v-btn>
    </div>
  </body>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {taskStore, usersStore} from '@/store/store';
import User from '@/components/User.vue';

@Component({
  components: {
    User
  }
})
export default class Users extends Vue {
  inputValue = '';
  files = [];
  isButtonDisabled = false;

  get currentPage() {
    return usersStore.actualPage
  }

  get isNextPage() {
    return usersStore.nextPage
  }

  get users() {
    return usersStore.searchUsers;
  }

  created() {
    usersStore.getNewPage({search: this.inputValue});
  }

  async addMoreUsers() {
    this.isButtonDisabled = true;
    await usersStore.getNextPage({search: this.inputValue})
    this.isButtonDisabled = false;
  }

  searchUsers() {
    usersStore.getNewPage({search: this.inputValue});
  }

}
</script>

<style lang="scss" scoped>
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 15%;
  width: 1000px;
}
</style>
