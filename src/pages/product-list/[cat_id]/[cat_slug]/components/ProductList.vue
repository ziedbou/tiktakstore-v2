<template>
  <div> 
    <!-- Product header with count and sort -->
    <div class="flex flex-wrap items-center justify-between mb-6">
      <p class="text-gray-700 font-medium text-sm">
        {{ totalProductCount }} <span class="text-gray-500">produits</span>
      </p>

      <div class="flex items-center mt-2 lg:mt-0" v-if="products.length > 0">
        <div class="mr-4 relative">
          <div class="relative">
            <select
              class="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer hover:border-gray-400 transition-all duration-200 min-w-[200px] [&>option:checked]:bg-gray-200"
              v-model="sortOption"
              @change="handleSortChange"
            >
              <option value="" class="text-gray-500">Trier par</option>
              <option value="name">Nom du produit A-Z</option>
              <option value="-name">Nom du produit Z-A</option>
              <option value="-price">Prix le plus élevé</option>
              <option value="price">Prix le plus bas</option>
              <option value="-created_at">Le plus récent</option>
              <option value="created_at">Le plus ancien</option>
            </select>
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-list-filter-icon lucide-list-filter"
              >
                <path d="M3 6h18" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
            </div>
            <div
              class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="hidden lg:flex space-x-2">
          <button
            @click="setViewMode('grid-2')"
            class="p-1 cursor-pointer hover:text-blue-600"
            :class="{
              'text-blue-600': viewMode === 'grid-2',
              'text-gray-500': viewMode !== 'grid-2',
            }"
          >
            <svg width="14" height="14" fill="currentColor">
              <rect x="0" y="0" rx="1" width="6" height="6"></rect>
              <rect x="8" y="0" rx="1" width="6" height="6"></rect>
              <rect x="0" y="8" rx="1" width="6" height="6"></rect>
              <rect x="8" y="8" rx="1" width="6" height="6"></rect>
            </svg>
          </button>
          <button
            @click="setViewMode('grid-3')"
            class="p-1 cursor-pointer hover:text-blue-600"
            :class="{
              'text-blue-600': viewMode === 'grid-3',
              'text-gray-500': viewMode !== 'grid-3',
            }"
          >
            <svg width="22" height="14" fill="currentColor">
              <rect x="0" y="0" rx="1" width="6" height="6"></rect>
              <rect x="8" y="0" rx="1" width="6" height="6"></rect>
              <rect x="16" y="0" rx="1" width="6" height="6"></rect>
              <rect x="0" y="8" rx="1" width="6" height="6"></rect>
              <rect x="8" y="8" rx="1" width="6" height="6"></rect>
              <rect x="16" y="8" rx="1" width="6" height="6"></rect>
            </svg>
          </button>

          <button
            @click="setViewMode('grid-4')"
            class="p-1 cursor-pointer hover:text-blue-600"
            :class="{
              'text-blue-600': viewMode === 'grid-4',
              'text-gray-500': viewMode !== 'grid-4',
            }"
          >
            <svg width="30" height="14" fill="currentColor">
              <rect x="0" y="0" rx="1" width="6" height="6"></rect>
              <rect x="8" y="0" rx="1" width="6" height="6"></rect>
              <rect x="16" y="0" rx="1" width="6" height="6"></rect>
              <rect x="24" y="0" rx="1" width="6" height="6"></rect>
              <rect x="0" y="8" rx="1" width="6" height="6"></rect>
              <rect x="8" y="8" rx="1" width="6" height="6"></rect>
              <rect x="16" y="8" rx="1" width="6" height="6"></rect>
              <rect x="24" y="8" rx="1" width="6" height="6"></rect>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div
      v-if="loading"
      :class="{
        'grid ': true,
        'grid-cols-2 gap-6': viewMode === 'grid-2',
        'grid-cols-3 gap-4': viewMode === 'grid-3',
        'grid-cols-4 gapx-2': viewMode === 'grid-4',
      }"
    >
      <!-- Product Card Skeleton -->
      <div
        v-for="i in viewMode === 'grid-2' ? 2 : viewMode === 'grid-3' ? 3 : 4"
        :key="i"
        class="w-full"
      >
        <!-- Product Image Placeholder -->
        <div class="waiting" style="height: 200px"></div>

        <!-- Product Info Container -->
        <div class="pt-4">
          <!-- Product Title -->
          <div
            class="waiting"
            style="height: 24px; width: 85%; margin-bottom: 8px"
          ></div>

          <!-- Product Description -->
          <div
            class="waiting"
            style="height: 16px; width: 90%; margin-bottom: 6px"
          ></div>
          <div
            class="waiting"
            style="height: 16px; width: 70%; margin-bottom: 12px"
          ></div>

          <!-- Price and Rating -->
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
            "
          >
            <div class="waiting" style="height: 20px; width: 40%"></div>
            <div class="waiting" style="height: 20px; width: 30%"></div>
          </div>

          <!-- Add to Cart Button -->
          <div class="waiting" style="height: 36px; border-radius: 4px"></div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
    >
      {{ error }}
    </div>
    <!-- Empty state message when no products found -->
    <div
      v-else-if="products.length === 0"
      class="bg-gray-50 rounded-lg p-6 text-center"
    >
      <div class="flex flex-col items-center">
        <ExclamationCircleIcon class="h-16 w-16 text-gray-400 mb-4"/>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">
          {{ hasFiltersApplied ? 'Aucun produit ne correspond à vos critères de filtrage actuels.' : 'Aucun produit disponible dans cette catégorie.' }}
        </h3>
        <p class="text-gray-500 mb-4">
          {{ hasFiltersApplied ? 'Essayez de modifier vos filtres pour voir plus de produits.' : 'Cette catégorie ne contient pas encore de produits.' }}
        </p>
        <button
          v-if="hasFiltersApplied"
          @click="handleResetFilters"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </div>

    <!-- Products Grid (shown only if there are products) -->
    <div class="relative" v-else>
      <div
        :class="{
          grid: true,
          'grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8': viewMode === 'grid-2',
          'grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6': viewMode === 'grid-3',
          'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4': viewMode === 'grid-4',
        }">
        <div v-for="product in products" :key="product.id">
          <component
            :is="dynamicComponent"
            :product="product"
            :image_full="true"
          />
        </div>
      </div>
      
      <!-- Infinite scroll loader -->
      <div 
        v-if="hasMorePages" 
        ref="loadMoreTrigger"
        class="flex justify-center py-8"
      >
        <div v-if="loadingMore" class="animate-spin rounded-full h-8 w-8 border-t-3 border-b-3 border-gray-500"></div>
        <div v-else class="h-8"><!-- Empty space to trigger intersection --></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed, shallowRef } from "vue";
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid";
import { useRoute, useRouter } from "vue-router";

