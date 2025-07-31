<template>
  <div v-if="hasFilters">
    <!-- Filters section -->
    <div class="mb-6">
      <div
        class="flex items-center justify-between mb-7"
      >
        <span class="text-gray-700 text-sm flex items-center gap-2">
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
          >
            <path d="M3 6h18"></path>
            <path d="M7 12h10"></path>
            <path d="M10 18h4"></path>
          </svg>
          Filtres
        </span>
        <button
          :disabled="!hasActiveFilters"
          @click="resetFilters"
          class="reset-button text-sm flex items-center gap-2 p-2 rounded-md transition-all duration-300 relative overflow-hidden"
          :class="[
            hasActiveFilters 
              ? 'text-blue-600 hover:bg-blue-50' 
              : 'text-gray-400 !cursor-not-allowed opacity-60'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            <!-- Use direct SVG with CSS-only animation -->
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              class="w-4 h-4 reset-icon"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Réinitialiser
          </span>
        </button>
      </div>

      <!-- Loading state for filters -->

      <div v-if="loading" class="py-7 space-y-5">
        <div class="space-y-2" v-for="i in 2" :key="i">
          <div class="waiting" style="height: 30px" />
          <div class="waiting" style="height: 15px" />
          <div class="waiting" style="height: 15px" />
        </div>
      </div>

      <div
        v-else-if="error"
        class="bg-red-100 border-red-400 text-red-700 px-4 py-3 my-4"
      >
        {{ error }}
      </div>

      <div v-else>
         <!-- Subcategories Filter -->
         <div v-if="subcategories.length > 0" class="border-t border-gray-300">
          <div
            @click="toggleFilter('subcategories')"
            class="flex items-center justify-between cursor-pointer py-4"
          >
            <h3 class="text-lg">Sous Catégories</h3>
            <div v-if="isFilterOpen('subcategories')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div v-else>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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

          <transition
            name="accordion"
            @enter="setContentHeight"
            @before-leave="setContentHeight"
            @after-leave="resetHeight"
          >
            <div v-if="isFilterOpen('subcategories')" class="accordion-content overflow-hidden">
              <div class="space-y-2 mb-4">
                <div
                  v-for="category in subcategories"
                  :key="category.id"
                  class="flex items-center justify-between"
                  :class="{'opacity-50 cursor-not-allowed': category.count === 0}"
                >
                  <div class="flex items-center flex-1">
                    <input
                      type="checkbox"
                      :id="`subcategory-${category.id}`"
                      class="custom-checkbox sr-only"
                      :value="category.id"
                      :checked="isSubcategorySelected(category.id)"
                      @change="toggleSubcategory(category.id)"
                      :disabled="category.count === 0"
                    />
                    <label
                      :for="`subcategory-${category.id}`"
                      class="flex items-center"
                      :class="{'cursor-pointer': category.count > 0, 'cursor-not-allowed': category.count === 0}"
                    >
                      <div 
                        class="w-4 h-4 border border-gray-300 mr-3 flex items-center justify-center transition-all duration-200"
                        :class="[
                          isSubcategorySelected(category.id) ? 'bg-black border-black' : 'bg-white',
                          category.count > 0 ? 'hover:border-gray-400' : '',
                          category.count === 0 ? 'bg-gray-100 border-gray-200' : ''
                        ]"
                      >
                        <svg
                          v-if="isSubcategorySelected(category.id)"
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <span :class="{'text-gray-900': category.count === 0}">{{ category.name }}</span>
                    </label>
                  </div>
                  <span class="text-gray-400 ml-2">{{ category.count }}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!-- Dynamic Filters -->
        <div
          v-for="filter in availableFilters"
          :key="filter.option_slug"
          class="border-t border-gray-300"
        >
          <div
            @click="toggleFilter(filter.option_slug)"
            class="flex items-center justify-between cursor-pointer py-4"
          >
            <h3 class="text-lg">{{ filter.option_name }}</h3>
            <div v-if="isFilterOpen(filter.option_slug)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div v-else>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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

          <transition
            name="accordion"
            @enter="setContentHeight"
            @before-leave="setContentHeight"
            @after-leave="resetHeight"
          >
            <div v-if="isFilterOpen(filter.option_slug)" class="accordion-content overflow-hidden">
              <div class="space-y-2 mb-4">
                <!-- Color Filter -->
                <div v-if="filter.is_color" class="grid grid-cols-2 gap-2">
                  <div
                    v-for="value in filter.values"
                    :key="value.id"
                    class="relative"
                  >
                    <input
                      type="checkbox"
                      :id="`${filter.option_slug}-${value.id}`"
                      class="peer sr-only"
                      :value="value.id"
                      :checked="isValueSelected(filter.option_slug, value.id)"
                      @change="toggleFilterValue(filter.option_slug, value.id)"
                    />
                    <label
                      :for="`${filter.option_slug}-${value.id}`"
                      class="cursor-pointer flex gap-2 items-center"
                    >
                      <div
                        class="relative bg-transparent rounded-full flex items-center justify-center w-7 h-7"
                        :style="{
                          border: isValueSelected(filter.option_slug, value.id)
                            ? `2px solid ${value.value}`
                            : 'none',
                        }"
                      >
                        <div
                          class="w-5 h-5 rounded-full"
                          :style="{
                            backgroundColor: value.value,
                          }"
                        />
                      </div>
                      <span class="text-xs" :class="isValueSelected(filter.option_slug, value.id) ? 'font-semibold' : ''"
                        >{{ value.name }}
                        <span class="text-gray-400">({{ value.count }})</span></span>
                    </label>
                  </div>
                </div>

                <!-- Regular Filter -->
                <div v-else class="space-y-2">
                  <div
                    v-for="value in filter.values"
                    :key="value.id"
                    class="flex items-center justify-between"
                  >
                    <div class="flex items-center flex-1">
                      <input
                        type="checkbox"
                        :id="`${filter.option_slug}-${value.id}`"
                        class="custom-checkbox sr-only"
                        :value="value.id"
                        :checked="isValueSelected(filter.option_slug, value.id)"
                        @change="toggleFilterValue(filter.option_slug, value.id)"
                      />
                      <label
                        :for="`${filter.option_slug}-${value.id}`"
                        class="flex items-center cursor-pointer"
                      >
                        <div 
                          class="w-4 h-4 border border-gray-300 mr-3 flex items-center justify-center transition-all duration-200 cursor-pointer"
                          :class="isValueSelected(filter.option_slug, value.id) ? 'bg-black border-black' : 'bg-white hover:border-gray-400'"
                        >
                          <svg
                            v-if="isValueSelected(filter.option_slug, value.id)"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="0.5"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <span>{{ value.name }}</span>
                      </label>
                    </div>
                    <span class="text-gray-400 ml-2">{{ value.count }}</span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Price Filter -->
        <div class="border-y border-gray-300">
          <div
            @click="toggleFilter('price')"
            class="flex items-center justify-between cursor-pointer py-4"
          >
            <h3 class="text-lg">Prix</h3>
            <div v-if="isFilterOpen('price')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition-transform duration-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div v-else>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition-transform duration-300"
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

          <transition
            name="accordion"
            @enter="setContentHeight"
            @before-leave="setContentHeight"
            @after-leave="resetHeight"
          >
            <div v-if="isFilterOpen('price')" class="accordion-content overflow-hidden">             
                <PriceRange
                  v-model:priceRange="priceRange"
                  :minPrice="minPrice"
                  :maxPrice="maxPrice"
                  @apply="applyPriceFilter"
                />
              </div>
          </transition>
        </div>

       
      </div>
    </div>
  </div>
  <div v-else-if="loading" class="py-7 space-y-5">
    <div class="space-y-2" v-for="i in 2" :key="i">
      <div class="waiting" style="height: 30px" />
      <div class="waiting" style="height: 15px" />
      <div class="waiting" style="height: 15px" />
    </div>
  </div>
  <div
    v-else-if="error"
    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4"
  >
    {{ error }}
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PriceRange from "./PriceRange.vue";

