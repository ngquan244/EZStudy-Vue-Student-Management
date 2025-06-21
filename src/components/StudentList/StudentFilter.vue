<script setup>
// props from parent
const props = defineProps({
  selectedClass: String,
  classList: Array
})

// Event to parent
const emit = defineEmits(['update:selected-class'])
</script>

<template>
  <!-- Dropdown filter bar -->
  <div class="filter-bar">
    <select :value="selectedClass" @change="e => emit('update:selected-class', e.target.value)">
      <option value="all">Tất cả các lớp</option>
      <option value="11">Lớp 11</option>
      <option value="12">Lớp 12</option>
      <option
        v-for="cls in classList"
        :key="cls.name"
        :value="cls.name"
      >
        -- {{ cls.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.filter-bar {
  margin: 12px 0;
}
.filter-bar select {
  padding: 6px;
  margin-right: 8px;
  border-radius: 4px;
}
</style>
