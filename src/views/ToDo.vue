<template id="task-list">
  <div class="body">
    <div class="top-line">
      <h1 class="top-line__title">To-do list</h1>
      <div id="input" class="top-line__input-line">
        <v-text-field
          ref="topInput"
          v-model="inputValue"
          @keypress.enter="addTask"
          label="Enter your task..."
          prepend-inner-icon="mdi-plus"
          maxlength="50"
          counter
          color="white"
          background-color="grey darken-3"
          hint="Enter no more than 50 characters"
          class="rounded-0"
          dark
          solo
        ></v-text-field>
        <v-btn
          class="rounded-0"
          :disabled="!isNewTaskValid"
          @click="addTask"
          height="48"
          dark
          color="rgba(238, 194, 58, 0.50)"
          >Add</v-btn
        >
      </div>
      <div v-if="inputLoading">
        <v-progress-linear
            indeterminate
            color="#424242"
        ></v-progress-linear>
      </div>
    </div>
    <div class="loading" v-if="isLoading">
      <v-progress-circular
        :width="2"
        :size="70"
        indeterminate
        color="#424242"
      ></v-progress-circular>
    </div>
    <div v-else>
      <div class="tasks tasks_added">
        <h2>Need to do</h2>
        <transition-group name="order" tag="ul">
          <div
            v-for="(task, index) in toDoTasks"
            @click="() => toggleTaskSelection(task._id)"
            :key="task._id"
          >
            <Task
              :index="index"
              :task="task"
              :selected="isTaskSelected(task._id)"
              @check-task="() => checked(task._id, !task.isChecked)"
              @change-order="changeOrder"
              @confirm-edit="() => confirmEdit(task)"
            />
          </div>
        </transition-group>
      </div>
      <div class="tasks tasks_completed">
        <div class="tasks__top-line">
          <h2 class="tasks__header">Done tasks</h2>
          <button @click="removeTask(null)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <transition-group name="deleting" tag="ul">
          <Task
            v-for="(oneTask, index) in doneTasks"
            :key="oneTask._id"
            :index="index"
            :task="oneTask"
            @check-task="() => checked(oneTask._id, !oneTask.isChecked)"
            @remove-task="removeTask(oneTask._id)"
          />
        </transition-group>
      </div>
    </div>
    <ErrorModal/>
  </div>
</template>

<script lang="ts">
import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import Task from '@/components/todo/ToDoTask.vue';
import ErrorModal from '@/components/common/AppErrorModal.vue';
import { TaskI } from '@/interfaces/task.interface';
import { taskStore } from '@/store/store';

@Component({
  components: {
    ErrorModal,
    Task,
  },
})
export default class Test extends Vue {
  inputValue = '';

  created() {
    taskStore.getTasks()
  }

  get userTasks() {
    return taskStore.userTasks
  }

  get inputLoading() {
    return taskStore.inLoading
  }

  get isNewTaskValid(): boolean {
    return this.inputValue.length <= 50 && !!this.inputValue.length;
  }

  get isHintOpen(): boolean {
    return this.inputValue.length > 50;
  }

  get toDoTasks() {
    return this.userTasks
      .filter((task: TaskI) => !task.isChecked)
      .sort((a: TaskI, b: TaskI) => a.order - b.order);
  }

  get doneTasks(): TaskI[] {
    return this.userTasks.filter((task: TaskI) => task.isChecked);
  }

  get isLoading() {
    return taskStore.isLoading
  }

  isTaskSelected(taskId: string): boolean {
    const ids = (this.$route.query.id || []) as string[];
    return (ids as string[]).includes(String(taskId));
  }

  toggleTaskSelection(taskId: string): void {
    const ids = (this.$route.query.id || []) as string[];
    const updatedIds = this.isTaskSelected(taskId)
      ? ids.filter((id) => id !== String(taskId))
      : [...ids, String(taskId)];
    this.$router.push({ path: '/todos', query: { id: updatedIds } });
  }

  async addTask() {
    if (!this.isNewTaskValid) {
      return;
    }
    taskStore.setInputLoading(true)
    try {
      await taskStore.addTask(this.inputValue);
      this.inputValue = '';
      (this.$refs.topInput as any).focus();
    } finally {
      taskStore.setInputLoading(false)
    }
  }

  async checked(_id: string, isChecked: boolean) {
    await taskStore.solveTask({_id, isChecked});
  }

  async confirmEdit(task: any) {
    const taskInfo = {_id: task._id, title: task.title}
    await taskStore.confirmEdit(taskInfo);
  }

  async removeTask(id: string | null) {
    await taskStore.deleteTask(id)
  }

  async changeOrder(taskFrom: TaskI, direction: 'up' | 'down') {
    const indexFrom = this.toDoTasks.findIndex((task) => task._id === taskFrom._id);
    const indexTo = indexFrom + (direction === 'up' ? -1 : 1);
    const taskTo: any = this.toDoTasks.find((task, index) => index === indexTo)
    await taskStore.changeOrder({taskFromId: taskFrom._id, taskToId: taskTo._id})
    if (this.toDoTasks.length <= indexTo || indexTo < 0) {
      return;
    }
    const orderTo = this.toDoTasks[indexTo].order;
    this.toDoTasks[indexTo].order = this.toDoTasks[indexFrom].order;
    this.toDoTasks.find(task => {
      if (task._id === taskFrom._id) {
        task.order = orderTo;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
@import "src/assets/colors";
@import "src/assets/mixins";

button {
  @include button;
}

li {
  display: grid;
  grid-template-columns: 20px 30vw repeat(3, 35px);
  align-items: center;
  width: max-content;
  padding: 5px 25px;
  height: 50px;
  gap: 5px;
}

.body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20%;
  align-items: center;
  height: fit-content;
  width: max-content;
  gap: 30px;
}

.top-line {
  &__title {
    padding-bottom: 10px;
  }
  v-text-field {
    border-radius: 0;
    color: white;
  }
  &__input-line {
    display: flex;
    flex-direction: row;
    width: 771px;
    min-height: 60px;
    button {
      background: $top-button;
      box-sizing: border-box;
      width: 20%;
      font-size: 16px;
      color: white;
    }

    button:disabled {
      cursor: not-allowed;
    }
  }
}

.loading {
  display: flex;
  justify-content: center;
}
.tasks {
  display: flex;
  flex-direction: column;
  width: 50%;

  ul {
    display: flex;
    flex-direction: column;
    padding: 10px 0 0 0;
    width: 771px;
    gap: 5px;
  }

  &__top-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 771px;
  }
  &_added {
    li {
      background: rgba(0, 0, 0, 0.58);

      button {
        color: white;
      }
    }

    &_completed {
      li {
        background: rgba(255, 253, 253, 0.58);
        align-items: center;
        color: black;
      }
    }
  }
}

transition-group {
  width: 771px;
}

.deleting {
  &-leave {
    &-from {
      background: $deleting-color;
    }
    &-to {
      transform: translateX(50px);
      background: $deleting-color;
      opacity: 0;
    }
    &-active {
      transition: opacity 1s ease, transform 1s ease;
    }
  }
}

.order-move {
  transition: transform 1s;
}
</style>
