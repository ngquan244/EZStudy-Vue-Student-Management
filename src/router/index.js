import { createRouter, createWebHistory } from 'vue-router'

// Student Paths
import StudentList from '../components/StudentList/StudentList.vue'
import AddStudent from '../components/AddStudent/AddStudent.vue'
import EditStudent from '../components/EditStudent/EditStudent.vue'

// Class Paths
import ClassManager from '../components/ClassManager/ClassManager.vue'
import AddClass from '../components/AddClass/AddClass.vue'
import EditClass from '../components/EditClass/EditClass.vue'
import EditGrade from '../components/EditGrade/EditGrade.vue'

// Routes
const routes = [
  {
    path: '/',
    redirect: '/students'
  },
  {
    path: '/students',
    name: 'StudentList',
    component: StudentList
  },
  {
    path: '/students/add',
    name: 'AddStudent',
    component: AddStudent
  },
  {
    path: '/students/edit/:id',
    name: 'EditStudent',
    component: EditStudent,
    props: true
  },
  {
    path: '/classes',
    name: 'ClassManager',
    component: ClassManager
  },
  {
    path: '/classes/add',
    name: 'AddClass',
    component: AddClass
  },
  {
    path: '/classes/edit/:name',
    name: 'EditClass',
    component: EditClass,
    props: true
  },
  {
    path: '/grades/edit/:name',
    name: 'EditGrade',
    component: EditGrade,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
