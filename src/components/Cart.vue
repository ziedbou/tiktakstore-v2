<!-- src/components/Cart.vue -->
<template>
  <TransitionRoot as="template" :show="open" class="cart-transition-root">
    <Dialog class="relative z-10 cart-dialog" @close="emit('close')">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-100"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
        class="cart-overlay-transition"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity cart-overlay" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden cart-content-container">
        <div class="absolute inset-0 overflow-hidden cart-content-wrapper">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 cart-panel-container">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
              class="cart-panel-transition"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md cart-panel">
                <div class="flex h-full flex-col bg-white shadow-xl cart-panel-content">
                  <!-- Fixed header -->
                  <div class="flex-shrink-0 px-4 py-3 sm:px-6 border-b border-gray-200 cart-header">
                    <div class="flex items-start justify-between cart-header-container">
                      <DialogTitle class="text-lg font-medium text-gray-900 cart-title">
                        Shopping cart
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center cart-close-button-container">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500 cart-close-button"
                          @click="emit('close')"
                        >
                          <span class="absolute -inset-0.5 cart-close-button-overlay" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="size-6 cart-close-icon" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div class="flex items-center justify-between mt-2 cart-progress-container">
                      <!-- Hybrid Design: Horizontal Progress Bar + Current Success Message -->
                      <div v-if="!isEligible" class="w-full bg-green-50 rounded-lg px-4 py-2 border border-green-200 cart-progress-bar">
                        <div class="flex items-center justify-between mb-2 cart-progress-bar-header">
                          <div class="flex items-center space-x-2 cart-progress-bar-info">
                            <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white cart-progress-bar-icon-container">
                              <Gift class="w-3.5 h-3.5 cart-progress-bar-icon" />
                            </div>
                            <span class="text-sm text-green-700 cart-progress-bar-text">{{ messageText }}</span>
                          </div>
                          <span class="text-xs text-green-600 cart-progress-bar-amount">{{ amountToAchieve }} {{ companyData.currency }} restants</span>
                        </div>
                        <div class="text-xs text-gray-600 mb-3 cart-progress-bar-description">
                          Ajoutez encore <span class="font-semibold text-green-600 cart-progress-bar-amount-highlight">{{ amountToAchieve }} {{ companyData.currency }}</span> pour atteindre <span class="font-semibold text-gray-800 cart-progress-bar-threshold">{{ FREE_SHIPPING_THRESHOLD }} {{ companyData.currency }}</span> et obtenir la livraison gratuite !
                        </div>
                        <div class="w-full bg-gray-200 shadow-inner rounded-full h-2 overflow-hidden cart-progress-bar-track">
                          <div
                            class="bg-green-400 h-2 rounded-full transition-all duration-700 ease-out progress-bar cart-progress-bar-fill"
                            :style="{ width: progressValue + '%' }"
                          ></div>
                        </div>
                      </div>

                      <!-- Success state from current version -->
                      <div v-else class="w-full bg-[#2b9914] rounded-xl px-4 py-2 text-white cart-success-message">
                        <div class="flex items-center space-x-3 cart-success-message-content">
                          <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-[#2b9914] cart-success-icon-container">
                            <Gift class="w-4 h-4 cart-success-icon" />
                          </div>
                          <div class="cart-success-text">
                            <div class="text-sm font-medium cart-success-title">{{ successMessageText }}</div>
                            <div class="text-xs opacity-90 cart-success-description">Profitez de votre livraison offerte</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Scrollable content area -->
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6 custom-scrollbar cart-items-container">
                    <div class="flow-root cart-items">
                      <!-- Empty cart state -->
                      <div v-if="!cart._details || cart._details.length === 0" class="text-center py-12 cart-empty">
                        <div class="mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 cart-empty-icon-container">
                          <ShoppingBag class="w-10 h-10 text-gray-400 cart-empty-icon" />
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2 cart-empty-title">Votre panier est vide</h3>
                        <p class="text-gray-500 mb-8 cart-empty-description">Ajoutez des articles à votre panier pour commencer vos achats.</p>
                        <button
                          @click="emit('close')"
                          class="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 cart-empty-continue-button"
                        >
                          Continuer les achats
                          <span aria-hidden="true" class="ml-2 cart-empty-continue-arrow">→</span>
                        </button>
                      </div>

                      <!-- Cart items list -->
                      <ul v-else role="list" class="-my-6 divide-y divide-gray-200 cart-items-list">
                        <li
                          v-for="item in cart._details || []"
                          :key="item.product_id"
                          class="flex py-3 cart-item"
                        >
                          <div class="flex flex-col w-full cart-item-content">
                            <div class="flex flex-row cart-item-header">
                              <div class="relative cart-item-image-container">
                                <div class="size-16 shrink-0 rounded-md border overflow-hidden border-gray-200 cart-item-image">
                                  <img
                                    :src="imghttps(item.product_thumb)"
                                    :alt="item.product_name"
                                    class="size-full object-cover cart-item-img"
                                    @error=""
                                  />
                                </div>
                                <span class="absolute -top-2 -right-2 flex items-center justify-center h-4 px-[5px] w-auto rounded-full bg-indigo-600 text-white text-xs font-semibold cart-item-quantity-badge">
                                  {{ item.quantity }}
                                </span>
                              </div>
                              <div class="ml-4 flex-1 cart-item-details">
                                <div class="flex justify-between text-base font-medium text-gray-900 cart-item-info">
                                  <h3 class="cart-item-name-container">
                                    <a :href="`#product-${item.product_id}`" class="cart-item-name-link">
                                      {{ item.product_name }}
                                    </a>
                                  </h3>
                                  <p class="ml-4 font-bold cart-item-price">
                                    {{ item.price_ttc.toFixed(2) }} {{ companyData.currency }}
                                  </p>
                                </div>
                                <p class="mt-1.5 text-sm text-gray-500 flex items-center justify-between cart-item-attributes">
                                  <span class="cart-item-attributes-text">{{ item.product_attrs }}</span>
                                  <button
                                    type="button"
                                    class="ml-2 p-1.5 rounded-full bg-white shadow-sm border border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all duration-200 ease-in-out transform hover:scale-110 cart-item-remove-button"
                                    @click="removeFromCart(item.product_id)"
                                    title="Remove item"
                                  >
                                    <Trash2 class="size-3.5 cart-item-remove-icon" />
                                  </button>
                                </p>
                              </div>
                            </div>
                            <ul v-if="item.options" class="ml-8 cart-item-options">
                              <li
                                v-for="option in item.options || []"
                                :key="option?.product_id"
                                class="flex py-3 cart-item-option"
                              >
                                <div class="relative cart-item-option-image-container">
                                  <div class="size-16 shrink-0 rounded-md border overflow-hidden border-gray-200 cart-item-option-image">
                                    <img
                                      :src="imghttps(option?.photo_thumb)"
                                      :alt="option?.product_name"
                                      class="size-full object-cover cart-item-option-img"
                                    />
                                  </div>
                                </div>
                                <div class="ml-4 flex-1 cart-item-option-details">
                                  <div class="flex justify-between text-base font-medium text-gray-900 cart-item-option-info">
                                    <h3 class="cart-item-option-name">
                                      {{ option?.quantity }} * {{ option?.product_name }} {{ option?.attrs }}
                                    </h3>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Fixed footer -->
                  <div v-if="cart._details && cart._details.length > 0" class="flex-shrink-0 border-t border-gray-200 px-4 py-4 sm:px-6 bg-white cart-footer">
                    <div class="flex justify-between text-base font-medium text-gray-900 cart-footer-subtotal">
                      <p class="cart-footer-subtotal-label">Sous total</p>
                      <p class="cart-footer-subtotal-amount">
                        {{ (cart.total_amount || 0).toFixed(2) }} {{ companyData.currency }}
                      </p>
                    </div>
                    <div
                      v-if="cart.discount"
                      class="flex justify-between text-base font-medium text-gray-900 mt-1 cart-footer-discount"
                    >
                      <p class="cart-footer-discount-label">Remise</p>
                      <p class="cart-footer-discount-amount">
                        - {{ (parseFloat(cart.discount) || 0).toFixed(2) }} {{ companyData.currency }}
                      </p>
                    </div>
                    <div class="flex justify-between text-base font-medium text-gray-900 mt-1 cart-footer-total">
                      <p class="cart-footer-total-label">Total</p>
                      <p class="cart-footer-total-amount">
                        {{ (cart.total || 0).toFixed(2) }} {{ companyData.currency }}
                      </p>
                    </div>
                    <NuxtLink
                      to="/cart"
                      @click="emit('close')"
                      class="mt-4 flex items-center justify-center rounded-md border-2 border-indigo-600 bg-transparent px-6 py-2.5 text-base font-medium text-indigo-600 shadow-xs hover:bg-indigo-50 hover:border-indigo-700 hover:text-indigo-700 transition-colors duration-200 cart-footer-cart-link"
                    >
                      Votre panier
                    </NuxtLink>
                    <NuxtLink
                      to="/checkout"
                      @click="emit('close')"
                      class="mt-2 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2.5 text-base font-medium text-white shadow-xs hover:bg-indigo-700 cart-footer-checkout-link"
                    >
                      Valider mes achats
                    </NuxtLink>
                    <!-- <div
                      class="mt-4 flex justify-center text-center text-sm text-gray-500 cart-footer-continue"
                    >
                      <p class="cart-footer-continue-text">
                        ou{{ " " }}
                        <NuxtLink
                          to="/"
                          class="font-medium text-indigo-600 hover:text-indigo-500 cart-footer-continue-link"
                          @click="emit('close')"
                        >
                          Continuer les Achats
                          <span aria-hidden="true" class="cart-footer-continue-arrow"> →</span>
                        </NuxtLink>
                      </p>
                    </div> -->
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { imghttps } from "~/composables/services/helpers";
import { Trash2, ShoppingBag, Gift } from 'lucide-vue-next';
import eventBus from "@/composables/eventBus.js";
import {
  getCartFromStorage,
  removeFromCart,
} from "@/composables/services/cartService.js";
import { useCompanyData } from "@/composables/useCompanyData";
import { useFreeShipping } from "~/composables/useFreeShipping";

const { companyData } = useCompanyData();

// Use the free shipping composable
const {
  messageText,
  successMessageText,
  progressValue,
  amountToAchieve,
  isEligible,
  forceSync,
  fetchFreeShippingConfig
} = useFreeShipping();

// Define props
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["close"]);

// Reactive cart state (managed by component)
const cart = ref(getCartFromStorage());

// Free shipping configuration
const FREE_SHIPPING_THRESHOLD = 100; // Default threshold

// Sync cart with localStorage
const syncCart = () => {
  cart.value = getCartFromStorage();
  // Force sync the composable's internal cart as well
  forceSync();
};

// Watch the 'open' prop to refresh cart when the dialog opens
watch(
  () => props.open,
  (newValue) => {
    if (newValue) {
      syncCart();
    }
  }
);

// Listen for cart-updated events
onMounted(() => {
  eventBus.on("cart-updated", () => {
    syncCart();
  });
});

onUnmounted(() => {
  eventBus.off("cart-updated");
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f9fafb;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
  transition: background 0.2s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
  background: #6b7280;
}

.progress-bar {
  animation: progressFill 0.8s ease-out;
}

@keyframes progressFill {
  from {
    width: 0%;
  }
}

/* Pulse animation for the shipping icon when close to free shipping */
.shipping-icon-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
