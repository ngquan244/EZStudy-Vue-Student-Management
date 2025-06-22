<script setup>
// Import Router
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <!-- Main Interface - StudentList -->
  <div class="header">
    <h1 class="title">EZSTUDY</h1>
    <div class="tabs">
      <router-link to="/students">
        <button :class="{ active: route.path.startsWith('/students') }">Học Sinh</button>
      </router-link>
      <router-link to="/classes">
        <button :class="{ active: route.path === '/classes' }">Lớp</button>
      </router-link>
    </div>
  </div>
  <div class="page-offset"></div>
  <router-view />
</template>


<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  max-width: 100%;
}

.page-offset {
  height: 80px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  color: #04AA6D;
}

</style>