<script setup>
import { useRouter } from 'vue-router'

// Import Logical JS
import useAddStudent from '../../composables/AddStudent/useAddStudent'

// Import Child Components
import StudentNameInput from './StudentNameInput.vue'
import StudentBirthInput from './StudentBirthInput.vue'
import StudentClassSelect from './StudentClassSelect.vue'
import FormButtons from './FormButtons.vue'

const router = useRouter()

const {
  name,
  birthDate,
  selectedClass,
  classList,
  today,
  saveStudent
} = useAddStudent()
</script>

<template>
  <div class="form-container">
    <h2>Thêm Học Sinh</h2>
    <p>(Tạo lớp mới nếu chưa có lớp)</p>

    <StudentNameInput v-model="name" />

    <StudentBirthInput v-model="birthDate" :max="today" />

    <StudentClassSelect
      v-model="selectedClass"
      :class-list="classList"
    />

    <FormButtons
      @save="saveStudent"
      @cancel="router.push('/students')"
    />
  </div>
</template>

<style scoped src="../../styles/add-student.css"></style>
