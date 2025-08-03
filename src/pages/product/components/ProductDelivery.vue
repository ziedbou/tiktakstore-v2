<template>
    <div class="deliveryprice animate-pulse flex flex-col items-center justify-center space-x-4 p-4 my-4 bg-[var(--btn-primary-outline-background-hover)] rounded-lg">
      <img
        v-if="extra.image?.image"
        :src="imghttps(extra.image.image)"
        :alt="extra.image.name || 'Delivery image'"
        class="w-36 m-0 p-0  object-contain"
      >
      <p class="body text-[var(--btn-primary-outline-color)] !font-bold" v-html="extra.text"></p>
    </div>
  </template>
  
  <script setup>
import { imghttps } from '~/composables/services/helpers';

  defineProps({
    product: {
      type: Object,
      default: () => ({}),
    },
    extra: {
      type: Object,
      required: true,
    },
  });
  </script>