<script setup lang="ts">
import { stat } from "fs";
import { Status } from "../utils/validations";

interface Iinput {
  name: string;
  type: string;
  placeholder: string;
  modelValue: string;
  status: Status;
}

defineProps<Iinput>();
const emits = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

function handleInput($event: Event) {
  const input = $event.target as HTMLInputElement;
  emits("update:modelValue", input.value);
}
</script>

<template>
  <div class="field">
    <label :for="name" class="label">{{ name }}</label>
    <div class="control">
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        @input="handleInput"
        class="input"
      />
    </div>

    <p class="is-danger help" v-if="!status.valid">
      {{ status.message }}
    </p>
  </div>
</template>
