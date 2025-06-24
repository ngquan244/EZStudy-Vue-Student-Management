<script setup>
const modelValue = defineModel()
defineProps({
  gradeList: Array
})
const emit = defineEmits(['change'])
</script>

<template>
  <div class="form-row">
    <label>Thuộc:</label>
    <select v-model="modelValue" @change="$emit('change')">
      <option v-for="grade in gradeList" :key="grade" :value="grade">{{ grade }}</option>
      <option value="unassigned">-- Chưa phân khối --</option>
      <option value="new-grade">-- Thêm khối mới --</option>
    </select>
  </div>
</template>

<style scoped src="../../styles/edit-class.css"></style>