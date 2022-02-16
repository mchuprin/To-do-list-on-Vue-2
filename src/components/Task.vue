<template>
  <div>
    <div v-if="!task.isChecked" class="task task_active">
      <p>{{ index + 1 + "." }}</p>
      <template v-if="isEdit">
        <input
          v-auto-focus
          v-model="editValue"
          @keypress.enter="editDecision('confirm')"
          @keydown.escape="editDecision('cancel')"
        />
      </template>
      <template v-else>
        <div class="task__edit">
          <p>{{ task.title }}</p>
          <div class="task__actions">
            <button @click="checked">
              <i class="fas fa-check"></i>
            </button>
            <button @click="startEdit(task.title)">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <div class="task__arrows">
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
    <div v-else class="task task_completed">
      <div class="task__icon-text">
        <i class="fas fa-check"></i>
        <p>{{ task.title }}</p>
      </div>
      <button @click="removeTask(task.id)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { TaskI } from '@/interfaces/task.interface';

@Component({
  props: ['task', 'index'],
})
export default class Task extends Vue {
  task!: TaskI;
  editValue = '';
  isEdit = false;

  checked() {
    this.$emit('check-task', this.task.id);
  }

  removeTask() {
    this.$emit('remove-task', this.task.id);
  }

  changeOrder(index: number, type: string) {
    this.$emit('change-order', index, type);
  }

  editDecision(type: 'confirm' | 'cancel') {
    if (type === 'confirm') {
      this.isEdit = false;
      this.task.title = this.editValue;
      this.$emit('confirm-edit', this.editValue);
      this.editValue = '';
    } else if (type === 'cancel') {
      this.isEdit = false;
      this.editValue = '';
    }
  }

  startEdit(title: string) {
    this.isEdit = true;
    this.editValue = title;
    // setTimeout(() => (this.$refs?.input as any)?.focus());
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/_colors.scss";
@import "src/assets/mixins.scss";

button {
  @include button;
}

.task {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 771px;
  padding: 5px 25px;
  height: 50px;
  gap: 5px;
  &_active {
    background: $added-color;
    color: white;
    input {
      background: $input-back;
      border: none;
      outline: none;
      color: white;
      padding: 7px 10px;
      width: 670px;
    }
    button {
      color: white;
    }
  }
  &_completed {
    background: $done-color;
    color: black;
    button {
      display: flex;
      justify-content: flex-end;
      color: black;
    }
  }
  &__icon-text {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &__arrows {
    display: flex;
    flex-direction: column;
  }
  &__edit {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 735px;
  }
}
</style>
