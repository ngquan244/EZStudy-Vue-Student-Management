<script setup>
const modelValue = defineModel()
</script>

<template>
  <div class="form-row">
    <label>Tên lớp:</label>
    <input v-model="modelValue" type="text" placeholder="Nhập tên lớp" />
  </div>
</template>

<style scoped src="../../styles/add-class.css"></style>