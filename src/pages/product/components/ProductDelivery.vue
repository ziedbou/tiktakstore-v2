<template>
    <div class="deliveryprice flex flex-col items-center justify-center space-x-4 p-4 my-4 bg-gray-50 rounded-lg">
      <img
        v-if="extra.image?.image"
        :src="imghttps(extra.image.image)"
        :alt="extra.image.name || 'Delivery image'"
        class="w-36 m-0 p-0  object-contain"
      >
      <div class="body text-gray-700" v-html="extra.text"></div>
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