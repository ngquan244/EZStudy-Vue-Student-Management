<script setup>
const modelValue = defineModel()
</script>

<template>
  <div class="form-row">
    <label>Khối mới:</label>
    <input v-model="modelValue" type="text" placeholder="Nhập tên khối" />
  </div>
</template>

<style scoped src="../../styles/add-class.css"></style>