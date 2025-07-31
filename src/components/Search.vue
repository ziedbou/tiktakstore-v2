<!-- components/Search.vue -->
<template>
  <div 
    :class="{ 'z-60 w-full h-fit  absolute inset-0 top-15 flex items-center justify-center': searchExpanded }"
    class="flex nav-search-container"
  >
    <div
      :class="{ 'hidden': !searchExpanded }"
      class="fixed bg-gray-500/75 backdrop-blur-[2px] inset-0 nav-search-overlay" 
      @click="handleCloseSearchContainer"
    ></div>
    <div 
      class="relative flex justify-end nav-search-form-container"
      :class="{ 'w-[100vw] md:w-[20rem]': searchExpanded }"
    >
      <form @submit.prevent="searchCall()" class="relative nav-search-form">
        <button 
          @click="handleCloseSearchContainer" 
          class="fixed top-[-50px] delay-0 duration-300 left-1/2 -translate-x-1/2 md:absolute md:left-[70px] md:top-[50%] md:-translate-y-1/2 md:opacity-0 nav-search-close-button" 
          :class="{'top-[10px] md:opacity-100 !delay-500': searchExpanded}"
        >
          <CircleX color="white" size="32" class="nav-search-close-icon"/>
        </button>
        <button 
          type="button" 
          @click="handleSearchClick" 
          class="p-2 text-gray-400 hover:text-gray-500 cursor-pointer z-20 relative nav-search-button" 
          tabindex="1"
        >
          <span class="sr-only">Search</span>
          <svg 
            stroke="currentColor" 
            fill="currentColor" 
            stroke-width="0" 
            viewBox="0 0 24 24" 
            height="24" 
            width="24" 
            xmlns="http://www.w3.org/2000/svg" 
            class="nav-search-icon"
          >
            <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
          </svg>
        </button>
        <input 
          ref="searchInput"
          v-model="search"
          type="search" 
          class="search-input-animated absolute top-1/2 -translate-y-1/2 right-0 w-0 py-2 px-4 border-0 border-transparent rounded-full outline-none transition-all duration-400 ease-in-out text-sm bg-transparent hover:w-80 hover:pr-12 hover:border hover:border-gray-300 hover:bg-gray-50 focus:w-80 focus:pr-12 focus:border focus:border-gray-300 focus:bg-gray-50 z-10 nav-search-input" 
          :class="{ 'search-expanded': searchExpanded }"
          placeholder="Search..." 
          tabindex="2"
          @blur="handleSearchBlur"
        >
      </form>
      <div 
        class="z-20 rounded-md absolute top-[120%] md:top-[180%] w-full md:w-5xl left-1/2 -translate-x-1/2 h-100 hidden opacity-0 h-fit bg-white nav-search-results" 
        :class="{ 'search-result-container': searchExpanded }"
      >
        <div class="mx-auto pb-5 nav-search-results-inner">
          <div v-if="search.length > 0" class="nav-search-results-content">
            <div class="h-full pt-4 px-5 lg:px-9 nav-search-results-title-container" :class="{'hidden' : !productSearch.length && !isLoading}">
              <h2 class="text-gray-400 font-bold nav-search-results-title">Résultat de la recherche</h2>
            </div>
            <div class="max-h-[70vh] pt-4 overflow-auto px-4 lg:px-8 nav-search-results-grid">
              <div v-if="!isLoading" class="nav-search-results-items">
                <div v-if="productSearch.length > 0" class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 nav-search-results-grid-inner">
                  <button 
                    @click="navigateToProduct(prod)" 
                    v-for="prod,index in productSearch" 
                    :key="index" 
                    href="#" 
                    class="group nav-search-result-item"
                  >
                    <img 
                      :src="imghttps(prod?.photo)" 
                      alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." 
                      class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 nav-search-result-img"
                    >
                    <h3 class="mt-4 text-sm text-gray-700 nav-search-result-title">{{ prod.name }}</h3>
                    <p class="mt-1 text-lg font-medium text-gray-900 nav-search-result-price">{{prod.price}} {{ companyData.currency }}</p>
                  </button>
                </div>
                <div v-else class="nav-search-no-results">
                  <h2 class="py-16 sm:py-24 text-2xl md:text-5xl text-gray-300 font-bold -mt-4 nav-search-no-results-title">
                    Aucun produit avec ce nom <span class="text-gray-400">'{{ search }}'</span>
                  </h2>
                </div>
              </div>
              <div v-else class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 nav-search-loading">
                <div href="#" class="group animate-pulse nav-search-loading-item">
                  <div class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 nav-search-loading-img"></div>
                  <p class="mt-1 text-lg font-medium text-gray-900 px-5 bg-gray-200 mt-2 py-2 rounded-md nav-search-loading-title"></p>
                  <p class="mt-1 text-lg font-medium text-gray-900 px-5 bg-gray-200 w-1/2 py-2 mt-2 rounded-md nav-search-loading-price"></p>
                </div>
                <div href="#" class="group animate-pulse nav-search-loading-item">
                  <div class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 nav-search-loading-img"></div>
                  <p class="mt-1 text-lg font-medium text-gray-900 px-5 bg-gray-200 mt-2 py-2 rounded-md nav-search-loading-title"></p>
                  <p class="mt-1 text-lg font-medium text-gray-900 px-5 bg-gray-200 w-1/2 py-2 mt-2 rounded-md nav-search-loading-price"></p>
                </div>
                <div href="#" class="group animate-pulse nav-search-loading-item">
                  <div class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 nav-search-loading-img"></div>
                  <p class="mt-1 text-lg font-medium text-gray-900 px-5 bg-gray-200 mt-2 py-2 rounded-md nav-search-loading-title"></p>
                  <p class="mt-1 text-lg font-medium text-gray-900 px-5 bg-gray-200 w-1/2 py-2 mt-2 rounded-md nav-search-loading-price"></p>
                </div>
                <div href="#" class="group animate-pulse nav-search-loading-item">
                  <div class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 nav-search-loading-img"></div>
                  <p class="mt-1 text-lg font-medium text-gray-900 px-5 bg-gray-200 mt-2 py-2 rounded-md nav-search-loading-title"></p>
                  <p class="mt-1 text-lg font-medium text-gray-900 px-5 bg-gray-200 w-1/2 py środków: 0px; 2 mt-2 rounded-md nav-search-loading-price"></p>
                </div>
              </div> 
            </div>
          </div>
          <div v-else class="nav-search-empty">
            <h2 class="py-16 sm:px-6 sm:py-24 text-2xl md:text-5xl text-gray-300 font-bold px-5 lg:px-9 nav-search-empty-title">Ecrire pour rechercher ...</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { CircleX } from 'lucide-vue-next';
