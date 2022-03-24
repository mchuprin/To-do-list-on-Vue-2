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
      { path: 'todos/:id?', component: lazyLoad('ToDoList'), name: 'ToDoList',},
      { path: 'users', component: lazyLoad('Users'), name: 'Users',
      },
    ],
  },
  {
    path: '/authorization',
    component: lazyLoad('Authorization'),
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
  if ( to.matched.some(record => record.meta.requiresAuth)) {
    console.log('found auth', authStore.isAuth)
    if(authStore.isAuth) {
      console.log('authed')
      return next();
    } else {
      console.log('not authed')
      return next({name: 'Login'})
    }
  } else {
    console.log('go ahead')
    next();
  }
});