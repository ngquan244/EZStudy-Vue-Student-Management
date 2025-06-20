<script setup>
import { computed } from 'vue'

// Import child components
import AddStudent from './AddStudent.vue'
import EditStudent from './EditStudent.vue'

// Props from parent
const props = defineProps({
  students: Array,
  showAddForm: Boolean,
  showEditForm: Boolean,
  editingStudent: Object,
  currentPage: Number,
  totalPages: Number,
  selectedClass: String,
  classList: Array
})

// Events to parent
const emit = defineEmits([
  'add', 'edit', 'delete', 'close', 'change-page', 'update:selected-class'
])

// Close form
function emitClose() {
  emit('close')
}

// Handle class options for filtering dropdown options
const grades = ['Lớp 11', 'Lớp 12']

const groupedClassOptions = computed(() => {
  const result = {
    'Lớp 11': [],
    'Lớp 12': []
  }
  for (const c of props.classList) {
    if (result[c.grade]) {
      result[c.grade].push(c.name)
    }
  }
  return result
})

</script>

<template>
  <div>
    <!-- Class filter dropdown choice box -->
    <div v-if="!showAddForm && !showEditForm" class="filter-bar">
      <select :value="selectedClass" @change="e => emit('update:selected-class', e.target.value)">
        <option value="all">Tất cả các lớp</option>
        <option value="11">Lớp 11</option>
        <option value="12">Lớp 12</option>
        <option
          v-for="cls in props.classList"
          :key="cls.name"
          :value="cls.name"
        >
          -- {{ cls.name }}
        </option>
      </select>
    </div>

    <!-- Edit form, Add Form - Future Update -->
    <AddStudent
      v-if="showAddForm"
      @close="emitClose"
      @add-student="student => emit('add-student', student)"
      :class-list="classList"
    />

    <EditStudent
      v-else-if="showEditForm"
      :student="editingStudent"
      @close="emitClose"
      @edit-student="student => emit('edit-student', student)"
      :class-list="classList"
    />

    <!-- Table for student list -->
    <div v-else class="student-section">
      <button class="add-btn" @click="$emit('add')">Thêm Học Sinh</button>
      
      <table class="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id">
            <td>{{ (currentPage - 1) * 5 + index + 1 }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
            <td>{{ student.class }}</td>
            <td>
              <button @click="$emit('edit', student)">Sửa</button>
              <button @click="$emit('delete', student.id)">Xóa</button>
            </td>
          </tr>
          <tr v-if="students.length === 0">
            <td colspan="5" style="text-align:center;">Không có học sinh nào</td>
          </tr>
        </tbody>
      </table>
      
      <!-- Pagination - currentpage - Previous/Next Page handle -->
      <div class="page" v-if="totalPages > 1">
        <button @click="$emit('change-page', currentPage - 1)" :disabled="currentPage === 1">
          Trang trước
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button @click="$emit('change-page', currentPage + 1)" :disabled="currentPage === totalPages">
          Trang sau
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Unique styles different from common style in src/style.css */
.filter-bar {
  margin: 12px 0;
}

.filter-bar select {
  padding: 6px;
  margin-right: 8px;
  border-radius: 4px;
}

.student-section {
  margin-top: 16px;
}

.student-table {
  margin-top: 15px;
  width: 100%;
  border-collapse: collapse;
}

.student-table th,
.student-table td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
  width: 150px;
}

.student-table th {
  background-color: white;
}

.page {
  margin-top: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}
</style>
