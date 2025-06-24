<script setup>
defineProps({
  rows: Array
})
const emit = defineEmits(['edit', 'remove'])
</script>

<template>
  <table class="class-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Lớp</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="rows.length">
        <tr v-for="row in rows" :key="row.type + '-' + row.name">
          <td>{{ row.index }}</td>
          <td
            class="class-name"
            :style="{ fontWeight: row.type === 'grade' ? 'bold' : 'normal' }"
          >
            {{ row.type === 'class' ? '---- ' + row.name : row.name }}
          </td>
          <td>
            <button @click="$emit('edit', row)">Sửa</button>
            <button @click="$emit('remove', row)">Xóa</button>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="3" style="text-align:center;">Chưa có lớp nào</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped src="../../styles/class-manager.css"></style>