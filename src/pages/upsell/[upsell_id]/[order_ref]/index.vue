<template>
  <div class="container-medium py-8">
    <div
      class="w-full max-w-7xl mx-auto px-0 sm:px-4 lg:px-8"
      :key="`upsell-${upsellId}-${orderRef}-${isHydrated}`"
    >
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
        >
          <svg
            class="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Commande Confirmée ! 🎉
        </h1>
        <div v-if="customerInfo && !isOrderLoading && isHydrated">
          <p class="text-gray-600 mb-2">
            Merci
            <span class="font-semibold text-gray-900">{{
              customerInfo.name
            }}</span>
            pour votre achat !
          </p>
          <p class="text-gray-600 mb-8">
            Complétez votre commande avec cet ajout parfait
          </p>
        </div>
        <p v-else class="text-gray-600 mb-8">
          Merci pour votre achat. Complétez votre commande avec cet ajout
          parfait
        </p>
      </div>

      <!-- Main Content: Recommended Product on Top + Recent Purchases on Bottom -->
      <div class="space-y-8 mb-8">
        <!-- Recommended Product (Top) -->
        <div class="w-full" v-if="isHydrated">
          <!-- Error State for Product -->
          <div
            v-if="hasProductError || hasUpsellError"
            class="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <div class="text-red-500 text-lg mb-2">
              Impossible de charger les détails du produit
            </div>
            <p class="text-gray-500 text-sm">Veuillez réessayer plus tard.</p>
          </div>

          <!-- Product Loading Skeleton -->
          <div
            v-else-if="isProductLoading || isUpsellLoading || !upsellProduct"
            class="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div class="animate-pulse">
              <!-- Mobile header skeleton -->
              <div class="lg:hidden bg-gray-200 h-32"></div>

              <div class="flex flex-col lg:flex-row">
                <!-- Image skeleton -->
                <div
                  class="relative w-full lg:w-1/2 h-64 lg:max-h-96 bg-gray-200"
                ></div>

                <!-- Content skeleton -->
                <div class="p-6 lg:p-8 flex-1 space-y-4">
                  <div class="flex items-center gap-2">
                    <div class="flex space-x-1">
                      <div
                        v-for="i in 5"
                        :key="i"
                        class="w-4 h-4 bg-gray-200 rounded"
                      ></div>
                    </div>
                    <div class="h-4 bg-gray-200 rounded w-24"></div>
                  </div>

                  <div class="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="flex items-center gap-2"
                    >
                      <div class="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <div class="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>

                  <div class="bg-gray-100 rounded-2xl p-4 space-y-2">
                    <div class="flex justify-between">
                      <div class="h-6 bg-gray-200 rounded w-32"></div>
                      <div class="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div class="flex gap-4">
                      <div class="h-5 bg-gray-200 rounded w-28"></div>
                      <div class="h-5 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>

                  <div class="bg-gray-100 rounded-2xl p-5 space-y-2">
                    <div class="h-5 bg-gray-200 rounded w-48"></div>
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded w-4/5"></div>
                  </div>

                  <div class="pt-6 space-y-3">
                    <div class="h-14 bg-gray-200 rounded-2xl"></div>
                    <div class="h-10 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Loaded Product -->
          <div
            v-else-if="upsellProduct"
            ref="productCardRef"
            class="rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100/50 backdrop-blur-sm"
          >
            <div class="flex flex-col lg:flex-row h-full lg:min-h-[500px]">
              <!-- Product Images Section -->
              <div
                class="relative w-full lg:w-1/2 p-3 lg:sticky lg:top-0 lg:self-start lg:max-h-[calc(100vh-2rem)] rounded-l-3xl lg:rounded-l-3xl lg:rounded-r-none overflow-hidden"
              >
                <!-- Upsell Title Banner - Mobile (au-dessus du swiper) -->
                <div
                  v-if="upsellConfig?.name && isHydrated"
                  class="lg:hidden mb-4"
                >
                  <div
                    class="relative rounded-2xl bg-blue-50 border-2 border-blue-200 p-4"
                  >
                    <!-- Content -->
                    <div class="text-center">
                      <!-- Badge -->
                      <div
                        class="inline-flex items-center gap-2 bg-blue-100 border-2 border-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-2"
                      >
                        <div
                          class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                        ></div>
                        Offre Exclusive
                      </div>

                      <!-- Title -->
                      <h2 class="text-gray-900 text-lg font-bold mb-1">
                        {{ upsellConfig.name }}
                      </h2>

                      <!-- Subtitle -->
                      <p class="text-gray-600 text-xs">
                        Ajout parfait à votre commande
                      </p>
                    </div>
                  </div>
                </div>

                <!-- 1. MAIN SWIPER - TOP -->
                <NuxtImg
                  :src="imghttps(upsellProduct.photo)"
                  :alt="upsellProduct.name"
                  class="object-cover bg-transparent mx-auto w-auto min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidde"
                />
              </div>

              <!-- Product Info -->
              <div
                class="p-6 lg:p-8 flex-1 lg:w-1/2 flex flex-col bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 rounded-r-3xl lg:rounded-r-3xl lg:rounded-l-none overflow-hidden"
              >
                <!-- Upsell Title Banner - Desktop (au-dessus du titre) -->
                <div v-if="upsellConfig?.name" class="hidden lg:block mb-6">
                  <div
                    class="relative bg-blue-50 rounded-2xl border-2 border-blue-200 p-4"
                  >
                    <!-- Content -->
                    <div class="text-center">
                      <!-- Badge -->
                      <div
                        class="inline-flex items-center gap-2 bg-blue-100 border-2 border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-3"
                      >
                        <div
                          class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                        ></div>
                        Offre Exclusive
                      </div>

                      <!-- Title -->
                      <h2 class="text-gray-900 text-xl font-bold mb-2">
                        {{ upsellConfig.name }}
                      </h2>

                      <!-- Subtitle -->
                      <p class="text-gray-600 text-sm">
                        Ajout parfait à votre commande
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Product Title with Emojis -->
                <h3
                  class="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight"
                >
                  {{ upsellProduct.name }}
                </h3>
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <span
                      v-if="upsellProduct.discount > 0"
                      class="text-lg text-gray-400 line-through"
                      >{{ upsellProduct.price?.toFixed(2) || "0.00" }}
                    </span>
                    <span class="text-xl font-black text-gray-900"
                      >{{
                        upsellProduct.discountedPrice?.toFixed(2) || "0.00"
                      }}
                      {{ currency }}</span
                    >
                  </div>
                  <div
                    v-if="upsellProduct.discount > 0"
                    class="bg-green-500 text-white px-3 pt-1.5 pb-1 rounded-full text-xs font-medium flex  gap-1.5"
                  >
                    Économisez
                    <span class="font-bold">{{
                      (
                        (upsellProduct.price || 0) -
                        (upsellProduct.discountedPrice || 0)
                      ).toFixed(2)
                    }}</span>
                    {{ currency }} 🎉
                  </div>
                </div>
                <!-- Enhanced Description with Icons 
                <p
                  class="text-gray-700 leading-relaxed font-medium mb-6"
                  v-html="cleanDescription"
                ></p>-->
                <div
                  class="border-blue-200 mt-4 overflow-hidden relative"
                >
                  <div class="relative z-10">
                    <p class="text-gray-700 text-sm leading-relaxed">
                      Nous vous offrons ce
                      <span class="font-bold text-gray-900">{{
                        (upsellProduct.name || "").toLowerCase()
                      }}</span>
                      à un
                      <span class="font-bold text-blue-700"
                        >prix réduit de
                        {{
                          upsellProduct.discountedPrice?.toFixed(2) || "0.00"
                        }}
                        {{ currency }}</span
                      >
                      (normalement
                      <span class="font-bold text-gray-900">{{
                        upsellProduct.price?.toFixed(2) || "0.00"
                      }}</span>
                      {{ currency }}).

                      {{ "Complétez votre configuration!" }}
                    </p>
                  </div>
                </div>

                <!-- Action Buttons - Exciting Mobile Design -->
                <div class="border-t border-blue-100 pt-6 mt-auto">
                  <div class="flex flex-col gap-4">
                    <!-- Primary CTA with Gradient & Animation -->
                    <button
                      @click="addToCart(upsellProduct.id)"
                      :style="{
                        backgroundColor:
                          upsellConfig?.confirm_button?.color || '#3B82F6',
                        color:
                          upsellConfig?.confirm_button?.text_color || '#FFFFFF',
                      }"
                      class="shake-animation relative w-full hover:opacity-90 font-bold py-5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-2xl hover:shadow-3xl active:scale-95 touch-manipulation overflow-hidden group"
                    >
                      <!-- Animated background shine -->
                      <div
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      ></div>

                      <!-- Button content -->
                      <div class="relative z-10 flex items-center gap-3">
                        <div
                          class="bg-white/20 rounded-full p-1 backdrop-blur-sm"
                        >
                          <Check class="w-5 h-5" />
                        </div>
                        <span class="font-black tracking-wide text-lg">
                          {{
                            upsellConfig?.confirm_button?.text ||
                            "Oui je Confirme!"
                          }}
                        </span>
                      </div>

                      <!-- Pulse effect -->
                      <div
                        class="absolute inset-0 rounded-2xl bg-white/10 animate-pulse"
                      ></div>
                    </button>

                    <!-- Secondary CTA with Subtle Design -->
                    <button
                      @click="declineOffers"
                      :style="{
                        backgroundColor:
                          upsellConfig?.cancel_button?.color || '#F3F4F6',
                        color:
                          upsellConfig?.cancel_button?.text_color || '#6B7280',
                      }"
                      class="relative w-full hover:opacity-80 font-medium py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 text-base touch-manipulation backdrop-blur-sm"
                    >
                      <X class="w-5 h-5" />
                      <span>{{
                        upsellConfig?.cancel_button?.text ||
                        "Peut-être plus tard"
                      }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hydration Loading Fallback -->
        <div v-else class="w-full">
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div class="animate-pulse">
              <!-- Mobile header skeleton -->
              <div class="lg:hidden bg-gray-200 h-32"></div>

              <div class="flex flex-col lg:flex-row">
                <!-- Image skeleton -->
                <div
                  class="relative w-full lg:w-1/2 h-64 lg:h-96 bg-gray-200"
                ></div>

                <!-- Content skeleton -->
                <div class="p-6 lg:p-8 flex-1 space-y-4">
                  <div class="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>

                  <div class="bg-gray-100 rounded-2xl p-4 space-y-2">
                    <div class="flex justify-between">
                      <div class="h-6 bg-gray-200 rounded w-32"></div>
                      <div class="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>

                  <div class="pt-6 space-y-3">
                    <div class="h-14 bg-gray-200 rounded-2xl"></div>
                    <div class="h-10 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Purchases List (Bottom) -->
      <div class="w-full">
        <div class="bg-white rounded-3xl shadow-xl p-8 text-center">
          <!-- Loading State -->
          <div v-if="isOrderLoading" class="animate-pulse">
            <div class="h-6 bg-gray-200 rounded w-48 mb-6"></div>
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
            >
              <div
                v-for="i in 3"
                :key="i"
                class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <div class="w-16 h-16 bg-gray-200 rounded-md"></div>
                <div class="flex-1">
                  <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="hasOrderError" class="text-center py-8">
            <div class="text-red-500 text-lg mb-2">
              Impossible de charger les détails de la commande
            </div>
            <p class="text-gray-500 text-sm">
              Veuillez vérifier votre référence de commande et réessayer.
            </p>
          </div>

          <!-- Loaded State -->
          <template v-else>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">
                Votre dernière commande
              </h3>
              <div v-if="customerInfo" class="text-sm text-gray-500">
                Commande #{{ customerInfo.orderNumber }}
              </div>
            </div>

            <!-- Items Grid for Better Layout -->
            <div
              v-if="recentlyPurchased.length > 0"
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
            >
              <div
                v-for="item in recentlyPurchased"
                :key="item.id"
                class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <NuxtImg
                  :src="imghttps(item.image)"
                  :alt="item.name"
                  class="w-16 h-16 rounded-md object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div class="flex-1 min-w-0 flex flex-col items-start">
                  <h4 class="font-medium text-gray-900 text-sm truncate">
                    {{ item.name }}
                  </h4>
                  <p class="text-xs text-gray-500 mb-1">
                    Qty: {{ item.quantity }}
                  </p>
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-semibold text-gray-900">
                      {{ (item.price || 0).toFixed(2) }} {{ currency }}
                    </p>
                   <!-- <span
                      v-if="item.isUpsell"
                      class="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full"
                    >
                      Upsell
                    </span>-->
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-8 text-gray-500">
              <div class="text-4xl mb-2">📦</div>
              <p>Aucun article trouvé dans cette commande</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Check, X } from "lucide-vue-next";
