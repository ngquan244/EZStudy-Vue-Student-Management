<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number
})
const emit = defineEmits(['change-page'])

const goPrev = () => {
  if (props.currentPage > 1) emit('change-page', props.currentPage - 1)
}
const goNext = () => {
  if (props.currentPage < props.totalPages) emit('change-page', props.currentPage + 1)
}
</script>

<template>
  <div class="page">
    <button @click="goPrev" :disabled="currentPage === 1">Trang trước</button>
    <span>Trang {{ currentPage }} / {{ totalPages }}</span>
    <button @click="goNext" :disabled="currentPage === totalPages">Trang sau</button>
  </div>
</template>

<style scoped src="../../styles/student-list.css"></style>