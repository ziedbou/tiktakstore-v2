<template>
  <div class="bg-white cart-container">
    <div class="container-medium pt-3 pb-7 lg:pt-8 lg:pb-20 cart-content">
      <Breadcrumb :items="breadcrumbItems" class="cart-breadcrumb" />

      <!-- Loading state -->
      <CartPageSkeleton v-if="isLoading" class="cart-skeleton" />

      <!-- Content states -->
      <div v-else class="cart-states">
        <!-- Error state -->
        <div v-if="error" class="mt-12 text-center text-red-600 cart-error">
          {{ error }}
        </div>

        <!-- Empty cart state -->
        <div
          v-else-if="!cart?._details?.length"
          class="my-12 flex flex-col items-center justify-center max-w-md mx-auto cart-empty"
        >
          <div
            class="bg-[var(--btn-primary-outline-background)] rounded-full border border-[var(--btn-primary-outline-border-color)] p-6 mb-6"
          >
            <ShoppingCart
              class="size-16 text-[var(--btn-primary-outline-color)]/80"
              aria-hidden="true"
            />
          </div>
          <h2
            class="text-2xl font-semibold text-gray-900 mb-2 cart-empty-title"
          >
            Votre panier est vide
          </h2>
          <p class="text-gray-500 text-center mb-8 cart-empty-description">
            Découvrez nos produits et trouvez ce qui vous convient.
          </p>
          <NuxtLink
            to="/"
            class="btn-primary-solid inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium cart-empty-continue-link"
          >
            <Undo2
              class="size-4 mb-1"
              aria-hidden="true"
            />
            CONTINUER VOS ACHATS
          </NuxtLink>
        </div>

        <!-- Cart content -->
        <div
          v-else
          class="mt-1 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16 cart-filled"
        >
          <section
            aria-labelledby="cart-heading"
            class="lg:col-span-7 cart-items-section"
          >
            <h2 id="cart-heading" class="sr-only cart-items-title">
              Articles dans votre panier
            </h2>

            <ul
              role="list"
              class="divide-y divide-gray-200 border-t border-b border-gray-200 cart-items-list"
            >
              <li
                v-for="item in cart._details"
                :key="item._product.id"
                class="flex items-center py-4 relative cart-item"
              >
                <div class="shrink-0 cart-item-image-container">
                  <NuxtLink
                    :to="getProductLink(item._product)"
                    class="flex items-center justify-center cart-item-image-link"
                  >
                    <img
                      :src="imghttps(item._product.photo)"
                      :alt="item._product.name"
                      class="size-28 rounded-md object-cover sm:size-20 cart-item-image"
                    />
                  </NuxtLink>
                </div>
                <div
                  class="ml-4 sm:ml-6 relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-14 sm:pr-0 w-[-webkit-fill-available] cart-item-details"
                >
                  <div class="cart-item-info">
                    <div class="flex justify-between cart-item-header">
                      <h3 class="text-sm cart-item-name-container">
                        <NuxtLink
                          :to="getProductLink(item._product)"
                          class="font-medium text-lg text-gray-800 hover:text-gray-800 cart-item-name-link"
                          >{{ item._product.name }}</NuxtLink
                        >
                      </h3>
                    </div>
                    <p
                      class="mt-2 text-md font-medium text-gray-900 cart-item-price"
                    >
                      {{ getPrice(item._product) + " " + companyData.currency }}
                    </p>
                  </div>

                  <div
                    class="mt-4 sm:mt-0 sm:pr-9 cart-item-quantity-container"
                  >
                    <div
                      class="grid w-full max-w-16 grid-cols-1 cart-item-quantity-controls"
                    >
                      <div class="flex items-center cart-item-quantity">
                        <div
                          class="flex border border-gray-300 rounded-md cart-item-quantity-input-container"
                        >
                          <button
                            type="button"
                            @click="
                              handleQuantityUpdate(
                                item._product.id,
                                Number(item.quantity) - 1
                              )
                            "
                            :disabled="Number(item.quantity) <= 1"
                            class="px-3 py-2 text-gray-500 hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed cart-item-decrement-button"
                          >
                            <MinusIcon
                              class="size-4 cart-item-decrement-icon"
                              aria-hidden="true"
                            />
                          </button>
                          <input
                            type="number"
                            :value="Number(item.quantity)"
                            @input="
                              handleDirectQuantityUpdate(
                                $event,
                                item._product.id,
                                item._product.stock
                              )
                            "
                            min="1"
                            :max="item._product.stock"
                            class="w-12 text-center py-2 border-x border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-outline-border-color)] focus:ring-opacity-50 transition-all duration-200 cart-item-quantity-input"
                          />
                          <button
                            type="button"
                            @click="
                              handleQuantityUpdate(
                                item._product.id,
                                Number(item.quantity) + 1
                              )
                            "
                            :disabled="
                              false /*Number(item.quantity) >= item._product.stock*/
                            "
                            class="px-3 py-2 text-gray-500 hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed cart-item-increment-button"
                          >
                            <PlusIcon
                              class="size-4 cart-item-increment-icon"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="absolute top-3 right-0 cart-item-remove-container"
                  >
                    <button
                      type="button"
                      @click="handleRemoveProduct(item._product)"
                      class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500 cart-item-remove-button"
                    >
                      <span class="sr-only">Supprimer</span>
                      <XIcon
                        class="size-5 cart-item-remove-icon"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <div class="flex justify-end mt-4 cart-clear-container">
              <button
                @click="handleClearCart()"
                class="btn-primary-outline inline-flex items-center gap-2 px-4 py-2 text-sm font-medium cart-clear-button"
              >
                <RefreshCw class="size-4 cart-clear-icon" aria-hidden="true" />
                Mise à jour panier
              </button>
            </div>
          </section>

          <!-- Order summary -->
          <section
            aria-labelledby="summary-heading"
            class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 lg:sticky lg:bottom-8 lg:self-end cart-summary-section"
          >
            <!-- Coupon code section -->
            <div
              v-if="isCouponApplied"
              class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 shadow-sm rounded-lg cart-coupon-applied"
            >
              <div class="flex items-center gap-2 cart-coupon-applied-info">
                <div
                  class="flex items-center justify-center w-10 h-10 bg-green-100 text-green-600 rounded-full cart-coupon-applied-icon-container"
                >
                  <TicketCheck
                    class="size-6 cart-coupon-applied-icon"
                    aria-hidden="true"
                  />
                </div>
                <div class="flex flex-col cart-coupon-applied-details">
                  <span
                    class="text-xs text-gray-500 font-medium cart-coupon-applied-label"
                    >PROMO CODE</span
                  >
                  <span
                    class="text-sm font-semibold text-gray-800 cart-coupon-applied-code"
                    >{{ couponCode }}</span
                  >
                </div>
              </div>
              <div class="flex items-center gap-3 cart-coupon-applied-discount">
                <div class="text-right cart-coupon-applied-discount-info">
                  <span
                    class="text-xs text-gray-500 cart-coupon-applied-discount-label"
                    >Discount</span
                  >
                  <div
                    class="text-sm font-bold text-green-600 cart-coupon-applied-discount-amount"
                  >
                    -{{ companyData.currency }} {{ discount.toFixed(2) }}
                  </div>
                </div>
                <button
                  @click="removeCouponCode"
                  class="flex items-center justify-center w-6 h-6 rounded-full bg-white text-gray-400 border border-gray-200 hover:text-red-500 hover:border-red-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 cart-coupon-remove-button"
                >
                  <XIcon
                    class="size-3 cart-coupon-remove-icon"
                    aria-hidden="true"
                  />
                  <span class="sr-only">Remove</span>
                </button>
              </div>
            </div>
            <div v-else-if="hasAutoPromo" class="space-y-3 cart-auto-promo">
              <div
                class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 shadow-sm rounded-lg cart-auto-promo-container"
              >
                <div class="flex items-center gap-2 cart-auto-promo-info">
                  <div
                    class="flex items-center justify-center w-10 h-10 bg-amber-100 text-amber-600 rounded-full cart-auto-promo-icon-container"
                  >
                    <TicketCheck
                      class="size-6 cart-auto-promo-icon"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="flex flex-col cart-auto-promo-details">
                    <span
                      class="text-xs text-gray-500 font-medium cart-auto-promo-label"
                      >PROMO AUTOMATIQUE</span
                    >
                    <span
                      class="text-sm font-semibold text-gray-800 cart-auto-promo-text"
                      >Réduction appliquée</span
                    >
                  </div>
                </div>
                <div class="text-right cart-auto-promo-discount">
                  <span
                    class="text-xs text-gray-500 cart-auto-promo-discount-label"
                    >Discount</span
                  >
                  <div
                    class="text-sm font-bold text-amber-600 cart-auto-promo-discount-amount"
                  >
                    -{{ companyData.currency }} {{ autoDiscount.toFixed(2) }}
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2 cart-coupon-input-container">
                <form
                  @submit.prevent="applyCouponCode"
                  class="relative flex-1 cart-coupon-form"
                >
                  <input
                    type="text"
                    name="coupon-code"
                    id="coupon-code"
                    v-model="couponCode"
                    class="w-full rounded-lg border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:outline-none border focus:border-[var(--btn-primary-solid-background)] cart-coupon-input"
                    placeholder="Entrez le code promo"
                  />
                  <button
                    v-show="couponCode.trim()"
                    type="button"
                    @click="clearCouponCode"
                    class="absolute right-2.5 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none cart-coupon-clear-button"
                  >
                    <XIcon
                      class="size-3 cart-coupon-clear-icon"
                      aria-hidden="true"
                    />
                    <span class="sr-only">Effacer</span>
                  </button>
                </form>
                <button
                  type="button"
                  @click="applyCouponCode"
                  :disabled="!couponCode.trim() || isApplyingCoupon"
                  class="btn-primary-solid inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium shadow-sm disabled:opacity-50 disabled:!cursor-not-allowed cart-coupon-apply-button"
                >
                  <Loader2
                    v-if="isApplyingCoupon"
                    class="size-4 mx-3 animate-spin cart-coupon-apply-loading-icon"
                    aria-hidden="true"
                  />
                  <span v-if="!isApplyingCoupon" class="cart-coupon-apply-text"
                    >Appliquer</span
                  >
                  <span v-else class="sr-only">loading...</span>
                </button>
              </div>
            </div>
            <div
              v-else
              class="flex items-center gap-2 cart-coupon-input-container"
            >
              <form
                @submit.prevent="applyCouponCode"
                class="relative flex-1 cart-coupon-form"
              >
                <input
                  type="text"
                  name="coupon-code"
                  id="coupon-code"
                  v-model="couponCode"
                  class="w-full rounded-lg border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm transition-all duration-200 focus:border-[var(--btn-primary-outline-border-color)] focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-outline-border-color)]/20 cart-coupon-input"
                  placeholder="Entrez le code promo"
                />
                <button
                  v-show="couponCode.trim()"
                  type="button"
                  @click="clearCouponCode"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none cart-coupon-clear-button"
                >
                  <XIcon
                    class="size-3 cart-coupon-clear-icon"
                    aria-hidden="true"
                  />
                  <span class="sr-only">Effacer</span>
                </button>
              </form>
              <button
                type="button"
                @click="applyCouponCode"
                :disabled="!couponCode.trim() || isApplyingCoupon"
                class="btn-primary-solid inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium shadow-sm disabled:opacity-50 disabled:!cursor-not-allowed cart-coupon-apply-button"
              >
                <Loader2
                  v-if="isApplyingCoupon"
                  class="size-4 mx-3 animate-spin cart-coupon-apply-loading-icon"
                  aria-hidden="true"
                />
                <span v-if="!isApplyingCoupon" class="cart-coupon-apply-text"
                  >Appliquer</span
                >
                <span v-else class="sr-only">loading...</span>
              </button>
            </div>

            <h2
              id="summary-heading"
              class="mt-6 text-lg font-medium text-gray-900 cart-summary-title"
            >
              Panier total
            </h2>

            <dl class="mt-6 space-y-4 cart-summary-details">
              <div
                class="flex items-center justify-between cart-summary-subtotal"
              >
                <dt class="text-sm text-gray-600 cart-summary-subtotal-label">
                  Sous-total
                </dt>
                <dd
                  class="text-sm font-medium text-gray-900 cart-summary-subtotal-amount"
                >
                  {{
                    orderSummary.subtotal.toFixed(2)
                  }}
                  {{
                    companyData.currency
                  }}
                </dd>
              </div>

              <!-- Discount -->
              <div
                class="flex items-center justify-between border-t border-gray-200 pt-4 cart-summary-discount"
              >
                <dt
                  class="flex items-center text-sm text-gray-600 cart-summary-discount-label"
                >
                  <span>Réduction</span>
                </dt>
                <dd
                  class="text-sm font-medium text-gray-900 cart-summary-discount-amount"
                >
                  {{
                    orderSummary.discount.toFixed(2)
                  }}
                  {{
                    companyData.currency
                  }}
                </dd>
              </div>

              <div
                class="flex items-center justify-between border-t border-gray-200 pt-4 cart-summary-shipping"
              >
                <dt
                  class="flex items-center text-sm text-gray-600 cart-summary-shipping-label"
                >
                  <span>Frais de livraison</span>
                </dt>
                <dd
                  class="text-sm font-medium text-gray-900 cart-summary-shipping-amount"
                >
                  {{
                    orderSummary.transport_price.toFixed(2)
                  }}
                  {{
                    companyData.currency
                  }}
                </dd>
              </div>

              <!-- Transporter selection -->
              <div
                v-if="cart?.transport_list?.length"
                class="border-t border-gray-200 pt-4 mt-2 cart-transporter-selection"
              >
                <div class="mb-2 cart-transporter-title-container">
                  <span
                    class="text-sm font-medium text-gray-700 cart-transporter-title"
                    >Méthode de livraison</span
                  >
                </div>
                <div class="space-y-2 cart-transporter-list">
                  <div
                    v-for="transporter in cart.transport_list"
                    :key="transporter.id"
                    :class="[
                      'group flex items-center justify-between bg-white border rounded-lg p-3 transition-colors cursor-pointer cart-transporter-item',
                      cart.transport_id === transporter.id
                        ? 'border-[var(--btn-primary-outline-border-color)] bg-[var(--btn-primary-outline-background-hover)]'
                        : 'border-gray-200 hover:border-[var(--btn-primary-outline-border-color)]/30',
                    ]"
                    @click="handleSelectTransporter(transporter.id)"
                  >
                    <div class="flex items-center cart-transporter-info">
                      <input
                        type="radio"
                        :id="'transporter-' + transporter.id"
                        name="transporter"
                        :value="transporter.id"
                        :checked="cart.transport_id === transporter.id"
                        @change="handleSelectTransporter(transporter.id)"
                        class="h-4 w-4 border-gray-300 cursor-pointer cart-transporter-radio"
                        @click.stop
                      />
                      <label
                        :for="'transporter-' + transporter.id"
                        class="ml-3 block cursor-pointer cart-transporter-label"
                      >
                        <span
                          :class="[
                            'text-sm font-medium cart-transporter-name transition-colors duration-200 ease-out',
                            cart.transport_id === transporter.id
                              ? 'text-[var(--btn-primary-outline-color)]'
                              : 'text-gray-800 group-hover:text-[var(--btn-primary-outline-color)]',
                          ]"
                          >{{ transporter.name }}</span
                        >
                        <p
                          v-if="transporter.description"
                          :class="[
                            'text-xs mt-1 transition-colors duration-200 ease-out cart-transporter-description',
                            cart.transport_id === transporter.id
                              ? 'text-[var(--btn-primary-outline-color)]'
                              : 'text-gray-500 group-hover:text-[var(--btn-primary-outline-color)]/80',
                          ]"
                        >
                          {{ transporter.description }}
                        </p>
                      </label>
                    </div>
                    <span
                      :class="[
                        'text-sm font-medium transition-colors cart-transporter-price',
                        cart.transport_id === transporter.id
                          ? 'text-[var(--btn-primary-outline-color)]'
                          : 'text-gray-800 group-hover:text-[var(--btn-primary-outline-color)]',
                      ]"
                      >{{
                        transporter.price.toFixed(2)
                      }}
                      {{
                        companyData.currency
                      }}</span
                    >
                  </div>
                </div>
                <!-- Transporter error message -->
                <p
                  v-if="transporterError"
                  class="mt-2 text-sm text-red-600 cart-transporter-error"
                >
                  {{ transporterError }}
                </p>
              </div>

              <div
                class="flex items-center justify-between border-t border-gray-200 pt-4 cart-summary-total"
              >
                <dt
                  class="text-base font-semibold text-gray-900 cart-summary-total-label"
                >
                  Total de la commande
                </dt>
                <dd
                  class="text-base font-semibold text-gray-900 cart-summary-total-amount"
                >
                  <template v-if="orderSummary.discount > 0">
                    <span
                      class="line-through font-medium text-gray-500 mx-2 cart-summary-total-original"
                    >
                      {{
                        (
                          orderSummary.subtotal + orderSummary.transport_price
                        ).toFixed(2)
                      }}
                    </span>
                    <span class="cart-summary-total-discounted">
                      {{
                        orderSummary.total.toFixed(2)
                      }}
                      {{
                        companyData.currency
                      }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="cart-summary-total-regular">{{
                      companyData.currency + " " + orderSummary.total.toFixed(2)
                    }}</span>
                  </template>
                </dd>
              </div>
            </dl>

            <div class="mt-6 cart-confirm-container">
              <button
                @click="handleConfirmOrder"
                type="button"
                class="shake-animation btn-primary-solid flex justify-center w-full px-4 py-3 text-base font-medium shadow-xs cart-confirm-button"
              >
                Confirmer la commande
              </button>
            </div>
            <div class="mt-6 cart-continue-container">
              <NuxtLink
                to="/"
                class="btn-primary-outline inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium cart-continue-link"
              >
                <Undo2
                  class="size-4 mb-1 cart-continue-icon"
                  aria-hidden="true"
                />
                CONTINUER VOS ACHATS
              </NuxtLink>
            </div>
          </section>
        </div>
      </div>

      <Modal
        :isOpen="showModal"
        :title="modalTitle"
        @close="showModal = false"
        class="cart-modal"
      >
        <div class="flex flex-col items-center gap-6 py-3 cart-modal-content">
          <CircleAlert
            class="size-16 text-amber-500 cart-modal-icon"
            aria-hidden="true"
          />
          <div class="space-y-4 cart-modal-message">
            <p
              class="text-base font-medium text-gray-800 text-center cart-modal-title"
            >
              Votre code promo n'a pas pu être appliqué
            </p>
            <div
              class="bg-amber-50 rounded-lg p-4 border border-amber-100 cart-modal-reasons"
            >
              <ul
                class="space-y-2 text-sm text-gray-700 cart-modal-reasons-list"
              >
                <li class="flex items-start cart-modal-reason-item">
                  <span
                    class="inline-flex mr-2 mt-1 h-2 w-2 rounded-full bg-amber-500 cart-modal-reason-bullet"
                  ></span>
                  <span class="cart-modal-reason-text"
                    >Le code n'existe pas ou a expiré</span
                  >
                </li>
                <li class="flex items-start cart-modal-reason-item">
                  <span
                    class="inline-flex mr-2 mt-1 h-2 w-2 rounded-full bg-amber-500 cart-modal-reason-bullet"
                  ></span>
                  <span class="cart-modal-reason-text"
                    >Le code n'est pas applicable aux produits de votre
                    panier</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import {
  MinusIcon,
  PlusIcon,
  HelpCircleIcon,
  XIcon,
  Undo2,
  RefreshCw,
  Loader2,
  TicketCheck,
  ShoppingCart,
} from "lucide-vue-next";
import {
  getCartFromStorage,
  updateCartItemQuantity,
  removeFromCart,
  handleClearCart,
  updateCart,
  applyAutoDiscount,
  selectTransporter,
} from "@/composables/services/cartService";
import { useCompanyData } from "@/composables/useCompanyData";
import {
  imghttps,
  getPrice,
  getProductLink,
} from "~/composables/services/helpers";
import eventBus from "@/composables/eventBus";
import axios from "axios";
import CartPageSkeleton from "@/components/skeleton/CartPageSkeleton.vue";
import Modal from "@/components/Modal.vue";
import { CircleAlert } from "lucide-vue-next";

const breadcrumbItems = [
  { label: "Accueil", url: "/" },
  { label: "Panier", url: "/cart" },
];

const { companyData } = useCompanyData();
const cart = ref(null);
const isLoading = ref(true);
const error = ref(null);
const discount = ref(0); // Discount amount from promo code
const couponCode = ref("");
const isApplyingCoupon = ref(false); // Loading state for coupon button
const isCouponApplied = ref(false);
const showModal = ref(false);
const modalTitle = ref("Code Promo Non Reconnu");
const hasAutoPromo = ref(false);
const autoDiscount = ref(0);
const showCouponInput = ref(false);
const transporterError = ref(""); // Add transporter error state

// Sync cart with localStorage
const syncCartWithLocalStorage = () => {
  try {
    cart.value = getCartFromStorage();
    // Check for auto promo
    if (cart.value?.promoCode === "autopromo" && !isCouponApplied.value) {
      hasAutoPromo.value = true;
      autoDiscount.value = cart.value.promoCodeDiscount || 0;
    } else {
      hasAutoPromo.value = false;
    }

    // Check for manual promo code
    if (cart.value?.promoCode && cart.value.promoCode !== "autopromo") {
      isCouponApplied.value = true;
      couponCode.value = cart.value.promoCode;
      discount.value = cart.value.promoCodeDiscount || 0;
    }
  } catch (err) {
    console.error("Error syncing cart:", err);
    error.value = "Failed to load cart data";
  }
};

// Handle quantity update
const handleQuantityUpdate = (productId, newQuantity) => {
  try {
    updateCartItemQuantity(
      productId,
      parseInt(newQuantity),
      companyData.value.slug
    );
  } catch (err) {
    console.error("Error updating quantity:", err);
  }
};

// Handle product removal
const handleRemoveProduct = (product) => {
  try {
    removeFromCart(product.id, product?.options, companyData.value.slug);
    syncCartWithLocalStorage();
    eventBus.emit("cart-updated");
  } catch (err) {
    console.error("Error removing product:", err);
  }
};

// Computed property for order summary
const orderSummary = computed(() => {
  return {
    subtotal: cart.value.subtotal,
    discount: cart.value.discount,
    transport_price: cart.value.transport_price,
    total: cart.value.total,
    promoCode: cart.value.promoCode,
  };
});

// Load initial cart data
const loadCart = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    syncCartWithLocalStorage();
  } catch (err) {
    error.value = "Failed to load cart data";
    console.error("Error loading cart:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadCart();
  // Listen for cart updates
  eventBus.on("cart-updated", syncCartWithLocalStorage);
  applyAutoDiscount(companyData.value.slug);
});

