<script setup>
const props = defineProps({
  students: Array,
  offset: Number
})
const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <table class="student-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Họ tên</th>
        <th>Tuổi</th>
        <th>Lớp</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(student, index) in students" :key="student.id">
        <td>{{ offset + index + 1 }}</td>
        <td>{{ student.name }}</td>
        <td>{{ student.age }}</td>
        <td>{{ student.class }}</td>
        <td>
          <button @click="$emit('edit', student.id)">Sửa</button>
          <button @click="$emit('delete', student.id)">Xóa</button>
        </td>
      </tr>
      <tr v-if="students.length === 0">
        <td colspan="5" style="text-align:center;">Không có học sinh nào</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped src="../../styles/student-list.css"></style>