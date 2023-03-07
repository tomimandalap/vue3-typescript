<script setup lang="ts">
import { emit } from "process";

interface Iinput {
  name: string;
  type: string;
  placeholder: string;
  modelValue: string;
}

defineProps<Iinput>();
const emits = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

function handleInput($event: any) {
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
  </div>
</template>
