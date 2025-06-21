// Imports
import { ref } from 'vue'

// Configuration and Load data to storage 
export const STORAGE_KEY = 'ezstudy-students'
export const studentsPerPage = 5

// States and arrays
export const activeTab = ref('student')
export const showAddForm = ref(false)
export const showEditForm = ref(false)
export const editingStudent = ref(null)
export const selectedClass = ref('all')

export const students = ref([])
export const currentPage = ref(1)
export const classList = ref([])
