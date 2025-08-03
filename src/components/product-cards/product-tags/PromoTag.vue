<template>
  <span
    v-if="product.discount > 0"
    :class="[extraClass,'product-card-tag text-[var(--product-block-tag-color,#fff)] bg-green-500 tag-promo']"
  >
    <template v-if="true">
      <template v-if="product.discount_type === 'percent'">
        {{ Math.floor(product.discount) }}% de réduction
      </template>
      <template v-if="product.discount_type === 'fixed_amount'">
        {{ product.discount }} {{ companyData.currency }} de réduction
      </template>
    </template>
    <template v-else> En promotion </template>
  </span>
</template>

<script setup>
import { useCompanyData } from "~/composables/useCompanyData";

const { companyData } = useCompanyData();

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