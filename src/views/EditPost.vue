<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import { useRoute } from "vue-router";
import { storePosts } from "../stores/posts";

const route = useRoute();
const postsStore = storePosts();
const id = route.params.id as string;
const post = postsStore.all.get(id);

if (!post) {
  throw Error(`Post with id ${id} was not found`);
}
</script>

<template>
  <div>
    Edit Post
    <PostWriter :post="post" />
  </div>
</template>
