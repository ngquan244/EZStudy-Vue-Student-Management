// Age calculator logic
export function calculateAge(birthDateStr) {
  const birthYear = new Date(birthDateStr).getFullYear()
  const currentYear = new Date().getFullYear()
  return currentYear - birthYear
}
    