import axios from 'axios';
import {TaskI} from '@/interfaces/task.interface';
import {taskStore} from '@/store/store';

axios.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = localStorage.getItem('token');
    return config;
  }
  return config;
});

const apiURL = 'http://localhost:8000/api/task'

type Key = 'isChecked' | 'title'

class TaskService {
  async getTasks() {
    return await axios.get(`${apiURL}/my`);
  }

  async addTask(title: string, order: number) {
    return await axios.post(`${apiURL}`, {
      title,
      order,
    });
  }

  async deleteTask(_id: string | null) {
    return await axios.delete(`${apiURL}/${_id}`);
  }

  async changeOrder(taskFromId: string, taskToId: string) {
    return await axios.patch(`${apiURL}/changeOrder`, {
      taskToId,
      taskFromId,
    });
  }

  async editTask(_id: string, body: any) {
    return await axios.patch(`${apiURL}/editTask/${_id}`, body);
  }
}

export default new TaskService();
