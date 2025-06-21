<script setup>
// Props from parent and events to parent
defineProps(['classes', 'currentPage', 'classesPerPage'])
defineEmits(['edit', 'delete'])

// Import CSS modules
import styles from './ClassManager.module.css'
</script>

<template>
  <!-- Class Table interface and edit delete button -->
  <table :class="styles.classTable">
    <thead>
      <tr>
        <th>#</th>
        <th>Tên lớp</th>
        <th>Thuộc</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in classes" :key="item.name + '-' + item.grade">
        <td>{{ (currentPage - 1) * classesPerPage + index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.grade }}</td>
        <td>
          <button class="edit-btn" @click="$emit('edit', item)">Sửa</button>
          <button class="delete-btn" @click="$emit('delete', item)">Xóa</button>
        </td>
      </tr>
      <tr v-if="classes.length === 0">
        <td colspan="4" style="text-align: center;">Chưa có lớp nào</td>
      </tr>
    </tbody>
  </table>
</template>
