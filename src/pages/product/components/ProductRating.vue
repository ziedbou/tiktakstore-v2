<template>
  <div class="flex items-center mb-4">
    <div class="flex">
      <Star
        v-for="n in 5"
        :key="n"
        class="h-5 w-5"
        :class="n <= Math.round(averageRating) ? 'fill-indigo-500 text-indigo-500' : 'text-gray-300'"
      />
    </div>
    <span class="ml-2 text-sm text-gray-500">Basé sur {{ reviews.length }} avis</span>
  </div>
</template>

<script setup>
import { Star } from 'lucide-vue-next';

defineProps({
  reviews: {
    type: Array,
    default: () => [],
  },
  averageRating: {
    type: Number,
    default: 0,
  },
});
</script>