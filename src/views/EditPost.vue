<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import { useRoute } from "vue-router";
import { storePosts } from "../stores/posts";
import { useRouter } from "vue-router";

const route = useRoute();
const postsStore = storePosts();
const id = route.params.id as string;
const post = postsStore.all.get(id);
const router = useRouter();

if (!post) {
  throw Error(`Post with id ${id} was not found`);
}

async function handleEditPost(post: Post) {
  await postsStore.updatePost(post);
  router.push("/");
}
</script>

<template>
  <div>
    Edit Post
    <PostWriter :post="post" @submit="handleEditPost" />
  </div>
</template>