// Props and emits
const props = defineProps({
  categoryId: {
    type: [String, Number],
    required: true,
  },
  companyId: {
    type: [String],
    required: true,
  },
});

const emit = defineEmits([
  "update:filterSelections",
  "update:priceRange",
  "filter-change",
  "reset-filters",
]);

// Reactive state
const route = useRoute();
const router = useRouter();
const openFilters = ref({});
const selectedFilters = ref({});
const priceRange = ref([0, 1000]);
const minPrice = ref(0);
const maxPrice = ref(1000);
const filters = ref([]);
const loading = ref(true);
const error = ref(null);
const subcategoriesData = ref([]); // This stores the subcategories from API
const selectedSubcategories = ref([]);

const config = useRuntimeConfig()
const baseURL = config.public.baseURL
// Use subcategories from the reactive state
const subcategories = computed(() => subcategoriesData.value);

// Parse selected filters from URL
const parseSelectedFiltersFromUrl = () => {
  const attributesParam = route.query.has_attributs;
  if (!attributesParam) {
    selectedFilters.value = {};
    emit("update:filterSelections", []); // Emit empty array when no filters
    return;
  }

  const attributeIds = attributesParam
    .split(",")
    .map((id) => parseInt(id, 10));
    
  // Emit the attribute IDs for ProductList component
  emit("update:filterSelections", attributeIds);

  // Group selected values by their filter
  filters.value.forEach((filter) => {
    const selectedValues = filter.values
      .filter((value) => attributeIds.includes(value.id))
      .map((value) => value.id);
    
    if (selectedValues.length > 0) {
      selectedFilters.value[filter.option_slug] = selectedValues;
    }
  });
};

