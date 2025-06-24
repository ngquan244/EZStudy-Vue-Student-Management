<script setup>
// Import Logical JS
import useClassManager from '../../composables/ClassManager/useClassManager'

// Import Child Components
import ClassTable from './ClassTable.vue'
import Pagination from './ClassPagination.vue'

const {
  paginatedRows,
  totalPages,
  currentPage,
  goToPage,
  edit,
  remove
} = useClassManager()
</script>

<template>
  <div class="class-manager">
    <h2 class="title">Quản Lý Lớp</h2>

    <div class="toolbar">
      <router-link to="/classes/add">
        <button class="add-btn">Tạo Lớp</button>
      </router-link>
    </div>

    <ClassTable
      :rows="paginatedRows"
      @edit="edit"
      @remove="remove"
    />

    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="goToPage"
    />
  </div>
</template>

<style scoped src="../../styles/class-manager.css"></style>