import { imghttps } from "~/composables/services/helpers";

// Get route params and router
const route = useRoute();
const router = useRouter();
const orderRef = route.params.order_ref;
const upsellId = route.params.upsell_id;

const { trackPurchase } = useTracking();

onMounted(() => {
  // Mark as hydrated for consistent state
  isHydrated.value = true;

  // Only run tracking on client
  if (import.meta.client) {
    trackPurchase(orderRef);
  }
});

// Get company data
const { companyData } = useCompanyData();
const baseURL = useRuntimeConfig().public.baseURL;

// Get currency from company data (SSR-safe)
const currency = computed(() => companyData.value?.currency);

// 1. Fetch upsell configuration (SSR)
const {
  data: upsellConfig,
  error: upsellError,
  status: upsellStatus,
} = await useFetch(
  `${baseURL}website/upsell/${companyData.value.id}/${upsellId}`,
  {
    key: `upsell-config-${upsellId}`,
    server: true,
    default: () => null,
  }
);

// 2. Fetch order data (with SSR support)
const {
  data: orderData,
  error: orderError,
  status: orderStatus,
} = await useFetch(
  `${baseURL}get-order-by-idref/${orderRef}/${companyData.value.id}`,
  {
    key: `order-${orderRef}`,
    server: true,
    default: () => null,
  }
);

