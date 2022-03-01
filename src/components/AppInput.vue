<template>
  <div>
    <div id="input" class="input-line">
      <input
        class="input-line__input"
        v-on="listeners"
        @input="(event) => this.$emit('input', event.target.value)"
        :value="value"
        v-bind="$attrs"
        ref="input"
      />
      <div class="input-line__prefix">
        <slot name="prefix"></slot>
      </div>
      <div class="input-line__postfix">
        <slot name="postfix"></slot>
      </div>
    </div>
    <div class="input-line__hint">
      <slot name="hint"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  inheritAttrs: false,
  props: ['value'],
})
export default class AppInput extends Vue {
  value!: string;

  get listeners() {
    const { input, ...rest } = this.$listeners;
    return rest;
  }

  focus() {
    (this.$refs.input as HTMLElement)?.focus();
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/colors";
@import "src/assets/mixins";

button {
  @include button;
}
.input-line {
  position: relative;
  display: flex;
  flex-direction: row;
  &__input {
    box-sizing: border-box;
    flex-basis: 100%;
    height: 35px;
    outline: none;
    border: none;
    padding: 0 60px 0 30px;
    color: white;
    background: $input-back;
  }
  &__prefix,
  &__postfix {
    position: absolute;
  }
  &__prefix {
    top: 7px;
    left: 10px;
  }
  &__postfix {
    top: 7px;
    right: 10px;
  }
  &__hint {
  }
}
</style>
