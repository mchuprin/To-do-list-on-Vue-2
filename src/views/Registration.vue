<template>
  <div class="reg-form">
    <h2>Sign up</h2>
    <form
        class="reg-form__info"
        id="login"
        @submit.prevent="checkForm"
    >
      <div>
        <label class="reg-form__input-name">
          Username
        </label>
        <AppInput
            placeholder="Enter your username..."
            v-model="username"
            v-auto-focus
        >
          <template v-slot:hint>
            <div class="reg-form__hint">
              <p>{{ usernameError }}</p>
            </div>
          </template> 
        </AppInput> 
      </div>
      <div>
        <label class="reg-form__input-name">
          Password
        </label>
        <AppInput
          placeholder="Enter your password..."
          v-model="password"
          :type=passType
        >
          <template v-slot:postfix>
            <i v-if="passType === 'password'" @click="togglePassType" class="fas fa-eye"></i>
            <i v-else @click="togglePassType" class="fas fa-eye-slash"></i>
          </template>
          <template v-slot:hint>
            <div class="reg-form__hint">
              <p>{{ passError }}</p>
            </div>
          </template>
        </AppInput>
      </div>
      <div>
        <label class="reg-form__input-name">
          Repeat password
        </label>
        <AppInput
          placeholder="Repeat your password..."
          v-model="repeatPass"
          :type=repPassType
        >
          <template v-slot:postfix>
            <i v-if="repPassType === 'password'" @click="toggleRepPassType" class="fas fa-eye"></i>
            <i v-else @click="toggleRepPassType" class="fas fa-eye-slash"></i>
          </template>
          <template v-slot:hint>
            <div class="reg-form__hint">
              <p>{{ repPassError }}</p>
            </div>
          </template>
        </AppInput>
      </div>
      <div>
        <input
            class="reg-form__submit"
            type="submit"
            value="Sign up"
        >
      </div>
    </form>
    <router-link to="/registration" class="reg-form__sign-up">Sign in</router-link>
</div>
</template>

<script lang="ts">
import AppInput from '@/components/AppInput.vue';
import {Component, Vue} from 'vue-property-decorator';
import Autofocus from '@/directives/autofocus';

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
  repPassType: 'password' | 'text' = 'password'
  usernameError = '';
  passError = '';
  repPassError = '';

  togglePassType() {
    this.passType = this.passType === 'text' ? 'password' : 'text';
  }

  toggleRepPassType() {
    this.repPassType = this.repPassType === 'text' ? 'password' : 'text'
  }

  checkForm() {
    
    if (!this.username) {
      this.usernameError = 'Enter login';
    } else if (this.username.length > 6) {
      this.usernameError = 'Please enter up to 6 characters for login';
    }

    if (!this.password) {
      this.passError = 'Enter password';
    } else if (this.password.length > 6) {
      this.passError = 'Please enter up to 6 characters for password';
    }

    if (!this.repeatPass) {
      this.repPassError = 'Please, repeat your password'
    } else if (this.password !== this.repeatPass) {
      this.repPassError = 'Passwords mismatch'
    }
  }
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