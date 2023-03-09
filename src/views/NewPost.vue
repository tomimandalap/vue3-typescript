<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import { TimeLinePost } from "../data/posts";
import { DateTime } from "luxon";
import { storeUser } from "../stores/users";

const userStore = storeUser();

if (!userStore.userId) throw Error("User was not found");

const post: TimeLinePost = {
  id: "-1",
  title: "Title",
  authorId: userStore.userId,
  created: DateTime.now(),
  markdown: "## title",
  html: "<h2>Title</h2>",
};
</script>

<template>
  <div>
    New Post
    <PostWriter :post="post" />
  </div>
</template>
