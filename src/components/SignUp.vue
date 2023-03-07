<script setup lang="ts">
import { useModal } from "../composables/useModal";
import { storeUser } from "../stores/users";
import { NewUser } from "../utils/constants";
import UserForm from "./UserForm.vue";

const userStore = storeUser();
const modal = useModal();

async function handleSignUp(newUser: NewUser) {
  await userStore.createUser(newUser);
  modal.hideModal();
}
</script>

<template>
  <UserForm @submit="handleSignUp" />
</template>
