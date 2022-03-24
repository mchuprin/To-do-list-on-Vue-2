import { VuexModule, Mutation, Action, Module } from 'vuex-class-modules';
import userService from '@/services/user.service';
import {usersStore} from '@/store/store';

@Module
export class UsersStore extends VuexModule {
  users = [];
  isNextPage = false;
  currentPage = 0;
  limit = 5;

  get nextPage() {
    return this.isNextPage;
  }

  get actualPage() {
    return this.currentPage;
  }

  get searchUsers() {
    return this.users;
  }

  @Mutation
  setNextPage(payload: boolean) {
    this.isNextPage = payload;
  }

  @Mutation
  setActualPage(payload: number) {
    this.currentPage = payload;
  }

  @Mutation
  setUsers(payload: any) {
    this.users = payload;
  }

  @Action
  async getNewPage({search}: any) {
    usersStore.setActualPage(0)
    try {
      const users = await userService.getUsers(this.currentPage, search, this.limit);
      this.setUsers(users.data.users);
      this.setNextPage(users.data.isNextPage);
    } catch (e) {
      return e;
    }
  }

  @Action
  async getNextPage({search}: any) {
    const page = this.currentPage + 1;
    usersStore.setActualPage(page);
    try {
      const nextUsers = await userService.getUsers(this.currentPage, search, this.limit);
      const allUsers = [...this.searchUsers, ...nextUsers.data.users]
      this.setUsers(allUsers);
      this.setNextPage(nextUsers.data.isNextPage);
    } catch (e) {
      return e;
    }
  }
}