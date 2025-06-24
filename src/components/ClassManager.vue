<script setup>
// Import
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Storage keys
const CLASS_KEY = 'ezstudy-classes'
const STUDENT_KEY = 'ezstudy-students'
const GRADE_KEY = 'ezstudy-grades'

// Refs
const classes = ref([])
const grades = ref([])
const currentPage = ref(1)
const rowsPerPage = 5

// LifeCyle Hook load data
onMounted(() => {
  try {
    const stored = localStorage.getItem(CLASS_KEY)
    classes.value = stored ? JSON.parse(stored) : []
  } catch {
    classes.value = []
  }

  let parsedGrades = []
  try {
    const storedGrades = localStorage.getItem(GRADE_KEY)
    parsedGrades = storedGrades ? JSON.parse(storedGrades) : []
  } catch {
    parsedGrades = []
  }

  if (parsedGrades.length === 0) {
    parsedGrades = ['Lớp 11', 'Lớp 12']
    localStorage.setItem(GRADE_KEY, JSON.stringify(parsedGrades))
  }

  grades.value = parsedGrades
})

// Group by grade
const groupedAllRows = computed(() => {
  const rows = []

  grades.value.forEach(grade => {
    rows.push({ type: 'grade', name: grade })
    const inGrade = classes.value
      .filter(c => c.grade === grade)
      .sort((a, b) => a.name.localeCompare(b.name))
    inGrade.forEach(cls => rows.push({ type: 'class', name: cls.name, grade }))
  })

  const ungrouped = classes.value
    .filter(cls => !grades.value.includes(cls.grade || '') || !cls.grade)
    .sort((a, b) => a.name.localeCompare(b.name))

  if (ungrouped.length > 0) {
    rows.push({ type: 'grade', name: 'Chưa phân khối' })
    ungrouped.forEach(cls => rows.push({ type: 'class', name: cls.name, grade: '' }))
  }

  return rows
})

// Handle Pagination logic
const totalPages = computed(() =>
  Math.ceil(groupedAllRows.value.length / rowsPerPage)
)

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage
  const sliced = groupedAllRows.value.slice(start, start + rowsPerPage)
  return sliced.map((item, i) => ({
    ...item,
    index: start + i + 1,
  }))
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Helpful Edit class Function
function edit(item) {
  if (item.type === 'grade' && item.name === 'Chưa phân khối') {
    alert('Không thể sửa "Chưa phân khối"')
    return
  }

  if (item.type === 'grade') {
    router.push(`/grades/edit/${encodeURIComponent(item.name)}`)
  } else {
    router.push(`/classes/edit/${encodeURIComponent(item.name)}`)
  }
}

// Helpful delete class function and set unassigned
function remove(item) {
  if (item.type === 'grade' && item.name === 'Chưa phân khối') {
    alert('Không thể xóa "Chưa phân khối"')
    return
  }

  if (!confirm('Bạn có chắc chắn muốn xóa?')) return

  if (item.type === 'grade') {
    const name = item.name
    classes.value = classes.value.map(c =>
      c.grade === name ? { ...c, grade: 'unassigned' } : c
    )
    grades.value = grades.value.filter(g => g !== name)
    localStorage.setItem(CLASS_KEY, JSON.stringify(classes.value))
    localStorage.setItem(GRADE_KEY, JSON.stringify(grades.value))
  } else {
    classes.value = classes.value.filter(
      c => c.name !== item.name || c.grade !== item.grade
    )

    const stored = localStorage.getItem(STUDENT_KEY)
    const students = stored ? JSON.parse(stored) : []
    students.forEach(s => {
      if (s.class === item.name) {
        s.class = 'Chưa phân lớp'
        s.grade = ''
      }
    })

    localStorage.setItem(CLASS_KEY, JSON.stringify(classes.value))
    localStorage.setItem(STUDENT_KEY, JSON.stringify(students))
  }

  currentPage.value = 1
}
</script>

<template>
  <!-- Class Manager Interface includes tool bar table and page controller-->
  <div class="class-manager">
    <h2 class="title">Quản Lý Lớp</h2>

    <div class="toolbar">
      <router-link to="/classes/add">
        <button class="add-btn">Tạo Lớp</button>
      </router-link>
    </div>

    <table class="class-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Lớp</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="paginatedRows.length">
          <tr v-for="row in paginatedRows" :key="row.type + '-' + row.name">
            <td>{{ row.index }}</td>
            <td class="class-name" :style="{ fontWeight: row.type === 'grade' ? 'bold' : 'normal' }">
              {{ row.type === 'class' ? '---- ' + row.name : row.name }}
            </td>
            <td>
              <button @click="edit(row)">Sửa</button>
              <button @click="remove(row)">Xóa</button>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="3" style="text-align:center;">Chưa có lớp nào</td>
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

<style scoped>
/* Style for both light and dark mode */
.class-manager {
  margin-top: 16px;
}

.class-table {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--border-color);
}

.class-table th,
.class-table td {
  border: 1px solid var(--border-color);
  padding: 8px;
  width: 150px;
  text-align: center;
  background-color: var(--cell-bg);
  color: var(--text-color);
}

.class-table td.class-name {
  text-align: left;
  padding-left: 12px;
}

.class-table th {
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
