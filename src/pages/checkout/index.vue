<template>
  <div class="bg-white pb-20 lg:pb-0 container-medium">
    <!-- Background color split screen for large screens -->
    <div
      class="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block"
      aria-hidden="true"
    />
    <div
      class="fixed top-0 right-0 hidden h-full w-1/2 bg-gray-50 lg:block"
      aria-hidden="true"
    />

    <div
      class="relative mx-auto md:grid grid-cols-1 gap-x-16 lg:grid-cols-2 xl:gap-x-48"
    >
      <h1 class="sr-only">Order information</h1>

      <form
        class="pt-4 pb-8 lg:col-start-1 lg:row-start-1 lg:pb-16"
      >
        <img
          :src="`https://cdn.cloudtiktak.com${companyData.logo}`"
          alt="logo"
          class="max-h-25 max-w-25 h-full w-auto mb-4 mx-auto object-contain"
        />
        
        <!-- Breadcrumb navigation -->
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <Breadcrumb :items="breadcrumbItems" />
        </div>

        <!-- Loading state -->
        <div
          v-if="storeInfoLoading"
          class="mx-auto max-w-2xl lg:max-w-none mt-10 flex flex-col items-center justify-center"
        >
          <div
            class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--btn-primary-outline-border-color)] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          ></div>
          <p class="mt-4 text-gray-600">Chargement des paramètres...</p>
        </div>

        <!-- Form content -->
        <div v-else class="mx-auto max-w-2xl lg:max-w-none">
          <!-- information section -->
          <section
            v-if="checkoutFields.contactInformation.length"
            aria-labelledby="contact-info-heading"
          >
            <h2
              id="contact-info-heading"
              class="text-lg font-medium text-gray-900"
            >
              Informations
            </h2>

            <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6">
              <div
                v-for="field in checkoutFields.contactInformation"
                :key="field.slug"
                class="sm:col-span-1"
              >
                <label
                  :for="field.slug"
                  class="block text-sm/6 font-medium text-gray-700"
                >
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
                    :placeholder="
                      field.max_length
                        ? `${field.field} (max ${field.max_length} caractères)`
                        : field.field
                    "
                    :class="[
                      'block w-full rounded-md px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                      errors[field.slug]
                        ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50'
                        : 'bg-white outline-gray-300',
                    ]"
                  />
                  <CountryPhoneSelector
                    v-else-if="
                      field.slug === 'phone' || field.slug === 'phone_extra'
                    "
                    v-model="formData[field.slug]"
                    :inputId="field.slug"
                    :inputPlaceholder="field.field"
                    :required="field.required"
                    :maxLength="field.max_length"
                    :error="!!errors[field.slug]"
                    :errorMessage="errors[field.slug]"
                    :errorRingClass="
                      errors[field.slug] ? 'ring-2 ring-red-500/50' : ''
                    "
                    :isQuickCheckout="false"
                  />
                  <input
                    v-else
                    type="text"
                    :id="field.slug"
                    :name="facebookNameTags[field.slug] ?? field.slug"
                    v-model="formData[field.slug]"
                    :required="field.required"
                    :maxlength="field.max_length"
                    :placeholder="
                      field.max_length
                        ? `${field.field} (max ${field.max_length} caractères)`
                        : field.field
                    "
                    :class="[
                      'block w-full rounded-md px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                      errors[field.slug]
                        ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50'
                        : 'bg-white outline-gray-300',
                    ]"
                  />
                  <p
                    v-if="
                      errors[field.slug] &&
                      !(field.slug === 'phone' || field.slug === 'phone_extra')
                    "
                    class="mt-1 text-sm text-red-600"
                  >
                    {{ errors[field.slug] }}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Shipping address section -->
          <section
            v-if="checkoutFields.shippingAddress.length"
            aria-labelledby="shipping-heading"
            class="mt-10"
          >
            <h2 id="shipping-heading" class="text-lg font-medium text-gray-900">
              Adresse de livraison
            </h2>

            <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div
                v-for="field in checkoutFields.shippingAddress"
                :key="field.slug"
                :class="
                  field.slug === 'address' ? 'sm:col-span-2' : 'sm:col-span-1'
                "
              >
                <label
                  :for="field.slug"
                  class="block text-sm/6 font-medium text-gray-700"
                >
                  {{ field.field }}
                  <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <div class="mt-2">
                  <CountrySelector
                    v-if="field.slug === 'country'"
                    v-model="formData[field.slug]"
                    :placeholder="field.field"
                    :error="!!errors[field.slug]"
                    :errorMessage="errors[field.slug]"
                    :errorRingClass="
                      errors[field.slug] ? 'ring-2 ring-red-500/50' : ''
                    "
                  />
                  <CountrySelector
                    v-else-if="field.slug === 'country_dropdown'"
                    v-model="formData[field.slug]"
                    :placeholder="field.field"
                    :error="!!errors[field.slug]"
                    :errorMessage="errors[field.slug]"
                    :errorRingClass="
                      errors[field.slug] ? 'ring-2 ring-red-500/50' : ''
                    "
                  />
                  <GouvSelector
                    v-else-if="field.slug === 'gouv'"
                    v-model="formData[field.slug]"
                    :placeholder="field.field"
                    :error="!!errors[field.slug]"
                    :errorMessage="errors[field.slug]"
                    :errorRingClass="
                      errors[field.slug] ? 'ring-2 ring-red-500/50' : ''
                    "
                  />
                  <CountryPhoneSelector
                    v-else-if="
                      field.slug === 'phone' || field.slug === 'phone_extra'
                    "
                    v-model="formData[field.slug]"
                    :inputId="field.slug"
                    :inputPlaceholder="field.field"
                    :required="field.required"
                    :error="!!errors[field.slug]"
                    :errorMessage="errors[field.slug]"
                  />
                  <input
                    v-else-if="field.slug !== 'comment'"
                    type="text"
                    :id="field.slug"
                    :name="facebookNameTags[field.slug] ?? field.slug"
                    v-model="formData[field.slug]"
                    :required="field.required"
                    :maxlength="field.max_length"
                    :placeholder="
                      field.max_length
                        ? `${field.field} (max ${field.max_length} caractères)`
                        : field.field
                    "
                    :class="[
                      'block w-full rounded-md px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                      errors[field.slug]
                        ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50'
                        : 'bg-white outline-gray-300',
                    ]"
                  />
                  <textarea
                    v-else
                    :id="field.slug"
                    :name="facebookNameTags[field.slug] ?? field.slug"
                    v-model="formData[field.slug]"
                    :required="field.required"
                    rows="3"
                    :class="[
                      'block w-full rounded-md px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                      errors[field.slug]
                        ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50'
                        : 'bg-white outline-gray-300',
                    ]"
                  ></textarea>
                  <p
                    v-if="
                      errors[field.slug] &&
                      !(field.slug === 'phone' || field.slug === 'phone_extra' || field.slug === 'gouv' || field.slug === 'country')
                    "
                    class="mt-1 text-sm text-red-600"
                  >
                    {{ errors[field.slug] }}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <!-- Additional information section -->
          <section
            v-if="checkoutFields.additionalInformation.length"
            aria-labelledby="additional-info-heading"
            class="mt-10"
          >
            <h2
              id="additional-info-heading"
              class="text-lg font-medium text-gray-900"
            >
              Informations supplémentaires
            </h2>

            <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div
                v-for="field in checkoutFields.additionalInformation"
                :key="field.slug"
                class="sm:col-span-2"
              >
                <label
                  v-if="field.slug !== 'create_account'"
                  :for="field.slug"
                  class="block text-sm/6 font-medium text-gray-700"
                >
                  {{ field.field }}
                  <span v-if="field.required" class="text-red-500">*</span>
                </label>
                <div class="mt-2">
                  <textarea
                    v-if="field.slug === 'comment'"
                    :id="field.slug"
                    :name="field.slug"
                    v-model="formData[field.slug]"
                    :required="field.required"
                    :maxlength="field.max_length"
                    :placeholder="
                      field.max_length
                        ? `${field.field} (max ${field.max_length} caractères)`
                        : field.field
                    "
                    rows="3"
                    :class="[
                      'block w-full rounded-md px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6',
                      errors[field.slug]
                        ? 'border-red-500 outline-red-500 ring-2 ring-red-500/50'
                        : 'bg-white outline-gray-300',
                    ]"
                  ></textarea>
                  <div
                    v-else-if="field.slug === 'create_account'"
                    class="flex items-center"
                  >
                    <input
                      type="checkbox"
                      :id="field.slug"
                      v-model="formData[field.slug]"
                      class="h-4 w-4 text-[var(--btn-primary-outline-color)] focus:ring-[var(--btn-primary-outline-border-color)] border-gray-300 rounded"
                    />
                    <label
                      :for="field.slug"
                      class="ml-2 block text-sm text-gray-900"
                    >
                      Créer un compte avec ces informations
                    </label>
                  </div>
                  <p
                    v-if="errors[field.slug]"
                    class="mt-1 text-sm text-red-600"
                  >
                    {{ errors[field.slug] }}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </form>

      <section
        aria-labelledby="summary-heading"
        class="bg-gray-50 pt-16 pb-10 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:pb-16"
      >
        <ClientOnly>
          <div class="mx-auto max-w-2xl lg:max-w-none">
            <h2 id="summary-heading" class="text-lg font-medium text-gray-900 mb-4">
              Votre commande
            </h2>
            <!-- Add coupon display in order summary section before subtotal -->
            <ul
              role="list"
              class="divide-y divide-gray-200 text-sm font-medium text-gray-900"
            >
              <li
                v-for="item in cart?._details || []"
                :key="item._product.id"
                class="flex items-start space-x-4 py-4"
              >
                <NuxtLink :to="getProductLink(item._product)" class="flex-none relative">
                  <img
                    :src="imghttps(item._product.photo_thumb)"
                    :alt="item._product.name"
                    class="w-16 h-16 rounded-md object-cover hover:opacity-75 transition-opacity duration-200"
                  />
                  <span class="absolute -top-2.5 -right-2.5 flex items-center justify-center h-5 px-[6.5px] w-auto rounded-full bg-[var(--header-badge-bg)] text-[var(--header-badge-color)] text-xs">
                      {{ item.quantity }}
                  </span>
                </NuxtLink>
                <div class="flex-auto space-y-1">
                  <NuxtLink :to="getProductLink(item._product)" class="transition-colors duration-200">
                    <h3>{{ item._product.name }}</h3>
                  </NuxtLink>
                  <p class="text-gray-500">{{ item.product_attrs || "" }}</p>
                </div>
                <p class="flex-none text-base font-medium ml-auto">
                  {{ getPrice(item._product) + " " + companyData.currency }}
                </p>
              </li>
            </ul>

            <dl
              class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900"
            >
              <div class="flex items-center justify-between">
                <dt class="text-gray-600">Sous-total</dt>
                <dd>
                  {{ orderSummary.subtotal.toFixed(2) }}
                  {{ companyData.currency }}
                </dd>
              </div>

              <div
                v-if="orderSummary.discount > 0"
                class="flex items-center justify-between"
              >
                <dt class="text-gray-600 flex items-center">
                  <span>Réduction</span>
                  <!-- Add badge for manual coupon -->
                  <span
                    v-if="isCouponApplied"
                    class="ml-2 inline-flex items-center pr-2.5 rounded-full text-xs text-green-700 border-2 border-green-200 bg-green-50 font-semibold"
                  >
                    <span
                      class="flex items-center justify-center bg-green-200 rounded-full h-6 w-6 mr-1.5"
                    >
                      <TicketCheck
                        class="size-4 text-green-700"
                        aria-hidden="true"
                      />
                    </span>
                    {{ couponCode }}
                  </span>
                  <!-- Add badge for auto promo -->
                  <span
                    v-if="hasAutoPromo"
                    class="ml-2 inline-flex items-center pr-2.5 rounded-full text-xs text-amber-700 border-2 border-amber-200 bg-amber-50 font-semibold"
                  >
                    <span
                      class="flex items-center justify-center bg-amber-200 rounded-full h-6 w-6 mr-1.5"
                    >
                      <TicketCheck
                        class="size-4 text-amber-700"
                        aria-hidden="true"
                      />
                    </span>
                    Promo Auto
                  </span>
                </dt>
                <dd>
                  {{ orderSummary.discount.toFixed(2) }}
                  {{ companyData.currency }}
                </dd>
              </div>

              <div class="flex items-center justify-between">
                <dt class="text-gray-600">Frais de livraison</dt>
                <dd>
                  {{ orderSummary.shipping.toFixed(2) }}
                  {{ companyData.currency }}
                </dd>
              </div>

              <div
                class="flex items-center justify-between border-t border-gray-200 pt-6"
              >
                <dt class="text-base font-semibold text-gray-900">
                  Total de la commande
                </dt>
                <dd class="text-base font-semibold text-gray-900">
                  <template v-if="orderSummary.discount > 0">
                    <span class="line-through font-medium text-gray-500 mx-2">
                      {{
                        (
                          orderSummary.subtotal + orderSummary.transport_price
                        ).toFixed(2)
                      }}
                    </span>
                    <span>
                      {{orderSummary.total.toFixed(2)}}
                      {{companyData.currency}}
                    </span>
                  </template>
                  <template v-else>
                    <span>
                      {{orderSummary.total.toFixed(2)}}
                      {{companyData.currency}}
                    </span>
                  </template>
                </dd>
              </div>

              <!-- Add this after the shipping address section and before additional information section -->
                <div class="border-t border-gray-200 pt-6">
                  <fieldset>
                    <legend class="text-lg font-medium text-gray-900">
                      Méthode de paiement
                    </legend>
                    <RadioGroup
                      v-model="selectedDeliveryMethod"
                      class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                    >
                      <RadioGroupOption
                        as="template"
                        v-for="method in deliveryMethods"
                        :key="method.id"
                        :value="method"
                        :disabled="!method.enabled"
                        v-slot="{ active, checked, disabled }"
                      >
                        <div 
                          :class="[
                            checked ? 'btn-primary-outline shadow-md' : 'border-gray-300 bg-white hover:border-gray-400',
                            active && !disabled ? 'ring-2 ring-[var(--btn-primary-outline-border-color)] ring-opacity-20' : '',
                            disabled
                              ? 'opacity-60 cursor-not-allowed bg-gray-50'
                              : 'cursor-pointer transition-all duration-200',
                            paymentMethodError && !checked ? 'border-red-500 ring-2 ring-red-500/50' : '',
                            'relative flex rounded-lg border-2 p-4 shadow-xs focus:outline-hidden',
                          ]"
                        >
                          <span class="flex flex-1">
                            <span class="flex flex-col">
                              <span
                                :class="[
                                  'block text-sm font-medium transition-colors duration-200',
                                  checked ? 'text-[var(--btn-primary-outline-color)]' : 'text-gray-900'
                                ]"
                                >{{ method.title }}</span
                              >
                              <span
                                :class="[
                                  'mt-1 flex items-center text-sm transition-colors duration-200',
                                  checked ? 'text-[var(--btn-primary-outline-color)]' : 'text-gray-500'
                                ]"
                                >{{ method.turnaround }}</span>
                            </span>
                          </span>
                          <CheckCircleIcon
                            v-if="checked"
                            class="absolute top-4 right-4 h-5 w-5 text-[var(--btn-primary-outline-color)]"
                            aria-hidden="true"
                          />
                          <div
                            v-else
                            class="absolute top-4 right-4 h-5 w-5 border-2 border-gray-300 rounded-full bg-white"
                            aria-hidden="true"
                          />
                          <span
                            :class="[
                              active && !disabled ? 'border' : 'border-2',
                              checked
                                ? 'border-[var(--btn-primary-outline-border-color)]'
                                : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-lg',
                            ]"
                            aria-hidden="true"
                          />
                        </div>
                      </RadioGroupOption>
                    </RadioGroup>
                    <p
                      v-if="paymentMethodError"
                      class="mt-2 text-sm text-red-600"
                    >
                      {{ paymentMethodError }}
                    </p>
                  </fieldset>
                </div>
             

              <div
                class="fixed lg:relative bottom-0 left-0 right-0 lg:bottom-auto lg:left-auto lg:right-auto z-50 lg:z-auto bg-white lg:bg-transparent p-4 lg:p-0 shadow-md lg:shadow-none border-t border-gray-200 lg:border-t-0 mt-0 lg:mt-6"
              >
                <button
                  type="button"
                  @click="validateForm"
                  :disabled="isSubmitting"
                  :class="[
                    'shake-animation btn-primary-solid flex justify-center w-full px-3 sm:px-4 py-3 text-base font-medium shadow-xs',
                    isSubmitting && '!bg-gray-400 !border-gray-400 !cursor-not-allowed' 
                   
                  ]"
                >
                  <div v-if="isSubmitting" class="flex items-center">
                    <div class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></div>
                    Traitement en cours...
                  </div>
                  <div v-else class="flex items-center">
                    Confirmer la commande -
                    <span class="ml-1"
                      >{{ companyData.currency }}
                      {{ orderSummary.total.toFixed(2) }}</span
                    >
                  </div>
                </button>
              </div>
            </dl>
          </div>
        </ClientOnly>
      </section>
    </div>
  </div>
