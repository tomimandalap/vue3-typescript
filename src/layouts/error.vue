<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<template>
  <div
    class="container is-flex is-flex-direction-column is-align-items-center is-justify-content-center min-vh-100"
  >
    <RouterView />
  </div>
</template>
<style scoped>
.min-vh-100 {
  min-height: 100vh;
}
</style>
