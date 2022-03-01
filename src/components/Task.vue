<template>
  <div>
    <v-card
      v-if="!task.isChecked"
      class="task task_active rounded-0"
      :class="{ task_selected: selected }"
      dark
      color="#1e1e1e99"
    >
      <v-card-title>{{ index + 1 + "." }}</v-card-title>
      <template v-if="isEdit">
        <v-text-field
          v-auto-focus
          v-model="editValue"
          @keypress.enter="editDecision('confirm')"
          @keydown.escape="editDecision('cancel')"
        />
      </template>
      <template v-else>
        <div class="task__edit">
          <v-card-text>{{ task.title }}</v-card-text>
          <v-card-actions class="task__actions">
            <v-icon @click.stop="checked">mdi-check</v-icon>
            <v-icon @click.stop="startEdit(task.title)">mdi-pencil</v-icon>
            <div class="task__arrows">
              <v-icon @click.stop="changeOrder(task.id, 'up')">mdi-chevron-up</v-icon>
              <v-icon @click.stop="changeOrder(task.id, 'down')">mdi-chevron-down</v-icon>
            </div>
          </v-card-actions>
        </div>
      </template>
    </v-card>
    <v-card
        v-else
        class="task task_completed rounded-0"
        color="#ffffff94"
        light
    >
        <v-card-title >
          <v-icon>mdi-check</v-icon>
        </v-card-title>
        <v-card-text
          class="pa-4"
        >{{ task.title }}</v-card-text>
      <v-icon @click="removeTask(task.id)">mdi-delete</v-icon>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { TaskI } from '@/interfaces/task.interface';

@Component({
  props: ['task', 'index', 'selected'],
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

  changeOrder(id: number, type: string) {
    this.$emit('change-order', id, type);
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
  //box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 771px;
  padding: 5px 15px;
  height: 50px;
  gap: 5px;
  p {
    margin: 0;
  }
  &_selected {
    outline: $selected-task solid 1px;
  }
  &_active {
    background: $added-color;
    color: white;
  }
  &_completed {
    background: $done-color;
    color: black;
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
