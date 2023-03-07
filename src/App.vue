<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useModal } from "./composables/useModal";
import { storeUser } from "./stores/users";
import Navbar from "./components/Navbar.vue";

const modal = useModal();
const userStore = storeUser();

const modalStyle = computed(() => {
  return {
    display: modal.show.value ? "block" : "none",
    color: "white",
  };
});

onMounted(() => {
  userStore.authenticate();
});
</script>

<template>
  <div class="modal" :style="modalStyle">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal" class="modal">
          <button
            class="modal-close is-large"
            @click="modal.hideModal()"
          ></button>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
