<script setup>
const modelValue = defineModel()
</script>

<template>
  <div class="form-row">
    <label>Họ và tên:</label>
    <input v-model="modelValue" type="text" />
  </div>
</template>

<style scoped src="../../styles/edit-student.css"></style>