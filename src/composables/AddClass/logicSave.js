import { className, selectedGrade } from './state'
import { handleCustomGrade } from './logicCustomGrade'
import { checkClassConflict } from './logicConflictCheck'
import { useRouter } from 'vue-router'
import { CLASS_KEY } from './constants'

export function useSave() {
  const router = useRouter()

  function save() {
    const trimmed = className.value.trim()
    if (!trimmed) {
      alert('Vui lòng nhập tên lớp!')
      return
    }

    if (trimmed.length > 20) {
      alert('Tên lớp không được vượt quá 20 ký tự!')
      return
    }

    if (!handleCustomGrade()) return
    if (checkClassConflict(trimmed)) return

    const stored = localStorage.getItem(CLASS_KEY)
    let classes = []
    try {
      classes = stored ? JSON.parse(stored) : []
    } catch {
      classes = []
    }

    const newClass = {
      name: trimmed,
      grade: selectedGrade.value
    }

    classes.push(newClass)
    localStorage.setItem(CLASS_KEY, JSON.stringify(classes))
    router.push('/classes')
  }

  return { save }
}