import { useCompanyData } from '@/composables/useCompanyData';
import { getProductLink, imghttps } from '~/composables/services/helpers';

const { companyId, companyData } = useCompanyData();
const config = useRuntimeConfig();
const baseURL = config.public.baseURL;

const search = ref('');
const searchExpanded = ref(false);
const searchInput = ref(null);
const productSearch = ref([]);
const isLoading = ref(false);

watch(search, async (val) => {
  if (val.length > 0) {
    isLoading.value = true;
    productSearch.value = [];
    try {
      const res = await $fetch(
        `${baseURL}products-read/?company=${companyId.value}&no_parent=true&active=true&show-children=false&search=${val}`
      );
      productSearch.value = res.results;
      console.log('Search results:', res.results);
      isLoading.value = false;
    } catch (error) {
      console.error('API Error:', error);
    }
  } else {
    productSearch.value = [];
  }
});

function searchCall() {
  if (searchExpanded.value && search.value.trim()) {
    navigateTo(`/search?product=${encodeURIComponent(search.value.trim())}`);
  }
}

function handleSearchClick() {
  if (!searchExpanded.value) {
    searchExpanded.value = true;
    searchInput.value.focus();
    document.body.style.overflow = 'hidden';
  } else if (search.value.trim()) {
    navigateTo(`/search?product=${encodeURIComponent(search.value.trim())}`);
  }
}

function handleSearchBlur() {
  // Optional: Uncomment if you want to collapse the search when it loses focus and is empty
  // if (search.value.trim() === '') {
  //   searchExpanded.value = false;
  // }
}

function handleCloseSearchContainer() {
  search.value = '';
  searchExpanded.value = false;
  document.body.style.overflow = '';
}

function navigateToProduct(prod) {
  handleCloseSearchContainer();
  setTimeout(() => {
    navigateTo(getProductLink(prod));
  }, 500);
}
</script>

<style scoped>
@media screen and (width <= 1050px) {
  .search-result-container {
    width: 100vw;
  }
}

/* Search input expanded state when it has content */
.search-input-animated:not(:placeholder-shown),
.search-input-animated.search-expanded {
  width: 20rem !important;
  padding-right: 3rem !important;
  border: 1px solid #d1d5db !important;
  background-color: #f9fafb !important;
}

@media screen and (width <= 48rem) {
  .search-input-animated.search-expanded {
    width: 100vw !important;
  }
}

/* Webkit search cancel button */
.search-input-animated::-webkit-search-cancel-button {
  position: relative;
  right: 10px;
  cursor: pointer;
}

.search-result-container {
  display: block;
  opacity: 1;
}
</style>