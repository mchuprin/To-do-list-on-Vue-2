import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from '@/route';
import VueRouter from 'vue-router';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import vuetify from './plugins/vuetify';

// import { mdiPlus } from '@mdi/js';

Vue.use(VueRouter);
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
