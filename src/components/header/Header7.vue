<template>
  <!-- Mobile Side Navigation -->
  <MobileSideNav
    :open="mobileMenuOpen"
    :navigation="navigation"
    :company-data="companyData"
    :store-info="storeInfo"
    @close="mobileMenuOpen = false"
  />

  <header class="header-wrapper relative z-50 shadow-lg" :style="headerStyles">
    <!-- Header Top Section - Phone left, navigation links right -->
    <TopBar 
      :company-data="companyData" 
      :store-info="storeInfo" 
      :show-nav-links="true" 
      :show-phone="true"
      :show-social-media="false" 
    />

    <!-- Header Middle Section - This will be the sticky part -->
    <div
      class="header-middle bg-white text-black border-b border-gray-200 transition-all duration-300"
      :class="{ 'sticky-header': isSticky }"
      style="
        background-color: var(--header-middle-bg, #ffffff);
        color: var(--header-middle-color, #000000);
      "
    >
      <div class="header-container">
        <!-- Desktop Layout (lg and up) -->
        <div class="hidden lg:flex justify-between items-center py-4">
          <!-- Logo and Navigation Links -->
          <div class="flex-1 flex items-center space-x-3 relative">
            <!-- Search Input Overlay (when expanded) -->
            <div v-if="showSearchInput" class="absolute right-0 top-1/2 transform -translate-y-1/2 z-50">
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
              <template v-if="!category.submenu || category.submenu.length === 0">
                <!-- External category link -->
                <a
                  v-if="category.type === 'extern'"
                  :href="category.href"
                  target="_blank"
                  rel="noopener noreferrer"
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

                <NavigationDropdown :category="category" marginTop="mt-3" />
              </div>
            </template>

            <!-- Dynamic Pages Navigation -->
            <template v-for="page in navigation.pages" :key="page.name">
              <!-- External page link -->
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
              <!-- Internal page link -->
              <NuxtLink
                v-else
                :to="page.href"
                class="nav-item px-3 py-2 rounded-md text-sm font-medium relative transition-colors duration-300"
              >
                {{ page.name }}
              </NuxtLink>
            </template>
          </div>

          <!-- User Actions -->
          <div class="flex-shrink-0 flex justify-end items-center space-x-4">
            <!-- Search Icon / X Button -->
            <button 
              @click="toggleSearch"
              class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
            >
              <Icon :name="showSearchInput ? 'ph:x' : 'ph:magnifying-glass'" class="w-6 h-6" />
            </button>

            <!-- Wishlist -->
            <NuxtLink
              to="/wishlist"
              class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
            >
              <div class="relative flex items-center justify-center">
                <Icon name="ph:heart" class="w-6 h-6" />
                <span
                  v-if="wishlistCount > 0"
                  class="cart-badge absolute -top-2 -right-2 flex items-center justify-center h-4 min-w-4 px-1 text-xs font-bold rounded-full"
                  style="
                    background-color: var(--header-badge-bg, #e05050);
                    color: var(--header-badge-color, #ffffff);
                  "
                  >{{ wishlistCount }}</span
                >
              </div>
            </NuxtLink>

            <!-- Account -->
            <NuxtLink
              to="/account"
              class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
            >
              <Icon name="ph:user" class="w-6 h-6" />
            </NuxtLink>

            <!-- Cart -->
            <NavCartBtn />
          </div>
        </div>

        <!-- Mobile/Tablet Layout (md and down) -->
        <div class="lg:hidden flex justify-between items-center py-2 lg:py-4">
          <!-- Mobile Menu Button -->
          <button
            type="button"
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>

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
          <div class="flex items-center gap-4">
            <!-- Mobile Search Button -->
            <SearchBar v-model="search" mobile="true" class="lg:hidden" v-if="isMobile">
              <template #trigger="{ toggleMobileSearch, mobileSearchOpen }">
                <button 
                  @click="toggleMobileSearch"
                  class="user-action-link-vertical flex items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
                >
                  <Icon :name="mobileSearchOpen ? 'ph:x' : 'ph:magnifying-glass'" class="w-5 h-5" />
                </button>
              </template>
            </SearchBar>

            <!-- Cart -->
            <NavCartBtn 
              icon-class="w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>



    <!-- Search Results (Desktop only) -->
    <ProductSearch
      :search-query="search"
      @product-selected="navigateToProduct"
      :dropdown-height="'calc(100vh - 160px)'"
      :top-offset="'160px'"
      :is-mobile="isMobile"
      class="hidden lg:block"
      v-if="!isMobile"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { useCompanyData } from "@/composables/useCompanyData";
import TopBar from "~/components/header/components/TopBar.vue";
import MobileSideNav from "~/components/header/components/MobileSideNav.vue";
import NavigationDropdown from "~/components/header/components/NavigationDropdown.vue";
import SearchBar from "~/components/header/components/SearchBar.vue";
import ProductSearch from "~/components/header/components/ProductSearch.vue";
import NavCartBtn from "~/components/header/components/NavCartBtn.vue";
import { useMenu } from "~/composables/useMenu";
import eventBus from "@/composables/eventBus.js";
import { getProductLink, imghttps } from "~/composables/services/helpers";
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
const wishlistCount = ref(0);
const search = ref("");
const isSticky = ref(false);
const showSearchInput = ref(false);

const navigateToProduct = (prod) => {
  search.value = "";
  setTimeout(() => {
    navigateTo(getProductLink(prod));
  }, 500);
};

const toggleSearch = () => {
  if (showSearchInput.value) {
    showSearchInput.value = false;
    search.value = "";
  } else {
    showSearchInput.value = true;
  }
};


// Scroll event handler
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  isSticky.value = scrollPosition > 500;
};

onMounted(() => {
  // Update wishlist count from localStorage
  try {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlistCount.value = wishlist.length || 3;
  } catch (error) {
    console.error("Error accessing wishlist localStorage:", error);
    wishlistCount.value = 0;
  }

  // Setup event listener for wishlist updates
  eventBus.on("wishlist-updated", () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      wishlistCount.value = wishlist.length || 3;
    } catch (error) {
      console.error("Error updating wishlist count:", error);
    }
  });

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  eventBus.off("wishlist-updated");
  // Remove scroll event listener
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.search-input:focus {
  border-color: var(--header-middle-color-hover, #7b7b7b);
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
  color: var(--header-middle-color-hover, #7b7b7b) !important;
}

.dropdown-container:hover .nav-item::after {
  width: 100% !important;
}

/* Keep chevron rotated when dropdown is active */
.dropdown-container:hover .chevron {
  transform: rotate(180deg) !important;
  color: var(--header-middle-color-hover, #7b7b7b) !important;
}

/* Create invisible hover bridge to maintain dropdown visibility */
.dropdown-container::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 12px; /* Match mt-3 = 12px */
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
  background: var(--header-middle-color-hover, #7b7b7b);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-item:hover::after,
.dropdown-container:hover .nav-item::after {
  width: 100%;
}

/* Navigation item hover effects using CSS variables */
.nav-item:hover {
  color: var(--header-middle-color-hover, #7b7b7b) !important;
}

.glass-effect {
  backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chevron {
  transition: transform 0.3s ease;
}

/* Sticky Header Styles - Cannot be replicated with Tailwind */
.sticky-header {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(-100%);
  animation: slideDownSticky 0.4s ease-out forwards;
}

/* Sticky header animation */
@keyframes slideDownSticky {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
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
  background-color: var(--header-badge-bg, #e05050);
  border-radius: 2px;
}

/* User action buttons styling - brand-aware */
.user-action-link-vertical {
  color: var(--header-middle-color, #000000);
}

.user-action-link-vertical:hover {
  color: var(--header-middle-color-hover, #7b7b7b);
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover, #7b7b7b) 3%,
    transparent
  );
}

.user-action-link-vertical:focus {
  color: var(--header-middle-color-hover, #7b7b7b);
  outline: 1px solid
    color-mix(
      in srgb,
      var(--header-middle-color-hover, #7b7b7b) 30%,
      transparent
    ) !important;
  outline-offset: 2px;
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover, #7b7b7b) 3%,
    transparent
  );
}
</style>