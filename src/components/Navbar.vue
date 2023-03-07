<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
const route = useRoute();
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-show="route.fullPath !== '/posts/new'" class="buttons">
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
      </div>
    </div>
  </div>
</template>
