<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive refs
const students = ref([])
const classList = ref([])
const selectedClass = ref('all')
const currentPage = ref(1)
const showSearch = ref(false)
const searchName = ref('')
const searchAge = ref('')
const filteredStudents = ref([])
const gradeList = ref([])

// Configuration
const studentsPerPage = 5
const STORAGE_STUDENTS = 'ezstudy-students'
const STORAGE_CLASSES = 'ezstudy-classes'
const GRADE_KEY = 'ezstudy-grades'


// Load data
onMounted(() => {
  const storedStudents = localStorage.getItem(STORAGE_STUDENTS)
  students.value = storedStudents ? JSON.parse(storedStudents) : []

  const storedClasses = localStorage.getItem(STORAGE_CLASSES)
  classList.value = storedClasses ? JSON.parse(storedClasses) : []

  const storedGrades = localStorage.getItem(GRADE_KEY)
  let parsedGrades = []

  try {
    parsedGrades = storedGrades ? JSON.parse(storedGrades) : []
  } catch {
    parsedGrades = []
  }

  // Default if null or []
  if (parsedGrades.length === 0) {
    parsedGrades = ['Lớp 11', 'Lớp 12']
    localStorage.setItem(GRADE_KEY, JSON.stringify(parsedGrades))
  }

  // Look for unassigned classes
  const hasUnassignedGrade = classList.value.some(c => c.grade === 'unassigned')

  gradeList.value = [...parsedGrades]

  if (hasUnassignedGrade && !gradeList.value.includes('Chưa phân khối')) {
    gradeList.value.push('Chưa phân khối')
  }
})


// Filter by class
const filteredByClass = computed(() => {
  const value = selectedClass.value

  if (value === 'all') return students.value
  if (value === 'unassigned') {
    return students.value.filter(s => s.class === 'Chưa phân lớp')
  }

  // prefix handle
  const [type, name] = value.split(':')

  if (type === 'class') {
    return students.value.filter(s => s.class === name)
  }

  if (type === 'grade') {
    let classNamesInGrade

    if (name === 'Chưa phân khối') {
      classNamesInGrade = classList.value
        .filter(c => c.grade === 'unassigned')
        .map(c => c.name)
    } else {
      classNamesInGrade = classList.value
        .filter(c => c.grade === name)
        .map(c => c.name)
    }

    return students.value.filter(s => classNamesInGrade.includes(s.class))
  }

  return []
})

// Filter by name and age
function applyLooseFilter() {
  let result = filteredByClass.value

  const nameTrimmed = searchName.value.trim().toLowerCase()
  const ageTrimmed = searchAge.value.trim()

  if (nameTrimmed) {
    result = result.filter(s => s.name.toLowerCase().startsWith(nameTrimmed))
  }

  if (ageTrimmed) {
    result = result.filter(s => String(s.age).startsWith(ageTrimmed))
  }

  filteredStudents.value = result
}

// Apply exactlt search input
function applyExactSearch() {
  const nameTrimmed = searchName.value.trim().toLowerCase()
  const ageTrimmed = searchAge.value.trim()

  filteredStudents.value = filteredByClass.value.filter(s => {
    const nameMatch = nameTrimmed ? s.name.toLowerCase() === nameTrimmed : true
    const ageMatch = ageTrimmed ? s.age === ageTrimmed : true
    return nameMatch && ageMatch
  })

  currentPage.value = 1
}

// Watcher watch filteredByClass to update results when class changes
watch(filteredByClass, applyLooseFilter, { immediate: true })

// Pagination handle
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

// Delete student function
function deleteStudent(id) {
  if (!confirm('Bạn có chắc chắn muốn xóa học sinh này không?')) return

  students.value = students.value.filter(s => s.id !== id)
  localStorage.setItem(STORAGE_STUDENTS, JSON.stringify(students.value))
  currentPage.value = 1
}

// Show filtered student list
function toggleSearch() {
  showSearch.value = !showSearch.value

  if (!showSearch.value) {
    searchName.value = ''
    searchAge.value = ''
    currentPage.value = 1
    applyLooseFilter()
  }
}
</script>

<template>
  <div>
    <!-- Filter Bar -->
    <div class="filter-bar">
      <select v-model="selectedClass" @change="currentPage = 1">
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


      <!-- Search filter toggle button -->
      <button @click="toggleSearch">
        {{ showSearch ? 'Đóng Tìm kiếm' : 'Tìm kiếm' }}
      </button>
    </div>

    <!-- Search Box -->
    <div v-if="showSearch" class="search-box">
      <input
        v-model="searchName"
        type="text"
        placeholder="Nhập tên"
        @input="applyLooseFilter(); currentPage = 1"
      />
      <input
        v-model="searchAge"
        type="text"
        placeholder="Nhập tuổi"
        @input="applyLooseFilter(); currentPage = 1"
      />
      <button class="exact-search-btn" @click="applyExactSearch">
        Tìm kiếm chính xác
      </button>
    </div>

    <!-- Student Table -->
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

      <!-- Pagination -->
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

.search-box {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  display: flex;
  gap: 10px;
}

.search-box input {
  max-width: 20%;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
  flex: 1;
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