<script setup>
// Import Components
// AddStudent and EditStudent imported in StudentList
import { ref, onMounted, watch, computed } from 'vue'
import StudentList from './components/StudentList.vue'
import ClassManager from './components/ClassManager.vue'

// Configuration Constants 
// NOTE: Key for Local Storage of students & pagination limit
const STORAGE_KEY = 'ezstudy-students'

const studentsPerPage = 5

// Reactive UI State
const activeTab = ref('student')
const showAddForm = ref(false)
const showEditForm = ref(false)
const editingStudent = ref(null)
const selectedClass = ref('all')

// Data Management 
// Array students loaded from localStorage - main array & based page index is 1 
const students = ref([])
const currentPage = ref(1)
const classList = ref([])

// Handle paginating and filtering logic 
// Filtering before paginating list of student
// Filtering by grade 11, 12 and filtering by class 11X 12X
const filteredStudents = computed(() => {
  if (selectedClass.value === 'all') return students.value

  const classListRaw = localStorage.getItem('ezstudy-classes')
  const allClasses = classListRaw ? JSON.parse(classListRaw) : []

  if (selectedClass.value === '11' || selectedClass.value === '12') {
    const groupName = 'Lớp ' + selectedClass.value
    const matchingClassNames = allClasses
      .filter(c => c.grade === groupName)
      .map(c => c.name)
    return students.value.filter(s => matchingClassNames.includes(s.class))
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
  const storedStudents = localStorage.getItem(STORAGE_KEY)
  try {
    students.value = storedStudents ? JSON.parse(storedStudents) : []
  } catch {
    students.value = []
  }

  const storedClasses = localStorage.getItem('ezstudy-classes')
  try {
    classList.value = storedClasses ? JSON.parse(storedClasses) : []
  } catch {
    classList.value = []
  }
})

// Watchers
// Auto-save to localStorage whenever data changes
watch(students, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

// Watcher reloadClassList whenever switch tab
watch(activeTab, (newTab) => {
  if (newTab === 'student') {
    reloadClassList()
  }
})

// Watcher - back to page 1 after filtering
watch(selectedClass, () => {
  currentPage.value = 1
})

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

function handleAddStudent(student) {
  students.value.push(student)
  showAddForm.value = false
}

function handleEditStudent(updatedStudent) {
  const index = students.value.findIndex(s => s.id === updatedStudent.id)
  if (index !== -1) {
    students.value.splice(index, 1, updatedStudent) 
    showEditForm.value = false
  }
}

function editStudent(student) {
  editingStudent.value = student
  showAddForm.value = false
  showEditForm.value = true
}

// Delete student + update local storage(watcher handled update already)
// Confirm before delete
function deleteStudent(id) {
  const confirmDelete = confirm('Bạn có chắc chắn muốn xóa học sinh này không?')
  if (!confirmDelete) return

  students.value = students.value.filter(student => student.id !== id)
  currentPage.value = 1
}

function closeForms() {
  showAddForm.value = false
  showEditForm.value = false
}

// Reload classlist after anychange
function reloadClassList() {
  const stored = localStorage.getItem('ezstudy-classes')
  try {
    classList.value = stored ? JSON.parse(stored) : []
  } catch {
    classList.value = []
  }
  
  if (
    selectedClass.value !== 'all' &&
    !classList.value.some(c => c.name === selectedClass.value)
  ) {
    selectedClass.value = 'all'
  }
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
    :class-list="classList"
    @update:selected-class="(val) => {
      selectedClass = val
      currentPage.value = 1
    }"
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