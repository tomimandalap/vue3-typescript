<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterView } from "vue-router";
import { useModal } from "./composables/useModal";
import Navbar from "./components/Navbar.vue";
import FormInput from "./components/FormInput.vue";

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

const modal = useModal();
const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
    color: "white",
  };
});

function handleUpdate(event: string, key: string) {
  let inputValue: IMap = form.value;
  inputValue[key] = event;
}
</script>

<template>
  <div class="modal" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal">
          <FormInput
            v-model="form.username"
            name="Username"
            type="text"
            placeholder="Username"
            @update:modelValue="handleUpdate($event, 'username')"
          />
          <FormInput
            v-model="form.password"
            name="Password"
            type="password"
            placeholder="Password"
            @update:modelValue="handleUpdate($event, 'password')"
          />
        </div>
      </div>
    </div>
    <button class="modal-close is-large" @click="modal.hideModal()"></button>
  </div>

  <div class="section">
    <pre>{{ form }}</pre>
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>
