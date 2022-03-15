import axios from 'axios';
import JwtDecode from 'jwt-decode';

export class authServices {
  async registration(username: string, password: string): Promise<any> {
    await axios.post('http://localhost:8000/api/auth/registration', {
      login: username,
      password: password,
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          // this.$router.push('/todos');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// export function registration = async (username: string, password: string): any => {
//   await axios.post('http://localhost:8000/api/auth/registration', {
//     login: username,
//     password: password,
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         localStorage.setItem('token', res.data.token);
//         this.$router.push('/todos');
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// const login = async (username: string, password: string) => {
//   await axios.post('http://localhost:8000/api/auth/login', {
//     login: username,
//     password: password,
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         localStorage.setItem('token', res.data.token);
//         return this.$router.push('/todos');
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// module.exports.logout = () => {
//
// }

// export default { registration, login }
