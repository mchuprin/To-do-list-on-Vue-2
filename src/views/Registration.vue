<template>
  <div class="reg-form">
    <h2>Sign up</h2>
    <v-form class="reg-form__fields" ref="form" lazy-validation v-model="valid">
      <v-text-field
        label="Username"
        v-model="username"
        v-auto-focus
        :counter="10"
        :rules="usernameRules"
        dark
      ></v-text-field>
      <v-text-field
        label="Password"
        v-model="password"
        :type="passType"
        :append-icon="passType === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="togglePassType"
        dark
        :counter="10"
        :rules="passwordRules"
      ></v-text-field>
      <v-text-field
        label="Repeat password"
        v-model="repeatPass"
        :type="repPassType"
        :append-icon="repPassType === 'password' ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="toggleRepPassType"
        :error-messages="
          password !== repeatPass ? ['Passwords don\'t match.'] : []
        "
        dark
      ></v-text-field>
      <v-btn
        class="text-none"
        tile
        :disabled="!valid"
        color="#eec23a"
        dark
        @click="validate"
      >
        Sign up
      </v-btn>
    </v-form>
    <router-link to="/login" class="reg-form__sign-up"> Sign in </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Autofocus from '@/directives/autofocus';
import {authStore} from '@/store/store';

@Component({
  directives: {
    Autofocus,
  },
})
export default class Login extends Vue {
  username = '';
  password = '';
  repeatPass = '';
  user = '';
  passType: 'password' | 'text' = 'password';
  repPassType: 'password' | 'text' = 'password';
  valid = true;

  usernameRules = [
    (v: string): string | boolean => !!v || 'Username is required',
    (v: string): string | boolean =>
      (v && v.length <= 10) || 'Username must be less than 10 characters',
  ];

  passwordRules = [
    (v: string): string | boolean => !!v || 'Password is required',
    (v: string): string | boolean =>
      (v && v.length <= 10) || 'Password must be less than 10 characters',
  ];

  togglePassType() {
    this.passType = this.passType === 'text' ? 'password' : 'text';
  }

  toggleRepPassType() {
    this.repPassType = this.repPassType === 'text' ? 'password' : 'text';
  }

  async validate() {
    (this.$refs.form as any).validate();
    try {
      await authStore.registration({username: this.username, password: this.password});
    } catch (e) {
      alert(e.response.data.msg);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/mixins";

.reg-form {
  margin-top: 60%;
  background: #3c3b387a;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  .reg-form__fields {
    display: inline-grid;
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
