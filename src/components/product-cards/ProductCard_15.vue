<!-- ProductCard.vue -->
<template>
  <div
    class="product_cart h-full group relative overflow-hidden transition-all duration-300"
  >
    <NuxtLink :to="getProductLink(product)" :class="['block']">
      <div class="relative aspect-square overflow-hidden">
        <!-- Main product image (visible by default, hidden on hover) -->
        <img
          :src="imghttps(product.photo)"
          :alt="product.name"
          :class="[
            { 'group-hover:opacity-0': product?.images?.[1]?.image },
            'h-full w-full object-cover transition-all duration-1000 ',
          ]"
        />
        <!-- Second product image (hidden by default, visible on hover) -->
        <img
          v-if="product.images[1]?.image"
          :src="imghttps(product.images[1]?.image)"
          :alt="product.name"
          class="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
        />
        <div
          v-if="productDeclinaison"
          class="absolute bottom-2 right-2 h-20 w-fit h-fit p-[2px] rounded-full bg-black/35 flex gap-[2px] flex-col"
        >
          <div
            v-for="(dec, index) in productDeclinaison.slice(0, 3)"
            class="w-5 h-5"
          >
            <img
              :src="dec.photo_thumb"
              class="rounded-full border border-2 w-5 h-5 border-white/75"
            />
          </div>
          <span class="text-[9px] text-white text-center">
            {{ productDeclinaison.length }}
          </span>
        </div>
        <!-- Product Card Buttons Wrapper -->
        <!-- <ProductCardButtons 
          :product-id="product.id" 
          @quick-view="openQuickView"
        /> -->
      </div>
    </NuxtLink>
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex items-center justify-between hover:shadow-md transition-shadow "
      >
    <NuxtLink :to="getProductLink(product)" class="w-full">

      <div class="flex-1">
          <div class="flex items-center gap-1 mb-1">
            <img src="../../assets/images/trend.png" class="h-4 md:h-4" />
            <span class="text-purple-500 !text-sm md:text-medium"
              >#SummerSelections</span
            >
          </div>
          <p class="text-gray-800 font-medium text-base mb-1">
            <span
              class="h-5 border mr-1 border-orange-600 text-orange-600 px-1"
              v-if="product.discount"
            >
              <span v-if="product.discount_type == 'fixed_amount'"
                >-{{ product.discount }}
                <span class="text-xs">{{ companyData.currency }}</span>
              </span>
              <span v-else> -{{ product.discount }}% </span>
            </span>
            <span class="bg-green-500 text-white text-[14px] px-1.5 rounded" v-if="true">NEW</span>

            {{ product?.name }}
          </p>
          <p
            class="bg-red-100 w-fit p-1 text-orange-600  font-medium mb-1"
            v-if="product.stock < 10"
          >
            Only {{ product.stock }} Left
          </p>

          <div
            class="product-price flex justify-between w-full items-end w-fit new-price !font-semibold !text-xl "
            :class="{
              '!text-[#fa6338]':product.discount
            }"
          >
          <p >
            <span>{{ getPrice(product) }}</span>
            <span class="text-[12px]">{{ companyData.currency }}</span></p>
            <button
          class="p-2 border relative border-black/90 rounded-full rounded h-6 w-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
          @click="addToCart(product)"
        >
            <img src="../../assets/images/paniersvg.svg" class="h-5 absolute"/>
          
        </button>
          </div>
        </div>
    </NuxtLink>
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
import ProductCardButtons from "./ProductCardButtons.vue";
import PromoTag from "./product-tags/PromoTag.vue";
import { useCompanyData } from "~/composables/useCompanyData";
import { addToCart } from "~/composables/services/cartService";

const { companyData } = useCompanyData();

const productFeature = {
  trend: true,
  new: true,
};

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  image_full: { type: Boolean },
});

const productDeclinaison = ref(null);

const { fetchProductData, productData } = useProductData(props.product?.id);

onMounted(async () => {
  await fetchProductData();
  // console.log("productData.valueshein", productData.value.declinaisons);
  if (productData.value && productData.value.declinaisons.length > 0) {
    productDeclinaison.value = productData.value.declinaisons;
  }
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
</style>
