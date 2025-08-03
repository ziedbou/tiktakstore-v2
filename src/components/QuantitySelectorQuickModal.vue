<template>
  <div class="flex items-center ">
    <div class="flex border border-gray-300 rounded-md">
      <button
        type="button"
        @click="updateQuantity(quantity - 1)"
        class="px-3 py-3 text-gray-500 hover:text-charcoal"
      >
        -
      </button>
      <input
        type="text"
        :value="quantity"
        readonly
        class="w-12 text-center py-2 border-x border-gray-300"
      />
      <button
        type="button"
        @click="updateQuantity(quantity + 1)"
        class="px-3 py-2 text-gray-500 hover:text-charcoal"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { useProductQuantity } from '~/composables/useProductQuantity.js';

const { quantity, updateQuantity } = useQuickModalProductQuantity();
</script>