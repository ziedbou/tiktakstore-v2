<template>
  <div class="mt-6 p-4 border border-gray-200 rounded-lg">
    <h3 class="font-semibold text-lg mb-4">Achat rapide</h3>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center">
      <div
        class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"
      ></div>
      <p class="mt-4 text-gray-600">Chargement des paramètres...</p>
    </div>

    <!-- Form content -->
    <form v-else @submit.prevent="handleAchatRapide" class="space-y-5">
      <!-- Contact Information Section -->
      <section v-if="checkoutFields.contactInformation.length" aria-labelledby="contact-info-heading">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="field in checkoutFields.contactInformation" :key="field.slug" class="sm:col-span-1">
            <label :for="field.slug" class="block text-sm font-medium text-gray-700">
              {{ field.field }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="mt-2">
              <input
                v-if="field.slug === 'email'"
                type="email"
                :id="field.slug"
                :name="field.slug"
                v-model="formData[field.slug]"
                :required="field.required"
                :maxlength="field.max_length"
                :placeholder="field.max_length ? `${field.field} (max ${field.max_length} caractères)` : field.field"
                :class="[
                  'block w-full rounded-md px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
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
              />
              <input
                v-else
                type="text"
                :id="field.slug"
                :name="field.slug"
                v-model="formData[field.slug]"
                :required="field.required"
                :maxlength="field.max_length"
                :placeholder="field.max_length ? `${field.field} (max ${field.max_length} caractères)` : field.field"
                :class="[
                  'block w-full rounded-md px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
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
            <label :for="field.slug" class="block text-sm font-medium text-gray-700">
              {{ field.field }}
              <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <div class="mt-2">
              <!-- Governorate Dropdown -->
              <select
                v-if="field.slug === 'gouv'"
                :id="field.slug"
                :name="field.slug"
                v-model="formData[field.slug]"
                :required="field.required"
                :class="[
                  'block w-full rounded-md px-3 py-4 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
                  errors[field.slug] ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50' : 'bg-white outline-gray-300',
                ]"
              >
                <option value="" disabled selected>Choisir un gouvernorat</option>
                <option v-for="governorate in tunisianGovernorates" :key="governorate" :value="governorate">
                  {{ governorate }}
                </option>
              </select>
              
              <!-- Country Selector -->
              <CountrySelector
                v-else-if="field.slug === 'country'"
                v-model="formData[field.slug]"
                :placeholder="field.field"
                :error="!!errors[field.slug]"
                :errorRingClass="errors[field.slug] ? 'ring-2 ring-red-500/50' : ''"
              />
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
                :name="field.slug"
                v-model="formData[field.slug]"
                :required="field.required"
                :maxlength="field.max_length"
                :placeholder="field.max_length ? `${field.field} (max ${field.max_length} caractères)` : field.field"
                :class="[
                  'block w-full rounded-md px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
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
                  'block w-full rounded-md px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
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

      <!-- Order Summary -->
      <div class="mt-4 bg-white p-4 rounded-lg border border-gray-200">
        <h4 class="font-medium text-base mb-3">Résumé de la commande</h4>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">{{ product.name }} (x{{ quantity }})</span>
            <span>{{ (product.price * quantity).toFixed(2) }} {{ currency }}</span>
          </div>
          <div v-if="product.discount > 0" class="flex justify-between text-coral-dark">
            <span>Réduction</span>
            <span>-{{ (product.discount * quantity).toFixed(2) }} {{ currency }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Sous-total</span>
            <span>{{ totalBeforeTax.toFixed(2) }} {{ currency }}</span>
          </div>
          <div class="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>{{ orderTotal.toFixed(2) }} {{ currency }}</span>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex flex-row items-center justify-center gap-4">
        <QuantitySelector />
        <button
          :disabled="isSubmitting"
          type="submit"
          class="bg-indigo-600 text-center text-white px-6 py-3 rounded-lg w-full"
        >
          <span v-if="isSubmitting" class="flex flex-1 justify-center items-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </span>
          <span v-else>{{ extra?.btn_text || 'Passer la commande' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watchEffect, onMounted } from 'vue';
import { useProductQuantity } from '@/composables/useProductQuantity.js';
import QuantitySelector from './QuantitySelector.vue';
import { addToCart } from '~/composables/services/cartService';
import { useNuxtApp } from '#app';
import { useFetch } from '#imports';
import axios from 'axios';
import CountrySelector from '@/components/CountrySelector.vue';
import CountryPhoneSelector from '@/components/CountryPhoneSelector.vue';
import { useCompanyData } from '@/composables/useCompanyData';
import { useRouter } from 'vue-router';

// Define Tunisian Governorates
const tunisianGovernorates = [
  'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan',
  'Kasserine', 'Kébili', 'Le Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul',
  'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
];

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
const transport_id = ref('');
const abandonedCart = ref(false);
const formData = ref({});
const errors = ref({});
const hasAttemptedSubmit = ref(false);

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
  const shippingFields = ['address', 'city', 'zip', 'country', 'gouv', 'code'];

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
const currency = computed(() => extra?.currency || 'TND');
const totalBeforeTax = computed(() => (product.price - (product.discount || 0)) * quantity.value);
const taxAmount = computed(() => totalBeforeTax.value * 0.2);
const orderTotal = computed(() => totalBeforeTax.value + taxAmount.value);

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
const { trackAddToCart } = useTracking()

const handleAchatRapide = async () => {
  console.log('handleAchatRapide called');
  // console.log('formData:', JSON.parse(JSON.stringify(formData.value)));
  // console.log('quantity:', quantity.value);
  // console.log('product:', product);

  if (!validateForm()) {
    // console.log('Form validation failed', errors.value);
    return;
  }
  // console.log('Form validated successfully');

  if (product.declinaison && product.declinaisons.length > 0 && isOrderConfirmed.value == false) {
    // console.log('Product has declinaisons, emitting show-selectMultipleVariantsModal');
    eventBus.emit('show-selectMultipleVariantsModal', 'quickCheckout');
    return;
  }

  function getProductIdAndQuantity(products) {
    const idCount = products.reduce((acc, product) => {
      acc[product.id] = (acc[product.id] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(idCount).map(([id, quantity]) => ({
      product_id: parseInt(id),
      quantity,
    }));
  }

  if (quantity.value > 1) {
    // console.log('Quantity > 1 branch');
    if (product.declinaison && product.declinaisons.length > 0) {
      // console.log('Product has declinaisons for multiple quantity');
      const multipleVariants = getMultipleVariants(quantity.value);
      // console.log('multipleVariants:', multipleVariants);
      if (multipleVariants && multipleVariants.length > 0 && !multipleVariants.includes(null)) {
        const products = getProductIdAndQuantity(multipleVariants);
        // console.log('products for fast order:', products);
        trackAddToCart(product)
        multipleVariants.forEach((variant) => {
          // console.log('Adding variant to cart:', variant);
          addToCart(variant, 1, null, null, false);
        });
        // console.log('Creating fast order with variants');
        await createFastOrder(formData.value, products);
      } else {
        // console.log('Not all variants selected, emitting show-selectMultipleVariantsModal');
        eventBus.emit('show-selectMultipleVariantsModal', 'quickCheckout');
      }
      return;
    }

    if (!product.declinaison || (product.declinaisons?.length ?? 0) <= 0) {
      // console.log('No declinaison, adding product to cart');
      trackAddToCart(product)
      addToCart(product, quantity.value, null, null, false);
      // console.log('Creating fast order with product');
      await createFastOrder(formData.value, [{ product_id: product.id, quantity: quantity.value }]);
      return;
    }
  }

  if (quantity.value === 1) {
    // console.log('Quantity === 1 branch');
    if (isSelectedByUser.value && product.declinaison && product.declinaisons.length > 0) {
      // console.log('User selected a variant:', selectedVariant.value);
      trackAddToCart(product)
      addToCart(selectedVariant.value, 1, null, null, false);
      // console.log('Creating fast order with selected variant');
      await createFastOrder(formData.value, [{ product_id: selectedVariant.value.id, quantity: quantity.value }]);
      return;
    }

    if (!isSelectedByUser.value && product.declinaison && product.declinaisons.length > 0) {
      // console.log('No variant selected by user, emitting show-selectMultipleVariantsModal');
      eventBus.emit('show-selectMultipleVariantsModal', 'quickCheckout');
      return;
    }

    if (!product.declinaison || (product.declinaisons?.length ?? 0) <= 0) {
      // console.log('No declinaison, adding product to cart');
      trackAddToCart(product)
      addToCart(product, 1, null, null, false);
      // console.log('Creating fast order with product');
      await createFastOrder(formData.value, [{ product_id: product.id, quantity: quantity.value }]);
      return;
    }
  }
};


const createFastOrder = async (formData, products) => {
  if (process.client) {
    transport_id.value = localStorage.getItem('transport_id') || '';
    abandonedCart.value = !!localStorage.getItem('abandonned_cart');
  }

  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    const requestData = {
      is_abandoned_cart: abandonedCart.value,
      order: {
        email: formData.email || '',
        name: formData.name || '',
        contact: formData.contact || '',
        gouvernorat: formData.gouv || '',
        delegation: formData.delegation || '',
        address: formData.address || '',
        code_postal: formData.zip || '',
        phone: formData.phone || '',
        phone_extra: formData.phone_extra || '',
        country: formData.country?.name || 'TN',
        comment: formData.comment || '',
        payement_type: 'CASH',
        transport_id: transport_id.value,
        total_amount: orderTotal.value,
        _details: products,
      },
      promo_code: '',
      company: companyId.value,
      create_account:false,
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


onMounted(() => {
  eventBus.on('handleQuickCheckoutEvent', (data) => {
    isOrderConfirmed.value = data || false;
    handleAchatRapide()
    isOrderConfirmed.value = false
  });
});
</script>