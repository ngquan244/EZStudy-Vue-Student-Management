import { selectedGrade, isCustomGrade } from './state'
import { useRouter } from 'vue-router'

export function useEvents() {
  const router = useRouter()

  function onGradeChange() {
    isCustomGrade.value = selectedGrade.value === 'new-grade'
  }

  function cancel() {
    router.push('/classes')
  }

  return { onGradeChange, cancel }
}
