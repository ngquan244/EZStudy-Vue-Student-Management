<script setup>
const modelValue = defineModel()
defineProps({
  max: String
})
</script>

<template>
  <div class="form-row">
    <label>Ngày sinh:</label>
    <input v-model="modelValue" type="date" :max="max" />
  </div>
</template>

<style scoped src="../../styles/add-student.css"></style>