</template>

<script setup>
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { ref, onMounted, computed, watchEffect, watch } from "vue";
import { getCartFromStorage } from "@/composables/services/cartService";
import { useCompanyData } from "@/composables/useCompanyData";
import { useStoreInfo } from "@/composables/useStoreInfo";
import {
  imghttps,
  getPrice,
  getProductLink,
} from "~/composables/services/helpers";
import Breadcrumb from "@/components/Breadcrumb.vue";
import CountrySelector from "@/components/CountrySelector.vue";
import CountryPhoneSelector from "@/components/CountryPhoneSelector.vue";
import GouvSelector from "@/components/GouvSelector.vue";
import { ClientOnly } from "#components";
import { useRouter } from "vue-router";
import { TicketCheck } from "lucide-vue-next";
import axios from "axios";
import {handleClearCart} from "@/composables/services/cartService"
import { createAbandonnedOrder } from "~/composables/services/orderService";

const { companyData } = useCompanyData();
const cart = ref(null);
const router = useRouter();
const { storeInfo, isLoading: storeInfoLoading } = useStoreInfo();

// Breadcrumb items
const breadcrumbItems = [
  { label: "Accueil", url: "/" },
  { label: "Panier", url: "/cart" },
  { label: "Checkout", url: "/checkout" },
];

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
// Form data and validation
const formData = ref({});
const errors = ref({});
const hasAttemptedSubmit = ref(false); // Track if user has attempted to submit
const isSubmitting = ref(false); // Track if order is being submitted
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
// Store info is now fetched via useStoreInfo hook in middleware

