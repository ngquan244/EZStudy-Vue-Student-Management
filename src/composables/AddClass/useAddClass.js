import { className, selectedGrade, gradeList, isCustomGrade, customGrade } from './state'
import { useInitGrades } from './lifecycle'
import { useSave } from './logicSave'
import { useEvents } from './events'

export default function useAddClass() {
  useInitGrades()
  const { save } = useSave()
  const { onGradeChange, cancel } = useEvents()

  return {
    className,
    selectedGrade,
    gradeList,
    isCustomGrade,
    customGrade,
    save,
    onGradeChange,
    cancel
  }
}
