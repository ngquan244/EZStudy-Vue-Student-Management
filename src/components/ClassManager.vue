<script setup>
// Imports
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

// Storage Key, refs and configuration classes per page
const STORAGE_KEY = 'ezstudy-classes'
const classes = ref([])
const currentPage = ref(1)
const classesPerPage = 5

const router = useRouter()

// LifeCycle Hook load classes from storage
onMounted(() => {
  loadClasses()
})

function loadClasses() {
  const stored = localStorage.getItem(STORAGE_KEY)
  try {
    classes.value = stored ? JSON.parse(stored) : []
  } catch {
    classes.value = []
  }
}

// Watcher watch for the changes in storage
watch(classes, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })

// pagination computing logics
const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * classesPerPage
  return classes.value.slice(start, start + classesPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(classes.value.length / classesPerPage)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Helpful Function, delete class
function deleteClass(item) {
  const confirmDelete = confirm('Bạn có chắc chắn muốn xóa lớp này?')
  if (!confirmDelete) return

  const index = classes.value.findIndex(c => c.name === item.name && c.grade === item.grade)
  if (index !== -1) {
    classes.value.splice(index, 1)
    currentPage.value = 1
  }
}
</script>

<template>
  <!-- Class Manager Interface include toolbar, table and page controller-->
  <div class="class-manager">
    <h2 class="title">Quản Lý Lớp</h2>

    <div class="toolbar">
      <router-link to="/classes/add">
        <button class="add-btn">Tạo Lớp</button>
      </router-link>
    </div>

    <table class="class-table" v-if="classes.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Tên lớp</th>
          <th>Thuộc</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedClasses" :key="item.name + '-' + item.grade">
          <td>{{ (currentPage - 1) * classesPerPage + index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.grade }}</td>
          <td>
            <router-link :to="`/classes/edit/${item.name}`">
              <button class="edit-btn">Sửa</button>
            </router-link>
            <button class="delete-btn" @click="deleteClass(item)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Chưa có lớp nào</p>

    <div class="page" v-if="totalPages > 1">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Trang trước</button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Trang sau</button>
    </div>
  </div>
</template>

<style scoped>
/* Styles for both light and dark mode */
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