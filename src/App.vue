<script setup>
// Imports
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Navigation tabs logic
function goTo(tab) {
  if (tab === 'student') {
    router.push('/students')
  } else if (tab === 'class') {
    router.push('/classes')
  }
}
</script>

<template>
  <!-- Fixed header for title and navigation -->
  <div class="header">
    <h1 class="title">EZSTUDY</h1>
    <div class="tabs">
      <button
        @click="goTo('student')"
        :class="{ active: route.path.startsWith('/students') }"
      >
        Học Sinh
      </button>
      <button
        @click="goTo('class')"
        :class="{ active: route.path.startsWith('/classes') }"
      >
        Lớp
      </button>
    </div>
  </div>

  <!-- Spacer to push content below fixed header -->
  <div class="page-offset"></div>

  <!-- Main content rendered by router -->
  <router-view />
</template>

<style scoped src="./styles/main-app.css">
</style>
