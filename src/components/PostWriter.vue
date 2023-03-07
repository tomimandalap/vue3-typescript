<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { TimeLinePost } from "../data/posts";
import { marked } from "marked";
import highlightjs from "highlight.js";
import { debounce } from "lodash";
import { storePosts } from "../stores/posts";
import { useRouter } from "vue-router";

const props = defineProps<{
  post: TimeLinePost;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditable = ref<HTMLDivElement>();
const storePosts = storePosts();
const router = useRouter();

const handleInput = () => {
  if (!contentEditable.value) {
    throw Error("ContenEditable DOM node was not found");
  }

  content.value = contentEditable.value.innerText;
};

const handleSave = async () => {
  const newPost: TimeLinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value,
  };

  await storePosts.createPost(newPost);
  router.push("/");
};

function parseHtml(markdown: string) {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlightjs.highlightAuto(code).value;
      },
    },
    (err, parseResult) => {
      html.value = parseResult;
    }
  );
}

// watchEffect(() => {
//   marked.parse(content.value, (err, parseResult) => {
//     html.value = parseResult;
//   });
// });

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent);
  }, 300),
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

  <div class="columns">
    <div class="column">
      <button class="button is-danger is-pulled-left" @click="router.go(-1)">
        Back
      </button>
      <button class="button is-primary is-pulled-right" @click="handleSave">
        Save Post
      </button>
    </div>
  </div>
</template>
