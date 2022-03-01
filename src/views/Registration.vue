<template>
  <div class="reg-form">
    <h2>Sign up</h2>
    <v-form
      ref="form"
      lazy-validation
      v-model="valid"
    >
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
        :error-messages="password !== repeatPass ? ['Passwords don\'t match.'] : []"
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
    <router-link to="/login" class="reg-form__sign-up">
      Sign in
    </router-link
    >
  </div>
</template>

<script lang="ts">
import AppInput from '@/components/AppInput.vue';
import { Component, Vue } from 'vue-property-decorator';
import Autofocus from '@/directives/autofocus';
import axios from 'axios';

@Component({
  directives: {
    Autofocus,
  },
  components: {
    AppInput,
  },
})
export default class Login extends Vue {
  username = '';
  password = '';
  repeatPass = '';
  passType: 'password' | 'text' = 'password';
  repPassType: 'password' | 'text' = 'password';
  valid = true;

  usernameRules = [
    (v: string): string | boolean => !!v || 'Username is required',
    (v: string): string | boolean => (v && v.length <= 10) || 'Username must be less than 10 characters',
  ]

  passwordRules = [
    (v: string): string | boolean => !!v || 'Password is required',
    (v: string): string | boolean => (v && v.length <= 10) || 'Password must be less than 10 characters',
  ]

  togglePassType() {
    this.passType = this.passType === 'text' ? 'password' : 'text';
  }

  toggleRepPassType() {
    this.repPassType = this.repPassType === 'text' ? 'password' : 'text';
  }

  async validate() {
    (this.$refs.form as any).validate();
    await axios
      .post('http://localhost:8000/api/auth/registration', {
        login: this.username,
        password: this.password,
      })
      .then((res) => {
        if (res.status === 200) {
          this.$router.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // async checkForm() {
  //   if (!this.username) {
  //     this.usernameError = 'Enter login';
  //   } else if (this.username.length > 10) {
  //     this.usernameError = 'Please enter up to 10 characters for login';
  //   }
  //
  //   if (!this.password) {
  //     this.passError = 'Enter password';
  //   } else if (this.password.length > 10) {
  //     this.passError = 'Please enter up to 10 characters for password';
  //   }
  //
  //   if (!this.repeatPass) {
  //     this.repPassError = 'Please, repeat your password';
  //   } else if (this.password !== this.repeatPass) {
  //     this.repPassError = 'Passwords mismatch';
  //   }
  //   const response = await axios
  //     .post('http://localhost:8000/api/auth/registration', {
  //       login: this.username,
  //       password: this.password,
  //     })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         this.$router.push('/login');
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // }
}
</script>

<style lang="scss" scoped>
@import "src/assets/mixins";

.reg-form {
  background: #3c3b387a;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

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