// Parse price range from URL query parameters
const parsePriceRangeFromUrl = () => {
  // Always set allowed range to 0 and 1000
  minPrice.value = 0;
  maxPrice.value = 1000;

  // Get filter values from URL
  const minPriceParam = parseInt(route.query.price_gte);
  const maxPriceParam = parseInt(route.query.price_lte);

  priceRange.value = [
    !isNaN(minPriceParam) ? minPriceParam : minPrice.value,
    !isNaN(maxPriceParam) ? maxPriceParam : maxPrice.value
  ];

  // Emit updated price range
  emit("update:priceRange", priceRange.value);
};

// Parse subcategories from URL
const parseSubcategoriesFromUrl = () => {
  const subcategoriesParam = route.query.has_category;
  if (!subcategoriesParam) {
    selectedSubcategories.value = [];
    return;
  }

  selectedSubcategories.value = subcategoriesParam
    .split(",")
    .map((id) => parseInt(id, 10))
    .filter(id => !isNaN(id));
};

// Fetch subcategories at top level for proper SSR
const { data: subcategoriesResponse, error: subcategoriesError } = await useFetch(
  () => `${baseURL}categories-read/${props.categoryId}`,
  {
    key: `subcategories-${props.categoryId}`,
    fresh: false,
    transform: (data) => data.subcategories || []
  }
);

// Fetch filters at top level for proper SSR  
const { data: filtersResponse, status: filtersStatus, error: filtersError } = await useFetch(
  () => `${baseURL}category-filters/${props.categoryId}/${props.companyId}`,
  {
    key: `filters-${props.categoryId}-${props.companyId}`,
    fresh: false,
    server: false
  }
);

// Watch for subcategories data changes
watch(subcategoriesResponse, (newData) => {
  if (newData) {
    subcategoriesData.value = newData;
  }
}, { immediate: true });

