<template>
  <div class="background">
    <header>
      <div class="link-todos">
        <router-link to="/todos">Todos</router-link>
      </div>
      <div class="log-reg">
        <router-link to="/login">Login</router-link>
        <router-link to="/registration">Registration</router-link>
      </div>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Autofocus from '@/directives/autofocus';
import AppInput from '@/components/AppInput.vue'


@Component({
  directives: {
    Autofocus,
  },
  components: {
    AppInput,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import "src/assets/mixins";
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&display=swap');

* {
  letter-spacing: 1px;
  margin: 0;
  font-family: 'Merriweather', serif;
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
  width: 60%;
  padding: 20px 0;
}

main {
  width: max-content;
  flex: 1;
  margin-top: 10%;
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
</style>