// Props from parent
const props = defineProps({
  categoryId: {
    type: [String, Number],
    required: true,
  },
  companyId: {
    type: [String],
    required: true,
  },
  filterSelections: {
    type: Array,
    default: () => [],
  },
  priceRange: {
    type: Array,
    default: () => [0, 1000],
  },
});

// Emits to parent
const emit = defineEmits(["update:breadcrumbItems", "reset-filters"]);

// Component state
const route = useRoute();
const router = useRouter();
const loading = ref(true);
const loadingMore = ref(false);
const initialLoadInProgress = ref(false); // New flag for initial multi-page loading
const error = ref(null);
const products = ref([]);
const totalProductCount = ref(0);
const currentPage = ref(1);
const totalPages = ref(1);
const viewMode = ref("grid-4");
const sortOption = ref("");
const loadMoreTrigger = ref(null);
const observer = ref(null);
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
// Computed property to check if there are more pages to load
const hasMorePages = computed(() => {
  return currentPage.value < totalPages.value;
});

// Computed property to check if any filters are applied
const hasFiltersApplied = computed(() => {
  const hasfilterSelections = props.filterSelections.length > 0;
  const hasPriceFilter = 
    route.query.price_gte !== undefined || 
    route.query.price_lte !== undefined;
  const hasSubcategories = route.query.has_category !== undefined;
  
  // Check if any URL parameter filter is present
  const hasUrlFilters = 
    route.query.has_attributs !== undefined || 
    hasPriceFilter ||
    hasSubcategories;
  
  return hasfilterSelections || hasUrlFilters;
});
// Get the product card component dynamically
const dynamicComponent = shallowRef(null);
// Load component dynamically
const loadComponent = async (componentName = "ProductCard_5") => {
  try {
    const module = await import(
      `@/components/product-cards/${componentName}.vue`
    );
    dynamicComponent.value = module.default;
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error);
  }
};

