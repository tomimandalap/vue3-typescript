<script setup lang="ts">
import FormInput from "../components/FormInput.vue";
import { computed, ref } from "vue";
import { validate, required, length } from "../utils/validations";
import { NewUser, IMap } from "../utils/constants";
import { storeUser } from "../stores/users";
import { useModal } from "../composables/useModal";

const userStore = storeUser();
const modal = useModal();

const form = ref<NewUser>({
  username: "",
  password: "",
});

const usernameStatus = computed(() => {
  return validate(form.value.username, [required, length({ min: 4, max: 10 })]);
});

const passwordStatus = computed(() => {
  return validate(form.value.password, [required, length({ min: 8, max: 12 })]);
});

const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

function handleUpdate(event: string, key: string) {
  let inputValue: IMap = form.value;
  inputValue[key] = event;
}

async function handleSubmit() {
  if (isInvalid.value) return;

  const newUser: NewUser = {
    username: form.value.username,
    password: form.value.password,
  };

  try {
    await userStore.createUser(newUser);
  } catch (e) {
    console.log("ERROR", e);
  }

  modal.hideModal(modal.stateTYPE.SIGNIN);
}
</script>

<template>
  <div class="form">
    <h1 class="title">
      {{ modal.stateTYPE.SIGNIN }}
    </h1>
    <form @submit.prevent="handleSubmit">
      <FormInput
        v-model="form.username"
        name="Username"
        type="text"
        placeholder="Username"
        :status="usernameStatus"
        @update:modelValue="handleUpdate($event, 'username')"
      />
      <FormInput
        v-model="form.password"
        name="Password"
        type="password"
        placeholder="Password"
        :status="passwordStatus"
        @update:modelValue="handleUpdate($event, 'password')"
      />
      <button :disabled="isInvalid" type="submit" class="button">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.title {
  color: black;
  margin: 0;
  padding: 0;
  text-transform: capitalize;
}
.form {
  background: white;
  border-radius: 6px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
}
</style>
