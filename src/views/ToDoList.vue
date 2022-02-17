<template id="task-list">
  <div class="body">
    <div class="top-line">
      <h1 class="top-line__title">Список дел</h1>
      <div id="input" class="top-line__input-line">
        <AppInput
          placeholder="Введите задачу..."
          @keypress.enter="addTask"
          v-model="inputValue"
        >
          <template></template>
          <template v-slot:prefix>
            <i v-if="isNewTaskValid" class="fas fa-plus"></i>
            <i v-else class="fas fa-ban"></i>
          </template>
          <template v-slot:postfix>
            <p>{{ inputValue.length }}/50</p>
          </template>
          <template v-slot:hint v-if="!isNewTaskValid">
            <p>Введите не более 50 символов</p>
          </template>
        </AppInput>
        <button :disabled="!isNewTaskValid" @click="addTask">Add</button>
      </div>
    </div>
    <div class="added-tasks tasks tasks_added">
      <h2>Need to do</h2>
      <ul>
        <Task
          v-for="(task, index) in toDoTasks"
          :key="task.id"
          :index="index"
          :task="task"
          @check-task="() => checked(task.id)"
          @change-order="changeOrder"
          @confirm-edit="(a) => confirmEdit(task.id, a)"
        />
      </ul>
    </div>
    <div class="tasks tasks_completed">
      <div class="tasks__top-line">
        <h2 class="tasks__header">Done tasks</h2>
        <button @click="removeTasks">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="done-tasks__list">
        <Task
          v-for="(oneTask, index) in doneTasks"
          :key="oneTask.id"
          :index="index"
          :task="oneTask"
          @remove-task="removeTask"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
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

  get isNewTaskValid(): boolean {
    return this.inputValue.length <= 50 && !!this.inputValue.length;
  }

  get toDoTasks(): TaskI[] {
    return this.tasks.filter((task) => !task.isChecked);
  }

  get doneTasks(): TaskI[] {
    return this.tasks.filter((task) => task.isChecked);
  }

  addTask(): void {
    if (!this.isNewTaskValid) {
      return;
    }
    this.tasks.push({
      title: this.inputValue.trim(),
      id: Math.random(),
      isChecked: false,
    });
    this.inputValue = '';
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

  changeOrder(index: number, type: 'up' | 'down'): void {
    if (type === 'up') {
      const to = index - 1;
      const from = index;
      this.tasks.splice(to, 0, this.tasks.splice(from, 1)[0]);
    }
    if (type === 'down') {
      const to = index + 1;
      const from = index;
      this.tasks.splice(to, 0, this.tasks.splice(from, 1)[0]);
    }
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
  gap: 30px;
}

.top-line {
  &__title {
    padding-bottom: 10px;
  }

  &__input-line {
    display: flex;
    flex-direction: row;
    button {
      background: $top-button;
      box-sizing: border-box;
      height: 35px;
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
</style>
