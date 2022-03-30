import axios from 'axios';

axios.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = localStorage.getItem('token');
    return config;
  }
  return config;
});

const apiURL = 'http://localhost:8000/api/users'

class UserService {

  async getUsers(part: number, search: string, limit: number | null) {
    return await axios.get(`${apiURL}/?part=${part}&search=${search}&limit=${limit}`);
  }

}

export default new UserService();
