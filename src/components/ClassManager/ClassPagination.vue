<script setup>
// props from parent and events to parent
defineProps(['currentPage', 'totalPages'])
defineEmits(['go'])

// Import CSS modules
import styles from './ClassManager.module.css'
</script>

<template>
  <!-- Page control interface and handle logics -->
  <div :class="styles.page">
    <button @click="$emit('go', currentPage - 1)" :disabled="currentPage === 1">Trang trước</button>
    <span>Trang {{ currentPage }} / {{ totalPages }}</span>
    <button @click="$emit('go', currentPage + 1)" :disabled="currentPage === totalPages">Trang sau</button>
  </div>
</template>
