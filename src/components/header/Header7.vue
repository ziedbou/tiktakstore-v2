<template>
  <!-- Mobile Side Navigation -->
  <MobileSideNav
    :open="mobileMenuOpen"
    :navigation="navigation"
    :company-data="companyData"
    :store-info="storeInfo"
    @close="mobileMenuOpen = false"
  />

  <header class="header-wrapper relative z-50 shadow-none lg:shadow-lg">
    <!-- Header Top Section - Phone left, navigation links right -->
    <TopBar
      :company-data="companyData"
      :store-info="storeInfo"
    />

    <!-- Header Middle Section - This will be the sticky part -->
    <div
      class="header-middle bg-white text-black border-b border-gray-200 transition-all duration-300"
      :class="{ 'sticky-header': isSticky }"
    >
      <div class="header-container">
        <!-- Desktop Layout (lg and up) -->
        <div class="hidden lg:flex justify-between items-center py-2">
          <!-- Logo and Navigation Links -->
          <div class="flex-1 flex items-center space-x-3 relative">
            <!-- Search Input Overlay (when expanded) -->
            <div
              v-if="showSearchInput"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 z-50"
            >
              <SearchBar v-model="search" class="w-80" />
            </div>

            <!-- Logo -->
            <NuxtLink
              to="/"
              class="logo-container transition-transform duration-300 hover:scale-105"
            >
              <NuxtImg
                class="h-20 w-auto max-h-[70px] max-w-[130px] object-contain"
                :src="cdnURL + companyData?.logo"
                :alt="companyData?.name || 'company logo'"
                width="auto"
                height="32"
                loading="eager"
                format="webp"
              />
            </NuxtLink>

            <!-- Navigation Links -->
            <!-- Dynamic Categories Navigation -->
            <template
              v-for="category in navigation.categories"
              :key="category.name"
            >
              <!-- Category without submenu -->
              <template
                v-if="!category.submenu || category.submenu.length === 0"
              >
                <!-- External category link -->
                <a
                  v-if="category.type === 'extern'"
                  :href="category.href"
                  class="nav-item px-3 py-2 rounded-md text-sm font-medium relative transition-colors duration-300"
                >
                  {{ category.name }}
                </a>
                <!-- Internal category link -->
                <NuxtLink
                  v-else
                  :to="category.href"
                  class="nav-item px-3 py-2 rounded-md text-sm font-medium relative transition-colors duration-300"
                >
                  {{ category.name }}
                </NuxtLink>
              </template>

              <!-- Category with submenu (dropdown) -->
              <div v-else class="relative dropdown-container">
                <button
                  class="nav-item px-3 py-2 rounded-md text-sm font-medium relative transition-colors duration-300 flex items-center space-x-1"
                >
                  <span>{{ category.name }}</span>
                  <svg
                    class="w-4 h-4 chevron"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                <NavigationDropdown :category="category" marginTop="mt-7" />
              </div>
            </template>

            <!-- Dynamic Pages Navigation
            <template v-for="page in navigation.pages" :key="page.name">
              <a
                v-if="page.type === 'extern'"
                :href="page.href"
                target="_blank"
                rel="noopener noreferrer"
                class="nav-item px-3 py-2 rounded-md text-sm font-medium relative transition-colors duration-300"
              >
                {{ page.name }}
                <svg
                  class="w-3 h-3 inline ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
              <NuxtLink
                v-else
                :to="page.href"
                class="nav-item px-3 py-2 rounded-md text-sm font-medium relative transition-colors duration-300"
              >
                {{ page.name }}
              </NuxtLink>
            </template> -->
          </div>

          <!-- User Actions -->
          <div class="flex-shrink-0 flex justify-end items-center space-x-4">
            <!-- Search Icon / X Button -->
            <button
              @click="toggleSearch"
              class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
            >
              <Icon
                :name="showSearchInput ? 'ph:x' : 'ph:magnifying-glass'"
                class="w-6 h-6"
              />
            </button>

            <!-- Wishlist -->
            <NavWishlistBtn
              :show-text="false"
              button-class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
              icon-class="w-6 h-6"
            />

            <!-- Account -->
            <NuxtLink
              to="/account"
              class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
            >
              <Icon name="ph:user" class="w-6 h-6" />
            </NuxtLink>

            <!-- Cart -->
            <NavCartBtn
              :show-text="false"
              button-class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
              icon-class="w-6 h-6"
            />
          </div>
        </div>

        <!-- Mobile/Tablet Layout (md and down) -->
        <div class="lg:hidden flex justify-between items-center py-2 lg:py-4">
          <!-- Mobile Menu Button -->
           <div class="flex-1">
          <button
            type="button"
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
          </div>
          <!-- Logo -->
          <div class="flex-1 flex justify-center">
            <NuxtLink
              to="/"
              class="logo-container transition-transform duration-300 hover:scale-105"
            >
              <NuxtImg
                class="h-16 w-auto max-w-[100px] object-contain"
                :src="cdnURL + companyData?.logo"
                :alt="companyData?.name || 'company logo'"
                width="auto"
                height="32"
                loading="eager"
                format="webp"
              />
            </NuxtLink>
          </div>

          <!-- User Actions -->
          <div class="flex flex-1 items-center justify-end gap-1 sm:gap-4">
            <!-- Mobile Search Button -->
            <SearchBar
              v-model="search"
              mobile="true"
              class="lg:hidden"
              v-if="isMobile"
            >
              <template #trigger="{ toggleMobileSearch, mobileSearchOpen }">
                <button
                  @click="toggleMobileSearch"
                  class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
                >
                  <Icon
                    :name="mobileSearchOpen ? 'ph:x' : 'ph:magnifying-glass'"
                    class="w-5 h-5"
                  />
                </button>
              </template>
            </SearchBar>

            <!-- Cart -->
            <NavCartBtn
              :isMobileCart="true"
              :show-text="false"
              button-class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
              icon-class="w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results (Desktop only) -->
    <ProductSearch
      :search-query="search"
      @clear-search="clearSearch"
      :dropdown-height="'calc(100vh - 124px)'"
      :top-offset="'160px'"
      :is-mobile="isMobile"
      class="hidden lg:block"
      v-if="!isMobile"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { useCompanyData } from "@/composables/useCompanyData";
