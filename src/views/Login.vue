<template>
  <div class="log-form">
    <h2>Sign in</h2>
    <v-form class="log-form__fields" ref="form" lazy-validation v-model="valid">
      <v-text-field
        label="Username"
        v-model="username"
        v-auto-focus
        dark
        :counter="10"
        :rules="usernameRules"
      ></v-text-field>
      <v-text-field
        class="log-form__password"
        label="Password"
        v-model="password"
        :type="passType"
        :append-icon="passType === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
        :counter="10"
        @click:append="togglePassType"
        dark
        :rules="passwordRules"
      ></v-text-field>
      <v-btn
        class="text-none"
        tile
        :disabled="!valid"
        color="#eec23a"
        dark
        @click="validate"
      >
        Sign in
      </v-btn>
    </v-form>
    <router-link to="/registration" class="log-form__sign-up">
      Create account
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Autofocus from '@/directives/autofocus';
import { authStore } from '@/store/store';

@Component({
  directives: {
    Autofocus,
  },
})
export default class Login extends Vue {
  username = '';
  password = '';
  user = '';
  passType: 'password' | 'text' = 'password';
  valid = false;

  usernameRules = [
    (v: any): string | boolean => !!v || 'Username is required',
    (v: any): string | boolean =>
      (v && v.length <= 10) || 'Username must be less than 10 characters',
  ];

  passwordRules = [
    (v: any): string | boolean => !!v || 'Password is required',
    (v: any): string | boolean =>
      (v && v.length <= 10) || 'Password must be less than 10 characters',
  ];

  togglePassType() {
    this.passType = this.passType === 'text' ? 'password' : 'text';
  }

  async validate() {
    (this.$refs.form as any).validate();
    try {
      await authStore.login({username: this.username, password: this.password});
      await this.$router.push({name: 'ToDo'})
    } catch (e) {
      alert(e.response.data.msg);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/mixins";

.log-form {
  margin-top: 60%;
  background: #3c3b387a;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  .log-form__fields {
    display: inline-grid;
    .log-form__password {
      padding-bottom: 20px;
    }
  }
  .fa-eye,
  .fa-eye-slash {
    cursor: pointer;
  }
  &__hint {
    p {
      word-wrap: break-word;
      color: red;
    }
  }
  &__input-name {
    line-height: 30px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    ul {
      padding: 0;
      list-style-type: none;
      line-height: 25px;
      color: red;
    }
  }
  &__submit {
    @include button;
    background: #eec23a;
    padding: 5px 20px;
    font-size: 18px;
  }
  &__sign-up {
    text-decoration: none;
    color: white;
    margin-top: 25px;
    font-size: 14px;
  }
}
</style>
