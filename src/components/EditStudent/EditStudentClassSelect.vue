<script setup>
// Props from parent and Events to parent
defineProps({
  selectedClass: String,
  classList: Array
})
const emit = defineEmits(['update:selectedClass'])
</script>

<template>
  <!-- class selection static dropdown -->
  <div class="form-row">
    <label>Chọn lớp:</label>
    <select
      :value="selectedClass"
      @change="e => emit('update:selectedClass', e.target.value)"
    >
      <option
        v-for="cls in classList"
        :key="cls.name"
        :value="cls.name"
      >
        {{ cls.name }}
      </option>
    </select>
  </div>
</template>
