<template>
  <!-- Class Toolbar - Add Class Button -->
  <div :class="styles.toolbar">
    <button class="add-btn" @click="$emit('show-add')">Tạo Lớp</button>
  </div>
</template>

<script setup>
import styles from './ClassManager.module.css'
</script>