// Watch for filters data changes
watch(filtersResponse, (newData) => {
  if (newData) {
    filters.value = newData;
    
    // After fetching filters, parse any URL parameters
    parseSelectedFiltersFromUrl();
    parsePriceRangeFromUrl();
    parseSubcategoriesFromUrl();
    
    // Set all filters to open by default after they're loaded
    filters.value.forEach((filter) => {
      openFilters.value[filter.option_slug] = true;
    });
    // Set price filter to open by default
    openFilters.value["price"] = true;
    // Set subcategories filter to open by default
    openFilters.value["subcategories"] = true;
  }
}, { immediate: true });

// Watch for loading state
watch(filtersStatus, (status) => {
  loading.value = status === 'pending';
}, { immediate: true });

// Watch for errors
watch([subcategoriesError, filtersError], ([subError, filterError]) => {
  if (subError) {
    console.error("Error fetching subcategories:", subError);
    subcategoriesData.value = [];
  }
  if (filterError) {
    console.error("Error fetching filters:", filterError);
    error.value = "Failed to load filters. Please try again later.";
    filters.value = [];
  } else {
    error.value = null;
  }
}, { immediate: true });

// Toggle filter section
function toggleFilter(filterSlug) {
  openFilters.value[filterSlug] = !openFilters.value[filterSlug];
}

function isFilterOpen(filterSlug) {
  return openFilters.value[filterSlug] === true;
}

// Check if a value is selected
function isValueSelected(filterSlug, valueId) {
  return selectedFilters.value[filterSlug]?.includes(valueId) || false;
}

// Toggle filter value
function toggleFilterValue(filterSlug, valueId) {
  if (!selectedFilters.value[filterSlug]) {
    selectedFilters.value[filterSlug] = [];
  }

  const index = selectedFilters.value[filterSlug].indexOf(valueId);
  if (index === -1) {
    selectedFilters.value[filterSlug].push(valueId);
  } else {
    selectedFilters.value[filterSlug].splice(index, 1);
  }

  // Get flattened array of all selected attribute IDs
  const allSelectedIds = Object.values(selectedFilters.value).flat();
  
  // Emit the flattened array for compatibility with ProductList component
  emit("update:filterSelections", allSelectedIds);
  
  updateUrlWithFilters();
}

// Update URL with selected filters
const updateUrlWithFilters = () => {
  const query = { ...route.query };

  // Convert selected filters to URL parameters
  const hasAttributs = Object.values(selectedFilters.value)
    .flat()
    .join(",");

  if (hasAttributs) {
    query.has_attributs = hasAttributs;
  } else {
    delete query.has_attributs;
  }

  // Reset to page 1 when filters change
  delete query.page;

  router.replace({ query });
  emit("filter-change");
};

// Toggle subcategory selection
function toggleSubcategory(id) {
  // Find the subcategory by id
  const subcategory = subcategories.value.find(cat => cat.id === id);
  
  // If count is 0 or subcategory doesn't exist, don't allow toggling
  if (!subcategory || subcategory.count === 0) {
    return;
  }
  
  const index = selectedSubcategories.value.indexOf(id);
  if (index === -1) {
    selectedSubcategories.value.push(id);
  } else {
    selectedSubcategories.value.splice(index, 1);
  }

  updateUrlWithSubcategories();
}

// Check if a subcategory is selected
function isSubcategorySelected(id) {
  return selectedSubcategories.value.includes(id);
}

// Update URL with selected subcategories
const updateUrlWithSubcategories = () => {
  const query = { ...route.query };

  if (selectedSubcategories.value.length > 0) {
    query.has_category = selectedSubcategories.value.join(",");
  } else {
    delete query.has_category;
  }

  // Reset to page 1 when subcategories change
  delete query.page;

  router.replace({ query });
  emit("filter-change");
};

