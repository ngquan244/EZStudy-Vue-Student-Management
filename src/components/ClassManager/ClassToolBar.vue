<script setup>
// Import Css modules
import styles from './ClassManager.module.css'
</script>

<template>
  <!-- Class Toolbar - Add Class Button -->
  <div :class="styles.toolbar">
    <button class="add-btn" @click="$emit('show-add')">Tạo Lớp</button>
  </div>
</template>
