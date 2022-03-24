import axios from 'axios';

axios.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.token = localStorage.getItem('token')
    return config
  }
  return config
})

const apiURL = 'http://localhost:8000/api/auth';
const tokenKey = 'token' ;

class AuthService {
  async registration(login: string, password: string): Promise<any> {
    const response = await axios.post(`${apiURL}/registration`, {
      login,
      password,
    });
    return localStorage.setItem(tokenKey, response.data.token);
  }

  async login(login: string, password: string): Promise<any> {
    const response = await axios.post(`${apiURL}/login`, {
      login,
      password,
    });
    return localStorage.setItem(tokenKey, response.data.token);
  }
}

export default new AuthService();
