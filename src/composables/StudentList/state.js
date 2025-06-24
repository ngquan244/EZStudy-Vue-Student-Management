// Reactive states
import { ref } from 'vue'

export const students = ref([])
export const classList = ref([])
export const selectedClass = ref('all')
export const currentPage = ref(1)
export const showSearch = ref(false)
export const searchName = ref('')
export const searchAge = ref('')
export const filteredStudents = ref([])
export const gradeList = ref([])