// Reset all filters
function resetFilters() {
  selectedFilters.value = {};
  priceRange.value = [minPrice.value, maxPrice.value];
  selectedSubcategories.value = [];

  const query = { ...route.query };
  delete query.has_attributs;
  delete query.price_gte;
  delete query.price_lte;
  delete query.has_category;
  delete query.page;

  router.replace({ query });
  
  // Emit empty array for filterSelections
  emit("update:filterSelections", []);
  emit("update:priceRange", priceRange.value);
  emit("reset-filters");
}

// Methods for smooth accordion transitions
function setContentHeight(el) {
  el.style.height = el.scrollHeight + 'px';
}

function resetHeight(el) {
  el.style.height = '';
}

// Computed property to check if any filters are active
const hasActiveFilters = computed(() => {
  const hasSelectedAttributes = Object.values(selectedFilters.value).some(arr => arr.length > 0);
  const hasCustomPriceRange = priceRange.value[0] > minPrice.value || priceRange.value[1] < maxPrice.value;
  const hasSelectedSubcategories = selectedSubcategories.value.length > 0;
  return hasSelectedAttributes || hasCustomPriceRange || hasSelectedSubcategories;
});

// Watch for URL query parameter changes
watch(
  () => route.query,
  (newQuery) => {
    // If query is empty (after reset), reset component state
    if (Object.keys(newQuery).length === 0) {
      selectedFilters.value = {};
      priceRange.value = [minPrice.value, maxPrice.value];
      selectedSubcategories.value = [];
      emit("update:filterSelections", []);
      emit("update:priceRange", priceRange.value);
      return;
    }

    // Check for has_attributs changes
    const newAttributs = newQuery.has_attributs;
    if (
      newAttributs !== Object.values(selectedFilters.value).flat().join(",")
    ) {
      parseSelectedFiltersFromUrl();
    }

    // Check for price range changes
    const newMinPrice = parseInt(newQuery.price_gte) || minPrice.value;
    const newMaxPrice = parseInt(newQuery.price_lte) || maxPrice.value;
    if (
      newMinPrice !== priceRange.value[0] ||
      newMaxPrice !== priceRange.value[1]
    ) {
      priceRange.value = [newMinPrice, newMaxPrice];
      emit("update:priceRange", priceRange.value);
    }

    // Check for subcategory changes
    const newSubcategories = newQuery.has_category;
    if (newSubcategories !== selectedSubcategories.value.join(",")) {
      parseSubcategoriesFromUrl();
    }
  },
  { deep: true }
);

// Apply price filter
function applyPriceFilter() {
  const query = { ...route.query };

  // Add price range to query
  query.price_gte = priceRange.value[0];
  query.price_lte = priceRange.value[1];

  // Reset to page 1 when price filter changes
  delete query.page;

  // Update URL without reloading the page
  router.replace({ query });

  // Emit updated price range and change event
  emit("update:priceRange", priceRange.value);
  emit("filter-change");
}

// Add computed property to check if there are any filters available
const availableFilters = computed(() => {
  return filters.value.filter(filter => filter.values && filter.values.length > 0);
});

// Add computed property to check if there are any filters to show
const hasFilters = computed(() => {
  return loading.value || error.value || availableFilters.value.length > 0;
});
</script>

<style scoped>
.filter-loading {
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Accordion transitions */
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0 !important;
  opacity: 0;
}

/* Pure CSS rotation animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.reset-icon {
  transition: transform 0.8s ease;
  transform-origin: center;
}

/* Using CSS animation with the active state is more reliable */
.reset-button:active .reset-icon {
  animation: spin 1.2s cubic-bezier(0.3, 0.7, 0.4, 1);
}

/* Also add animation on hover for better feedback */
@media (hover: hover) {
  .reset-button:hover:not(:disabled) .reset-icon {
    transform: rotate(180deg);
  }
}

/* Custom checkbox styles */
label:hover .custom-checkbox + div {
  border-color: #666;
}

/* Add a subtle scale animation when clicking the checkbox */
.custom-checkbox:checked + div {
  transform: scale(1.05);
}

.custom-checkbox:focus + div {
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}
</style>
