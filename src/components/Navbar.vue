<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { useModal } from "../composables/useModal";

const route = useRoute();
const modal = useModal();
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="modal.showModal()">Sign Up</button>
        <RouterLink
          v-show="route.fullPath !== '/posts/new'"
          to="/posts/new"
          class="button"
          >New Post</RouterLink
        >
      </div>
    </div>
  </div>

  <Teleport to="#modal"> </Teleport>
</template>
