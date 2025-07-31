<template>
  <div class="flex items-center mb-4 flex-col items-start">
    <h2 class="text-xl md:text-3xl font-bold text-charcoal mb-2">{{ product.name }}</h2>
    <div class="flex items-center mb-4">
      <div class="flex">
        <Star
          v-for="n in 5"
          :key="n"
          class="h-5 w-5"
          :class="n <= Math.round(averageRating) ? 'fill-indigo-500 text-indigo-500' : 'text-gray-300'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star } from 'lucide-vue-next';

defineProps({
  product: {
    type: Object,
    required: true,
  },
  extra: {
    type: Object,
    default: null,
  },
});

const averageRating = 5; // Hardcoded as in original custom.vue
</script>