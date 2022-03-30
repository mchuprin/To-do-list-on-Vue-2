import VueRouter from 'vue-router';
import { authStore } from '@/store/store';
function lazyLoad(view: string){
  return() => import(`@/views/${view}.vue`)
}
const routes = [
  {
    path: '',
    redirect: {
      name: 'Login'
    },
  },
  {
    path: '/main',
    component: lazyLoad('Main'),
    meta: {requiresAuth: true},
    children: [
      { path: 'todos/:id?', component: lazyLoad('ToDo'), name: 'ToDo',},
      { path: 'users', component: lazyLoad('Users'), name: 'Users',
      },
    ],
  },
  {
    path: '/authorization',
    component: lazyLoad('Auth'),
    children: [
      { path: 'login', name: 'Login', component: lazyLoad('Login')},
      { path: 'registration', name: 'Registration', component: lazyLoad('Registration')},]
  },
];

export const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach(async(to,from,next)=>{
  await authStore.initAuth()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(authStore.isAuth) {
      return next();
    } else {
      return next({name: 'Login'})
    }
  } else {
    next();
  }
});