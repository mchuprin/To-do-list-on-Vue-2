<template>
  <div id="input" class="input-line">
    <input
      class="input-line__input"
      v-auto-focus
      v-on="listeners"
      @input="(event) => this.$emit('input', event.target.value)"
      :value="value"
      v-bind="$attrs"
      ref="input"
    />
    <div class="input-line__icon">
      <slot name="prefix"></slot>
    </div>
    <div class="input-line__counter">
      <slot name="postfix"></slot>
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
  flex-wrap: wrap;
  width: 100%;
  &__input {
    box-sizing: border-box;
    height: 35px;
    width: 100%;
    outline: none;
    border: none;
    padding: 0 60px 0 30px;
    color: white;
    background: $input-back;
  }
  &__icon, &__counter {
    position: absolute;
  }
  &__icon {
    top: 10px;
    left: 10px;
  }
  &__counter {
    top: 9px;
    right: 10px;
  }
  &__hint {
    padding: 5px 0 0 10px;
  }
}
</style>