// Update URL with current page
const updateUrlWithPage = () => {
  const query = { ...route.query };

  // If page is 1, we can omit it from the URL for cleaner URLs
  if (currentPage.value === 1) {
    delete query.page;
  } else {
    query.page = currentPage.value;
  }

  // If sort option is selected, add it to URL
  if (sortOption.value) {
    query.ordering = sortOption.value;
  } else {
    delete query.ordering;
  }

  router.replace({ query });
};

// Fetch products based on category ID, filters, and pagination
const fetchProducts = async (isLoadMore = false) => {
  if (initialLoadInProgress.value && isLoadMore) {
    // Don't show individual loading indicators during initial multi-page load
    // But still proceed with the fetch
  } else if (isLoadMore) {
    loadingMore.value = true;
  } else {
    loading.value = true;
  }
  error.value = null;
  
  try {
    // Build has_attributs parameter
    const hasAttributs =
      props.filterSelections.length > 0 ? props.filterSelections.join(",") : "";

    // Build ordering parameter - we're now using the sortOption value directly as the ordering parameter
    let ordering = sortOption.value || "";
    
    // Get subcategories from URL if they exist
    const hasCategory = route.query.has_category || "";

    // Construct the API URL
    let apiUrl = `${baseURL}products-read/?company=${props.companyId}&page=${currentPage.value}&ordering=${ordering}&size=20&no_parent=true&active=true&show-children=false&has_attributs=${hasAttributs}&price_gte=${props.priceRange[0]}&price_lte=${props.priceRange[1]}`;
    
    // Add category parameter - if subcategory is selected, use it, otherwise use main category
    if (hasCategory) {
      apiUrl += `&has_category=${hasCategory}`;
    } else {
      apiUrl += `&has_category=${props.categoryId}`;
    }

    // Create comprehensive cache key with all parameters
    const cacheKey = `products-${props.companyId || 'null'}-${currentPage.value || 'null'}-${ordering || 'null'}-${hasAttributs || 'null'}-${props.priceRange[0] || 'null'}-${props.priceRange[1] || 'null'}-${hasCategory || props.categoryId || 'null'}`;
        
    const data = await $fetch(apiUrl, {
      key: cacheKey,
      server: false
    });
    
    if (isLoadMore || initialLoadInProgress.value) {
      // Append new products to existing array
      products.value = [...products.value, ...data.results];
    } else {
      // Replace products with new results
      products.value = data.results;
    }
    
    totalProductCount.value = data.count; // Store the total count from API
    totalPages.value = data.total_pages; // Store total pages
  } catch (err) {
    console.error("Error fetching products:", err);
    error.value = "Failed to load products. Please try again later.";
    if (!isLoadMore && !initialLoadInProgress.value) {
      products.value = [];
      totalProductCount.value = 0;
      totalPages.value = 1;
    }
  } finally {
    if (isLoadMore && !initialLoadInProgress.value) {
      loadingMore.value = false;
    } else if (!initialLoadInProgress.value) {
      loading.value = false;
    }
  }
};

// New function to handle initial load with multiple pages
const loadInitialPages = async () => {
  try {
    initialLoadInProgress.value = true;
    loading.value = true;
    products.value = []; // Clear products to start fresh
    
    const targetPage = parseInt(route.query.page) || 1;
    
    // Load all pages sequentially from page 1 to targetPage
    for (let page = 1; page <= targetPage; page++) {
      currentPage.value = page;
      await fetchProducts(page > 1); // Treat as "load more" for pages after the first
    }
  } catch (err) {
    console.error("Error during initial page load:", err);
    error.value = "Failed to load products. Please try again later.";
  } finally {
    initialLoadInProgress.value = false;
    loading.value = false;
  }
};

// Load more products on scroll
const loadMoreProducts = () => {
  if (hasMorePages.value && !loadingMore.value) {
    currentPage.value++;
    updateUrlWithPage();
    fetchProducts(true);
  }
};

// Set up intersection observer for infinite scrolling
const setupIntersectionObserver = () => {
  if ('IntersectionObserver' in window) {
    observer.value = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMorePages.value && !loadingMore.value) {
        loadMoreProducts();
      }
    }, { threshold: 0.1 });
    
    if (loadMoreTrigger.value) {
      observer.value.observe(loadMoreTrigger.value);
    }
  }
};

