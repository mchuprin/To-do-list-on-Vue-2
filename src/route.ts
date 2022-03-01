import ToDoList from '@/views/ToDoList.vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Registration from '@/views/Registration.vue';

const routes = [
  {
    path: '/todos/:id?',
    component: ToDoList,
    name: 'toDoList',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
];

export default new VueRouter({
  routes,
  mode: 'history',
});
