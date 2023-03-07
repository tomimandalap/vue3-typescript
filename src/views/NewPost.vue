<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import { TimeLinePost } from "../data/posts";
import { DateTime } from "luxon";

const post: TimeLinePost = {
  id: "-1",
  title: "Title",
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
