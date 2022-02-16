<template>
  <ToDoList />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToDoList from '@/views/ToDoList.vue';
import Autofocus from '@/directives/autofocus';

@Component({
  directives: {
    Autofocus,
  },
  components: {
    ToDoList,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  margin: 0;
}
body {
  display: flex;
  padding: 100px 30%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background: linear-gradient(
    146deg,
    rgba(2, 0, 36, 0.7782909930715936) 10%,
    rgba(238, 194, 58, 1) 88%
  );
  min-height: 100vh;
  background-size: cover;
}
</style>
