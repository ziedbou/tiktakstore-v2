<!-- components/ProductCard.vue -->
<template>
  <div
    class="product_cart flex flex-col relative w-full h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 transform group"
  >
    <!-- Product Image -->
    <NuxtLink :to="getProductLink(product)" class="relative">
      <OutOfStockTag
        :product="product"
        :extraClass="'absolute top-1 right-1'"
      />
      <NuxtImg
        :src="imghttps(product.photo)"
        :alt="product.name"
        class="w-full h-80 md:h-48 object-cover aspect-square"
      />
      <!-- Product Card Buttons Wrapper -->
      <ProductCardButtons
        :product-id="product.id"
        @quick-view="openQuickView"
      />
    </NuxtLink>
    <!-- Content under image -->
    <div class="px-2 flex flex-col items-center gap-1.5  pb-0 md:pb-3">
      <!-- Reviews -->
      <div class="flex items-center gap-1 mt-3">
        <svg class="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 24 24">
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          ></path>
        </svg>
        <span class="text-xs text-gray-600">{{ product.seo_stars }}</span>
        <span class="text-xs text-gray-600"
          >({{ product.seo_reviews }} Avis)</span
        >
      </div>

      <!-- Collection Label -->
      <div
        v-if="false"
        xv-if="product?._category"
        class="text-sm text-gray-500"
      >
        <NuxtLink :to="getCategoryLink(product)" class="text-xs">{{
          product?._category?.name
        }}</NuxtLink>
        {{ product.collection }}
      </div>

      <!-- Product Name -->
      <NuxtLink :to="getProductLink(product)" class="block">
        <h3 class="text-gray-800 line-clamp-2 text-base text-center">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Price -->
      <div class="flex items-center gap-3">
        <p class="!text-sm old-price" v-if="product.discount">
          {{ product.price }}
        </p>
        <p class="text-base new-price">
          {{ getPrice(product) }} {{ companyData.currency }}
        </p>
      </div>
      <PromoTag :product="product" />
    </div>

    <div
      class="review_box z-1 shadow-none md:group-hover:shadow-[0px_-4px_10px_-6px_rgba(0,0,0,0.1)] flex flex-col items-start md:items-center p-2 bg-white md:absolute md:bottom-0 md:left-0 md:right-0 md:transform md:translate-y-full md:group-hover:translate-y-0 md:transition-all md:duration-300"
    >
      <!-- View Product Button -->
      <button
        class="add_to_cart text-sm cursor-pointer w-full p-1.5 text-center border transition-colors duration-300 flex items-center justify-center"
        @click="addToCart(product)"
      >
        <ShoppingCart class="w-4 h-4 mr-1" />
        Ajouter au panier
      </button>
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
import ProductQuickViewModal from "~/components/ProductQuickViewModal.vue";
import {
  getProductLink,
  getCategoryLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import { addToCart } from "~/composables/services/cartService";
import { useCompanyData } from "~/composables/useCompanyData";
import { ShoppingCart } from "lucide-vue-next";
import PromoTag from "./product-tags/PromoTag.vue";
import OutOfStockTag from "./product-tags/OutOfStockTag.vue";
import ProductCardButtons from "./ProductCardButtons.vue";

const { companyData } = useCompanyData();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  image_full: { type: Boolean },
});

// Quick View Modal state
const isQuickViewOpen = ref(false);

const openQuickView = () => {
  isQuickViewOpen.value = true;
};

const closeQuickView = () => {
  isQuickViewOpen.value = false;
};
</script>

<style scoped>
.product_cart {
  background-color: var(--product-card-bg-color, #f3f3f3);
  border: 1px solid;
  border-color: var(--product-card-border-color, #f3f3f3);
  border-radius: var(--product-card-border-radius, 5px);
}
.product_cart:hover {
  border-color: var(--product-card-border-color-hover, transparent);
  background-color: var(--product-card-bg-color-hover, #fff);
}

.review_box {
  background-color: var(--product-card-bg-color, #fff);
}

.add_to_cart {
  color: var(--product-card-add-to-cart-color, var(--btn-primary-solid-color));
  border-color: var(
    --product-card-add-to-cart-border-color,
    var(--btn-primary-solid-background)
  );
  background-color: var(
    --product-card-add-to-cart-bg,
    var(--btn-primary-solid-background)
  );
}

.add_to_cart:hover {
  color: var(
    --product-card-add-to-cart-color-hover,
    var(--btn-primary-solid-color-hover)
  );
  border-color: var(
    --product-card-add-to-cart-border-color-hover,
    var(--btn-primary-solid-background-hover)
  );
  background-color: var(
    --product-card-add-to-cart-bg-hover,
    var(--btn-primary-solid-background-hover)
  );
}
</style>
