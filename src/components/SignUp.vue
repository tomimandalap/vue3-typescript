<script setup lang="ts">
import { computed, ref } from "vue";
import FormInput from "../components/FormInput.vue";
import { validate, required, length } from "../utils/validations";

interface Iform {
  username: string;
  password: string;
}

interface IMap {
  [key: string]: string;
}

const form = ref<Iform>({
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

function handleSubmit() {
  if (isInvalid.value) return;

  const newUser: Iform = {
    username: form.value.username,
    password: form.value.password,
  };

  console.log(newUser);
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
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
</template>

<style scoped>
.form {
  background: white;
  border-radius: 6px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
}
</style>
