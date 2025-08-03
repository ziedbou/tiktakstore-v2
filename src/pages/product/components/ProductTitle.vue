<template>
  <div class="flex items-center flex-col items-start">
    <h2 class="mb-5 md:mb-3 font-medium text-gray-600" v-if="product?._category?.name">Category : {{ product?._category?.name }}</h2>
    <h2 class="text-2xl md:text-3xl md:font-bold text-charcoal mb-5 md:mb-3">{{ product.name }}</h2>
    <div class="flex items-center mb-5 md:mb-3">
      <div class="flex items-center justify-center">
        <Star
          v-for="n in 5"
          :key="n"
          class="h-5 w-5"
          :class="n <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'"
        />
        <!-- <span class="font-medium ml-2">4,000,000 happy customers</span> -->
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