import TopBar from "~/components/header/components/TopBar.vue";
import MobileSideNav from "~/components/header/components/MobileSideNav.vue";
import NavigationDropdown from "~/components/header/components/NavigationDropdown.vue";
import SearchBar from "~/components/header/components/SearchBar.vue";
import ProductSearch from "~/components/header/components/ProductSearch.vue";
import NavCartBtn from "~/components/header/components/NavCartBtn.vue";
import NavWishlistBtn from "~/components/header/components/NavWishlistBtn.vue";
import { useMenu } from "~/composables/useMenu";
import { useViewport } from "~/composables/useViewport";

// Define props
const props = defineProps({
  storeInfo: {
    type: Object,
    default: () => ({}),
  },
});

const { companyData } = useCompanyData();

// Get CDN URL from runtime config
const config = useRuntimeConfig();
const cdnURL = config.public.cdnURL;
const baseURL = config.public.baseURL;

// Use the new composable for menu data with SSR
const { menuData: navigation } = useMenu({
  companyId: companyData.value.id,
  position: "header",
});

// Use viewport composable
const { isMobile } = useViewport(1024);

// Reactive variables
const mobileMenuOpen = ref(false);
const search = ref("");
const isSticky = ref(false);
const showSearchInput = ref(false);

const clearSearch = () => {
  search.value = "";
};

const toggleSearch = () => {
  if (showSearchInput.value) {
    showSearchInput.value = false;
    search.value = "";
  } else {
    showSearchInput.value = true;
    // Focus the input after the SearchBar component is rendered
    nextTick(() => {
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.focus();
      }
    });
  }
};

// Scroll event handler
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  isSticky.value = scrollPosition > 500;
};

onMounted(() => {
  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  // Remove scroll event listener
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.header-middle {
  background-color: var(--header-middle-bg);
  color: var(--header-middle-color);
}

.search-input:focus {
  border-color: var(--header-middle-color-hover);
}

/* Dropdown navigation styles */
.dropdown {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-container:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Keep nav link hover state when dropdown is active */
.dropdown-container:hover .nav-item {
  color: var(--header-middle-color-hover) !important;
}

.dropdown-container:hover .nav-item::after {
  width: 100% !important;
}

/* Keep chevron rotated when dropdown is active */
.dropdown-container:hover .chevron {
  transform: rotate(180deg) !important;
  color: var(--header-middle-color-hover) !important;
}

/* Create invisible hover bridge to maintain dropdown visibility */
.dropdown-container::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 28px; /* Match mt-7 = 28px */
  background: transparent;
  z-index: 1;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--header-middle-color-hover);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-item:hover::after,
.dropdown-container:hover .nav-item::after {
  width: 100%;
}

/* Navigation item hover effects using CSS variables */
.nav-item:hover {
  color: var(--header-middle-color-hover) !important;
}

.glass-effect {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chevron {
  transition: transform 0.3s ease;
}


/* Active nav link underline effect - Complex CSS that's easier to maintain here */
.nav-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background-color: var(--header-badge-bg);
  border-radius: 2px;
}
</style>
