<script setup lang="ts">
import { ref } from "vue";
import { useModal } from "../composables/useModal";
import { storeUser } from "../stores/users";
import { NewUser } from "../utils/constants";
import UserForm from "./UserForm.vue";

const userStore = storeUser();
const modal = useModal();
const error = ref("");

async function handleSignIn(newUser: NewUser) {
  const res = await userStore.login(newUser);

  if ([401, 404].includes(res.status)) {
    error.value = "Username or password was incorrect.";
  } else {
    error.value = "";
    userStore.authenticate();
    modal.hideModal();
  }
}
</script>

<template>
  <UserForm @submit="handleSignIn" :error="error" />
</template>
