<script setup>
// Import Logical JS
import useEditGrade from '../../composables/EditGrade/useEditGrade'

// Import Child Components
import GradeNameInput from './GradeNameInput.vue'
import FormButtons from './FormButtons.vue'

const {
  newGradeName,
  save,
  cancel
} = useEditGrade()
</script>

<template>
  <div class="form-container">
    <h2>Sửa Khối</h2>

    <GradeNameInput v-model="newGradeName" />

    <FormButtons @save="save" @cancel="cancel" />
  </div>
</template>

<style scoped src="../../styles/edit-grade.css"></style>