// console.log("storeInfo.value", storeInfo.value?.store_settings)
// Payment methods state
const selectedDeliveryMethod = ref(null);
const paymentMethodError = ref("");

// Define delivery methods based on maintain_settings
const deliveryMethods = computed(() => {
  // Ensure storeInfo exists before accessing it
  if (!storeInfo.value?.store_settings) return [];

  const methods = [];

  // Cash on delivery option
  if (storeInfo.value.store_settings.cash_on_delivery) {
    methods.push({
      id: "cash",
      title: "Paiement à la livraison",
      turnaround:
        "Votre commande sera expédiée bientôt et vous pourrez payer lorsque vous la recevrez.",
      enabled: true,
    });
  } else {
    methods.push({
      id: "cash",
      title: "Paiement à la livraison",
      turnaround: "Indisponible pour le moment",
      enabled: false,
    });
  }
  // Online payment option
  if (storeInfo.value.store_settings.online_payment) {
    methods.push({
      id: "online",
      title: "Paiement en ligne",
      turnaround:
        "Effectuez un paiement en ligne en temps réel avec votre carte bancaire.",
      price: "Gratuit",
      enabled: true,
    });
  } else {
    methods.push({
      id: "online",
      title: "Paiement en ligne",
      turnaround: "Indisponible pour le moment",
      price: "Gratuit",
      enabled: false,
    });
  }

  return methods;
});