// 3. Fetch upsell product data (with SSR support, only when upsell config is loaded)
const {
  data: productData,
  error: productError,
  status: productStatus,
  execute: fetchProduct,
} = await useFetch(
  () =>
    upsellConfig.value
      ? `${baseURL}products-read/?show-children=false&company=${companyData.value.id}&active=true&size=8&ids_in=${upsellConfig.value.product_to_propose}`
      : null,
  {
    key: `upsell-product-${upsellId}`,
    server: true,
    immediate: false,
    default: () => null,
  }
);

// Execute product fetch when upsell config is available
watch(
  upsellConfig,
  (newConfig) => {
    if (newConfig?.product_to_propose && productStatus.value === "idle") {
      fetchProduct();
    }
  },
  { immediate: true }
);

// Swiper refs - SIMPLE
const productCardRef = ref(null);

// Extract upsell product data (hydration-safe)
const upsellProduct = computed(() => {
  if (!productData.value?.results?.[0] || !isHydrated.value) return null;

  const product = productData.value.results[0];
  const discountedPrice = upsellConfig.value?.discount
    ? (product.price || 0) * (1 - (upsellConfig.value.discount || 0) / 100)
    : product.price || 0;

  return {
    id: product.id || "",
    name: product.name || "",
    description: product.description || "",
    images: product.images || [],
    photo: product.photo || "",
    price: product.price || 0,
    discountedPrice: discountedPrice,
    discount: upsellConfig.value?.discount || 0,
    reference: product.reference || "",
    stock: product.stock || 0,
    quantity: upsellConfig.value?.quantity || 1,
  };
});

