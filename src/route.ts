import ToDoList from '@/views/ToDoList.vue';
import VueRouter from 'vue-router';

const routes = [
  {
    path: '/todos/:id?',
    component: ToDoList,
    name: 'toDoList'
  },
  {
    path: '**',
    redirect: '/todos/:id?'
  },
];

export default new VueRouter({
  routes,
  mode: 'history',
});