<script setup>
const modelValue = defineModel()
defineProps({
  classList: Array
})
</script>

<template>
  <div class="form-row">
    <label>Chọn lớp:</label>
    <select v-model="modelValue">
      <option value="Chưa phân lớp">Chưa phân lớp</option>
      <option
        v-for="cls in classList"
        :key="cls.name"
        :value="cls.name"
      >
        {{ cls.name }}
      </option>
    </select>
  </div>
</template>

<style scoped src="../../styles/add-student.css"></style>