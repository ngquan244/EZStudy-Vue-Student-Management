// Imports and states
import { watch } from 'vue'
import { students, activeTab, selectedClass } from './states'
import { STORAGE_KEY } from './states'
import { reloadClassList } from './lifecycle'

//Watcher watch for changes, reload classlist and tab to 1st page
export function setupWatchers() {
  watch(students, (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
  }, { deep: true })

  watch(activeTab, (newTab) => {
    if (newTab === 'student') reloadClassList(selectedClass)
  })

  watch(selectedClass, () => {
    currentPage.value = 1
  })
}
