<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import { TimeLinePost, Post } from "../data/posts";
import { DateTime } from "luxon";
import { storeUser } from "../stores/users";
import { storePosts } from "../stores/posts";
import { useRouter } from "vue-router";

const userStore = storeUser();
const postStore = storePosts();
const router = useRouter();

if (!userStore.userId) throw Error("User was not found");

const post: TimeLinePost = {
  id: "-1",
  title: "Title",
  authorId: userStore.userId,
  created: DateTime.now(),
  markdown: "## title",
  html: "<h2>Title</h2>",
};

async function handleNewPost(post: Post) {
  await postStore.createPost(post);
  router.push("/");
}
</script>

<template>
  <div>
    New Post
    <PostWriter :post="post" @submit="handleNewPost" />
  </div>
</template>