console.log("upsellProduct", upsellProduct);

// Clean HTML description for proper rendering
/*const cleanDescription = computed(() => {
  if (!upsellProduct.value?.description) return "";
  return upsellProduct.value.description;
});*/

// Extract order details for recent purchases (hydration-safe)
const recentlyPurchased = computed(() => {
  if (
    !orderData.value?.details ||
    !Array.isArray(orderData.value.details) ||
    !isHydrated.value
  )
    return [];

  return orderData.value.details.map((item) => ({
    id: item?.id, //
    name: item?.product_name,
    image: item?.product_thumb,
    price: item?.price_ttc,
    quantity: item?.quantity,
    productRef: item?.product_ref,
    productId: item?.product_id,
    finalPrice: item?.final_price,
    isUpsell: item?.is_upsell,
  }));
});

const customerInfo = computed(() => {
  if (!orderData.value || !isHydrated.value) return null;

  return {
    name: orderData.value?.name,
    email: orderData.value?.email,
    phone: orderData.value?.phone,
    address: orderData.value?.address,
    country: orderData.value?.country,
    paymentType: orderData.value?.payement_type,
    orderNumber: orderData.value?.order_number,
    orderCode: orderData.value?.order_code,
  };
});

// Hydration-safe flag
const isHydrated = ref(false);

