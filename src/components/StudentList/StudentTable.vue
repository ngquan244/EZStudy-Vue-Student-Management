<script setup>
// Import CSS modules and child components
import styles from './StudentTable.module.css'
import StudentTableHeader from './StudentTableHeader.vue'
import StudentTableRow from './StudentTableRow.vue'
import StudentPagination from './StudentPagination.vue'

// Props from parent and Events to parent
const props = defineProps({
  students: Array,
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['add', 'edit', 'delete', 'change-page'])
</script>

<template>
  <div>
    <!-- Add Student button to open add student form -->
    <button :class="styles.addBtn" @click="$emit('add')">Thêm Học Sinh</button>

    <table :class="styles.table">
      <StudentTableHeader />
      <!-- Table interface include table row and table pagination-->
      <tbody>
        <StudentTableRow
          v-for="(student, index) in students"
          :key="student.id"
          :student="student"
          :index="index"
          :current-page="currentPage"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
        />
        <tr v-if="students.length === 0">
          <td :class="styles.td" colspan="5" style="text-align:center;"> Không có học sinh nào </td>
        </tr>
      </tbody>
    </table>

    <StudentPagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="emit('change-page', $event)"
    />
  </div>
</template>
