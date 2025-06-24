import { calculateAge } from './logicCalcAge'

// return new student info
export function buildNewStudent(name, birth, className) {
  return {
    id: Date.now(),
    name,
    birthDate: birth,
    age: calculateAge(birth).toString(),
    class: className
  }
}
