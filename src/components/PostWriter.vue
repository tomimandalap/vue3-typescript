<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { TimeLinePost, Post } from "../data/posts";
import { marked } from "marked";
import highlightjs from "highlight.js";
import { debounce } from "lodash";
import { storePosts } from "../stores/posts";
import { useRouter } from "vue-router";
import { storeUser } from "../stores/users";

const props = defineProps<{
  post: TimeLinePost | Post;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditable = ref<HTMLDivElement>();
const postStore = storePosts();
const router = useRouter();
const userStore = storeUser();

const handleInput = () => {
  if (!contentEditable.value) {
    throw Error("ContenEditable DOM node was not found");
  }

  content.value = contentEditable.value.innerText;
};

const handleSave = async () => {
  if (!userStore.userId) throw Error("User was not found");

  const newPost: Post = {
    ...props.post,
    created:
      typeof props.post.created === "string"
        ? props.post.created
        : props.post.created.toISO(),
    title: title.value,
    markdown: content.value,
    html: html.value,
    authorId: userStore.userId,
  };

  await postStore.createPost(newPost);
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
      <button class="button is-light is-pulled-left" @click="router.go(-1)">
        Back
      </button>
      <button class="button is-success is-pulled-right" @click="handleSave">
        Save Post
      </button>
    </div>
  </div>
</template>
