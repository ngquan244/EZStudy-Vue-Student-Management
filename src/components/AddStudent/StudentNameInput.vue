<script setup>
const modelValue = defineModel()
</script>

<template>
  <div class="form-row">
    <label>Họ và tên:</label>
    <input v-model="modelValue" type="text" placeholder="Nhập họ tên" />
  </div>
</template>

<style scoped src="../../styles/add-student.css"></style>