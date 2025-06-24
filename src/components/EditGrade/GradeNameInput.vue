<script setup>
const modelValue = defineModel()
</script>

<template>
  <div class="form-row">
    <label>Tên khối:</label>
    <input v-model="modelValue" type="text" />
  </div>
</template>

<style scoped src="../../styles/edit-grade.css"></style>