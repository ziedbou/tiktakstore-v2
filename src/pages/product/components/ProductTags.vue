<template>
    <div class="flex flex-wrap gap-2 mb-3">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800"
      >
        {{ tag }}
      </span>
    </div>
  </template>
  
  <script setup>
  defineProps({
    tags: {
      type: Array,
      required: true,
    },
  });
  </script>