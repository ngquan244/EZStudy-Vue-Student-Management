<script setup>
// Imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive refs
const students = ref([])
const classList = ref([])
const selectedClass = ref('all')
const currentPage = ref(1)

// Configuration students per page
const studentsPerPage = 5

// Storage keys
const STORAGE_STUDENTS = 'ezstudy-students'
const STORAGE_CLASSES = 'ezstudy-classes'

// LifeCycle Hook load students data from storage
onMounted(() => {
  const storedStudents = localStorage.getItem(STORAGE_STUDENTS)
  try {
    students.value = storedStudents ? JSON.parse(storedStudents) : []
  } catch {
    students.value = []
  }

  const storedClasses = localStorage.getItem(STORAGE_CLASSES)
  try {
    classList.value = storedClasses ? JSON.parse(storedClasses) : []
  } catch {
    classList.value = []
  }
})

// Handle Filtering logics
const filteredStudents = computed(() => {
  if (selectedClass.value === 'all') return students.value

  if (selectedClass.value === '11' || selectedClass.value === '12') {
    const groupName = 'Lớp ' + selectedClass.value
    const matchingClassNames = classList.value
      .filter(c => c.grade === groupName)
      .map(c => c.name)
    return students.value.filter(s => matchingClassNames.includes(s.class))
  }

  return students.value.filter(s => s.class === selectedClass.value)
})

// Handle Paginating logics
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

// Helpful delete StudentFunction
function deleteStudent(id) {
  const confirmDelete = confirm('Bạn có chắc chắn muốn xóa học sinh này không?')
  if (!confirmDelete) return

  students.value = students.value.filter(s => s.id !== id)
  localStorage.setItem(STORAGE_STUDENTS, JSON.stringify(students.value))
  currentPage.value = 1
}
</script>

<template>
  <!-- Student List - Base App Interface include tool bar, table and page controller -->
  <div>
    <div class="filter-bar">
      <select v-model="selectedClass" @change="currentPage = 1">
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

    <div class="student-section">
      <button class="add-btn" @click="router.push('/students/add')">Thêm Học Sinh</button>

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
              <button @click="router.push(`/students/edit/${student.id}`)">Sửa</button>
              <button @click="deleteStudent(student.id)">Xóa</button>
            </td>
          </tr>
          <tr v-if="paginatedStudents.length === 0">
            <td colspan="5" style="text-align:center;">Không có học sinh nào</td>
          </tr>
        </tbody>
      </table>

      <div class="page" v-if="totalPages > 1">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Trang trước</button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Trang sau</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Style for both dark and light mode */

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