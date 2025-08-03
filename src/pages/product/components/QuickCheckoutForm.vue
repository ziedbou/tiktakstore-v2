<template>
  <div class="mt-6 p-4  border border-[var(--btn-primary-outline-border-color-hover)] border-2 border-dashed rounded-lg bor shadow-[0_2px_16px_0_rgba(0,0,0,0.08)]">
    <div
      v-if="isSubmitting"
      class="fixed inset-0 z-60 bg-white/80 backdrop-blur-sm flex items-center justify-center"
    >
      <div class="flex flex-col items-center">
        <div
          class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-r-transparent"
        ></div>
        <p class="mt-4 text-gray-700 text-lg">Traitement de votre commande...</p>
      </div>
    </div>
    <h3 class="font-semibold text-xl mb-4">Achat rapide</h3>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center">
      <div
        class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"
      ></div>
      <p class="mt-4 text-gray-600">Chargement des paramètres...</p>
    </div>

    <!-- Form content -->
    <form v-else @submit.prevent="handleAchatRapide" class="space-y-2">
      <!-- Contact Information Section -->
      <section v-if="checkoutFields.contactInformation.length" aria-labelledby="contact-info-heading">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="field in checkoutFields.contactInformation" :key="field.slug" class="sm:col-span-1">
            <label :for="field.slug" class="block font-medium text-gray-700">
              {{ field.field }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="mt-2">
              <input
                v-if="field.slug === 'email'"
                type="email"
                :id="field.slug"
                :name="facebookNameTags[field.slug] ?? field.slug"
                v-model="formData[field.slug]"
                :required="field.required"
                :maxlength="field.max_length"
                :placeholder="field.max_length ? `${field.field} (max ${field.max_length} caractères)` : field.field"
                :class="[
                  'block w-full rounded-md px-3 py-3 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 duration-200 border-gray-300 border-2 focus:ring-2 hover:border-[var(--btn-primary-outline-border-color)] focus:ring-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                  errors[field.slug] ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50' : 'bg-white outline-gray-300',
                ]"
              />
              <CountryPhoneSelector
                v-else-if="field.slug === 'phone' || field.slug === 'phone_extra'"
                v-model="formData[field.slug]"
                :inputId="field.slug"
                :inputPlaceholder="field.field"
                :required="field.required"
                :maxLength="field.max_length"
                :error="!!errors[field.slug]"
                :errorMessage="errors[field.slug]"
                :errorRingClass="errors[field.slug] ? 'ring-2 ring-red-500/50' : ''"
                :isQuickCheckout="true"
              />
              <input
                v-else
                type="text"
                :id="field.slug"
                :name="facebookNameTags[field.slug] ?? field.slug"
                v-model="formData[field.slug]"
                :required="field.required"
                :maxlength="field.max_length"
                :placeholder="field.max_length ? `${field.field} (max ${field.max_length} caractères)` : field.field"
                :class="[
                  'block w-full rounded-md px-3 py-3 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 duration-200 border-gray-300 border-2 focus:ring-2 hover:border-[var(--btn-primary-outline-border-color)] focus:ring-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                  errors[field.slug] ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50' : 'bg-white outline-gray-300',
                ]"
              />
              <p
                v-if="errors[field.slug] && !(field.slug === 'phone' || field.slug === 'phone_extra')"
                class="mt-1 text-sm text-red-600"
              >
                {{ errors[field.slug] }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Shipping Address Section -->
      <section v-if="checkoutFields.shippingAddress.length" aria-labelledby="shipping-heading" class="mt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="field in checkoutFields.shippingAddress"
            :key="field.slug"
            :class="field.slug === 'address' ? 'sm:col-span-2' : 'sm:col-span-1'"
          >
            <label :for="field.slug" class="block font-medium text-gray-700">
              {{ field.field }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="mt-2">
              <!-- Governorate Dropdown -->
              <select
                v-if="field.slug === 'gouv'"
                :id="field.slug"
                :name="facebookNameTags[field.slug] ?? field.slug"
                v-model="formData[field.slug]"
                :required="field.required"
                :class="[
                  'block w-full rounded-md px-3 py-3 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 duration-200 border-gray-300 border-2 focus:ring-2 hover:border-[var(--btn-primary-outline-border-color)] focus:ring-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                  errors[field.slug] ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50' : 'bg-white outline-gray-300',
                ]"
              >
                <option value="" disabled selected>Choisir un gouvernorat</option>
                <option v-for="governorate in Governorates" :key="governorate" :value="governorate">
                  {{ governorate }}
                </option>
              </select>
              
              <!-- Phone Selector -->
              <CountryPhoneSelector
                v-else-if="field.slug === 'phone' || field.slug === 'phone_extra'"
                v-model="formData[field.slug]"
                :inputId="field.slug"
                :inputPlaceholder="field.field"
                :required="field.required"
                :maxLength="field.max_length"
                :error="!!errors[field.slug]"
                :errorMessage="errors[field.slug]"
                :errorRingClass="errors[field.slug] ? 'ring-2 ring-red-500/50' : ''"
              />
              <!-- Text Input -->
              <input
                v-else-if="field.slug !== 'comment' && field.slug !== 'gouv'"
                type="text"
                :id="field.slug"
                :name="facebookNameTags[field.slug] ?? field.slug"
                v-model="formData[field.slug]"
                :required="field.required"
                :maxlength="field.max_length"
                :placeholder="field.max_length ? `${field.field} (max ${field.max_length} caractères)` : field.field"
                :class="[
                  'block w-full rounded-md px-3 py-3 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 duration-200 border-gray-300 border-2 focus:ring-2 hover:border-[var(--btn-primary-outline-border-color)] focus:ring-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                  errors[field.slug] ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50' : 'bg-white outline-gray-300',
                ]"
              />
              <!-- Textarea -->
              <textarea
                v-else-if="field.slug === 'comment'"
                :id="field.slug"
                :name="field.slug"
                v-model="formData[field.slug]"
                :required="field.required"
                rows="3"
                :class="[
                  'block w-full rounded-md px-3 py-3 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 duration-200 border-gray-300 border-2 focus:ring-2 hover:border-[var(--btn-primary-outline-border-color)] focus:ring-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                  errors[field.slug] ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50' : 'bg-white outline-gray-300',
                ]"
              ></textarea>
              <p
                v-if="errors[field.slug] && !(field.slug === 'phone' || field.slug === 'phone_extra')"
                class="mt-1 text-sm text-red-600"
              >
                {{ errors[field.slug] }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- coupan -->
      <div class="mt-4" v-if="websiteInfo?.store_settings?.display_coupon_fastcheckout ">
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
                  -{{ companyData.currency }} {{ promoDiscount.toFixed(2) }}
                </div>
              </div>
              <button
                type="button"
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
                class="block w-full rounded-md px-3 py-3 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 outline-2 -outline-offset-2 duration-200 border-gray-300 border-2 ring-2 border-[var(--btn-primary-outline-border-color)] ring-[var(--btn-primary-outline-border-color)] sm:text-sm/6 outline-gray-300"
                placeholder="Entrez le code promo"
              />
              <div class="absolute  flex justify-center items-center gap-2 right-2.5 top-1/2 -translate-y-1/2">
                <button
                  v-show="couponCode.trim()"
                  type="button"
                  @click="clearCouponCode"
                  class=" bg-gray-200 rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none cart-coupon-clear-button"
                >
                  <XIcon
                    class="size-3 cart-coupon-clear-icon"
                    aria-hidden="true"
                  />
                  <span class="sr-only">Effacer</span>
                </button>
                 <button
                    type="button"
                    @click="applyCouponCode"
                    :disabled="!couponCode.trim() || isApplyingCoupon"
                    class=" btn-primary-solid inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium shadow-sm disabled:opacity-50 disabled:!cursor-not-allowed cart-coupon-apply-button"
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
            </form>
           
          </div>
      </div>
      <!-- Order Summary -->
      <div class="mt-4 bg-white p-4 rounded-lg border border-gray-200">
        <h4 class="font-medium mb-3">Résumé de la commande</h4>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">{{ product.name }} (x{{ quantity }})</span>
            <span>{{ totalBeforeTax }} {{ currency }}</span>
          </div>
          <div v-if="product.discount > 0" class="flex justify-between text-coral-dark">
            <span>Réduction</span>
            <span>{{ (product.discount * quantity).toFixed(2) }} {{ currency }}</span>
          </div>
           <div v-if="deliveryPrice" class="flex justify-between text-coral-dark">
            <span >Livraison :</span>
            <span>{{ deliveryPrice }} {{ currency }}</span>
          </div>
          
          <div class="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>{{ orderTotal.toFixed(2) }} {{ currency }}</span>
          </div>
          <div v-if="promoDiscount > 0" class="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
            <span>Total avec promo</span>
            <span
              class="text-base font-semibold text-gray-900 cart-summary-total-amount"
            >
                <span
                  class="line-through font-medium text-gray-500 mx-2 cart-summary-total-original"
                >
                  {{ orderTotal.toFixed(2) }}
                </span>
                <span class="cart-summary-total-discounted">
                  {{
                    (orderTotal - promoDiscount).toFixed(2)
                  }}
                  {{
                    companyData.currency
                  }}
              </span>
          </span>
        </div>
        </div>
      </div>
      

      <!-- Submit Button -->
      <div class="flex flex-row items-center justify-center gap-4">
        <QuantitySelector />
        <button
          :disabled="isSubmitting"
          type="submit"
          class="shake-animation text-center py-3 w-full btn-primary-solid"
        >
          <span class="font-medium">{{ extra?.btn_text || 'اشتري الان' }}</span>
        </button>
      </div>

      <button
        v-if="extra?.add_to_cart"
        type="button"
        class="w-full py-3 cursor-pointer font-medium transition-colors flex items-center justify-center btn-primary-outline"
        @click="handleAddToCart"
      >
        <ShoppingCart class="h-5 w-5 mr-2 " />
        <span>Ajouter au panier</span>
      </button>
    </form>
    <Modal
      :isOpen="showModal"
      :title="modalTitle"
      @close="showModal = false"
      class="cart-modal"
    >
      <div class="flex flex-col items-center gap-6 py-3 cart-modal-content">
        <CircleAlertIcon
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
</template>

<script setup>
import { reactive, computed, ref, watchEffect, onMounted } from 'vue';
import { useProductQuantity } from '@/composables/useProductQuantity.js';
import QuantitySelector from './QuantitySelector.vue';
import { addToCart, getCartFromStorage, updateCart } from '~/composables/services/cartService';
import { useNuxtApp } from '#app';
import { useFetch } from '#imports';
import axios from 'axios';
import CountrySelector from '@/components/CountrySelector.vue';
import CountryPhoneSelector from '@/components/CountryPhoneSelector.vue';
import { useCompanyData } from '@/composables/useCompanyData';
import { useRouter } from 'vue-router';
import { CircleAlertIcon, Loader2, ShoppingCart, TicketCheck, XIcon } from 'lucide-vue-next';
import { getPriceOfProduct } from '~/composables/services/helpers';
import { createAbandonnedOrder } from '~/composables/services/orderService';
const { websiteInfo } = useWebsiteInfo();

const Governorates = ref([
  "Tunis", "Sfax", "Sousse", "Ettadhamen", "Kairouan", "Gabès", "Bizerte", "Ariana",
  "Gafsa", "El Mourouj", "Ben Arous", "Monastir", "Houmt Souk", "Tataouine", "La Goulette",
  "Kasserine", "Medenine", "Mahdia", "Kebili", "Beja", "Jendouba", "Zarzis", "Nabeul", 
  "Siliana", "Le Kef", "Tozeur", "Manouba", "Menzel Bourguiba", "Douz", "Djerba Midoun"
])


const { country, countryCode, states, error, isLoading : isLoadingStates, fetchCountryAndStates } = useUserCountry()

watch(() => isLoadingStates.value, (newVal)=> {
  if (!newVal && states.value.length > 0) {
    Governorates.value = states.value;
    console.log('%csrc\pages\product\components\states.vue:616 object', 'color: #007acc;', states.value);
  }
});
const { product, extra } = defineProps({
  product: {
    type: Object,
    required: true,
  },
  extra: {
    type: Object,
    default: null,
  },
});

const { quantity } = useProductQuantity();
const { companyData, companyId } = useCompanyData();
const { selectedVariant, isSelectedByUser } = useSelectedVariant();
const { getMultipleVariants } = useSelectedMultipleVariants();
const router = useRouter();
const config = useRuntimeConfig();
const baseURL = config.public.baseURL;

const isSubmitting = ref(false);
const formData = ref({});
const facebookNameTags = {
  name : "name",
  gouv : "city",
  code : "code_postal",
  city : "ville",
  address : "street_address",
  phone : "phone",
  email : "email",
  country: "country"
};
const errors = ref({});
const hasAttemptedSubmit = ref(false);

//begin coupon functions 
const isCouponApplied = ref(false);
const couponCode = ref("");
const promoDiscount = ref(0); 
const isApplyingCoupon = ref(false);
const showModal = ref(false);
const modalTitle = ref("Code Promo Non Reconnu");

const removeCouponCode = () => {
  couponCode.value = "";
  promoDiscount.value = 0;
  isCouponApplied.value = false;

  const cart = getCartFromStorage();
  cart.promoCode = "";
  cart.promoCodeDiscount = 0;
  cart.discount = 0;

  updateCart(cart, false);
};

const applyCouponCode = async () => {
  if (!couponCode.value.trim()) return;

  isApplyingCoupon.value = true;
  const filteredProduct = selectedVariant.value && product.declinaison && product.declinaison != 0 ? selectedVariant.value : product 
  try {
    const cart = getCartFromStorage();
    const unit_price = getPriceOfProduct(filteredProduct, quantity.value);
    
    const currentProductDetail = {
        _product: filteredProduct,
        quantity: quantity.value,
        product_name: filteredProduct.name,
        product_id: filteredProduct.id,
        taxe_rate : filteredProduct.taxe_rate,
        category_id: filteredProduct.category,
        product_parent_id: filteredProduct.parent ? filteredProduct.parent : filteredProduct.id,
        active_stock: filteredProduct.active_stock,
        product_ref: filteredProduct.reference,
        price_ttc: filteredProduct.price,
        price_ttc_after_discount: unit_price,
        is_custom: filteredProduct.is_custom,
        final_price: unit_price * quantity.value,
        discount: filteredProduct.price - unit_price,
        product_attrs: filteredProduct._attributs?.map(x => x.name).join(' ') || '',
        product_thumb: filteredProduct.photo_thumb,
    };

    const config = useRuntimeConfig();
    const baseURL = config.public.baseURL;
    const response = await axios.post(`${baseURL}website/get-auto-discount`, {
      details: [...cart._details, currentProductDetail],
      code: couponCode.value,
      slug: companyData.value.slug,
      delivery_price: cart.transport_price,
    });

    const newDiscount = parseFloat(response.data.toFixed(2));

    if (newDiscount > 0) {
      isCouponApplied.value = true;
      promoDiscount.value = newDiscount;

      cart.promoCode = couponCode.value;
      cart.promoCodeDiscount = newDiscount;
      cart.discount = newDiscount;
    } else {
      isCouponApplied.value = false;
      promoDiscount.value = 0;

      cart.promoCode = "";
      cart.promoCodeDiscount = 0;
      cart.discount = 0;

      showModal.value = true;
    }

    setTimeout(() => {
      updateCart(cart, false);
    }, 100);
  } catch (error) {
    console.error("Error applying coupon:", error);

    isCouponApplied.value = false;
    promoDiscount.value = 0;

    showModal.value = true;

    const cart = getCartFromStorage();
    cart.promoCode = "";
    cart.promoCodeDiscount = 0;
    cart.discount = 0;

    updateCart(cart, false);

    setTimeout(() => {
      applyAutoDiscount(companyData.value.slug);
    }, 200);
  } finally {
    isApplyingCoupon.value = false;
  }
};
const clearCouponCode = (event) => {
  event.preventDefault();
  event.stopPropagation();
  couponCode.value = "";
};

//end coupon functions



// Fetch checkout settings from API
const { data: checkoutSettings, isLoading } = useFetch(
  () => `${baseURL}website/informations-read?slug=${companyData.value?.slug}`,
  { key: 'quick-checkout-settings', fresh: false }
);

// Process checkout form fields
const checkoutFields = computed(() => {
  if (!checkoutSettings.value?.store_settings?.formCheckout) {
    return {
      contactInformation: [],
      shippingAddress: [],
    };
  }

  // Filter for display:true fields
  const activeFields = checkoutSettings.value.store_settings.formCheckout.filter(
    (field) => field.display
  );

  // Define explicit ordering arrays
  const contactFields = ['name', 'email', 'phone', 'phone_extra'];
  const shippingFields = ['address', 'city', 'zip', 'gouv', 'code'];

  // Create custom sort function
  const createSorter = (orderArray) => {
    return (a, b) => {
      const indexA = orderArray.indexOf(a.slug);
      const indexB = orderArray.indexOf(b.slug);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    };
  };

  return {
    contactInformation: activeFields
      .filter((field) => contactFields.includes(field.slug))
      .sort(createSorter(contactFields)),
    shippingAddress: activeFields
      .filter((field) => shippingFields.includes(field.slug))
      .sort(createSorter(shippingFields)),
  };
});

// Initialize form data with field defaults
watchEffect(() => {
  if (
    checkoutFields.value.contactInformation.length ||
    checkoutFields.value.shippingAddress.length
  ) {
    const allFields = [
      ...checkoutFields.value.contactInformation,
      ...checkoutFields.value.shippingAddress,
    ];
    allFields.forEach((field) => {
      if (formData.value[field.slug] === undefined) {
        formData.value[field.slug] = '';
      }
    });
  }
});

// Validation helpers
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
  const re = /^\+\d{1,4}[-\s.]?(\d[-\s.]?){4,}$/;
  return re.test(phone);
};

