<template>
  <div class="log-form">
    <h2>Sign in</h2>
    <form
      class="log-form__info"
      id="login"
      @submit.prevent="checkForm"
    >
      <div>
        <label class="log-form__input-name">
          Username
        </label>
        <AppInput
            placeholder="Enter your username..."
            v-model="username"
            v-auto-focus
        >
          <template v-slot:hint>
            <div class="log-form__hint">
              <p>{{ usernameError }}</p>
            </div>
          </template>
        </AppInput>
      </div>
      <div>
        <label class="log-form__input-name">
          Password
        </label>
        <AppInput
            placeholder="Enter your password..."
            v-model="password"
            :type=passType
        >
          <template v-slot:postfix >
            <i v-if="passType === 'password'" @click="togglePassType" class="fas fa-eye"></i>
            <i v-else @click="togglePassType" class="fas fa-eye-slash"></i>
          </template>
          <template v-slot:hint>
            <div class="log-form__hint">
              <p>{{ passError }}</p>
            </div>
          </template>
        </AppInput>
      </div>
      <p>
        <input
            class="log-form__submit"
            type="submit"
            value="Sign in"
        >
      </p>
    </form>
    <router-link to="/registration" class="log-form__sign-up">Create account</router-link>
  </div>
</template>

<script lang="ts">
import AppInput from '@/components/AppInput.vue';
import {Component, Vue} from 'vue-property-decorator';
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
  passType: 'password' | 'text' = 'password';
  usernameError = '';
  passError = '';

  togglePassType() {
    this.passType = this.passType === 'text' ? 'password' : 'text' ;
  }

  async checkForm() {
    this.usernameError = '';
    this.passError = '';

    if(!this.username) {
      this.usernameError = 'Enter login';
    } else if (this.username.length > 10) {
      this.usernameError = 'Please enter up to 10 characters for login';
    }

    if(!this.password) {
      this.passError = 'Enter password';
    } else if (this.password.length > 10) {
      this.passError = 'Please enter up to 10 characters for password';
    }
    const response = await axios.post('http://localhost:8000/api/auth/login',
    {
        login: this.username,
        password: this.password,
      })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token)
          return this.$router.push('/todos')
        }
      })
      .catch(err => {
        console.log(err)
      });
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/mixins";

.log-form {
  background: #3c3b387a;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  .fa-eye, .fa-eye-slash {
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