// Set default selected delivery method when storeInfo is loaded
watchEffect(() => {
  if (deliveryMethods.value.length > 0 && storeInfo.value?.store_settings) {
    const enabledMethods = deliveryMethods.value.filter(method => method.enabled);
    
    // Get the default payment type from API
    const defaultPaymentType = storeInfo.value.store_settings.default_payement_type;
    
    // Find the method that matches the default payment type
    let defaultMethod = null;
    if (defaultPaymentType === "CASH") {
      defaultMethod = enabledMethods.find(method => method.id === "cash");
    } else if (defaultPaymentType === "ONLINE") {
      defaultMethod = enabledMethods.find(method => method.id === "online");
    }
    
    // Set the default method if found and enabled, otherwise use the first enabled method
    if (defaultMethod && defaultMethod.enabled) {
      selectedDeliveryMethod.value = defaultMethod;
    } else if (enabledMethods.length === 1) {
      // Only auto-select if there's exactly one enabled method
      selectedDeliveryMethod.value = enabledMethods[0];
    } else if (enabledMethods.length > 1) {
      // Multiple methods available but no valid default - let user choose
      selectedDeliveryMethod.value = null;
    }
  }
});

// Process checkout form fields
const checkoutFields = computed(() => {
  if (!storeInfo.value?.store_settings?.formCheckout) {
    return {
      contactInformation: [],
      shippingAddress: [],
      additionalInformation: [],
    };
  }

  // Filter for display:true fields
  const activeFields = storeInfo.value.store_settings.formCheckout.filter(
    (field) => field.display
  );

  // Define explicit ordering arrays
  const contactFields = ["name", "email", "phone", "phone_extra"];
  const shippingFields = ["address", "city", "zip", "country", "gouv", "code"];
  const additionalFields = ["create_account", "comment"];

  // Create custom sort function to sort according to array order
  const createSorter = (orderArray) => {
    return (a, b) => {
      const indexA = orderArray.indexOf(a.slug);
      const indexB = orderArray.indexOf(b.slug);

      // If both elements are in the array, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If only a is in the array, place it before b
      if (indexA !== -1) return -1;

      // If only b is in the array, place it before a
      if (indexB !== -1) return 1;

      // If neither is in the array, maintain original order
      return 0;
    };
  };

  // Apply explicit ordering
  return {
    // Contact information fields - sort based on our explicit order
    contactInformation: activeFields
      .filter((field) => contactFields.includes(field.slug))
      .sort(createSorter(contactFields)),

    // Shipping address fields - sort based on our explicit order
    shippingAddress: activeFields
      .filter((field) => shippingFields.includes(field.slug))
      .sort(createSorter(shippingFields)),

    // Additional information fields - sort based on our explicit order
    additionalInformation: activeFields
      .filter((field) => additionalFields.includes(field.slug))
      .sort(createSorter(additionalFields)),
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
      if (field.slug === 'country' || field.slug === 'country_dropdown') {
        if (!formData.value[field.slug]) {
          formData.value[field.slug] = null;
        }
      } else {
        if (!formData.value[field.slug]) {
          formData.value[field.slug] = "";
        }
      }
    });
  }
});