const validateField = (fieldSlug, value, field) => {
  if (!field) return true;
  let isValid = true;

  if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    if (hasAttemptedSubmit.value) {
      errors.value[fieldSlug] = `${field.field} est requis`;
    }
    isValid = false;
  } else if (!field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    delete errors.value[fieldSlug];
    return true;
  } else if (value && (typeof value !== 'string' || value.trim() !== '')) {
    if (field.max_length && typeof value === 'string' && value.length > field.max_length && fieldSlug !== 'phone' && fieldSlug !== 'phone_extra') {
      if (hasAttemptedSubmit.value) {
        errors.value[fieldSlug] = `${field.field} ne doit pas dépasser ${field.max_length} caractères`;
      }
      isValid = false;
    } else if ((fieldSlug === 'phone' || fieldSlug === 'phone_extra') && value) {
      if (typeof value === 'string') {
        const phoneCodeMatch = value.match(/^\+\d{1,4}/);
        const countryCode = phoneCodeMatch ? phoneCodeMatch[0] : '';
        const phoneWithoutCode = value.substring(countryCode.length);
        if (field.max_length && phoneWithoutCode.length > field.max_length) {
          if (hasAttemptedSubmit.value) {
            errors.value[fieldSlug] = `${field.field} ne doit pas dépasser ${field.max_length} caractères (sans le code pays)`;
          }
          isValid = false;
        } else if (!validatePhone(value)) {
          if (hasAttemptedSubmit.value) {
            errors.value[fieldSlug] = 'Numéro de téléphone invalide';
          }
          isValid = false;
        }
      }
    } else if (fieldSlug === 'email' && typeof value === 'string' && !validateEmail(value)) {
      if (hasAttemptedSubmit.value) {
        errors.value[fieldSlug] = 'Email invalide';
      }
      isValid = false;
    }
  }

  if (isValid && hasAttemptedSubmit.value) {
    delete errors.value[fieldSlug];
  }

  return isValid;
};

