import jwtDecode from 'jwt-decode';
import {VuexModule, Mutation, Action, Module} from 'vuex-class-modules';
import authService from '@/services/auth.service';

@Module
export class AuthStore extends VuexModule {
  user = null;

  get isAuth() {
    return !!this.user
  }

  get loggedUser() {
    return this.user
  }

  @Mutation
  setUser(payload: any): void {
    this.user = payload;
  }
  @Action
  initAuth(): void {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      const decodedToken: string = jwtDecode(token);
      if (decodedToken) {
        return this.setUser(decodedToken)
      }
    }
    return this.setUser(null)
  }
  @Action
  async login({ username, password }: any) {
    await authService.login(
        username,
        password
      );
    return this.initAuth();
  }
  @Action
  async registration({ username, password }: any) {
    await authService.registration(
      username,
      password
    );
    return this.initAuth();
  }
  @Action
  logout(): void {
    localStorage.removeItem('token')
    return this.setUser(null);
  }
}