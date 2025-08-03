<template>
  <div
    class="product_cart h-full group relative overflow-hidden hover:shadow-md transition-all duration-300"
  >
    <div :class="[image_full ? 'p-0' : 'p-2 pb-0', 'relative']">
      <NuxtLink
        :to="getProductLink(product)"
        class="flex relative h-72 w-full overflow-hidden"
        :style="{
          borderRadius: image_full
            ? '0'
            : 'var(--product-card-border-radius, 5px)',
        }"
      >
        <NuxtImg
          :src="imghttps(product.photo)"
          :alt="product.name"
          class="size-full object-cover"
        />
        <OutOfStockTag
        :product="product"
        :extraClass="`absolute ${image_full ? 'top-2.5 left-2.5' : 'top-1 left-1'}`"
       
      />
      <div class="absolute top-1/4 right-5 flex flex-col gap-2.5 opacity-100 translate-y-0 md:opacity-0 md:translate-y-5 transition-all duration-300 ease-out z-[3] md:group-hover:opacity-100 md:group-hover:translate-y-0">
        <ToggellFavorite :product-id="product.id" />
        <QuickViewBtn @quick-view="openQuickView" />
      </div>
        <div
          class="absolute inset-x-0 bottom-0 h-36 p-4 flex items-end justify-end"
          :style="{
            borderRadius: image_full
              ? '0'
              : 'var(--product-card-border-radius, 5px)',
          }"
        >
  
          <PromoTag :product="product" />
          <p
            class="relative flex items-center justify-center text-base font-semibold text-white gap-2 ml-auto"
          >
          <span v-if="product.discount" class="line-through text-sm"
              >{{ product.price }}</span>
            <span
              >{{ getPrice(product) }} {{ companyData.currency }}</span
            >
          </p>
        </div>
      </NuxtLink>
    </div>
    <div class="flex flex-col">
    <div class="relative p-2">
      <h3 class="text-sm font-medium text-gray-900">
        <NuxtLink :to="getProductLink(product)">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <p class="mt-1 text-sm text-gray-500" v-if="product?._category">
          <NuxtLink :to="getCategoryLink(product)">
            {{ product?._category?.name }}
          </NuxtLink>
        </p>
    </div>
    <div class="mt-auto p-2">
      <button
        @click="addToCart(product)"
        class="add_to_cart  rounded-md relative cursor-pointer w-full flex items-center justify-center gap-2 border px-8 py-2 text-sm font-medium transition-all duration-300"
      >
        Ajouter au panier
        <ShoppingCart class="size-4" />
      </button>
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
import {
  getProductLink,
  getCategoryLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";

import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";
import { addToCart } from "~/composables/services/cartService";
import { useCompanyData } from "~/composables/useCompanyData";
import OutOfStockTag from "./product-tags/OutOfStockTag.vue";
import ToggellFavorite from "./product-cards-buttons/ToggellFavorite.vue";
import QuickViewBtn from './product-cards-buttons/QuickViewBtn.vue'; 
import { ShoppingCart } from "lucide-vue-next";
import PromoTag from "./product-tags/PromoTag.vue";

const { companyData } = useCompanyData()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  image_full: {
    type: Boolean,
    default: true,
  },
});

// Quick view modal state
const isQuickViewOpen = ref(false);

// Quick view functions
const openQuickView = () => {
  isQuickViewOpen.value = true;
};

const closeQuickView = () => {
  isQuickViewOpen.value = false;
};
</script>

<style scoped>
.product_cart {
  background-color: var(--product-card-bg-color, #fff);
  border: 1px solid;
  border-color: var(--product-card-border-color, #f3f3f3);
  border-radius: var(--product-card-border-radius, 5px);
}
.product_cart:hover {
  border-color: var(--product-card-border-color-hover, transparent);
  background-color: var(--product-card-bg-color-hover, #fff);
}
.add_to_cart {
  color: var(--product-card-add-to-cart-color, #000);
  border-color: var(--product-card-add-to-cart-border-color, #000);
  background-color: var(--product-card-add-to-cart-bg, #fff);
}

.add_to_cart:hover {
  color: var(--product-card-add-to-cart-color-hover, #fff);
  border-color: var(--product-card-add-to-cart-border-color-hover, #fff);
  background-color: var(--product-card-add-to-cart-bg-hover, #000);
}
</style>
