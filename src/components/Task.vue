<template>
  <div>
    <div v-if="!task.isChecked" class="task task_active added-task">
      <p>{{ index + 1 + "." }}</p>
      <template v-if="isEdit">
        <input
          ref="input"
          v-model="editValue"
          @keypress.enter="confirmEdit"
          @keydown.escape="cancelEdit"
        />
      </template>
      <template v-else>
        <div class="added-task__edit">
          <p>{{ task.title }}</p>
<!--      ACTIONS    -->
          <div class="added-task__buttons">
            <button @click="checked">
              <i class="fas fa-check"></i>
            </button>
            <button @click="chooseEdit(task.title)">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <div class="added-task__arrows">
              <button @click="changeOrder(index, 'up')">
                <i class="fas fa-arrow-up"></i>
              </button>
              <button @click="changeOrder(index, 'down')">
                <i class="fas fa-arrow-down"></i>
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-else class="done-task task task_completed">
      <div class="done-task__btn-text">
        <i class="fas fa-check"></i>
        <p>{{ task.title }}</p>
      </div>
      <button @click="removeTask(task.id)" >
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { TaskI } from "@/interfaces/TaskInterface";

@Component({
  props: [
    'task',
    'index'
  ]
})
export default class Task extends Vue {
  task!: TaskI;
  editValue = "";
  isEdit = false;

  checked() {
    this.$emit('check-task', this.task.id);
  }

  removeTask() {
    this.$emit('remove-task', this.task.id);
  }

  changeOrder(index: number, type: string) {
    this.$emit('change-order', index, type)
  }
  cancelEdit() {
    console.log('hobasss')
    this.isEdit = false;
    this.editValue = "";
  }
  // TODO: use cancelEdit() inside
  confirmEdit() {
    console.log('hoba')
    this.isEdit = false;
    this.task.title = this.editValue
    this.$emit('confirm-edit', this.editValue)
    this.editValue = "";
  }
  // TODO: rename startEdit
  chooseEdit(title: string) {
    this.isEdit = true
    this.editValue = title;
    setTimeout(() => (this.$refs?.input as any)?.focus());
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/_colors.scss";
// TODO: move button styles to global styles
button {
  @include button;
}
h2 {
  text-align: start;
}
.task {
  //...
  &_active {

  }
  &_done {

  }
}
// TODO: refactor to task__active / task__completed
.added-task {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 771px;
  align-items: center;
  padding: 5px 25px;
  height: 50px;
  gap: 5px;
  background: $added-color;
  input {
    box-sizing: border-box;
    height:35px;
    width: 735px;
    outline: none;
    border: none;
    padding: 0 10px;
    color: white;
    background: rgba(2,0,36,0.50) 10%
  }
  .added-task__edit {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 735px;
    button {
      color: white;
    }.added-task__buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .added-task__arrows {
      display: flex;
      flex-direction: column;
    }
  }
}
button {
  box-sizing: border-box;
  width: 20%;
  font-size: 16px;
  color: white;
}
.done-task {
  display: flex;
  justify-content: space-between;
  width: 771px;
  align-items: center;
  padding: 5px 25px;
  height: 50px;
  gap: 5px;
  background: $done-color;
  color: black;
  .done-task__btn-text {
    display: flex;
    flex-direction: row;
    gap: 22px;
  }
  button {
    display: flex;
    justify-content: flex-end;
    color: black;
  }
}
</style>