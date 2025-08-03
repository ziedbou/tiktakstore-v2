<template>
  <div
    class="group bg-white relative rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg overflow-hidden h-full flex flex-col"
    :style="{ animationDelay: `${index * 100}ms` }"
  >
    <!-- Remove Button -->
    <button
      @click="$emit('remove-from-wishlist', product.id)"
      class="absolute top-2 right-2 z-99 flex-shrink-0 w-7 h-7 rounded-full bg-white border border-gray-300 hover:border-red-300 hover:bg-red-50 transition-colors duration-200 flex items-center justify-center"
      :title="'Retirer ' + product.name + ' de la liste'"
      >
      <X class="w-4 h-4 text-gray-400 hover:text-red-500 group-hover:rotate-90 transition-all duration-300"/>
    </button>
    <!-- Product Image -->
    <div class="relative">
      <NuxtLink
        :to="getProductLink(product)"
        class="flex relative aspect-square overflow-hidden bg-gray-100 flex-shrink-0"
      >
        <NuxtImg
          :src="imghttps(product.photo)"
          :alt="product.name"
          class="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </NuxtLink>
      <!-- Quick View Button -->
      <div class="z-10 absolute left-2 bottom-2 md:-translate-x-1/2 md:left-1/2 md:-bottom-10 md:group-hover:bottom-4 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-all duration-300">
        <QuickViewBtn @quick-view="openQuickView"/>
      </div>
    </div>

    <!-- Card Content -->
    <div class="p-2 flex flex-col flex-grow">
      <!-- Product Title -->
      <div class="mb-1">
        <h3
          class="text-center text-sm md:text-base font-medium text-gray-900 line-clamp-1 group-hover:text-gray-700 transition-colors duration-200"
        >
          <NuxtLink :to="getProductLink(product)">
            {{ product.name }}
          </NuxtLink>
        </h3>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-center gap-2 mb-2">
        <div class="text-xs md:text-sm font-medium new-price">
          {{ getPrice(product) }} {{ companyData.currency }}
        </div>
        <span class="old-price !text-xs md:!text-sm" v-if="product.discount"
          >{{ product.price }} {{ companyData.currency }}</span
        >
      </div>

      <!-- Stock Status -->
      <div class="flex items-center justify-center gap-2">
        <div
          class="w-2 h-2 rounded-full"
          :class="product.total_stock > 1 ? 'bg-emerald-500' : 'bg-gray-400'"
        ></div>
        <span
          class="text-xs font-medium"
          :class="
            product.total_stock > 1 ? 'text-emerald-600' : 'text-gray-500'
          "
        >
          {{ product.total_stock > 1 ? "En stock" : "Rupture de stock" }}
        </span>
      </div>
    </div>
  </div>

  <!-- Quick View Modal -->
  <ProductQuickViewModal
    :product="product"
    :isOpen="isQuickViewOpen"
    @close="closeQuickView"
  />
</template>

<script setup>
import { ref } from "vue";
import { X } from "lucide-vue-next";
import { useCompanyData } from "@/composables/useCompanyData";
import ProductQuickViewModal from "@/components/ProductQuickViewModal.vue";
import {
  getProductLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import QuickViewBtn from "./product-cards-buttons/QuickViewBtn.vue";

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

// Emits
const emit = defineEmits(["add-to-cart", "remove-from-wishlist"]);

// Get company data
const { companyData } = useCompanyData();

// Quick view state
const isQuickViewOpen = ref(false);

// Quick view methods
const openQuickView = () => {
  isQuickViewOpen.value = true;
};

const closeQuickView = () => {
  isQuickViewOpen.value = false;
};
</script>
