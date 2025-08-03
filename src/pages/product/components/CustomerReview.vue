<template>
  <div class="customer-reviews mt-6">
    <h3 class="text-lg font-semibold mb-4">Avis clients</h3>
    <div v-if="extra?.avis?.length" class="space-y-4">
      <div
        v-for="review in extra.avis"
        :key="review.fullname"
        class="border rounded-lg p-4 bg-gray-50 border-[var(--btn-primary-outline-border-color)]"
      >
        <div class="flex items-center mb-2">
          <img
            v-if="review.avatar"
            :src="imghttps(review.avatar)"
            :alt="review.fullname"
            class="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p class="font-medium">{{ review.fullname }}</p>
            <div class="flex items-center -mt-2">
              <span
                v-for="star in 5"
                :key="star"
                class="text-yellow-500 text-lg"
              >
                {{ star <= review.note ? '★' : '☆' }} 
              </span> <span class="ml-1 font-medium text-gray-700">({{review.note}})</span>
            </div>
          </div>
        </div>
        <p class="text-gray-700">{{ review.text }}</p>
      </div>
    </div>
    <p v-else class="text-gray-500">Aucun avis disponible.</p>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

defineProps({
  product: {
    type: Object,
    default: null,
  },
  extra: {
    type: Object,
    default: null,
  },
});
</script>