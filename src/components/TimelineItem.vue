<script setup lang="ts">
import { TimeLinePost } from "../data/posts";
import { RouterLink } from "vue-router";

defineProps<{
  post: TimeLinePost;
}>();
</script>

<template>
  <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <a>{{ post.title }}</a>
    <div>
      {{ post.created.toFormat("d MMM yyyy") }}
    </div>
  </RouterLink>
</template>