onUnmounted(() => {
  eventBus.off("cart-updated");
});

// Add this function in the script section
const handleDirectQuantityUpdate = (event, productId, maxStock) => {
  let newQuantity = parseInt(event.target.value);

  // Validate the input
  if (isNaN(newQuantity) || newQuantity < 1) {
    newQuantity = 1;
  } else if (newQuantity > maxStock) {
    newQuantity = maxStock;
  }

  handleQuantityUpdate(productId, newQuantity);
};

// Add this function for applying coupon codes
const applyCouponCode = async () => {
  if (!couponCode.value.trim()) return;

  isApplyingCoupon.value = true;

  try {
    const cart = getCartFromStorage();

    // API request
    const config = useRuntimeConfig();
    const baseURL = config.public.baseURL;
    const response = await axios.post(`${baseURL}website/get-auto-discount`, {
      details: cart._details,
      code: couponCode.value,
      slug: companyData.value.slug,
      delivery_price: cart.transport_price,
    });

    // Update discount
    const newDiscount = parseFloat(response.data.toFixed(2));

    if (newDiscount > 0) {
      // Valid coupon code with discount
      isCouponApplied.value = true;
      hasAutoPromo.value = false; // Disable auto promo when manual code is applied
      discount.value = newDiscount;

      // Update cart with valid promo code
      cart.promoCode = couponCode.value;
      cart.promoCodeDiscount = newDiscount;
      cart.discount = newDiscount;
    } else {
      // Invalid coupon code - reset existing coupon
      isCouponApplied.value = false;
      discount.value = 0;

      // Reset cart promo
      cart.promoCode = "";
      cart.promoCodeDiscount = 0;
      cart.discount = 0;

      // Show error modal
      showModal.value = true;
    }

    // Save to local storage with slight delay to ensure it completes
    setTimeout(() => {
      updateCart(cart, false);
      syncCartWithLocalStorage();

      // If coupon invalid, check for auto discount again
      if (!isCouponApplied.value) {
        setTimeout(() => {
          applyAutoDiscount(companyData.value.slug);
        }, 200);
      }
    }, 100);
  } catch (error) {
    console.error("Error applying coupon:", error);

    // Reset on error
    isCouponApplied.value = false;
    discount.value = 0;

    // Show error modal
    showModal.value = true;

    // Restore cart to clean state for coupon
    const cart = getCartFromStorage();
    cart.promoCode = "";
    cart.promoCodeDiscount = 0;
    cart.discount = 0;

    updateCart(cart, false);

    // Check for auto discount after error
    setTimeout(() => {
      applyAutoDiscount(companyData.value.slug);
    }, 200);
  } finally {
    isApplyingCoupon.value = false;
  }
};

