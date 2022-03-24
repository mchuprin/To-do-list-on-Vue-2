import Vue from 'vue';
import Vuex from 'vuex';
import { AuthStore } from '@/store/modules/auth';
import { TaskStore } from '@/store/modules/tasks';
import { UsersStore } from '@/store/modules/users';

Vue.use(Vuex);

export const store = new Vuex.Store({});

export const authStore = new AuthStore({ store, name: 'auth' })
export const taskStore = new TaskStore( { store, name: 'task' })
export const usersStore = new UsersStore({store, name: 'users'})