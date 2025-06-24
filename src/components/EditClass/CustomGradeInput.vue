<script setup>
const modelValue = defineModel()
</script>

<template>
  <div class="form-row new-grade">
    <label>Khối mới:</label>
    <input v-model="modelValue" type="text" placeholder="Nhập tên khối" />
  </div>
</template>

<style scoped src="../../styles/edit-class.css"></style>