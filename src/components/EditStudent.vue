<script setup>
const props = defineProps({
  student: Object
})
const emit = defineEmits(['close'])
</script>

<template>
    <h2>Sửa thông tin học sinh</h2>
    <p>Giao diện sửa đang được phát triển</p>
    <button class="back-btn" @click="$emit('close')">Quay lại</button>
</template>

<style scoped>
</style>
