<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { storePosts } from "../stores/posts";
import { storeUser } from "../stores/users";

const route = useRoute();
const postsStore = storePosts();
const id = route.params.id as string;
const post = postsStore.all.get(id);
const userStore = storeUser();

if (!post) {
  throw Error(`Post with id ${id} was not found`);
}

const canEdit = computed(() => {
  if (!userStore.userId) return false;
  if (userStore.userId !== post.authorId) return false;
  return true;
});
</script>
<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <RouterLink
        v-if="canEdit"
        :to="`/posts/${post.id}/edit`"
        class="is-primary button is-rounded"
        >Edit Post</RouterLink
      >
      <h1>{{ post.title }}</h1>
      <div v-html="post.html" />
    </div>
    <div class="column"></div>
  </div>
</template>
