<script setup>
// Props from parent and Events to parent
defineProps({
  label: String,
  modelValue: String,
  max: String
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <!-- Date Input  -->
  <div class="form-row">
    <label>{{ label }}</label>
    <input
      type="date"
      :value="modelValue"
      :max="max"
      @input="e => emit('update:modelValue', e.target.value)"
    />
  </div>
</template>
