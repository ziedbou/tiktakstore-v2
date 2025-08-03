<template>
  <span
    v-if="storeInfo.stock_settings.display_stock_onwebsite && product.total_stock < 1 && !product.order_without_stock"
    :class="['product-card-tag text-[var(--product-block-tag-color,#fff)] bg-red-500 tag-out-of-stock', extraClass]"
  >
    En rupture de stock
  </span>
</template>

<script setup>
import { useStoreInfo } from '~/composables/useStoreInfo';
const { storeInfo } = useStoreInfo();

defineProps({
  product: {
    type: Object,
    required: true,
  },
  extraClass: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

