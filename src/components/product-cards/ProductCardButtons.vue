<template>
  <div class="product-card-buttons-wrapper z-1">
    <!-- Desktop: Centered row -->
    <div
      class="hidden md:flex md:flex-row md:gap-3 md:justify-center md:items-center md:absolute md:left-1/2 md:bottom-10 md:group-hover:bottom-5 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-10 -translate-x-1/2 left-1/2"
    >
      <div class="pointer-events-auto">
        <ToggellFavorite :product-id="productId" />
      </div>
      <div class="pointer-events-auto">
        <QuickViewBtn 
          @quick-view="$emit('quick-view')"
        />
      </div>
    </div>
    <!-- Mobile: Absolute corners -->
    <div class="md:hidden">
      <div class="absolute left-3 bottom-3 z-10 pointer-events-auto">
        <ToggellFavorite :product-id="productId" />
      </div>
      <div class="absolute right-3 bottom-3 z-10 pointer-events-auto">
        <QuickViewBtn 
          @quick-view="$emit('quick-view')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ToggellFavorite from './product-cards-buttons/ToggellFavorite.vue';
import QuickViewBtn from './product-cards-buttons/QuickViewBtn.vue';

defineProps({
  productId: {
    type: [String, Number],
    required: true
  }
});

defineEmits(['quick-view']);
</script>

<style scoped>
.product-card-buttons-wrapper {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.product-card-buttons-wrapper > div {
  pointer-events: auto;
}
</style> 