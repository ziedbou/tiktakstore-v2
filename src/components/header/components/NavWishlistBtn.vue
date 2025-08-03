<template>
  <!-- Wishlist Button -->
  <NuxtLink
    to="/wishlist"
    :class="buttonClass"
  >
    <div class="relative flex items-center justify-center">
      <Icon name="ph:heart" :class="iconClass" />
      <span
        v-if="wishlistCount > 0"
        class="cart-badge absolute -top-2 -right-2 flex items-center justify-center h-4 min-w-4 px-1 text-xs font-bold rounded-full bg-[var(--header-badge-bg)] text-[var(--header-badge-color)]"
        >{{ wishlistCount }}</span
      >
    </div>
    <span v-if="showText" :class="textClass">{{ buttonText }}</span>
  </NuxtLink>
</template>

<script setup>
import { useWishlist } from "@/composables/useWishlist.js";

// Define props for customization
const props = defineProps({
  buttonClass: {
    type: String,
    default: "user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300 text-center"
  },
  iconClass: {
    type: String,
    default: "w-6 h-6"
  },
  showText: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: "Favoris"
  },
  textClass: {
    type: String,
    default: "user-action-text text-xs mt-0.5 font-medium"
  }
});

// Use the wishlist composable
const { wishlistCount } = useWishlist();
</script>

