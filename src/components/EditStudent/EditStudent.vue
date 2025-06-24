<script setup>
// Import Logical JS
import useEditStudent from '../../composables/EditStudent/useEditStudent'

// Import Child Components
import StudentNameInput from './StudentNameInput.vue'
import StudentBirthInput from './StudentBirthInput.vue'
import StudentClassSelect from './StudentClassSelect.vue'
import FormButtons from './FormButtons.vue'

const {
  student,
  name,
  birthDate,
  selectedClass,
  classList,
  today,
  save,
  cancel
} = useEditStudent()
</script>

<template>
  <div class="form-container" v-if="student">
    <h2>Sửa Thông Tin Học Sinh</h2>

    <StudentNameInput v-model="name" />

    <StudentBirthInput v-model="birthDate" :max="today" />

    <StudentClassSelect
      v-model="selectedClass"
      :class-list="classList"
    />

    <FormButtons @save="save" @cancel="cancel" />
  </div>
</template>

<style scoped src="../../styles/edit-student.css"></style>
