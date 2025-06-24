<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number
})
const emit = defineEmits(['change-page'])
</script>

<template>
  <div class="page">
    <button
      @click="emit('change-page', currentPage - 1)"
      :disabled="currentPage === 1"
    >
      Trang trước
    </button>
    <span>Trang {{ currentPage }} / {{ totalPages }}</span>
    <button
      @click="emit('change-page', currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      Trang sau
    </button>
  </div>
</template>

<style scoped src="../../styles/class-manager.css"></style>