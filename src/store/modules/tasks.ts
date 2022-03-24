import { VuexModule, Mutation, Action, Module } from 'vuex-class-modules';
import { TaskI } from '@/interfaces/task.interface';
import taskService from '@/services/task.service';

@Module
export class TaskStore extends VuexModule {
  tasks: TaskI[] = [];
  loading = true;
  inputLoading = false;
  error = '';

  get isLoading() {
    return this.loading
  }

  get inLoading() {
    return this.inputLoading
  }

  get userTasks() {
    return this.tasks
  }

  get whatError() {
    return this.error
  }

  @Mutation
  setError(payload: string) {
    console.log(payload)
    this.error = payload
  }

  @Mutation
  setTasks(payload: any): void {
    this.tasks = payload;
  }

  @Mutation
  setInputLoading(payload: boolean) {
    this.inputLoading = payload
  }

  @Mutation
  setLoading(payload: any): void {
    this.loading = payload;
  }

  @Action
  addError(error: any) {
    this.setError(error)
  }

  @Action
  async getTasks() {
    try {
      const tasks = await taskService.getTasks();
      this.setTasks(tasks.data);
    } catch (e) {
      return this.setError('Something went wrong');
    } finally {
      this.setLoading(false);
    }
  }

  @Action
  async addTask(title: string) {
    const order = () => {
      if (!this.userTasks.length) {
        return 0;
      }
      const ordering = this.userTasks.map(({order}) => order);
      const order = Math.max(...ordering) + 1;
      return order;
    };
    try {
      await taskService.addTask(title, order());
      await this.getTasks()
    } catch (e) {
      return this.setError('Something went wrong');
    }
  }

  @Action
  async confirmEdit({ _id, title }: any) {
    try {
      await taskService.editTask(_id, {title: title})
      const task = this.userTasks.find((task: TaskI) => task._id === _id);
      if (task) {
        return task.title = title;
      }
      return task;
    } catch (e) {
      return this.setError('Something went wrong');
    }
  }

  @Action
  async deleteTask(id: string | null) {
    try {
      await taskService.deleteTask(id)
      if (id) {
        const filteredTasks = this.userTasks.filter((task: TaskI) => task._id !== id);
        return this.setTasks(filteredTasks)
      }
      const filteredTasks = this.userTasks.filter((task: TaskI) => !task.isChecked)
      return this.setTasks(filteredTasks)
    } catch (e) {
      return this.setError('Something went wrong');
    }
  }

  @Action
  async changeOrder({ taskFromId, taskToId }: any) {
    try {
      await taskService.changeOrder(taskFromId, taskToId)
    } catch (e) {
      return this.setError('Something went wrong');
    }
  }

  @Action
  async solveTask({_id, isChecked}: any) {
    try {
      await taskService.editTask(_id , {isChecked});
      const task = this.userTasks.find((task: TaskI) => task._id === _id);
      if (task) {
        task.isChecked = isChecked;
      }
    } catch (e) {
      return this.setError('Something went wrong');
    }
  }
}