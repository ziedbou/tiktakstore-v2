<template>
  <!-- Cart Button -->
  <button
    @click="toggleCart"
    :class="buttonClass"
  >
    <div class="relative flex items-center justify-center">
      <ShoppingBagIcon :class="iconClass" />
      <span
        class="cart-badge absolute -top-2 -right-2 flex items-center justify-center h-4 min-w-4 px-1 text-xs font-bold rounded-full"
        style="
          background-color: var(--header-badge-bg);
          color: var(--header-badge-color, #ffffff);
        "
        >{{ cartCount }}</span
      >
    </div>
    <span v-if="showText" :class="textClass">{{ buttonText }}</span>
  </button>

  <!-- Cart Sidebar -->
  <Cart :open="cartOpen" @close="cartOpen = false" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Cart from "~/components/Cart";
import eventBus from "@/composables/eventBus.js";
import {  ShoppingBagIcon } from '@heroicons/vue/24/outline';
import { useWindowSize } from "@vueuse/core";

// Define props for customization
const props = defineProps({
  buttonClass: {
    type: String,
    default: "user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300 bg-transparent border-0 cursor-pointer"
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
    default: "Panier"
  },
  textClass: {
    type: String,
    default: "user-action-text text-xs mt-0.5 font-medium"
  },
  isMobileCart: {
    type: Boolean, 
    default: false
  }
});

// Reactive variables
const cartOpen = ref(false);
const cartCount = ref(0);

// Functions
function toggleCart() {
  cartOpen.value = !cartOpen.value;
}

const {  width  } = useWindowSize();
const isListenToEvent = computed(() =>  props.isMobileCart ? width.value <= 768 : width.value > 768)



onMounted(() => {
  // Update cart count from localStorage - only runs on client side
  // console.log("cnmoutned")
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.value = cart._details?.length || 0;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    cartCount.value = 0;
  }

  // Setup event listener for cart updates
  eventBus.on("cart-updated", () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartCount.value = cart._details?.length || 0;
    } catch (error) {
      console.error("Error updating cart count:", error);
    }
  });
    
  eventBus.on("open-cart", () => {
    // console.log(isListenToEvent.value, "isListenToEvent")
    if (isListenToEvent.value) {
      // console.log(isListenToEvent.value, "isListenToEvent1")
      cartOpen.value = true;
    }
  });
  

});

onUnmounted(() => {
  eventBus.off("open-cart");
  eventBus.off("cart-updated");
});
</script>


