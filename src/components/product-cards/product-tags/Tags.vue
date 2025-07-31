<template>
  <div class="product_tags">
    <!-- stock message -->
    <span
      v-if="product.total_stock < 1  && !product.order_without_stock"
      class="product-card-tag tag-out-of-stock z-1"
      :class="outOfStockTagClass"
    >
      En rupture de stock
    </span>
    <!-- discount message -->
    <span
      v-if="product.discount > 0"
      class="product-card-tag tag tag-promo z-1"
      :class="promoTagClass"
    >
      <template v-if="true" xv-if="usePromoTagStyle">
        <template v-if="product.discount_type === 'percent'"
          >{{ Math.floor(product.discount) }}% de réduction</template
        >
        <template v-if="product.discount_type === 'fixed_amount'"
          >{{ product.discount }} TND {{ currency }} de réduction</template
        >
      </template>
      <template v-else> En promotion </template>
    </span>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
  outOfStockTagClass: {
    type: String,
    required: false,
    default: '',
  },
  promoTagClass: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style scoped>
.product_tags {
  z-index: 11;
}

.product-card-tag {
  border-radius: 15px;
  height: fit-content;
  font-size: 11px;
  padding: 6px 10px;
  width: fit-content;
  border-radius: 2px !important;
  position: absolute;
}

.tag-out-of-stock {
  color: var(--product-block-tag-color, #fff);
  background-color: var(--product-block-tag-background, #666666);
}

.tag-promo {
  color: var(--product-block-tag-color, #fff);
  background-color: var(--product-block-tag-background, #00dc82);
}

/*@media (max-width: 1280px) {
  .product_tags {
    top: 105px;
  }
}*/
</style>
