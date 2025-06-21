<script setup>
// Import CSS modules
import styles from './StudentTable.module.css'

// Props from parent and Events to parent
const props = defineProps({
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['change-page'])
</script>

<template>
  <!-- Student pagination control and logics handle -->
  <div :class="styles.page  ">
    <button @click="$emit('change-page', currentPage - 1)" :disabled="currentPage === 1">
      Trang trước
    </button>
    <span>Trang {{ currentPage }} / {{ totalPages }}</span>
    <button @click="$emit('change-page', currentPage + 1)" :disabled="currentPage === totalPages">
      Trang sau
    </button>
  </div>
</template>
