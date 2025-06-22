<script setup>
// Imports
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

// configuration storage key and students per page
const STORAGE_KEY = 'ezstudy-students'
const studentsPerPage = 5

// Reactive router and refs
const router = useRouter()
const students = ref([])
const currentPage = ref(1)
const selectedClass = ref('all')

// Demo StudentList 
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

// LifeCycle Hook load data from storage on component mount
onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  try {
    students.value = stored ? JSON.parse(stored) : getDefaultStudents()
  } catch {
    students.value = getDefaultStudents()
  }
})

// Watcher watch for changes in storage
watch(students, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

// Watcher watch for filtering and reset to 1st page
watch(selectedClass, () => {
  currentPage.value = 1
})

// Handle filter logics
const filteredStudents = computed(() => {
  if (selectedClass.value === 'all') return students.value
  if (selectedClass.value === '11' || selectedClass.value === '12') {
    return students.value.filter(s => s.class.startsWith(selectedClass.value))
  }
  return students.value.filter(s => s.class === selectedClass.value)
})

// Handle paginating logics
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

// Helpful function delete Student, edit Student, addStudent
function deleteStudent(id) {
  if (confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
    students.value = students.value.filter(s => s.id !== id)
    currentPage.value = 1
  }
}

function editStudent(student) {
  router.push(`/students/edit/${student.id}`)
}

function addStudent() {
  router.push('/students/add')
}
</script>

<template>
  <div>
    <div class="filter-bar">
      <select v-model="selectedClass">
        <option value="all">Tất cả các lớp</option>
        <option value="11">Lớp 11</option>
        <option value="11A">-- Lớp 11A</option>
        <option value="11B">-- Lớp 11B</option>
        <option value="12">Lớp 12</option>
        <option value="12A">-- Lớp 12A</option>
        <option value="12B">-- Lớp 12B</option>
      </select>
    </div>

    <button class="add-btn" @click="addStudent">Thêm Học Sinh</button>

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
        <tr v-for="(student, index) in paginatedStudents" :key="student.id">
          <td>{{ (currentPage - 1) * studentsPerPage + index + 1 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>{{ student.class }}</td>
          <td>
            <button @click="editStudent(student)">Sửa</button>
            <button @click="deleteStudent(student.id)">Xóa</button>
          </td>
        </tr>
        <tr v-if="paginatedStudents.length === 0">
          <td colspan="5">Không có học sinh</td>
        </tr>
      </tbody>
    </table>

    <div class="page" v-if="totalPages > 1">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Trang trước</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Trang sau</button>
    </div>
  </div>
</template>

<style>
/* For both dark and light mode */
:root {
  --border-color: #333;
  --cell-bg: #fff;
  --text-color: #000;
  --header-bg: #f0f0f0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --border-color: #aaa;
    --cell-bg: #1e1e1e;
    --text-color: #f0f0f0;
    --header-bg: #2b2b2b;
  }
}

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
  border: 1px solid var(--border-color);
  padding: 8px;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
  width: 150px;
  background-color: var(--cell-bg);
  color: var(--text-color);
}

.student-table th {
  background-color: var(--header-bg);
}

.page {
  margin-top: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}
</style>
