<template>
    <div class="group bg-white max-w-[600px] w-full h-full border border-gray-200 relative overflow-hidden rounded-[var(--image-border-radius)]">
      <div class="py-2 px-3">
        <NuxtLink
          :to="getProductLink(product)"
          :class="product?._category ? '' : 'mb-5'"
          class="text-base font-semibold cursor-pointer w-fit overflow-hidden line-clamp-1 text-[var(--product-block-title-color)]"
        >
          {{ product.name }}
        </NuxtLink>
        <NuxtLink
          :to="getCategoryLink(product)"
          v-if="product?._category"
          class="text-sm text-gray-600 m-0 cursor-pointer line-clamp-1 overflow-hidden text-ellipsi h-5"
          >{{ product?._category?.name }}
        </NuxtLink>
      </div>
      <div
        :class="['relative', img_padding ? 'px-5' : 'px-0']"
      >
        <NuxtLink :to="getProductLink(product)" class="relative">
          <OutOfStockTag :product="product" class="absolute top-1.5 left-1.5" />
          <NuxtImg
            :src="imghttps(product.photo)"
            :alt="product.name"
            class="w-full h-auto cursor-pointer aspect-square object-contain block"
          />
        </NuxtLink>
      </div>
        <!-- Price and button block - normal flow on mobile, hover effect on desktop -->
        <div class="bg-transparent backdrop-blur-[10px] md:relative md:bg-white/40 md:transition-transform md:duration-[400ms] md:overflow-visible md:transform md:translate-y-0 md:group-hover:translate-y-[-40px]">
          <!-- Price section -->
          <div class="py-2 px-5 flex justify-between items-center">
            <div class="flex items-center gap-2 mb-1">
              <p class="old-price !text-sm" v-if="product.discount">
                {{ product.price }}
              </p>
              <p class="font-medium new-price">
                {{ getPrice(product) }} {{ companyData.currency }}
              </p>
            </div>
            <PromoTag :product="product" />
          </div>

          <!-- Button section -->
          <button
            class="flex justify-center items-center gap-[15px] bg-[var(--background-addtocart,var(--btn-primary-solid-background))] hover:bg-[var(--background-addtocart-hover,var(--btn-primary-solid-background-hover))] text-[var(--color-addtocart,var(--btn-primary-solid-color))] hover:text-[var(--color-addtocart-hover,var(--btn-primary-solid-color-hover))] border-none w-full text-sm font-medium cursor-pointer transition-colors duration-300 ease-in-out h-10 box-border md:absolute md:top-full md:left-0 md:right-0"
            @click="addToCart(product, 1, null, companyData?.slug)"
          >
            <span>Ajouter au panier</span>
            <ShoppingBag class="size-6" />
          </button>
        </div>
      

      <div class="absolute top-1/4 right-5 flex flex-col gap-2.5 opacity-100 translate-y-0 md:opacity-0 md:translate-y-5 transition-all duration-300 ease-out z-[3] md:group-hover:opacity-100 md:group-hover:translate-y-0">
        <ToggellFavorite :product-id="product.id" />
        <QuickViewBtn @quick-view="openQuickView" />
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
import { ref } from 'vue';
import {
  getProductLink,
  getCategoryLink,
  getPrice,
  imghttps,
} from "~/composables/services/helpers";
import OutOfStockTag from "./product-tags/OutOfStockTag.vue";
import PromoTag from "./product-tags/PromoTag.vue";
import ToggellFavorite from "./product-cards-buttons/ToggellFavorite.vue";
import QuickViewBtn from './product-cards-buttons/QuickViewBtn.vue'; 
import ProductQuickViewModal from '../ProductQuickViewModal.vue';
import { ShoppingBag } from "lucide-vue-next";
import { addToCart } from "~/composables/services/cartService";
import { useCompanyData } from "@/composables/useCompanyData";

const { companyData } = useCompanyData();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  img_padding: {
    type: Boolean,
    required: false,
    default: false,
  },
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

