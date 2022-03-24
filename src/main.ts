import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import { router } from '@/route';
import VueRouter from 'vue-router';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import { store } from '@/store/store';
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
});


new Vue({
  router,
  store: store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