// Load cart data from localStorage
onMounted(() => {
   eventBus.on('createOrderAbandonned_checkout', async () => {
    await createAbandonnedOrder(null, formData.value); 

  });
  // Client-side only code
  cart.value = getCartFromStorage();

  // Check for promo codes
  if (cart.value) {
    // Check for manual promo code
    if (cart.value.promoCode && cart.value.promoCode !== "autopromo") {
      isCouponApplied.value = true;
      couponCode.value = cart.value.promoCode;
      discount.value = cart.value.promoCodeDiscount || 0;
    }
    // Check for auto promo
    else if (cart.value.promoCode === "autopromo") {
      hasAutoPromo.value = true;
      autoDiscount.value = cart.value.promoCodeDiscount || 0;
    }
  }
});

// Only keep the orderSummary computed property
const orderSummary = computed(() => {
  if (!cart.value) {
    return {
      subtotal: 0,
      shipping: 0,
      discount: 0,
      transport_price: 0,
      total: 0,
    };
  }

  return {
    subtotal: parseFloat(cart.value.subtotal || 0),
    shipping: parseFloat(cart.value.transport_price || 0),
    discount: parseFloat(cart.value.discount || 0),
    transport_price: parseFloat(cart.value.transport_price || 0),
    total: parseFloat(cart.value.total || 0),
  };
});

