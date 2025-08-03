<template>
  <div v-if="effectiveProduct">
    <!-- Multiple Variants -->
    <div v-if="variants.length !== 1" class="flex flex-row flex-wrap gap-y-2 items-center mb-5 md:mb-2 ">
      <template v-if="currentDiscount > 0">
        <span class="text-2xl text-gray-400 mr-2 line-through flex items-center">
          {{ getCurrency(currentPrice) }} <span class="text-xl ml-1">{{ currency }}</span>
        </span>
        <span class="text-3xl mr-2 font-bold text-charcoal flex items-center ">
          {{ getPriceFromDiscountType(currentPrice, currentDiscount, effectiveProduct.discount_type) }} <span class="text-xl ml-1">{{ currency }}</span>
        </span>
        <span>
          <span class="bg-indigo-100 text-indigo-800  px-1 md:px-2 py-0.5 md:py-1 rounded font-medium ">
            <template v-if="usePromoTagStyle">
              <template v-if="effectiveProduct.discount_type === 'percent'">
                {{ Math.floor(currentDiscount) }}% de réduction
              </template>
              <template v-else>
                {{ Math.floor(currentDiscount) }} {{ currency }} de réduction
              </template>
            </template>
            <template v-else>
              En promotion
            </template>
          </span>
        </span>
      </template>
      <template v-else>
        <span class="text-3xl font-bold text-charcoal flex items-center">
          {{ getCurrency(currentPrice) }} <span class="text-xl ml-1">{{ currency }}</span>
        </span>
      </template>
    </div>

    <!-- Single Variant -->
    <div v-if="variants.length === 1" class="flex flex-col md:flex-row md:items-baseline mb-5 md:mb-2">
      <template v-if="variants[0].discount > 0">
        <span class="text-3xl font-bold text-charcoal mr-0 md:mr-2 mb-1 md:mb-0">
          {{ getPriceFromDiscountType(variants[0].price, variants[0].discount, effectiveProduct.discount_type) }} {{ currency }}
        </span>
        <span class="text-base md:text-lg text-gray-500 line-through mb-1 md:mb-0">
          {{ getCurrency(variants[0].price) }} {{ currency }}
        </span>
        <span class="bg-indigo-100 text-indigo-800 px-1 md:px-2 py-0.5 md:py-1 rounded text-xs md:text-sm font-medium">
          <template v-if="usePromoTagStyle">
            <template v-if="effectiveProduct.discount_type === 'percent'">
              {{ Math.floor(variants[0].discount) }}% de réduction
            </template>
            <template v-else>
              {{ Math.floor(variants[0].discount) }} {{ currency }} de réduction
            </template>
          </template>
          <template v-else>
            En promotion
          </template>
        </span>
      </template>
      <template v-else>
        <span class="text-3xl font-bold text-charcoal">
          {{ getCurrency(variants[0].price) }} {{ currency }}
        </span>
      </template>
    </div>

    <!-- Stock Alerts -->
    <div v-cloak>
      <div
        v-if="displayStockAlerts && totalStock < 1"
        class="mt-2 md:mt-3 mb-2 md:mb-4 text-center bg-red-100 text-red-800 p-1 md:p-2 rounded-md text-sm md:text-base"
      >
        Produit épuisé
      </div>
      <div
        v-else-if="variants.length === 1 && isActiveStock && productType !== 'ticket' && variants[0].stock <= 0"
        class="mt-2 md:mt-3 mb-2 md:mb-4 text-center bg-red-100 text-red-800 p-1 md:p-2 rounded-md text-sm md:text-base"
      >
        {{ getAttrs(variants[0]) }}: Produit épuisé
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getPriceFromDiscountType, getCurrency, calculateStock, getAttrs } from '~/composables/services/helpers.js';
import { useSelectedVariant } from '@/composables/useSelectedVariants.js'; 

// Initialize the composable
const { selectedVariant } = useSelectedVariant();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  extra: {
    type: Object,
    default: null,
  },
  displayStockAlerts: {
    type: Boolean,
    default: true,
  },
  usePromoTagStyle: {
    type: Boolean,
    default: true,
  },
});

// Computed property for effective product
const effectiveProduct = computed(() => {
  if (selectedVariant.value && props.product?.declinaisons?.length > 0) {
    return {
      ...props.product,
      price: selectedVariant.value.price || props.product.price,
      discount: selectedVariant.value.discount || props.product.discount,
      discount_type: selectedVariant.value.discount_type || props.product.discount_type,
      active_stock: selectedVariant.value.active_stock ?? props.product.active_stock,
      product_type: selectedVariant.value.product_type || props.product.product_type,
      declinaisons: props.product.declinaisons,
    };
  }
  return props.product;
});

// Core computed properties
const currency = computed(() => props.extra?.currency || 'TND');
const isActiveStock = computed(() => effectiveProduct.value?.active_stock ?? true);
const productType = computed(() => effectiveProduct.value?.product_type || '');
const totalStock = computed(() => calculateStock(effectiveProduct.value));

const variants = computed(() => {
  if (!effectiveProduct.value?.declinaisons) return [];
  return effectiveProduct.value.declinaisons.map(decl => ({
    price: decl.price || effectiveProduct.value.price,
    discount: decl.discount || effectiveProduct.value.discount,
    stock: decl.stock || 0,
    _attributs: decl._attributs || [],
    isDefault: decl.default || false,
  }));
});

// Price and discount for display
const currentPrice = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value.price || effectiveProduct.value.price;
  }
  if (variants.value.length > 0) {
    const defaultVariant = variants.value.find(v => v.isDefault) || variants.value[0];
    return defaultVariant.price;
  }
  return effectiveProduct.value.price;
});

const currentDiscount = computed(() => {
  if (selectedVariant.value) {
    return selectedVariant.value.discount || effectiveProduct.value.discount;
  }
  if (variants.value.length > 0) {
    const defaultVariant = variants.value.find(v => v.isDefault) || variants.value[0];
    return defaultVariant.discount;
  }
  return effectiveProduct.value.discount;
});
</script>