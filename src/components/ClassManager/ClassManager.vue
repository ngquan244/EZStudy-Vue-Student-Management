<script setup>
// Import child components, logics js and css modules
import AddClass from '../AddClass/AddClass.vue'
import EditClass from '../EditClass/EditClass.vue'
import ClassToolbar from './ClassToolbar.vue'
import ClassTable from './ClassTable.vue'
import ClassPagination from './ClassPagination.vue'
import { useClassManager } from './useClassManager/useClassManager.js'
import styles from './ClassManager.module.css'

// States and methods from hook
const {
  showAddForm,
  showEditForm,
  editingClass,
  paginatedClasses,
  currentPage,
  totalPages,
  classesPerPage,
  goToPage,
  addClass,
  updateClass,
  editClass,
  deleteClass
} = useClassManager()
</script>

<template>
  <!-- Class Manager Interface -->
  <div :class="styles.classManager">
    <h2 class="title">Quản Lý Lớp</h2>

    <ClassToolbar
      v-if="!showAddForm && !showEditForm"
      @show-add="showAddForm = true"
    />

    <AddClass v-if="showAddForm" @add-class="addClass" @close="showAddForm = false" />
    <EditClass v-if="showEditForm" :class-item="editingClass" @update-class="updateClass" @close="showEditForm = false" />

    <ClassTable
      v-if="!showAddForm && !showEditForm"
      :classes="paginatedClasses"
      :currentPage="currentPage"
      :classesPerPage="classesPerPage"
      @edit="editClass"
      @delete="deleteClass"
    />

    <ClassPagination
      v-if="totalPages > 1 && !showAddForm && !showEditForm"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @go="goToPage"
    />
  </div>
</template>

// Không thể viết dưới 50 dòng do cần liệt kê đủ các thành phần của class manager