// Helper function to validate email
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Helper function to validate phone numbers
const validatePhone = (phone) => {
  // Simple validation for international phone number with country code
  // Allow digits, spaces, and some special characters like + () -
  const re = /^\+\d{1,4}[-\s.]?(\d[-\s.]?){4,}$/;
  return re.test(phone);
};

// Function to validate individual field
const validateField = (fieldSlug, value, field) => {
  // If field doesn't exist, skip validation
  if (!field) return true;
  
  let isValid = true;
  
  // Check required fields
  if (field.required) {
    let isEmpty = false;
    if (!value) {
      isEmpty = true;
    } else if (typeof value === 'string' && value.trim() === "") {
      isEmpty = true;
    } else if (typeof value === 'object' && (!value.name || value.name.trim() === "")) {
      isEmpty = true;
    }
    
    if (isEmpty) {
      if (hasAttemptedSubmit.value) {
        errors.value[fieldSlug] = `${field.field} est requis`;
      }
      isValid = false;
    }
  }
  // If field is not required and empty, it's valid
  else if (!field.required) {
    let isEmpty = false;
    if (!value) {
      isEmpty = true;
    } else if (typeof value === 'string' && value.trim() === "") {
      isEmpty = true;
    } else if (typeof value === 'object' && (!value.name || value.name.trim() === "")) {
      isEmpty = true;
    }
    
    if (isEmpty) {
      delete errors.value[fieldSlug];
      return true;
    }
  }
  // Field has content, validate it
  else if (value && (typeof value !== 'string' || value.trim() !== "")) {
    // Check max length for non-phone fields
    if (field.max_length && typeof value === 'string' && value.length > field.max_length && fieldSlug !== "phone" && fieldSlug !== "phone_extra") {
      if (hasAttemptedSubmit.value) {
        errors.value[fieldSlug] = `${field.field} ne doit pas dépasser ${field.max_length} caractères`;
      }
      isValid = false;
    }
    // Special handling for phone fields
    else if ((fieldSlug === "phone" || fieldSlug === "phone_extra") && value) {
      if (typeof value === 'string') {
        const phoneCodeMatch = value.match(/^\+\d{1,4}/);
        const countryCode = phoneCodeMatch ? phoneCodeMatch[0] : "";
        const phoneWithoutCode = value.substring(countryCode.length);
        
        if (field.max_length && phoneWithoutCode.length > field.max_length) {
          if (hasAttemptedSubmit.value) {
            errors.value[fieldSlug] = `${field.field} ne doit pas dépasser ${field.max_length} caractères (sans le code pays)`;
          }
          isValid = false;
        } else if (!validatePhone(value)) {
          if (hasAttemptedSubmit.value) {
            errors.value[fieldSlug] = "Numéro de téléphone invalide";
          }
          isValid = false;
        }
      }
    }
    // Email validation
    else if (fieldSlug === "email" && typeof value === 'string' && !validateEmail(value)) {
      if (hasAttemptedSubmit.value) {
        errors.value[fieldSlug] = "Email invalide";
      }
      isValid = false;
    }
  }
  
  // Clear the error if field is now valid and user has attempted submit
  if (isValid && hasAttemptedSubmit.value) {
    delete errors.value[fieldSlug];
  }
  
  return isValid;
};

