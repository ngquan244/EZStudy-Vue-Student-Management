<script setup>
  const emit = defineEmits(['close'])
</script>

<template>
  <h2>Thêm học sinh</h2>
  <p>Giao diện thêm học sinh đang được phát triển</p>
  <button @click="$emit('close')">Quay lại</button>
</template>

<style scoped>
</style>
