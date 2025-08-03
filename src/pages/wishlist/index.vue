<template>
    <div
      class="relative overflow-hidden"
    >
      <div class="relative container-medium mx-auto px-4 py-12">
        <div class="space-y-8">
          <!-- Header Section with Title and Count -->
          <div class="flex items-center justify-center">
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <div
                class="w-12 h-12 btn-primary-solid rounded-xl flex items-center justify-center shadow-lg"
              >
                <Heart class="w-6 h-6 " />
              </div>
              <div class="space-y-1.5">
                <h1
                  class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                >
                  Ma Liste de Souhaits
                </h1>
                <div class="flex items-center gap-2 mt-1">
                  <ChartColumnDecreasing class="w-4 h-4 text-gray-500" />
                  <span class="text-sm text-gray-600">
                    {{ wishlistCount }}
                    {{ wishlistCount <= 1 ? "produit" : "produits" }} dans votre
                    collection
                  </span>
                </div>
              </div>
            </div>
          </div>

                     <!-- Action Buttons Row -->
           <div
             v-if="isInitialized && wishlistCount > 0"
             class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
           >
            <!-- Secondary Actions -->
            <div class="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              <NuxtLink
                to="/"
                class="btn-primary-outline w-full sm:w-auto px-6 py-3 text-sm font-medium shadow-sm flex items-center justify-center gap-3"
              >
                <ArrowLeft class="w-5 h-5" />
                Continuer les achats
              </NuxtLink>

              <button
                @click="showClearConfirm = true"
                class="w-full sm:w-auto rounded-[var(--btn-primary-outline-border-radius)] border border-gray-300 bg-transparent text-sm px-6 py-3 font-medium text-gray-600 shadow-sm hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                :disabled="isLoadingAny"
              >
                <Trash2 class="w-5 h-5" />
                <span>Tout supprimer</span>
              </button>
            </div>
          </div>

          <!-- Modern Empty State -->
          <div v-if="showEmptyState" class="max-w-lg mx-auto">
            <div class="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-lg p-12 text-center">
              <!-- Icon Container -->
                <div class="mb-8 w-24 h-24 border border-[var(--btn-primary-outline-border-color)] mx-auto text-[var(--btn-primary-outline-color)] bg-[var(--btn-primary-outline-background)] rounded-full flex items-center justify-center shadow-inner">
                  <Heart class="w-12 h-12" />
                </div>

              <!-- Content -->
              <div class="space-y-4 mb-10">
                <h3 class="text-xl font-semibold text-gray-900">
                  Votre liste de souhaits est vide
                </h3>
                <p class="text-gray-600 leading-relaxed max-w-md mx-auto">
                  Commencez à créer votre collection en ajoutant vos produits préférés à votre liste de souhaits
                </p>
              </div>

              <!-- Call to Action -->
              <div class="space-y-4">
                <NuxtLink
                  to="/"
                  class="btn-primary-solid inline-flex items-center gap-3 px-8 py-3.5 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <ArrowLeft class="w-5 h-5" />
                  Découvrir nos produits
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modern Loading State -->
      <div
        v-if="showSkeleton"
        class="container-medium mx-auto py-6 mb-7"
      >
        <div class="flex flex-wrap justify-center items-stretch gap-4">
          <div 
            v-for="i in 4" 
            :key="`skeleton-${i}`"
            class="w-[calc(50%-0.5rem)] lg:w-64 xl:w-60"
          >
            <WishlistProductCardSkeleton />
          </div>
        </div>
      </div>

      <!-- Modern Wishlist Items -->
      <div v-else-if="isInitialized && wishlistCount > 0 && !showSkeleton" class="container-medium mx-auto py-6 mb-7">
        <div class="flex flex-wrap justify-center items-stretch gap-4">
          <div 
            v-for="(product, index) in wishlistProducts"
            :key="product.id"
            class="w-[calc(50%-0.5rem)] md:w-70"
          >
            <WishlistProductCard
              :product="product"
              :index="index"
              @add-to-cart="handleAddToCart"
              @remove-from-wishlist="handleRemoveFromWishlist"
            />
          </div>
        </div>
      </div>

      <!-- Modern Clear Confirmation Modal -->
      <Modal 
        :isOpen="showClearConfirm" 
        @close="showClearConfirm = false"
        size="lg"
        title="Vider votre collection ?"
      >
        <div class="text-center">
          <div class="relative mb-6">
            <div class="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center shadow-xl">
              <Trash2 class="w-8 h-8 text-white" />
            </div>
          </div>
          <p class="text-gray-600 mb-8 leading-relaxed">
            Tous vos produits favoris seront supprimés définitivement de votre liste. Cette action ne peut pas être annulée.
          </p>
          
          <div class="flex gap-4 justify-center">
            <button 
              @click="showClearConfirm = false"
              class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Garder ma liste
            </button>
            <button 
              @click="confirmClearWishlist"
              class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors duration-200"
            >
              Tout supprimer
            </button>
          </div>
        </div>
      </Modal>

      <!-- Modern Error Toast -->
      <div
        v-if="error"
        class="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right duration-300"
      >
        <div
          class="bg-white border-l-4 border-gray-400 rounded-2xl shadow-2xl p-6 max-w-sm"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <AlertCircle class="w-4 h-4 text-white" />
            </div>
            <div class="flex-1">
              <p class="text-gray-900 font-medium">{{ error }}</p>
            </div>
            <button
              @click="error = null"
              class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
 
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useWishlist } from "@/composables/useWishlist";
import { useCompanyData } from "@/composables/useCompanyData";
import Modal from "@/components/Modal.vue";
import WishlistProductCard from "@/components/product-cards/WishlistProductCard.vue";
import WishlistProductCardSkeleton from "@/components/skeleton/whishlistProductCardSkeleton.vue";
import {
  Heart,
  Trash2,
  ArrowLeft,
  AlertCircle,
  ChartColumnDecreasing,
  X,
  ShoppingCart
} from "lucide-vue-next";
// Meta tags
useHead({
  title: "Ma Liste de Souhaits - TikTak Store",
  meta: [
    {
      name: "description",
      content:
        "Gérez votre liste de souhaits et découvrez vos produits favoris.",
    },
  ],
});

