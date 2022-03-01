<template id="task-list">
  <div class="body">
    <div class="top-line">
      <h1 class="top-line__title">To-do list</h1>
      <div id="input" class="top-line__input-line">
        <v-text-field
          class="rounded-0 "
          dark
          v-auto-focus
          v-model="inputValue"
          @keypress.enter="addTask"
          solo
          label="Enter your task..."
          prepend-inner-icon="mdi-plus"
          maxlength="50"
          counter
          color="white"
          background-color="grey darken-3"
          hint="Enter no more than 50 characters"
        ></v-text-field>
        <v-btn
          class="rounded-0"
          :disabled="!isNewTaskValid"
          @click="addTask"
          height="48"
          dark
          color="rgba(238, 194, 58, 0.50)"
        >Add</v-btn>
      </div>
    </div>
    <div class="tasks tasks_added">
      <h2>Need to do</h2>
      <transition-group name="order" tag="ul">
        <div
          v-for="(task, index) in toDoTasks"
          @click="() => toggleTaskSelection(task.id)"
          :key="task.id"
        >
          <Task
            :index="index"
            :task="task"
            :selected="isTaskSelected(task.id)"
            @check-task="() => checked(task.id)"
            @change-order="changeOrder"
            @confirm-edit="(a) => confirmEdit(task.id, a)"
          />
        </div>
      </transition-group>
    </div>
    <div class="tasks tasks_completed">
      <div class="tasks__top-line">
        <h2 class="tasks__header">Done tasks</h2>
        <button @click="removeTasks">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <transition-group name="deleting" tag="ul">
        <Task
          v-for="(oneTask, index) in doneTasks"
          :key="oneTask.id"
          :index="index"
          :task="oneTask"
          @remove-task="removeTask"
        />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import Task from '@/components/Task.vue';
import { TaskI } from '@/interfaces/task.interface';
import AppInput from '@/components/AppInput.vue';

@Component({
  components: {
    AppInput,
    Task,
  },
})
export default class Test extends Vue {
  tasks: TaskI[] = [];
  inputValue = '';

  get newTaskOrder(): number {
    if (!this.toDoTasks.length) {
      return 0;
    }
    const ordering = this.toDoTasks.map(({ order }) => order);
    return Math.max(...ordering) + 1;
  }

  get isNewTaskValid(): boolean {
    return this.inputValue.length <= 50 && !!this.inputValue.length;
  }

  get isHintOpen(): boolean {
    return this.inputValue.length > 50;
  }

  get toDoTasks(): TaskI[] {
    return this.tasks
      .filter((task) => !task.isChecked)
      .sort((a, b) => a.order - b.order);
  }

  get doneTasks(): TaskI[] {
    return this.tasks.filter((task) => task.isChecked);
  }

  isTaskSelected(taskId: number): boolean {
    const ids = (this.$route.query.id || []) as string[];
    return (ids as string[]).includes(String(taskId));
  }

  toggleTaskSelection(taskId: number): void {
    const ids = (this.$route.query.id || []) as string[];
    const updatedIds = this.isTaskSelected(taskId)
      ? ids.filter((id) => id !== String(taskId))
      : [...ids, String(taskId)];
    this.$router.push({ path: '/todos', query: { id: updatedIds } });
  }

  addTask(): void {
    if (!this.isNewTaskValid) {
      return;
    }
    this.tasks.push({
      title: this.inputValue.trim(),
      id: Math.random(),
      isChecked: false,
      order: this.newTaskOrder,
    });
    this.inputValue = '';
    (this.$refs.appInput as any).focus();
  }

  checked(id: number): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.isChecked = true;
    }
  }

  confirmEdit(id: number, title: string): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.title = title;
    }
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  removeTasks(): void {
    this.tasks = this.tasks.filter((task) => !task.isChecked);
  }

  changeOrder(id: number, type: 'up' | 'down'): void {
    const indexFrom = this.toDoTasks.findIndex((task) => task.id === id);
    const indexTo = indexFrom + (type === 'up' ? -1 : 1);

    if (this.toDoTasks.length <= indexTo || indexTo < 0) {
      return;
    }

    const orderTo = this.toDoTasks[indexTo].order;

    this.toDoTasks[indexTo].order = this.toDoTasks[indexFrom].order;
    this.toDoTasks.find((task) => {
      if (task.id === id) {
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
  align-content: center;
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
      //height: 35px;
      width: 20%;
      font-size: 16px;
      color: white;
    }

    button:disabled {
      cursor: not-allowed;
    }
  }
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
