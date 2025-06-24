<script setup>
// Import Logical JS
import useEditClass from '../../composables/EditClass/useEditClass'

// Import Child Components
import ClassNameInput from './ClassNameInput.vue'
import GradeSelect from './GradeSelect.vue'
import CustomGradeInput from './CustomGradeInput.vue'
import FormButtons from './FormButtons.vue'

const {
  className,
  selectedGrade,
  gradeList,
  isCustomGrade,
  customGrade,
  isEditingUnassigned,
  save,
  onGradeChange,
  router
} = useEditClass()
</script>

<template>
  <div class="form-container">
    <h2>Sửa Lớp</h2>

    <ClassNameInput v-model="className" />

    <GradeSelect
      v-model="selectedGrade"
      :grade-list="gradeList"
      @change="onGradeChange"
    />

    <CustomGradeInput
      v-if="isCustomGrade"
      v-model="customGrade"
    />

    <FormButtons @save="save" @cancel="router.push('/classes')" />
  </div>
</template>

<style scoped src="../../styles/edit-class.css"></style>
