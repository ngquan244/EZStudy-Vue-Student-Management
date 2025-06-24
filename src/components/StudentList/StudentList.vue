<script setup>
// Import Logical JS
import { useStudentList } from '../../composables/StudentList/useStudentList'

// Import Child Components
import StudentFilterBar from './StudentFilterBar.vue'
import StudentSearchBox from './StudentSearchBox.vue'
import StudentTable from './StudentTable.vue'
import StudentPagination from './StudentPagination.vue'

const {
  router,
  classList,
  gradeList,
  selectedClass,
  currentPage,
  showSearch,
  searchName,
  searchAge,
  studentsPerPage,
  paginatedStudents,
  totalPages,
  applyLooseFilter,
  applyExactSearch,
  goToPage,
  deleteStudent,
  toggleSearch
} = useStudentList()
</script>

<template>
  <div>
    <!-- Filter Bar -->
    <StudentFilterBar
      :selected-class="selectedClass"
      :grade-list="gradeList"
      :class-list="classList"
      @update:selected-class="val => { selectedClass = val; currentPage = 1 }"
      @toggle-search="toggleSearch"
    />

    <!-- Search Box -->
    <StudentSearchBox
      v-if="showSearch"
      :search-name="searchName"
      :search-age="searchAge"
      @update:search-name="val => { searchName = val; applyLooseFilter(); currentPage = 1 }"
      @update:search-age="val => { searchAge = val; applyLooseFilter(); currentPage = 1 }"
      @exact-search="applyExactSearch"
    />

    <!-- Student Table -->
    <div class="student-section">
      <button class="add-btn" @click="router.push('/students/add')">Thêm Học Sinh</button>

      <StudentTable
        :students="paginatedStudents"
        :offset="(currentPage - 1) * studentsPerPage"
        @edit="id => router.push(`/students/edit/${id}`)"
        @delete="deleteStudent"
      />

      <StudentPagination
        v-if="totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        @change-page="goToPage"
      />
    </div>
  </div>
</template>

<style scoped src="../../styles/student-list.css"></style>
