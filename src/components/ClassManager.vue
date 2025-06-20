<script setup>
import { ref, onMounted, watch, computed } from 'vue'

// Import child components
import AddClass from './AddClass.vue'
import EditClass from './EditClass.vue'

// Configuration Constants 
// Key for Local Storage of classes
const STORAGE_KEY = 'ezstudy-classes'

// Reactive UI States
const classes = ref([])
const showAddForm = ref(false)
const showEditForm = ref(false)
const editingClass = ref(null)
const editingIndex = ref(-1)

// Paginating states
const currentPage = ref(1)
const classesPerPage = 5

// LifeCyle Hook
// Load Classes from localStorage on component mount
onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  try {
    classes.value = stored ? JSON.parse(stored) : []
  } catch {
    classes.value = []
  }
})

// Watcher
// Watch for changes in classes array 
watch(classes, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

// Sort classes by grade (by priority 11-->12)
const sortedClasses = computed(() => {
  return [...classes.value].sort((a, b) => {
    const getPriority = grade => grade === 'Lớp 11' ? 0 : 1
    return getPriority(a.grade) - getPriority(b.grade)
  })
})

// Handle paginating logic functions 
const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * classesPerPage
  return sortedClasses.value.slice(start, start + classesPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(sortedClasses.value.length / classesPerPage)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Actions with classlist
//  Add Class, Delete Class,Edit Class
function addClass(newClass) {
  if (classes.value.some(c => c.name === newClass.name)) {
    alert('Lớp đã tồn tại!')
    return
  }
  classes.value.push(newClass)
}

function deleteClass(index) {
  const confirmDelete = confirm('Bạn có chắc chắn muốn xóa lớp này?')
  if (!confirmDelete) return
  classes.value.splice(index, 1)
}

// the different between editClass and updateClass
// editClass after click "Sửa" button and before "Lưu"
function editClass(index) {
  editingIndex.value = index
  editingClass.value = { ...classes.value[index] }
  showEditForm.value = true
}

// after "Lưu"
function updateClass(updated) {
  if (editingIndex.value !== -1) {
    classes.value.splice(editingIndex.value, 1, updated)
    showEditForm.value = false
  }
}

</script>

<template>
  <div class="class-manager">
    <h2 class="title">Quản Lý Lớp</h2>
    
    <!-- Toolbar with add class button, shown only when add form and edit form are not visible -->
    <div class="toolbar" v-if="!showAddForm && !showEditForm">
      <button class="add-btn" @click="showAddForm = true">Tạo Lớp</button>
    </div>

    <!-- Add class and Edit Class form component -->
    <AddClass v-if="showAddForm" @add-class="addClass" @close="showAddForm = false" />
    <EditClass v-if="showEditForm" :class-item="editingClass" @update-class="updateClass" @close="showEditForm = false" />

    <!-- Classes table, shown only when forms are not visible -->
    <!-- List of classes -->
    <table class="class-table" v-if="!showAddForm && !showEditForm">
      <thead>
        <tr>
          <th>#</th>
          <th>Tên lớp</th>
          <th>Thuộc</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedClasses" :key="index">
          <td>{{ (currentPage - 1) * classesPerPage + index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.grade }}</td>
          <td>
            <button class="edit-btn" @click="editClass(index)">Sửa</button>
            <button class="delete-btn" @click="deleteClass(index)">Xóa</button>
          </td>
        </tr>
        <!-- Empty state message when no classes exist -->
        <tr v-if="sortedClasses.length === 0">
          <td colspan="4" style="text-align:center;">Chưa có lớp nào</td>
        </tr>
      </tbody>
    </table>
    
    <!-- Pagination, shown only when there are multiple pages and forms are hidden -->
    <div class="page" v-if="totalPages > 1 && !showAddForm && !showEditForm">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        Trang trước
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        Trang sau
      </button>
    </div>
  </div>
</template>


<style scoped>
/* Unique styles different from common style in src/style.css */
.class-manager {
  margin-top: 16px;
}

.class-table {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  border-collapse: collapse;
}
.class-table th,
.class-table td {
  border: 1px solid black;
  padding: 8px;
  width: 150px;
  text-align: center;
}
</style>
