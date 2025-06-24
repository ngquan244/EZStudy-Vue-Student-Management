<script setup>
// Import Logical JS
import useAddClass from '../../composables/AddClass/useAddClass'

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
  save,
  onGradeChange,
  cancel
} = useAddClass()
</script>

<template>
  <div class="form-container">
    <h2>Thêm Lớp Mới</h2>

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

    <FormButtons @save="save" @cancel="cancel" />
  </div>
</template>

<style scoped src="../../styles/add-class.css"></style>
