<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { TimeLinePost } from "../data/posts";
import { marked } from "marked";

const props = defineProps<{
  post: TimeLinePost;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditable = ref<HTMLDivElement>();

const handleInput = () => {
  if (!contentEditable.value) {
    throw Error("ContenEditable DOM node was not found");
  }

  content.value = contentEditable.value.innerText;
};

// watchEffect(() => {
//   marked.parse(content.value, (err, parseResult) => {
//     html.value = parseResult;
//   });
// });

watch(
  content,
  (newContent) => {
    marked.parse(newContent, (err, parseResult) => {
      html.value = parseResult;
    });
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  if (!contentEditable.value) {
    throw Error("ContenEditable DOM node was not found");
  }

  contentEditable.value.innerText = content.value;
});
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post Title</div>
        <input v-model="title" type="text" class="input" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html"></div>
    </div>
  </div>
</template>
