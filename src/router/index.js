// Import router
import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '../components/StudentList.vue'
import AddStudent from '../components/AddStudent.vue'
import EditStudent from '../components/EditStudent.vue'
import ClassManager from '../components/ClassManager.vue'

// Router path
const routes = [
  { path: '/', redirect: '/students' },
  { path: '/students', component: StudentList },
  { path: '/students/add', component: AddStudent },
  { path: '/students/edit/:id', component: EditStudent, props: true },
  { path: '/classes', component: ClassManager }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
