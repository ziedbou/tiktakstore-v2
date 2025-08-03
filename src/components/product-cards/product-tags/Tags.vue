<template>
  <div class="product_tags"
    :style="{ margin: isRelative ? '8px 0' : '0', 
    display:  isRelative ? 'flex' : 'block'
  , flexDirection:  isRelative ? 'column' : 'initial'
  , gap:  isRelative ? '5px' : '0'  }"
  >
    <!-- stock message -->
    <OutOfStockTag 
      :product="product" 
      :extra-class="outOfStockTagClass"
    />
    <!-- discount message -->
    <PromoTag 
      :product="product" 
      :extra-class="promoTagClass"
    />
  </div>
</template>

<script setup>
import OutOfStockTag from "./OutOfStockTag.vue";
import PromoTag from "./PromoTag.vue";

defineProps({
  product: {
    type: Object,
    required: true,
  },
  outOfStockTagClass: {
    type: String,
  },
  promoTagClass: {
    type: String,
  },
  isRelative: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped>
.product_tags {
  z-index: 11;
  position: absolute;
  inset: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
