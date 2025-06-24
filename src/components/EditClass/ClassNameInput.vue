<script setup>
const modelValue = defineModel()
</script>

<template>
  <div class="form-row">
    <label>Tên lớp:</label>
    <input v-model="modelValue" type="text" />
  </div>
</template>

<style scoped src="../../styles/edit-class.css"></style>