// Real-time validation
watchEffect(() => {
  const allFields = [
    ...checkoutFields.value.contactInformation,
    ...checkoutFields.value.shippingAddress,
  ];
  allFields.forEach((field) => {
    if (formData.value[field.slug] !== undefined) {
      validateField(field.slug, formData.value[field.slug], field);
    }
  });
});

// Computed properties for order summary
const deliveryPrice = ref(0);
const currency = computed(() => extra?.currency || 'TND');
const totalBeforeTax = computed(() => getPriceOfProduct(product, quantity.value, true));
const orderTotal = computed(() => totalBeforeTax.value + deliveryPrice.value);

const { $router } = useNuxtApp();

// Validate form before submission
const validateForm = () => {
  hasAttemptedSubmit.value = true;
  errors.value = {};
  let isValid = true;

  const allFields = [
    ...checkoutFields.value.contactInformation,
    ...checkoutFields.value.shippingAddress,
  ];

  allFields.forEach((field) => {
    if (!validateField(field.slug, formData.value[field.slug], field)) {
      isValid = false;
    }
  });

  if (!isValid) {
    const firstErrorField = Object.keys(errors.value)[0];
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  return isValid;
};

const isOrderConfirmed = ref(false)

const handleAddToCart = () => {

  if (quantity.value > 1) {
    if (product.declinaison == true && product.declinaisons.length > 0) {
     
        eventBus.emit("show-selectMultipleVariantsModal", "addToCart")
      return
    }

    if (product.declinaison == false || (product.declinaisons?.length ?? 0) <= 0 ) {
      addToCart(product, quantity.value);
      return
    }
  }
  if (quantity.value  == 1 ) {

    if (isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0 ) {
      addToCart(selectedVariant.value);
      return
    }

    if (!isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0 ) {
      eventBus.emit("show-selectMultipleVariantsModal", "addToCart")
      return
    }
    if (product.declinaison == false || (product.declinaisons?.length ?? 0) <= 0 ) {
      addToCart(product);
      return
    }
   
  }
}

const handleAchatRapide = async () => {
  // console.log('handleAchatRapide called');
  
  if (!validateForm()) {
    // console.log('Form validation failed', errors.value);
    return;
  }
  // console.log('Form validated successfully', quantity.value);

  // if (product.declinaison && product.declinaisons.length > 0 && quantity.value > 1 && isOrderConfirmed.value == false) {
  //   // console.log('Product has declinaisons, emitting show-selectMultipleVariantsModal');
  //   eventBus.emit('show-selectMultipleVariantsModal', 'quickCheckout');
  //   return;
  // }


  if (quantity.value > 1) {
   
    // console.log('Quantity > 1 branch');
    if (product.declinaison && product.declinaisons.length > 0) {
      if (isOrderConfirmed.value == false) {
        // console.log('Product has declinaisons, emitting show-selectMultipleVariantsModal');
        eventBus.emit('show-selectMultipleVariantsModal', 'quickCheckout');
        return;
      }
      // console.log('Product has declinaisons for multiple quantity');
      const multipleVariants = getMultipleVariants(quantity.value);
      // console.log('multipleVariants:', multipleVariants);
      if (multipleVariants && multipleVariants.length > 0 && !multipleVariants.includes(null)) {
        // console.log('multipleVariants for fast order:');
          // multipleVariants.forEach((variant) => {
          //   // console.log('Adding variant to cart:', variant);
          //   addToCart(variant, 1, null, null, false);
          // });
        // console.log('Creating fast order with variants');
        await createFastOrder();
      } else {
        // console.log('Not all variants selected, emitting show-selectMultipleVariantsModal');
        eventBus.emit('show-selectMultipleVariantsModal', 'quickCheckout');
      }
      return;
    }

    if (!product.declinaison || (product.declinaisons?.length ?? 0) <= 0) {
      // console.log('No declinaison, adding product to cart');
      addToCart(product, quantity.value, null, null, false);
      // console.log('Creating fast order with product');
      await createFastOrder();
      return;
    }
  }

  if (quantity.value === 1) {
    // console.log('Quantity === 1 branch');
    if (isSelectedByUser.value && product.declinaison && product.declinaisons.length > 0) {
      // console.log('User selected a variant:', selectedVariant.value);
      addToCart(selectedVariant.value, 1, null, null, false);
      // console.log('Creating fast order with selected variant');
      await createFastOrder();
      return;
    }

    if (!isSelectedByUser.value && product.declinaison && product.declinaisons.length > 0) {
      // console.log('No variant selected by user, emitting show-selectMultipleVariantsModal');
      eventBus.emit('show-selectMultipleVariantsModal', 'quickCheckout');
      return;
    }

    if (!product.declinaison || (product.declinaisons?.length ?? 0) <= 0) {
      // console.log('No declinaison, adding product to cart');
      addToCart(product, 1, null, null, false);
      // console.log('Creating fast order with product');
      await createFastOrder();
      return;
    }
  }
};

const { trackInitiateCheckout} = useTracking();



const createFastOrder = async () => {

  if (isSubmitting.value) return;
  if (!process.client) {
    return
  }
  isSubmitting.value = true;

  
  const cart = getCartFromStorage();
  const orderSummary = () => {
  if (!cart) {
    return {
      subtotal: 0,
      shipping: 0,
      discount: 0,
      transport_price: 0,
      total: 0,
    };
  }

  return {
    subtotal: parseFloat(cart.subtotal || 0),
    shipping: parseFloat(cart.transport_price || 0),
    discount: parseFloat(cart.discount || 0),
    transport_price: parseFloat(cart.transport_price || 0),
    total: parseFloat(cart.total || 0),
  };
};

  try {
    const abandonedCart = localStorage.getItem('abandonned_cart') ;
    
    // Prepare request data in the expected format
    const requestData = {
      abandonned_cart: abandonedCart,
      order: {
        // Individual form fields
        email: formData.value.email || "",
        name: formData.value.name || "",
        contact: formData.value.contact || "",
        gouvernorat: formData.value.gouv || "",
        delegation: formData.value.delegation || "",
        address: formData.value.address || "",
        code_postal: formData.value.zip || "",
        phone: formData.value.phone || "",
        phone_extra: formData.value.phone_extra || "",
        country: formData.value.country?.name || "",
        comment: formData.value.comment || "",
        payement_type: 'CASH',
        transport_id: cart?.transport_id || null,
        total_amount: orderSummary.total || 0,
        _details: cart?._details?.map(item => {
          const { _product, ...itemWithoutProduct } = item;
          return itemWithoutProduct;
        }) || []
      },
      promo_code: cart ? (cart.promoCode === "autopromo" ? "" : cart.promoCode || "") : "",
      company: companyData.value.id,
      create_account: formData.value.create_account || false,
      source: "SITE V2",
      meta_data: JSON.parse(localStorage.getItem('visit_source'))
    };

    const headerConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const response = await axios.request({
      url: baseURL + 'create-fast-order/',
      method: 'POST',
      headers: headerConfig,
      data: requestData,
    });

    if (response.status === 200) {
      trackInitiateCheckout()
      localStorage.removeItem('cart');
      if (requestData.order.payement_type === 'ONLINE' && response.data.payment?.payUrl && checkoutSettings.value?.store_settings?.online_payment) {
        window.location.href = response.data.payment.payUrl;
      } else {
        if (process.client) {
          localStorage.removeItem('abandonned_cart');
        }
        if (response.data.upsell_id && response.data.upsell_id !== '') {
          await $router.push(`/upsell/${response.data.upsell_id}/${response.data.order_ref}`);
        } else {
          await $router.push(`/checkout-confirmation/${response.data.order_ref}`);
        }
      }
    } else {
      throw new Error('Order creation failed');
    }
  } catch (error) {
    console.error('Order creation error:', error);
    alert('Il y a une erreur lors de la création de la commande. Veuillez réessayer.');
  } finally {
    isSubmitting.value = false;
  }
};



// const createAbandonnedOrder = async () => {

//   const cart = getCartFromStorage();
//   const orderSummary = () => {
//   if (!cart) {
//     return {
//       subtotal: 0,
//       shipping: 0,
//       discount: 0,
//       transport_price: 0,
//       total: 0,
//     };
//   }

//   return {
//     subtotal: parseFloat(cart.subtotal || 0),
//     shipping: parseFloat(cart.transport_price || 0),
//     discount: parseFloat(cart.discount || 0),
//     transport_price: parseFloat(cart.transport_price || 0),
//     total: parseFloat(cart.total || 0),
//   };
// };

//   try {
//     const details = cart?._details?.map(item => {
//       const { _product, ...itemWithoutProduct } = item;
//       return itemWithoutProduct;
//     }) || []

//     const finalProduct = product.declinaison == true && product.declinaisons.length > 0 ? selectedVariant.value : product;
//     const unit_price = getPriceOfProduct(product, quantity.value);
//     const productDetail = {
//       _product: finalProduct,
//       quantity: quantity.value,
//       product_name: finalProduct.name,
//       product_id: finalProduct.id,
//       product_parent_id: finalProduct.parent || finalProduct.id,
//       category_id: finalProduct.category,
//       product_ref: finalProduct.reference,
//       active_stock: finalProduct.active_stock,
//       price_ttc: finalProduct.price,
//       price_ttc_after_discount: unit_price,
//       final_price: unit_price * quantity.value,
//       discount: finalProduct.price - unit_price,
//       product_attrs: finalProduct._attributs?.map(x => x.name).join(' ') || '',
//       product_thumb: finalProduct.photo_thumb,
//     };
//     const requestData = {
//       abandonned_cart: true ,
//       order: {
//         email: formData.value.email || "",
//         name: formData.value.name || "",
//         contact: formData.value.contact || "",
//         gouvernorat: formData.value.gouv || "",
//         delegation: formData.value.delegation || "",
//         address: formData.value.address || "",
//         code_postal: formData.value.zip || "",
//         phone: formData.value.phone || "",
//         phone_extra: formData.value.phone_extra || "",
//         country: formData.value.country?.name || "",
//         comment: formData.value.comment || "",
//         payement_type: 'CASH',
//         transport_id: cart?.transport_id || null,
//         total_amount: orderSummary.total || 0,
//         _details: [ productDetail ,...details] 
//       },
//       promo_code: cart ? (cart.promoCode === "autopromo" ? "" : cart.promoCode || "") : "",
//       company: companyData.value.id,
//       create_account: formData.value.create_account || false
//     };

//     const headerConfig = {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     };

//     const response = await axios.request({
//       url: baseURL + 'create-fast-order/',
//       method: 'POST',
//       headers: headerConfig,
//       data: requestData,
//     });

//   if (response.status === 200 && response.data.order_ref) {
//     localStorage.setItem('abandonned_cart', response.data.order_ref)
//   } else {
//       throw new Error('Order creation failed');
//     }
//   } catch (error) {
//     console.error('Erreur createOrderAbandoned:', error)
//   } finally {
//   }
// };


onMounted(() => {
  const cart = getCartFromStorage();
  if (cart) {
    deliveryPrice.value = getCartFromStorage()?.transport_price
  }

  eventBus.on('handleQuickCheckoutEvent', (data) => {
    isOrderConfirmed.value = data || false;
    handleAchatRapide()
    isOrderConfirmed.value = false
  });
  eventBus.on('createOrderAbandonned_quickCheckout', async () => {
    await createAbandonnedOrder(product, formData.value);
    // console.log('createOrderAbandonned_quickCheckout event received');
  });
});
</script>


<style scoped>
.shake-animation {
  animation: shake 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}

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
</style>