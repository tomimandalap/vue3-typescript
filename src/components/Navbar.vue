<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { useModal } from "../composables/useModal";
import { storeUser } from "../stores/users";
import SignUp from "./SignUp.vue";

const route = useRoute();
const modal = useModal();
const userStore = storeUser();
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="userStore.userId" class="buttons">
        <RouterLink
          v-show="route.fullPath !== '/posts/new'"
          to="/posts/new"
          class="button is-success"
          >New Post</RouterLink
        >
        <button class="button is-danger" @click="userStore.logout()">
          Log Out
        </button>
      </div>

      <div v-else class="buttons">
        <button class="button" @click="modal.showModal()">Sign Up</button>
        <button class="button is-dark">Sign In</button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <SignUp />
  </Teleport>
</template>
