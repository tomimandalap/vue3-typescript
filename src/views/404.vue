<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <h1 class="has-text-danger">Not Found</h1>
  <button class="button is-light is-medium" @click="router.push('/')">
    Back
  </button>
</template>
