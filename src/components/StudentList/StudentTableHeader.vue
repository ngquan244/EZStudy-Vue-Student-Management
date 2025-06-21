<script setup>
// Import CSS Module
import styles from './StudentTable.module.css'
</script>

<template>
  <!-- Row headers-->
  <thead>
    <tr>
      <th :class="styles.th">#</th>
      <th :class="styles.th">Họ tên</th>
      <th :class="styles.th">Tuổi</th>
      <th :class="styles.th">Lớp</th>
      <th :class="styles.th">Thao tác</th>
    </tr>
  </thead>
</template>
