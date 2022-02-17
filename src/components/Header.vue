<template>
  <div class="top-line">
    <h1 class="top-line__title">Список дел</h1>
    <div id="input" class="top-line__input-line">
      <input v-model.trim="inputValue" @keypress.enter="addTask" v-auto-focus/>
      <button :disabled="!inputValue" @click="addTask">Add</button>
    </div>
    <input type="text" placeholder="Lalala">
    <AppInput type="text" placeholder="Lalala">
      <template v-slot:prefix><i /></template>
      <template v-slot:postfix>0/50</template>
      <template v-slot:hint>Hint</template>
    </AppInput>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: {

  }
}
</script>

<style scoped>

</style>