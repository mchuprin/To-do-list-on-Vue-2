import axios from 'axios';

axios.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = localStorage.getItem('token');
    return config;
  }
  return config;
});

const apiURL = 'http://localhost:8000/api/friends'

class FriendService {
  async getFriendRequests() {
    return await axios.get(`${apiURL}/requests`)
  }

  async adoptFriend(requestId: string) {
    return await axios.patch(`${apiURL}/acceptFriendship`, {
      requestId,
    });
  }

  async addFriend(friendId: string) {
    return await axios.post(`${apiURL}`, {
      friendId,
    });
  }
}

export default new FriendService();
