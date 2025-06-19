<script setup>
// Vue Imports
// AddStudent and EditStudent imported in StudentList
import { ref, onMounted, watch, computed } from 'vue'
import StudentList from './components/StudentList.vue'
import ClassManager from './components/ClassManager.vue'

// Configuration Constants 
// NOTE: Key for Local Storaga & pagination limit
const STORAGE_KEY = 'ezstudy-students'

const studentsPerPage = 5

//UI State
const activeTab = ref('student')
const showAddForm = ref(false)
const showEditForm = ref(false)
const editingStudent = ref(null)
const selectedClass = ref('all')

// Data Management 
// Array students loaded from localStorage - main array & based page index is 1 
const students = ref([])
const currentPage = ref(1)

// Handle paginating logic 
const filteredStudents = computed(() => {
  if (selectedClass.value === 'all') return students.value
  if (selectedClass.value === '11' || selectedClass.value === '12') {
    return students.value.filter(s => s.class.startsWith(selectedClass.value))
  }
  return students.value.filter(s => s.class === selectedClass.value)
})

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * studentsPerPage
  return filteredStudents.value.slice(start, start + studentsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(filteredStudents.value.length / studentsPerPage)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// LifeCyle Hook
// Load data from localStorage on component mount
// Fallback to default data if localStorage is corrupted
onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  try {
    students.value = stored ? JSON.parse(stored) : getDefaultStudents()
  } catch {
    students.value = getDefaultStudents()
  }
})

// Watchers
// Auto-save to localStorage whenever data changes
watch(students, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })


// Sample data for demo purposes
// Will be replaced with real data later
function getDefaultStudents() {
  return [
    { id: 1, name: 'Doraemon', age: '13', class: '11A' },
    { id: 2, name: 'Nobita', age: '13', class: '11B' },
    { id: 3, name: 'Shizuka', age: '13', class: '11A' },
    { id: 4, name: 'Chaien', age: '13', class: '11A' },
    { id: 5, name: 'Suneo', age: '13', class: '11A' },
    { id: 6, name: 'Nobisuke', age: '14', class: '12B' },
    { id: 7, name: 'Dorami', age: '14', class: '12A' },
    { id: 8, name: 'Nobi Tamako', age: '14', class: '12B' },
    { id: 9, name: 'Jaiko', age: '13', class: '11A' },
    { id: 10, name: 'Tachibana', age: '14', class: '12B' },
    { id: 11, name: 'Riruru', age: '14', class: '12A' }
  ]
}

// Navigation Function
function switchTab(tab) {
  activeTab.value = tab
  closeForms()
}

// Form Management Functions
function addStudent() {
  showAddForm.value = true
  showEditForm.value = false
}

function editStudent(student) {
  editingStudent.value = student
  showAddForm.value = false
  showEditForm.value = true
}

// TODO: Implement actual delete functionality
// Currently just shows message
function deleteStudent(id) {
  alert('Chức năng xóa sẽ được cập nhật sau.')
}

function closeForms() {
  showAddForm.value = false
  showEditForm.value = false
}
</script>

<template>
  
    <!-- Fixed header for title and navigation -->
  <div class="header">
    <h1 class="title">EZSTUDY</h1>
    <div class="tabs">
      <button @click="switchTab('student')" :class="{ active: activeTab === 'student' }">Học Sinh</button>
      <button @click="switchTab('class')" :class="{ active: activeTab === 'class' }">Lớp</button>
    </div>
  </div>

  <!-- Spacer push content below header -->
  <div class="page-offset"></div>

  <StudentList
    v-if="activeTab === 'student'"
    :students="paginatedStudents"
    :show-add-form="showAddForm"
    :show-edit-form="showEditForm"
    :editing-student="editingStudent"
    :current-page="currentPage"
    :total-pages="totalPages"
    :selected-class="selectedClass"
    @update:selected-class="(val) => selectedClass = val"
    @add="addStudent"
    @edit="editStudent"
    @delete="deleteStudent"
    @close="closeForms"
    @change-page="goToPage"
  />

  <ClassManager v-else />
</template>

<style scoped>
/* Unique styles different from common style in src/style.css */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  max-width: 100%;
}

.page-offset {
  height: 80px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  color: #04AA6D;
}
</style>