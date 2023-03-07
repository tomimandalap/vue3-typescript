<script setup lang="ts">
import { ref, computed } from "vue";
import { DateTime } from "luxon";
import { TimeLinePost, today, thisWeek, thisMonth } from "../data/posts";
import TimelineItem from "./TimelineItem.vue";
import { usePosts } from "../stores/posts";

const postStore = usePosts();

const periods = ["Today", "This Week", "This Month"] as const;

type Period = typeof periods[number];

const selectedPeriod = ref<Period>("Today");

const selectPeriod = (period: Period): void => {
  selectedPeriod.value = period;
};

const posts = computed<TimeLinePost[]>(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => {
      return { ...post, created: DateTime.fromISO(post.created) };
    })
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }

      if (selectedPeriod.value === "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }

      return post;
    });
});
</script>

<template>
  {{ postStore.foo }}
  <button @click="postStore.updateFoo('Halo')">Update</button>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === selectedPeriod }"
        @click="selectPeriod(period)"
        >{{ period }}</a
      >
    </span>

    <TimelineItem v-for="post of posts" :key="post.id" :post="post" />
  </nav>
</template>
