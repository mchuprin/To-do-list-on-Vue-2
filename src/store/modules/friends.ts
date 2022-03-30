import { VuexModule, Mutation, Action, Module } from 'vuex-class-modules';
import userService from '@/services/user.service';
import {usersStore} from '@/store/store';
import friendService from '@/services/friend.service';

@Module
export class FriendsStore extends VuexModule {
  friendsRequests = [];

  get requests() {
    return this.friendsRequests;
  }

  @Mutation
  setRequests(payload: any) {
    this.friendsRequests = payload;
  }

  @Action
  async getFriendsRequests() {
    try {
      const requests = await friendService.getFriendRequests();
      this.setRequests(requests.data)
    } catch (err) {
      return err;
    }
  }

  @Action
  async adoptFriend(requestId: string) {
    try {
      await friendService.adoptFriend(requestId);
      const requests = this.friendsRequests.filter(request => request._id !== requestId)
      this.setRequests(requests)
    } catch (err) {
      return err;
    }
  }
}