// Wishlist composable
const {
  wishlistItems,
  wishlistCount,
  isLoading,
  isLoadingAny,
  isAddingItem,
  isInitialized,
  error,
  removeFromWishlist,
  clearWishlist,
  initializeWishlist,
} = useWishlist();

// Local state
const showClearConfirm = ref(false);
const hasInitiallyLoaded = ref(false);

// Get company data
const { companyId } = useCompanyData();
const config = useRuntimeConfig();
const baseURL = config.public.baseURL;

// Computed URL for fetching wishlist products
const wishlistProductsUrl = computed(() => {
  if (wishlistItems.value.length === 0) {
    return null;
  }
  const ids = wishlistItems.value.join(",");
  return `${baseURL}products-read/?ids_in=${ids}&company=${companyId.value}&size=50`;
});

// Fetch wishlist products from API - this will be reactive to wishlistItems changes
const { data: wishlistProductsData, status: productsStatus } = useFetch(
  wishlistProductsUrl,
  {
    key: "wishlist-products",
    server: false,
    lazy: true,
    default: () => ({ results: [] }),
    watch: [wishlistItems],
    onResponse({ response }) {
      if (response.ok && !hasInitiallyLoaded.value) {
        hasInitiallyLoaded.value = true;
      }
    },
    onResponseError({ response }) {
      error.value = "Erreur lors du chargement des produits";
    },
  }
);

// Computed: Get products that are in wishlist
const wishlistProducts = computed(() => {
  if (!wishlistProductsData.value || !wishlistProductsData.value.results) {
    return [];
  }
  return wishlistProductsData.value.results;
});

// Computed: Products loading state
const productsLoading = computed(() => productsStatus.value === "pending");

// Computed: Show skeleton during initialization or when adding items
const showSkeleton = computed(() => {
  return !isInitialized.value || isLoading.value || isAddingItem.value || (productsLoading.value && !hasInitiallyLoaded.value && wishlistCount.value > 0);
});

// Computed: Show empty state only after initialization is complete and wishlist is actually empty
const showEmptyState = computed(() => {
  return isInitialized.value && wishlistCount.value === 0 && !isLoading.value && !isAddingItem.value;
});


const handleRemoveFromWishlist = (productId) => {
  removeFromWishlist(productId);
};


const confirmClearWishlist = async () => {
  clearWishlist();
  showClearConfirm.value = false;
};

// Initialize wishlist on mount
onMounted(() => {
  initializeWishlist();
});
</script>