// Watch form data changes for real-time validation
watchEffect(() => {
  // Get all fields from all sections
  const allFields = [
    ...checkoutFields.value.contactInformation,
    ...checkoutFields.value.shippingAddress,
    ...checkoutFields.value.additionalInformation,
  ];
  
  // Validate each field when its value changes
  allFields.forEach((field) => {
    if (formData.value[field.slug] !== undefined) {
      validateField(field.slug, formData.value[field.slug], field);
    }
  });
});

// Watch payment method selection to clear payment error
watch(selectedDeliveryMethod, (newValue) => {
  if (newValue) {
    paymentMethodError.value = "";
  }
});

// Coupon state
const isCouponApplied = ref(false);
const couponCode = ref("");
const discount = ref(0);
const hasAutoPromo = ref(false);
const autoDiscount = ref(0);

// Form validation function
const validateForm = async () => {
  // Set flag to indicate user has attempted submit
  hasAttemptedSubmit.value = true;
  
  // Reset errors
  errors.value = {};
  paymentMethodError.value = "";
  let isValid = true;

  // Validate contact information
  if (checkoutFields.value.contactInformation) {
    checkoutFields.value.contactInformation.forEach((field) => {
      // Check required fields
      if (field.required) {
        let isEmpty = false;
        const value = formData.value[field.slug];
        
        if (!value) {
          isEmpty = true;
        } else if (typeof value === 'string' && value.trim() === "") {
          isEmpty = true;
        } else if (typeof value === 'object' && (!value.name || value.name.trim() === "")) {
          isEmpty = true;
        }
        
        if (isEmpty) {
          errors.value[field.slug] = `${field.field} est requis`;
          isValid = false;
        }
      }

      // Check max length if field has content and max_length is set
      if (
        formData.value[field.slug] &&
        field.max_length &&
        typeof formData.value[field.slug] === 'string' &&
        formData.value[field.slug].length > field.max_length &&
        field.slug !== "phone" &&
        field.slug !== "phone_extra"
      ) {
        errors.value[
          field.slug
        ] = `${field.field} ne doit pas dépasser ${field.max_length} caractères`;
        isValid = false;
      }

      // Special handling for phone fields max length - need to account for country code
      if (
        (field.slug === "phone" || field.slug === "phone_extra") &&
        formData.value[field.slug] &&
        typeof formData.value[field.slug] === 'string'
      ) {
        // Extract phone number without country code for length check
        const phoneCodeMatch = formData.value[field.slug].match(/^\+\d{1,4}/);
        const countryCode = phoneCodeMatch ? phoneCodeMatch[0] : "";
        const phoneWithoutCode = formData.value[field.slug].substring(
          countryCode.length
        );

        // Only check max length on the part without country code if max_length is set
        if (field.max_length && phoneWithoutCode.length > field.max_length) {
          errors.value[
            field.slug
          ] = `${field.field} ne doit pas dépasser ${field.max_length} caractères (sans le code pays)`;
          isValid = false;
        }

        // Phone format validation
        if (!validatePhone(formData.value[field.slug])) {
          errors.value[field.slug] = "Numéro de téléphone invalide";
          isValid = false;
        }
      }

      // Email validation
      if (
        field.slug === "email" &&
        formData.value[field.slug] &&
        typeof formData.value[field.slug] === 'string' &&
        !validateEmail(formData.value[field.slug])
      ) {
        errors.value[field.slug] = "Email invalide";
        isValid = false;
      }
    });
  }

  // Validate shipping address
  if (checkoutFields.value.shippingAddress) {
    checkoutFields.value.shippingAddress.forEach((field) => {
      // Check required fields
      if (field.required) {
        let isEmpty = false;
        const value = formData.value[field.slug];
        
        if (!value) {
          isEmpty = true;
        } else if (typeof value === 'string' && value.trim() === "") {
          isEmpty = true;
        } else if (typeof value === 'object' && (!value.name || value.name.trim() === "")) {
          isEmpty = true;
        }
        
        if (isEmpty) {
          errors.value[field.slug] = `${field.field} est requis`;
          isValid = false;
        }
      }

      // Check max length if field has content and max_length is set
      if (
        formData.value[field.slug] &&
        field.max_length &&
        typeof formData.value[field.slug] === 'string' &&
        formData.value[field.slug].length > field.max_length &&
        field.slug !== "phone" &&
        field.slug !== "phone_extra"
      ) {
        errors.value[
          field.slug
        ] = `${field.field} ne doit pas dépasser ${field.max_length} caractères`;
        isValid = false;
      }

      // Special handling for phone fields max length - need to account for country code
      if (
        (field.slug === "phone" || field.slug === "phone_extra") &&
        formData.value[field.slug] &&
        typeof formData.value[field.slug] === 'string'
      ) {
        // Extract phone number without country code for length check
        const phoneCodeMatch = formData.value[field.slug].match(/^\+\d{1,4}/);
        const countryCode = phoneCodeMatch ? phoneCodeMatch[0] : "";
        const phoneWithoutCode = formData.value[field.slug].substring(
          countryCode.length
        );

        // Only check max length on the part without country code if max_length is set
        if (field.max_length && phoneWithoutCode.length > field.max_length) {
          errors.value[
            field.slug
          ] = `${field.field} ne doit pas dépasser ${field.max_length} caractères (sans le code pays)`;
          isValid = false;
        }

        // Phone format validation
        if (!validatePhone(formData.value[field.slug])) {
          errors.value[field.slug] = "Numéro de téléphone invalide";
          isValid = false;
        }
      }
    });
  }

  // Add validation for additional information section
  if (checkoutFields.value.additionalInformation) {
    checkoutFields.value.additionalInformation.forEach((field) => {
      // Check required fields
      if (field.required) {
        let isEmpty = false;
        const value = formData.value[field.slug];
        
        if (!value) {
          isEmpty = true;
        } else if (typeof value === 'string' && value.trim() === "") {
          isEmpty = true;
        } else if (typeof value === 'object' && (!value.name || value.name.trim() === "")) {
          isEmpty = true;
        }
        
        if (isEmpty) {
          errors.value[field.slug] = `${field.field} est requis`;
          isValid = false;
        }
      }

      // Check max length if field has content and max_length is set
      if (
        formData.value[field.slug] &&
        field.max_length &&
        typeof formData.value[field.slug] === 'string' &&
        formData.value[field.slug].length > field.max_length
      ) {
        errors.value[
          field.slug
        ] = `${field.field} ne doit pas dépasser ${field.max_length} caractères`;
        isValid = false;
      }
    });
  }

  // If payment method is not selected
  if (!selectedDeliveryMethod.value) {
    paymentMethodError.value = "Veuillez sélectionner un mode de paiement";
    isValid = false;
  }

  // If valid, proceed to payment or confirmation
  if (isValid) {
    // Create and submit the order
    await createOrder();
  } else {
    // Scroll to the first error
    const firstErrorField = Object.keys(errors.value)[0];
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        //element.focus();
      }
    }
  }
};

