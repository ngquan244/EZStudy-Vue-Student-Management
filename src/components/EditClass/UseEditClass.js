// Import ref
import { ref, watch } from 'vue'

// Edit Class functions
export default function useEditClass(props, emit) {
  // Reactive states
  const className = ref('')
  const selectedGrade = ref('Lớp 11')
  // Today - for compute age
  const today = new Date().toISOString().split('T')[0]

  const initialize = () => {
    // Watcher watch for the change of classItem, auto fill
    watch(
      () => props.classItem,
      (val) => {
        if (val) {
          className.value = val.name
          selectedGrade.value = val.grade
        }
      },
      { immediate: true }
    )
  }

  // Save the edited class and close the form
  const save = () => {
    const trimmed = className.value.trim()
    if (!trimmed) {
      alert('Vui lòng nhập tên lớp!')
      return
    }

    emit('update-class', {
      ...props.classItem,
      name: trimmed,
      grade: selectedGrade.value
    })

    emit('close')
  }

  return {
    className,
    selectedGrade,
    today,
    initialize,
    save
  }
}
