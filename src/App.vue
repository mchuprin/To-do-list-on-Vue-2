<template>
  <v-app>
    <div class="background">
      <header>
        <v-app-bar color="#363636" dark tile class="navigation">
          <div v-if="isAuth" class="navigation__todos">
            <router-link class="navigation__nav mr-3" to="/main/todos">
              <v-btn tile class="text-none">
                <v-icon>mdi-format-list-numbered</v-icon>
                To-do list
              </v-btn>
            </router-link>
            <router-link class="navigation__nav" to="/main/users">
              <v-btn tile class="text-none">
                <v-icon>mdi-account-box-multiple</v-icon>
                Users
              </v-btn>
            </router-link>
            <v-spacer></v-spacer>
            <v-menu
                offset-y
                :rounded="'0'"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <Avatar
                      :user="user"
                  />
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item class="navigation__nav">
                  <v-dialog
                      v-model="showFriendRequests"
                      max-width="400"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item-title
                          v-bind="attrs"
                          v-on="on"
                      >
                        Friend requests
                      </v-list-item-title>
                    </template>
                    <v-card
                      tile
                      dark
                    >
                      <v-toolbar
                        tile
                        dark
                      >
                        Your friend requests
                      </v-toolbar>
                      <v-list-item
                        v-for="request in friendRequests"
                        :key="request._id"
                        class="pt-4"
                      >
                        <div class="request">
                          <Avatar :user="request" />
                          <v-card-text class="mr-auto">{{ request.login }}</v-card-text>
                          <v-btn @click="acceptFriendship(request._id)" icon>
                            <v-icon>mdi-account-plus</v-icon>
                          </v-btn>
                          <v-btn @click="rejectFriendship" icon >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </div>
                      </v-list-item>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="red"
                          text
                          @click="showFriendRequests = false"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-list-item>
                <router-link class="navigation__nav text-none" to="/authorization/login">
                  <v-list-item @click="logout()" class="navigation__nav">
                    <v-list-item-title>Logout</v-list-item-title>
                  </v-list-item>
                </router-link>
              </v-list>
            </v-menu>
          </div>
          <div v-else>
            <router-link class="navigation__nav" to="/authorization/login">
              <v-btn class="text-none">
                <v-icon>mdi-account-plus</v-icon>
                Sign in
              </v-btn>
            </router-link>
            <router-link class="navigation__nav ml-8" to="/authorization/registration">
              <v-btn class="text-none">
                <v-icon>mdi-login-variant</v-icon>
                Registration
              </v-btn>
            </router-link>
          </div>
        </v-app-bar>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {authStore, friendStore, usersStore} from '@/store/store';
import Avatar from '@/components/common/AppAvatar.vue';
import friendService from '@/services/friend.service';

@Component({
  components: {
    Avatar,
  },
})
export default class App extends Vue {
  showFriendRequests = false;

  get friendRequests() {
    return friendStore.requests;
  }

  get isAuth() {
    return authStore.isAuth;
  }

  get user() {
    return authStore.loggedUser;
  }

  acceptFriendship(requestId: string) {
    friendStore.adoptFriend(requestId);
  }

  rejectFriendship() {
    friendStore.friendshipDecision()
  }

  logout() {
    authStore.logout();
  }

  async created() {
    await authStore.initAuth();
    await friendStore.getFriendsRequests();
  }
}
</script>

<style lang="scss">
@import "src/assets/mixins";
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap");

* {
  letter-spacing: 1px;
  margin: 0;
  font-family: "Merriweather", serif;
}

.background {
  background: linear-gradient(
    146deg,
    rgba(2, 0, 36, 0.7782909930715936) 10%,
    rgba(238, 194, 58, 1) 88%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  .navigation {
    position: absolute;
    width: 100%;
    &__todos{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    &__nav {
      text-decoration: none;
    }
  }
}

.link-todos {
  a {
    @include button;
    font-size: 17px;
    width: max-content;
    text-align: left;
    color: white;
    text-decoration: none;
  }
  a:after {
    display: block;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #eec23a;
    content: "";
    transition: width 0.3s ease-out;
  }
  a:hover:after,
  a:focus:after {
    width: 100%;
  }
}

.log-reg {
  display: flex;
  gap: 20px;
  a {
    @include button;
    text-decoration: none;
    width: max-content;
    text-align: left;
    color: white;
    font-size: 17px;
  }
  a:after {
    display: block;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #3b3955;
    content: "";
    transition: width 0.3s ease-out;
  }
  a:hover:after,
  a:focus:after {
    width: 100%;
  }
}
.request {
  display:flex;
  flex-direction: row;
  width: 100%;
}
</style>
