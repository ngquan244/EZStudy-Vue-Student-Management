import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { loadEditClassData } from './logicLoadClass'
import { saveClass } from './logicSaveClass'

export default function useEditClass() {
  const STORAGE_KEY = 'ezstudy-classes'
  const GRADE_KEY = 'ezstudy-grades'

  const className = ref('')
  const selectedGrade = ref('Lớp 11')
  const gradeList = ref([])
  const isCustomGrade = ref(false)
  const customGrade = ref('')
  const isEditingUnassigned = ref(false)

  const route = useRoute()
  const router = useRouter()

  onMounted(() => {
    loadEditClassData({
      route,
      router,
      STORAGE_KEY,
      GRADE_KEY,
      className,
      selectedGrade,
      gradeList,
      isEditingUnassigned
    })
  })

  function onGradeChange() {
    isCustomGrade.value = selectedGrade.value === 'new-grade'
  }

  function save() {
    saveClass({
      route,
      router,
      STORAGE_KEY,
      GRADE_KEY,
      className,
      selectedGrade,
      customGrade,
      gradeList
    })
  }

  return {
    className,
    selectedGrade,
    gradeList,
    isCustomGrade,
    customGrade,
    isEditingUnassigned,
    save,
    onGradeChange,
    router
  }
}
