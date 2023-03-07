<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import { usePosts } from "../stores/posts";
import { periods } from "../utils/constants";
// import { onMounted } from "vue";

const postStore = usePosts();
await postStore.fetchPosts();
// const getPosts = async () => {
// };
// onMounted(() => {
//   getPosts();
// });
</script>

<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === postStore.selectedPeriod }"
        @click="postStore.setSelectedPeriod(period)"
        >{{ period }}</a
      >
    </span>

    <TimelineItem
      v-for="post of postStore.filteredPost"
      :key="post.id"
      :post="post"
    />
  </nav>
</template>
