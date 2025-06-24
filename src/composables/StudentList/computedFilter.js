import { computed } from 'vue'
import { students, selectedClass, classList } from './state'

export const filteredByClass = computed(() => {
  const value = selectedClass.value

  if (value === 'all') return students.value
  if (value === 'unassigned') {
    return students.value.filter(s => s.class === 'Chưa phân lớp')
  }

  const [type, name] = value.split(':')

  if (type === 'class') {
    return students.value.filter(s => s.class === name)
  }

  if (type === 'grade') {
    let classNamesInGrade = []

    if (name === 'Chưa phân khối') {
      classNamesInGrade = classList.value
        .filter(c => c.grade === 'unassigned')
        .map(c => c.name)
    } else {
      classNamesInGrade = classList.value
        .filter(c => c.grade === name)
        .map(c => c.name)
    }

    return students.value.filter(s => classNamesInGrade.includes(s.class))
  }

  return []
})