// Loading states (hydration-safe)
const isOrderLoading = computed(() => {
  if (!isHydrated.value) return true;
  return orderStatus.value === "pending";
});
const isProductLoading = computed(() => {
  if (!isHydrated.value) return true;
  return productStatus.value === "pending" || productStatus.value === "idle";
});
const isUpsellLoading = computed(() => {
  if (!isHydrated.value) return true;
  return upsellStatus.value === "pending";
});

// Error handling (hydration-safe)
const hasOrderError = computed(() => {
  if (!isHydrated.value) return false;
  return orderStatus.value === "error" || orderError.value;
});
const hasProductError = computed(() => {
  if (!isHydrated.value) return false;
  return productStatus.value === "error" || productError.value;
});
const hasUpsellError = computed(() => {
  if (!isHydrated.value) return false;
  return upsellStatus.value === "error" || upsellError.value;
});

// Add individual product to cart
const addToCart = async () => {
  try {
    if (!upsellProduct.value) {
      console.error("Produit upsell non disponible");
      return;
    }

    // Call the update-order-upsell API using $fetch
    await $fetch(`${baseURL}update-order-upsell`, {
      method: "POST",
      body: {
        upsell: upsellId,
        order: orderRef,
        company: companyData.value.id,
      },
      // Optional: to get the full response including status
      onResponse({ response }) {
        if (response.status === 200) {
          router.push(`/checkout-confirmation/${orderRef}`);
        } else {
          console.error(
            "Erreur lors de la mise à jour de l'upsell:",
            response._data
          );
          alert("Il y a une erreur");
        }
      },
      onResponseError() {
        alert("Il y a une erreur");
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit upsell au panier:", error);
    alert("Il y a une erreur");
  }
};

// Decline offers - navigate to order confirmation
const declineOffers = async () => {
  try {
    // Navigate directly to the order confirmation page
    await router.push(`/checkout-confirmation/${orderRef}`);
  } catch (error) {
    console.error("Erreur lors de la navigation vers la confirmation:", error);
    // Fallback navigation
    await router.push("/");
  }
};

// SEO Meta
useHead({
  title: "Complétez votre commande - Accessoires recommandés",
  meta: [
    {
      name: "description",
      content:
        "Accessoires parfaits pour compléter votre achat récent. Produits de haute qualité appréciés par nos clients.",
    },
  ],
});
</script>

<style scoped>
/* Custom hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* HTML Description Styling */
.text-gray-700 :deep(p) {
  margin-bottom: 8px;
}

.text-gray-700 :deep(br) {
  line-height: 1.2;
}

.text-gray-700 :deep(strong),
.text-gray-700 :deep(b) {
  font-weight: 700;
  color: #374151;
}

.text-gray-700 :deep(font) {
  font-family: inherit;
}

.text-gray-700 :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 8px auto;
  border-radius: 8px;
  display: block;
}

.text-gray-700 :deep(span) {
  line-height: inherit;
}

/* Ensure text alignment works */
.text-gray-700 :deep([style*="text-align: center"]) {
  text-align: center !important;
}

.text-gray-700 :deep([style*="text-align: left"]) {
  text-align: left !important;
}

.text-gray-700 :deep([style*="text-align: right"]) {
  text-align: right !important;
}

/* Purchase List Scrollbar - Specific to this component only */
.purchase-list-scroll::-webkit-scrollbar {
  width: 4px;
  -webkit-appearance: none;
}

.purchase-list-scroll::-webkit-scrollbar-track {
  background: transparent;
  -webkit-appearance: none;
}

.purchase-list-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
  -webkit-appearance: none;
}

/* Aggressively hide ALL scroll arrows/buttons */
.purchase-list-scroll::-webkit-scrollbar-button {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
  -webkit-appearance: none !important;
}

.purchase-list-scroll::-webkit-scrollbar-button:single-button {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.purchase-list-scroll::-webkit-scrollbar-button:double-button {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.purchase-list-scroll::-webkit-scrollbar-button:start {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.purchase-list-scroll::-webkit-scrollbar-button:end {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.purchase-list-scroll::-webkit-scrollbar-button:vertical {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.purchase-list-scroll::-webkit-scrollbar-button:horizontal {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.purchase-list-scroll::-webkit-scrollbar-button:increment {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.purchase-list-scroll::-webkit-scrollbar-button:decrement {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.purchase-list-scroll::-webkit-scrollbar-corner {
  display: none !important;
  background: transparent !important;
}

.purchase-list-scroll::-webkit-resizer {
  display: none !important;
}

/* Additional webkit specific hiding */
.purchase-list-scroll::-webkit-scrollbar-track-piece {
  display: none !important;
}

.purchase-list-scroll::-webkit-scrollbar-thumb:window-inactive {
  background: #cbd5e1;
}

/* Firefox scrollbar styling */
.purchase-list-scroll {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
  scroll-behavior: smooth;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  overflow-x: hidden;
  overflow-y: auto;
}

/* Force no arrows on all browsers */
.purchase-list-scroll {
  scrollbar-arrow-color: transparent !important;
}

/* For older webkit versions */
.purchase-list-scroll::-webkit-scrollbar-button:start:decrement,
.purchase-list-scroll::-webkit-scrollbar-button:end:increment {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}

/* Swiper custom styles */
.purchased-items-swiper {
  padding: 0 12px;
  height: auto;
}

.purchased-items__slide {
  height: auto;
}

/* Hide navigation buttons when not needed */
.purchased-items__btn-prev.swiper-button-disabled,
.purchased-items__btn-next.swiper-button-disabled {
  opacity: 0;
  pointer-events: none;
}

/* Product Images Swiper Styles */
.product-images-swiper {
  height: 256px; /* h-64 for mobile - increased from 192px */
  width: 100% !important;
  max-width: 100% !important;
  overflow: hidden;
}

.product-images-swiper .swiper-wrapper {
  width: 100% !important;
}

.product-images-swiper .swiper-slide {
  width: 100% !important;
  flex-shrink: 0;
}

/* Product Thumbs Swiper Styles - EMERGENCY DEBUG */
.product-thumbs-swiper {
  position: relative !important;
  padding: 1rem !important;
  z-index: 10 !important;
  margin-top: 1rem !important;
  background: #ff0000 !important; /* RED BACKGROUND FOR DEBUG */
  border-radius: 12px !important;
  border: 3px solid #000000 !important; /* BLACK BORDER FOR DEBUG */
  min-height: 120px !important;
  display: block !important;
  width: 100% !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.product-thumbs-swiper .swiper-wrapper {
  align-items: center !important;
  justify-content: center !important;
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.product-thumb-slide {
  width: 80px !important;
  height: 100px !important;
  border-radius: 1rem !important;
  position: relative !important;
  transition: all 0.6s ease !important;
  -webkit-transition: all 0.6s ease !important;
  padding: 5px !important;
  box-sizing: border-box !important;
  cursor: pointer !important;
  margin: 0 5px !important;
  display: block !important;
  flex-shrink: 0 !important;
  visibility: visible !important;
}

/* Medium screens and up */
@media (min-width: 768px) {
  .product-images-swiper {
    height: 100%;
    min-height: 400px;
    width: 100% !important;
    max-width: 100% !important;
  }
}

/* Large screens and up */
@media (min-width: 1024px) {
  .product-images-swiper {
    height: 100%;
    min-height: 400px;
    width: 100% !important;
    max-width: 100% !important;
  }
}

/* Hide product navigation buttons when not needed */
.product-images__btn-prev.swiper-button-disabled,
.product-images__btn-next.swiper-button-disabled {
  opacity: 0;
  pointer-events: none;
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

.shake-animation {
  animation: shake 2s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
}
</style>
