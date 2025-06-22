<script setup>
// Import Child Components
import AddStudent from '../AddStudent/AddStudent.vue'
import EditStudent from '../EditStudent/EditStudent.vue'
import StudentFilter from './StudentFilter.vue'
import StudentTable from './StudentTable.vue'

// Props from parents
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
  'add', 'edit', 'delete', 'close',
  'change-page', 'update:selected-class',
  'add-student', 'edit-student'
])

// close function
function emitClose() {
  emit('close')
}
</script>

<template>
  <div>
    <!-- Filter dropdown/ AddStudent button/ Edit Student button/ Student Table -->
    <StudentFilter
      v-if="!props.showAddForm && !props.showEditForm"
      :selected-class="props.selectedClass"
      :class-list="props.classList"
      @update:selected-class="val => emit('update:selected-class', val)"
    />

    <AddStudent
      v-if="props.showAddForm"
      @close="emitClose"
      @add-student="s => emit('add-student', s)"
      :class-list="props.classList"
    />

    <EditStudent
      v-else-if="props.showEditForm"
      :student="props.editingStudent"
      @close="emitClose"
      @edit-student="s => emit('edit-student', s)"
      :class-list="props.classList"
    />

    <StudentTable
      v-else
      :students="props.students"
      :current-page="props.currentPage"
      :total-pages="props.totalPages"
      @add="() => emit('add')"
      @edit="student => emit('edit', student)"
      @delete="id => emit('delete', id)"
      @change-page="page => emit('change-page', page)"
    />
  </div>
</template>

// Không thể rút gọn dưới 50 trang được nữa do cần liệt kê đủ các thành phần trong StudentList 