// Functions
function setViewMode(mode) {
  viewMode.value = mode;
  if (process.client) {
    localStorage.setItem("productViewMode", mode);
  }
}

function handleSortChange() {
  currentPage.value = 1; // Reset to page 1 when sort changes
  updateUrlWithPage();
  fetchProducts();
}

function handleResetFilters() {
  // Emit event to parent component to handle the reset
  emit("reset-filters");
}

// Watch for props changes to reload products
watch(
  () => [props.categoryId, props.filterSelections, props.priceRange],
  (newValues, oldValues) => {
    // Safely extract values with fallbacks
    const [newCategoryId = null, newfilterSelections = [], newPriceRange = [0, 1000]] = newValues || [];
    
    // oldValues might be undefined on first run, so use safe defaults
    const [oldCategoryId = null, oldfilterSelections = [], oldPriceRange = [0, 1000]] = oldValues || [];
    
    // Only fetch if actually changed (avoid double fetching on mount)
    const isInitialLoad = oldValues === undefined; // First run check
    const hasChanged = 
      newCategoryId !== oldCategoryId ||
      JSON.stringify(newfilterSelections) !== JSON.stringify(oldfilterSelections) ||
      JSON.stringify(newPriceRange) !== JSON.stringify(oldPriceRange);
    
    if (hasChanged || isInitialLoad) {
      currentPage.value = 1; // Reset to page 1 when filters change
      fetchProducts();
    }
  },
  { deep: true, immediate: true } // immediate:true ensures it runs once on component creation
);

// Watch for URL query parameter changes
watch(
  () => route.query,
  (newQuery, oldQuery) => {
    // Skip this watcher during initial load process
    if (initialLoadInProgress.value) return;

    // If query object is empty (after filter reset), reset the component state
    if (Object.keys(newQuery).length === 0) {
      currentPage.value = 1;
      sortOption.value = "";
      fetchProducts();
      return;
    }

    // Check for subcategory changes
    if (newQuery.has_category !== oldQuery?.has_category) {
      console.log("Subcategory changed in URL:", newQuery.has_category);
      currentPage.value = 1;
      fetchProducts();
      return;
    }

    // Check for page changes
    const newPage = parseInt(newQuery.page) || 1;
    if (newPage !== currentPage.value) {
      // For direct page navigation (via URL change)
      if (Math.abs(newPage - currentPage.value) > 1) {
        // User navigated directly to a non-adjacent page
        loadInitialPages();
      } else if (newPage > currentPage.value) {
        // User navigated forward (via history/back button)
        currentPage.value = newPage;
        fetchProducts(true); // Load as additional content
      } else {
        // User navigated backward
        // For simplicity, reload all content up to the requested page
        loadInitialPages();
      }
    }

    // Check for sort changes
    const newSort = newQuery.ordering || "";
    if (newSort !== sortOption.value) {
      sortOption.value = newSort;
      currentPage.value = 1; // Reset to page 1 when sort changes
      fetchProducts();
    }
  },
  { deep: true }
);

// Update observer when loadMoreTrigger ref changes
watch(loadMoreTrigger, (newValue) => {
  if (newValue && observer.value) {
    observer.value.disconnect();
    observer.value.observe(newValue);
  }
});

// Initialize on component mount
onMounted(() => {

  loadComponent();
  // Get sort option from URL if present
  sortOption.value = route.query.ordering || "";

  // Initialize viewMode from localStorage on client-side
  if (process.client) {
    const savedViewMode = localStorage.getItem("productViewMode");
    if (savedViewMode) {
      viewMode.value = savedViewMode;
    } else {
      viewMode.value = "grid-4"; // Set default to grid-4 when no saved preference
    }
    
    // Setup intersection observer for infinite scrolling
    setupIntersectionObserver();
  }
  
  // Check if we need to load multiple pages (user refreshed on a page > 1)
  const targetPage = parseInt(route.query.page) || 1;
  if (targetPage > 1) {
    loadInitialPages(); // Load all pages up to the current page
  } else {
    currentPage.value = 1;
    // We don't need to fetch products here since the immediate watcher handles it
  }
});

// Clean up observer on component unmount
onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>