// Function to create order
const createOrder = async () => {
  if (isSubmitting.value) return; // Prevent double submission
  
  isSubmitting.value = true;
  
  try {
    // Get abandoned cart ID if exists
    const abandonedCart = process.client ? localStorage.getItem('abandonned_cart') : null;
    
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
        country: formData.value.country?.name || formData.value.country || "",
        comment: formData.value.comment || "",
        payement_type: selectedDeliveryMethod.value?.id?.toUpperCase() || 'CASH',
        transport_id: cart.value?.transport_id || null,
        total_amount: orderSummary.value.total || 0,
        _details: cart.value?._details?.map(item => {
          const { _product, ...itemWithoutProduct } = item;
          return itemWithoutProduct;
        }) || []
      },
      promo_code: cart.value ? (cart.value.promoCode === "autopromo" ? "" : cart.value.promoCode || "") : "",
      company: companyData.value.id,
      create_account: formData.value.create_account || false,
      source: "SITE V2",
      meta_data: JSON.parse(localStorage.getItem('visit_source'))
    };

    // Create headers
    const headerConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };


    // Send order creation request
    const response = await axios.request({
      url: baseURL + "create-fast-order/",
      method: "POST",
      headers: headerConfig,
      data: requestData
    });

    if (response.status === 200) {
      // Check if it's online payment and needs redirection
      if (requestData.order.payement_type === 'ONLINE' && response.data.payment?.payUrl && storeInfo.value?.store_settings?.online_payment) {
        window.location.href = response.data.payment.payUrl;
      } else {
        // Clear cart for cash payment
        if (process.client) {
          // console.log("PROCESS CLIENT");
          handleClearCart();
          localStorage.removeItem('abandonned_cart');
        }
        
        // Redirect based on upsell or confirmation
        if (response.data.upsell_id && response.data.upsell_id !== "") {
          await router.push(`/upsell/${response.data.upsell_id}/${response.data.order_ref}`);
        } else {
          await router.push(`/checkout-confirmation/${response.data.order_ref}`);
        }
      }
    } else {
      throw new Error('Order creation failed');
    }
  } catch (error) {
    console.error("Order creation error:", error);
    alert("Il y a une erreur lors de la création de la commande. Veuillez réessayer.");
  } finally {
    isSubmitting.value = false;
  }
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
