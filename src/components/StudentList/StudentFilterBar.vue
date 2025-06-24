<script setup>
const props = defineProps({
  selectedClass: String,
  gradeList: Array,
  classList: Array
})
const emit = defineEmits(['update:selected-class', 'toggle-search'])

const onSelectChange = e => emit('update:selected-class', e.target.value)
</script>

<template>
  <!-- Filter Bar -->
  <div class="filter-bar">
    <select :value="selectedClass" @change="onSelectChange">
      <option value="all">-- Tất cả các lớp --</option>
      <option value="unassigned">-- Chưa phân lớp --</option>

      <template v-for="grade in gradeList" :key="'group-' + grade">
        <option :value="'grade:' + grade">
          {{ grade === 'Chưa phân khối' ? 'Chưa phân khối' : grade }}
        </option>
        <option
          v-for="cls in classList.filter(c =>
            grade === 'Chưa phân khối' ? c.grade === 'unassigned' : c.grade === grade
          )"
          :key="'class-' + cls.name"
          :value="'class:' + cls.name"
        >
          ---- {{ cls.name }}
        </option>
      </template>
    </select>

    <button @click="emit('toggle-search')">
      {{ selectedClass && selectedClass !== 'all' ? 'Đóng Tìm kiếm' : 'Tìm kiếm' }}
    </button>
  </div>
</template>

<style scoped src="../../styles/student-list.css"></style>