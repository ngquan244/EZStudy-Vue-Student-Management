<script setup>
const props = defineProps({
  searchName: String,
  searchAge: String
})
const emit = defineEmits(['update:search-name', 'update:search-age', 'exact-search'])
</script>

<template>
  <div class="search-box">
    <input
      type="text"
      :value="searchName"
      placeholder="Nhập tên"
      @input="e => emit('update:search-name', e.target.value)"
    />
    <input
      type="text"
      :value="searchAge"
      placeholder="Nhập tuổi"
      @input="e => emit('update:search-age', e.target.value)"
    />
    <button class="exact-search-btn" @click="emit('exact-search')">
      Tìm kiếm chính xác
    </button>
  </div>
</template>

<style scoped src="../../styles/student-list.css"></style>