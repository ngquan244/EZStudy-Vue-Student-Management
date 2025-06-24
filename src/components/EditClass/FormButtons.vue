<script setup>
const emit = defineEmits(['save', 'cancel'])
</script>

<template>
  <div class="buttons">
    <button @click="$emit('save')">Lưu</button>
    <button @click="$emit('cancel')">Hủy</button>
  </div>
</template>

<style scoped src="../../styles/edit-class.css"></style>