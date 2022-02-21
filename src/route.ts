import ToDoList from '@/views/ToDoList.vue';
import VueRouter from 'vue-router';

const routes = [
  {
    path: '/todos',
    component: ToDoList,
  },
  {
    path: '**',
    redirect: '/todos'
  },
];

export default new VueRouter({
  routes,
  mode: 'history',
});