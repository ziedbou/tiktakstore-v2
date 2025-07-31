<template>
  <div class="product-list-page">
    <div
      class="page-header text-center"
    >
      <div class="container">
        <h1 class="text-gray-700 font-bold text-2xl md:text-4xl">{{ categoryName }}</h1>
      </div>
    </div>

    <!-- pages/index.vue -->

    <div class="mx-auto">
      <div
        v-if="error"
        class="bg-red-100 text-red-700 px-4 py-3"
      >
        {{ error }}
      </div>

      <div v-else class="container-medium">
        <Breadcrumb :items="breadcrumbItems" />
        <div class="grid grid-cols-1 lg:grid-cols-24 gap-8 my-8">
          <!-- Left sidebar (30%) - Only show if filters are available -->
          <div v-if="hasFilters" class="lg:col-span-5">
            <CategorieFilter 
              :categoryId="categoryId" 
              :companyId="companyId"
              v-model:filterSelections="filterSelections"
              v-model:priceRange="priceRange"
              @reset-filters="resetFilters"
              @update:has-filters="handleFilterAvailability"
            />
          </div>

          <!-- Right content area - Adjust width based on filter availability -->
          <div :class="hasFilters ? 'lg:col-span-19' : 'lg:col-span-24'">
            <ProductList
              :categoryId="categoryId"
              :companyId="companyId"
              :filterSelections="filterSelections"
              :priceRange="priceRange"
              v-model:breadcrumbItems="breadcrumbItems"
              @reset-filters="resetFilters"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll To Top Button -->
    <ScrollToTop 
      offset="100"
      bottom="8px"
      right="8px"
      buttonClasses="border-2 border-white"
      size="45px"
    />
  </div>
</template>

<script setup> 
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumb from "@/components/Breadcrumb.vue";
import CategorieFilter from "./components/CategorieFilter.vue";
import ProductList from "./components/ProductList.vue";
import ScrollToTop from "@/components/ScrollToTop.vue";
import { useCompanyData } from "@/composables/useCompanyData";

const {companyId} = useCompanyData();
// Add state to track if filters are available


const hasFilters = ref(true);

const route = useRoute();
const router = useRouter();
const error = ref(null);
const breadcrumbItems = ref([
  {
    label: "Accueil",
    url: "/",
  },
  {
    label: "",
    url: "#",
  },
]);
const filterSelections = ref([]);
const priceRange = ref([0, 1000]);
const minPrice = ref(0);
const maxPrice = ref(1000);
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
// Extract the category ID and slug from the route parameters
const categoryId = computed(() => route.params.cat_id);

// Category data from API
const categoryName = ref("");

// Update breadcrumb with actual category name
function updateBreadcrumb(name) {
  if (!name) return;
  
  // console.log("Setting breadcrumb with category name:", name);
    
  // Replace the breadcrumb completely
  breadcrumbItems.value = [
    {
      label: "Accueil",
      url: "/",
    },
    {
      label: name,
      url: "#",
    },
  ];
}

// Fetch category details from API
async function fetchCategoryDetails() {
  // Avoid fetching if we don't have a category ID
  if (!categoryId.value) return;
    
  try {
    const response = await fetch( baseURL + `categories-read/${categoryId.value}/`);
    if (response.ok) {
      const data = await response.json();
      
      if (data && data.name) {
        categoryName.value = data.name;
        // console.log("Category name updated:", categoryName.value);
        
        // Update breadcrumb with real category name
        updateBreadcrumb(data.name);
      } else {
        console.error("No category name in API response");
      }
    } else {
      console.error("Error response from category API:", response.status);
    }
  } catch (err) {
    console.error("Error fetching category details:", err);
  }
}

// Add initialization for breadcrumb in onMounted
onMounted(() => {
  // Initialize breadcrumb with placeholder until the API loads
  breadcrumbItems.value = [
    {
      label: "Accueil",
      url: "/",
    },
    {
      label: "",
      url: "#",
    },
  ];
  
  // Fetch actual data from API
  fetchCategoryDetails();
});

// Re-fetch when category ID changes, but only if it changes after initial mount
let initialLoad = true;
watch(categoryId, (newId, oldId) => {
  // Skip the first firing on mount, only react to changes
  if (initialLoad) {
    initialLoad = false;
    fetchCategoryDetails(); // Only fetch once on initial load
    return;
  }
  
  // After initial load, react to all changes
  if (newId !== oldId) {
    fetchCategoryDetails();
  }
});

function resetFilters() {
  filterSelections.value = [];
  priceRange.value = [minPrice.value, maxPrice.value];
  
  // Clear all filter-related URL parameters but preserve the current route path
  router.replace({
    path: route.path,
    query: {} // Empty query object to remove all parameters
  });
}

// Initialize data from URL params on component creation (before mount)
const initFromUrlParams = () => {
  try {
    // Initialize selected weights from URL on first load
    const attributesParam = route.query.has_attributs;
    if (attributesParam && attributesParam.trim() !== '') {
      filterSelections.value = attributesParam.split(',')
        .filter(id => id.trim() !== '')
        .map(id => parseInt(id, 10))
        .filter(id => !isNaN(id));
    } else {
      filterSelections.value = [];
    }
    
    // Initialize price range from URL on first load
    const minPriceParam = parseInt(route.query.price_gte);
    const maxPriceParam = parseInt(route.query.price_lte);
    
    // Only update if at least one value is valid
    if (!isNaN(minPriceParam) || !isNaN(maxPriceParam)) {
      priceRange.value = [
        !isNaN(minPriceParam) ? minPriceParam : minPrice.value,
        !isNaN(maxPriceParam) ? maxPriceParam : maxPrice.value
      ];
    }
  } catch (error) {
    console.error("Error initializing filters from URL:", error);
    // Fallback to defaults if there's an error
    filterSelections.value = [];
    priceRange.value = [minPrice.value, maxPrice.value];
  }
};

// Call immediately to ensure parameters are set before child components
initFromUrlParams();

// Add function to handle filter availability
function handleFilterAvailability(isAvailable) {
  hasFilters.value = isAvailable;
}
</script>

<style scoped>
.product-list-page {
  min-height: 80vh;
}

/* Add styles for the page header */
.page-header {
  padding: 4rem 0;
  background-color: #ebebeb;
  background-image: url('/images/page-header-bg.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  margin-bottom: 0;
  text-transform: uppercase;
}
</style>