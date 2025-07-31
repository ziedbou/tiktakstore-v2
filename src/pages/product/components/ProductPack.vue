<template>
    <div class="space-y-3 my-2 w-full ">
      <div
        v-for="(offer, index) in extra.response.children"
        :key="offer.title"
        class="offer-item relative min-w-full rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer"
        :class="[
          selectedOffer === index 
            ? 'border-indigo-600 shadow-md shadow-green-100' 
            : 'border-gray-200 hover:border-gray-300'
        ]"
        :data-ids="offer.products_widget.products_ids"
        @click="selectOffer(offer.products_widget.products_ids, product.id, index)"
      >
        <div class="flex items-center p-4">
          <div 
            class="h-6 w-6 rounded-full flex-shrink-0 mr-3 mt-1"
            :class="[
              selectedOffer === index 
                ? 'bg-indigo-600 text-white flex items-center justify-center' 
                : 'bg-gray-100'
            ]"
          >
            <svg v-if="selectedOffer === index" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          
          <div class="flex flex-grow justify-between items-start">
            <div class="flex items-center space-x-4">
              <img
                v-if="offer.image?.image_thumb"
                :src="offer.image.image_thumb"
                :alt="offer.title"
                class="w-16 h-16 object-cover rounded"
              >
              <div class="media-body">
                <h4 class="font-medium text-gray-900">{{ offer.title }}</h4>
                <p v-if="offer.description" class="text-sm text-gray-500 mt-1">{{ offer.description }}</p>
              </div>
            </div>
            
            <div class="price text-right">
              <h5 class="font-bold text-lg text-gray-900">{{ offer.price }}</h5>
              <h6 v-if="offer.initial_price" class="text-sm text-gray-500 line-through">{{ offer.initial_price }}</h6>
            </div>
          </div>
          
            <div v-if="offer.offer" class=" ml-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {{ offer.offer }}
            </div>
        </div>
        <div v-if="selectedOffer === index" class="h-1 w-full bg-indigo-600 "></div>
        </div>
        
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    product: {
      type: Object,
      default: () => ({}),
    },
    extra: {
      type: Object,
      required: true,
    }
  });
  
  const selectedOffer = ref(0);
  
  const selectOffer = (productIds, productId, index) => {
    selectedOffer.value = index;
    handleTempCartChoice(productIds, productId);
  };
  
  const handleTempCartChoice = (productIds, productId) => {
    // console.log('Selected offer with product IDs:', productIds, 'for product:', productId);
  };

  </script>