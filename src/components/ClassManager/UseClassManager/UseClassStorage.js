import { onMounted, watch } from 'vue'

export function useClassStorage(classes, STORAGE_KEY = 'ezstudy-classes') {
  // Lifecyle hook - Load data from localStorage on component mount
  onMounted(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const loaded = stored ? JSON.parse(stored) : []
      classes.value = Array.isArray(loaded) ? loaded : []
      if (!loaded.length) localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    } catch {
      classes.value = []
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    }
  })

  // Watcher auto save to storage whenever data change
  watch(classes, val => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }, { deep: true })
}
