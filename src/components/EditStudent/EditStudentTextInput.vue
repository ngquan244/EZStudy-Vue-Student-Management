<script setup>
// Props from parent and Events to parent
defineProps({
  label: String,
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <!-- Name Input text box -->
  <div class="form-row">
    <label>{{ label }}</label>
    <input
      :value="modelValue"
      @input="e => emit('update:modelValue', e.target.value)"
      type="text"
    />
  </div>
</template>