// Function to remove the coupon code
const removeCouponCode = () => {
  // Reset local state
  couponCode.value = "";
  discount.value = 0;
  isCouponApplied.value = false;

  const cart = getCartFromStorage();
  cart.promoCode = "";
  cart.promoCodeDiscount = 0;
  cart.discount = 0;

  // Update the cart in local storage
  updateCart(cart, false);

  // Check if auto promo should be re-enabled
  setTimeout(() => {
    applyAutoDiscount(companyData.value.slug);
  }, 200);
};

// Add this function for selecting a transporter
const handleSelectTransporter = (transporterId) => {
  // Clear any existing transporter error when selection is made
  transporterError.value = "";

  // Call the imported selectTransporter function
  selectTransporter(transporterId);
  // Reload cart data to reflect changes
  syncCartWithLocalStorage();
};

// Function to clear coupon code
const clearCouponCode = (event) => {
  event.preventDefault();
  event.stopPropagation();
  couponCode.value = "";
};

// Add this function for confirming the order
const handleConfirmOrder = () => {
  // Reset any existing error
  transporterError.value = "";

  // Check if there are transporters available and none is selected
  if (cart.value?.transport_list?.length && !cart.value?.transport_id) {
    transporterError.value = "Veuillez sélectionner une méthode de livraison";
    return;
  }

  // If validation passes, navigate to checkout
  navigateTo("/checkout");
};
</script>

<style scoped>
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-2px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(2px, 0, 0);
  }
}

.shake-animation {
  animation: shake 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}
</style>
