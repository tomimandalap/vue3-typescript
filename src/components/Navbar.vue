<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useModal } from "../composables/useModal";
import { storeUser } from "../stores/users";

const route = useRoute();
const router = useRouter();
const modal = useModal();
const userStore = storeUser();

const logout = async () => {
  await userStore.logout();
  router.push("/");
};
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="userStore.userId" class="buttons">
        <RouterLink
          v-show="!route.fullPath.includes('/posts')"
          to="/posts/new"
          class="button is-success"
          >New Post</RouterLink
        >
        <button class="button is-danger" @click="logout">Log Out</button>
      </div>

      <div v-else class="buttons">
        <button class="button" @click="modal.showModal(modal.stateTYPE.SIGNUP)">
          Sign Up
        </button>
        <button
          class="button is-dark"
          @click="modal.showModal(modal.stateTYPE.SIGNIN)"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>

  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
