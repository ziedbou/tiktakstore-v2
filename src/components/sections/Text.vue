<template>
    <div class="html-content"v-html="data.values.content"></div>
  </template>
  
  <script setup>
  const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
  })
  </script>
  <style scoped>
  .html-content *{
    font-family: var(--font-family) !important;
  }
  </style>