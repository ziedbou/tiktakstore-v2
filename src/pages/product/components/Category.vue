<template>
    <div class="mt-4">{{ category }}</div>
  </template>
  <script setup>
  defineProps({
    category: { type: String },
  });
  </script>