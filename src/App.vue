<script setup>
// Import CSS Modules and child components
import styles from './AppStyle.module.css'
import StudentList from './components/StudentList/StudentList.vue'
import ClassManager from './components/ClassManager/ClassManager.vue'
import { useAppLogic } from './composables/appLogic.js'

// Destructure states and methods from hook
const {
  activeTab,
  showAddForm,
  showEditForm,
  editingStudent,
  selectedClass,
  paginatedStudents,
  currentPage,
  totalPages,
  classList,
  switchTab,
  addStudent,
  editStudent,
  deleteStudent,
  closeForms,
  goToPage,
  handleAddStudent,
  handleEditStudent,
  reloadClassList
} = useAppLogic()
</script>

<template>
  <!-- StudentList - Base App -->
  <div :class="styles['header']">
    <h1 :class="styles['title']">EZSTUDY</h1>
    <div :class="styles['tabs']">
      <button @click="switchTab('student')" :class="{ active: activeTab === 'student' }">Học Sinh</button>
      <button @click="switchTab('class')" :class="{ active: activeTab === 'class' }">Lớp</button>
    </div>
  </div>

  <div :class="styles['page-offset']"></div>

  <StudentList
    v-if="activeTab === 'student'"
    :students="paginatedStudents"
    :show-add-form="showAddForm"
    :show-edit-form="showEditForm"
    :editing-student="editingStudent"
    :current-page="currentPage"
    :total-pages="totalPages"
    :selected-class="selectedClass"
    :class-list="classList"
    @update:selected-class="val => { selectedClass = val; currentPage = 1 }"
    @add="addStudent"
    @edit="editStudent"
    @delete="deleteStudent"
    @close="closeForms"
    @change-page="goToPage"
    @add-student="handleAddStudent"
    @edit-student="handleEditStudent"
  />

  <ClassManager v-else @update-classes="reloadClassList" />
</template>

// Không thể dưới 50 dòng do cần liệt kê đủ thành phần trong app.vue