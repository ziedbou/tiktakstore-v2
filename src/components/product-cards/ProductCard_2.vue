<template>
  <div class="product-card">
    <div class="hover-buttons">
      <QuickViewBtn @quick-view="openQuickView" />
    </div>

    <NuxtLink :to="getProductLink(product)" class="product-image-container">
      <OutOfStockTag
        :product="product"
        :extra-class="'absolute top-0 left-0'"
      />
      <NuxtImg
        :src="imghttps(product.photo)"
        :alt="product.name"
        class="product-image"
      />
    </NuxtLink>

    <div class="product-info">
      <div class="product-category">{{ product._category?.name }}</div>
      <NuxtLink
        :to="getProductLink(product)"
        class="product-title text-base font-medium text-gray-900 line-clamp-2"
        >{{ product.name }}</NuxtLink
      >
      <!-- Star Rating -->
      <div class="flex items-center mb-1">
        <div class="flex text-yellow-400">
          <StarIcon v-for="n in 5" :key="n" class="size-3.5" />
        </div>
        <span class="ml-2 text-sm text-gray-600">{{
          product.seo_stars || "4.9"
        }}</span>
      </div>
      <!-- Price -->
      <div class="product-price font-size-normal flex items-center gap-2 mb-1">
        <span v-if="product.discount" class="!text-sm old-price">
          {{ product.price }}
        </span>
        <span class="text-base font-semibold new-price"
          >{{ getPrice(product) }} {{ companyData.currency }}</span
        >
      </div>
      <PromoTag :product="product" />
    </div>

    <div class="product-bottom">
      <button @click="addToCart(product)" class="flex justify-center items-center gap-2">
        Ajouter au panier <ShoppingCart class="size-5" />
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
import {
  getProductLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import { addToCart } from "~/composables/services/cartService";
import { useCompanyData } from "~/composables/useCompanyData";
import { StarIcon } from "@heroicons/vue/20/solid";
import PromoTag from "./product-tags/PromoTag.vue";
import OutOfStockTag from "./product-tags/OutOfStockTag.vue";
import { ShoppingCart } from "lucide-vue-next";
import QuickViewBtn from "./product-cards-buttons/QuickViewBtn.vue";
const { companyData } = useCompanyData();

defineProps({
  product: {
    type: Object,
    required: true,
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
.product-card {
  background-color: var(--product-card-bg-color, #fff);
  border-radius: var(--product-border-radius, 5px);
  border-color: var(--product-card-border-color, #f3f3f3);
  padding: 10px;
  min-height: 210px;
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
  max-width: 700px;
  transition: all 0.2s;
  border-width: 1px;
  border-style: solid;
  flex-direction: column;
}

.product-card:hover {
  border-color: var(--product-card-border-color-hover, #f3f3f3);
  background-color: var(--product-card-bg-color-hover, #f9f9f9);
}

.product-bottom {
  position: absolute;
  left: -1px;
  right: -1px;
  padding: 10px;
  top: calc(100% - 6px);
  background-color: var(--product-card-bg-color-hover, #f9f9f9);
  border: 1px solid var(--product-card-border-color, #f3f3f3);
  border-radius: 10px;
  border-top: none;
  border-radius: 0 0 8px 8px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 10;
  transition: all 0.2s;
}


.product-image-container {
  flex: 1;
  position: relative;
  margin: 5px 0;
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
}

.product-info {
  flex: 1;
  width: 100%;
}

.product-category {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
}

.product-title {
  font-size: var(--product-block-title-font-size);
  color: var(--product-block-title-color);
}

.price-container {
  margin-bottom: 15px;
  display: flex;
  gap: 8px;
}

.cta-button {
  color: var(--product-card-add-to-cart-color, #000);
  border-color: var(--product-card-add-to-cart-border-color, #000);
  background-color: var(--product-card-add-to-cart-bg, #fff);
  border-width: 2px;
  border-style: solid;
  padding: 11px 16px;
  border-radius: var(--button-border-radius, 0);
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  width: 100%;
  display: block;
}

.cta-button:hover {
  color: var(--product-card-add-to-cart-color-hover, #fff);
  border-color: var(--product-card-add-to-cart-border-color-hover, #fff);
  background-color: var(--product-card-add-to-cart-bg-hover, #000);
}

.hover-buttons {
  position: absolute;
  bottom: 25px;
  right: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  z-index: 1;
}


.product-card:hover .hover-buttons {
  opacity: 1;
  transform: translateX(0);
}

.tooltip {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  pointer-events: none;
  font-size: 15px;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -6px;
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent transparent #000;
}

.hover-button:hover .tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(-5px);
}

@media (min-width: 992px) {
  .product-card:hover .product-bottom {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .product-card:hover {
    border-bottom: none;
  }

  .cta-button {
    display: none;
  }

  .product-card {
    padding: 0 10px;
  }
}

@media (min-width: 500px) {
  .product-card {
    flex-direction: row !important;
  }
}

@media (max-width: 992px) {
  .hover-buttons {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
