import Vue from 'vue';

export default (() => {
  let timer: number | undefined;
  return Vue.directive('autoFocus', {
    inserted: (el, binding) => {
      const { repeatable } = binding.modifiers;
      const { value: delay } = binding;
      if (repeatable) {
        timer = setInterval(() => {
          el.focus();
        }, delay);
        return;
      }
      if (delay) {
        timer = setTimeout(() => {
          el.focus();
        }, delay);
      } else {
        el.focus();
      }
    },
    unbind: () => {
      clearInterval(timer);
      clearTimeout(timer);
    },
  });
})();
