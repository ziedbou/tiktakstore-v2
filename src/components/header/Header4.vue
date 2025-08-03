<template>
  <!-- Fashion Design Header -->
  <header
    class="header-wrapper left-0 right-0 top-0 z-50 transition-all duration-300"
    :class="{ 
      'sticky-header': isSticky, 
      'absolute': isHomePage,
      'relative': !isHomePage,
      'non-home-page': !isHomePage,
      'border-b border-white/40': isHomePage,
      'border-b border-gray-200': !isHomePage
    }"
    :style="headerStyles"
  >
    <!-- Header Middle Section (Only Section) -->
    <div
      class="header-middle transition-all duration-300"
      :style="backgroundStyles"
    >
        <div class="header-container flex items-center justify-between py-2">
          <!-- Left Section: Navigation (Desktop) / Menu Button (Mobile) -->
          <div class="flex-1">
            <!-- Mobile Menu Button -->
            <button
              type="button"
              class="mobile-menu-btn lg:hidden h-10 w-10 flex items-center justify-center bg-transparent transition-all duration-300"
              @click="mobileMenuOpen = true"
            >
              <Icon name="ph:list" class="w-6 h-6" />
            </button>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:block">
              <div class="flex items-center space-x-8">
                <!-- Dynamic Categories Navigation -->
                <template
                  v-for="category in navigation.categories"
                  :key="category.name"
                >
                  <!-- Category without submenu -->
                  <template
                    v-if="!category.submenu || category.submenu.length === 0"
                  >
                    <a
                      v-if="category.type === 'extern'"
                      :href="category.href"
                      class="nav-link text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-70"
                    >
                      {{ category.name }}
                    </a>
                    <NuxtLink
                      v-else
                      :to="category.href"
                      class="nav-link text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-70"
                    >
                      {{ category.name }}
                    </NuxtLink>
                  </template>

                  <!-- Category with submenu (dropdown) -->
                  <div v-else class="relative dropdown-container">
                    <button
                      class="nav-link text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-70 flex items-center space-x-1"
                    >
                      <span>{{ category.name }}</span>
                      <Icon
                        name="ph:caret-down"
                        class="w-3 h-3 chevron transition-transform duration-300"
                      />
                    </button>

                    <NavigationDropdown :category="category" marginTop="mt-9" />
                  </div>
                </template>
              </div>
            </nav>
          </div>

          <!-- Center Section: Logo -->
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

          <!-- Right Section: Search & Actions -->
          <div class="flex-1 flex items-center justify-end space-x-2 ">
            <!-- Desktop Search Bar -->
         
              <form
                @submit.prevent="searchCall()"
                class="relative hidden lg:block max-w-2xs w-full"
              >
                <input
                  name="search"
                  ref="searchInput"
                  v-model="search"
                  type="text"
                  placeholder="Rechercher un produit"
                  class="search-input w-full pl-4 pr-16 py-2.5 bg-transparent border-0 border-b border-white text-white placeholder-white/70 focus:outline-none transition-all duration-300 text-sm"
                />

                <!-- Clear Button (shows when typing) -->
                <button
                  v-if="search.length > 0"
                  type="button"
                  @click="clearSearch"
                  class="clear-btn absolute right-10 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 hover:bg-white/10 rounded-full p-1"
                >
                  <Icon name="ph:x" class="w-4 h-4" />
                </button>

                <!-- Search Icon -->
                <button
                  type="submit"
                  class="search-btn absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70  transition-colors duration-300"
                >
                  <Icon name="ph:magnifying-glass" class="w-4 h-4" />
                </button>
              </form>
        

            <!-- Mobile Search Button -->
            <div class="lg:hidden">
              <SearchBar v-model="search" mobile="true">
                <template #trigger="{ toggleMobileSearch, mobileSearchOpen }">
                  <button
                    @click="toggleMobileSearch"
                    class="user-action h-10 w-10 flex items-center justify-center transition-all duration-300"
                  >
                    <Icon
                      :name="mobileSearchOpen ? 'ph:x' : 'ph:magnifying-glass'"
                      class="w-5 h-5"
                    />
                  </button>
                </template>
              </SearchBar>
            </div>

              <NavWishlistBtn
                :show-text="false"
                button-class="user-action hidden lg:flex relative h-12 w-12 items-center justify-center bg-transparent transition-all duration-300"
                icon-class="w-6 h-6"
              />

              <!-- Account -->
              <NuxtLink
                to="/account"
                class="user-action h-12 w-12 hidden lg:flex  items-center justify-center bg-transparent transition-all duration-300"
              >
                <Icon name="ph:user" class="w-6 h-6" />
              </NuxtLink>

              <!-- Cart -->
              <NavCartBtn
                :show-text="false"
                button-class="user-action relative h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center bg-transparent transition-all duration-300"
                icon-class="w-5 lg:w-6 h-5 lg:h-6 "
              />
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

  <!-- Mobile Side Navigation -->
  <MobileSideNav
    :isMobileCart="true"
    :open="mobileMenuOpen"
    :navigation="navigation"
    :company-data="companyData"
    :store-info="storeInfo"
    @close="mobileMenuOpen = false"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useCompanyData } from "@/composables/useCompanyData";
import MobileSideNav from "~/components/header/components/MobileSideNav.vue";
import NavigationDropdown from "~/components/header/components/NavigationDropdown.vue";
import ProductSearch from "~/components/header/components/ProductSearch.vue";
import SearchBar from "~/components/header/components/SearchBar.vue";
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

const router = useRouter();
const { companyData } = useCompanyData();

// Get CDN URL from runtime config
const config = useRuntimeConfig();
const cdnURL = config.public.cdnURL;

// Use the new composable for menu data
const { menuData: navigation } = useMenu({
  companyId: companyData.value.id,
  position: "header",
});

// Use viewport composable
const { isMobile } = useViewport(1024);

// Reactive variables
const mobileMenuOpen = ref(false);
const search = ref("");
const searchInput = ref(null);
const isSticky = ref(false);

// Computed properties
const isHomePage = computed(() => {
  return router.currentRoute.value.path === '/';
});

const headerStyles = computed(() => {
  // On home page: show white when not sticky, colored when sticky
  // On other pages: always show colored (sticky appearance)
  if (isHomePage.value) {
    if (isSticky.value) {
      return {
        color: "var(--header-middle-color)",
      };
    }
    return {
      color: "#ffffff",
    };
  } else {
    // Non-home pages: always show sticky styling
    return {
      color: "var(--header-middle-color)",
    };
  }
});

const backgroundStyles = computed(() => {
  // On home page: transparent when not sticky, background when sticky
  // On other pages: always show background (sticky appearance)
  if (isHomePage.value) {
    if (isSticky.value) {
      return {
        backgroundColor: "var(--header-middle-bg, #ffffff)",
        backdropFilter: "blur(10px)",
      };
    }
    return {
      backgroundColor: "transparent",
    };
  } else {
    // Non-home pages: always show background
    return {
      backgroundColor: "var(--header-middle-bg, #ffffff)",
      backdropFilter: "blur(10px)",
    };
  }
});

// Functions
function searchCall() {
  if (search.value.trim()) {
    navigateTo(`/search?product=${encodeURIComponent(search.value.trim())}`);
  }
}

function clearSearch() {
  search.value = "";
  searchInput.value?.focus();
}

// Scroll event handler
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  isSticky.value = scrollPosition > 100;
};

onMounted(() => {
  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Fashion header specific styles */
.header-wrapper.sticky-header {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: none !important;
  animation: slideDownFashion 0.4s ease-out forwards;
}

@keyframes slideDownFashion {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Navigation link styles - WHITE by default */
.nav-link {
  color: #ffffff;
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: #ffffff;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: #ffffff;
  opacity: 0.8;
}

/* Navigation links when sticky - use CSS variables */
.sticky-header .nav-link {
  color: var(--header-middle-color);
}

.sticky-header .nav-link::after {
  background: var(--header-middle-color-hover);
}

.sticky-header .nav-link:hover {
  color: var(--header-middle-color-hover);
  opacity: 1;
}

/* Dropdown navigation styles */
.dropdown-container:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Keep nav link hover state when dropdown is active */
.dropdown-container:hover .nav-link {
  opacity: 0.8 !important;
}

.dropdown-container:hover .nav-link::after {
  width: 100% !important;
}

/* Keep chevron rotated when dropdown is active */
.dropdown-container:hover .chevron {
  transform: rotate(180deg) !important;
}

/* For sticky header - keep nav link highlighted when dropdown active */
.sticky-header .dropdown-container:hover .nav-link {
  color: var(--header-middle-color-hover) !important;
  opacity: 1 !important;
}

/* Create invisible hover bridge to maintain dropdown visibility */
.dropdown-container::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 36px; /* Match */
  background: transparent;
  z-index: 1;
}

.chevron {
  transition: transform 0.3s ease;
}

/* Search input - WHITE by default with white border-bottom */
.search-input {
  color: #ffffff !important;
  background-color: transparent !important;
  border-bottom: 1px solid #ffffff !important;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Search input glassmorphism on hover/focus */
.search-input:hover,
.search-input:focus {
  background-color: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(10px) !important;
  padding: 10px 40px 10px 16px !important;
}

/* Search input when sticky - use CSS variables */
.sticky-header .search-input {
  color: var(--header-middle-color) !important;
  border-bottom-color: var(--header-middle-color) !important;
}

.sticky-header .search-input::placeholder {
  color: var(--header-middle-color, #6b7280) !important;
  opacity: 0.7;
}

.sticky-header .search-input:hover,
.sticky-header .search-input:focus {
  backdrop-filter: blur(10px) !important;
  border-bottom-color: var(--header-middle-color) !important;
  padding: 10px 40px 10px 16px !important;
}

/* Search and Clear buttons - WHITE by default */
.search-btn,
.clear-btn {
  color: rgba(255, 255, 255, 0.7) !important;
  cursor: pointer;
}

.search-btn:hover,
.clear-btn:hover {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Clear button specific styling */
.clear-btn {
  color: rgba(255, 255, 255, 0.6) !important;
}

.clear-btn:hover {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Search and Clear buttons when sticky */
.sticky-header .search-btn,
.sticky-header .clear-btn {
  color: var(--header-middle-color, #6b7280) !important;
}

.sticky-header .search-btn:hover,
.sticky-header .clear-btn:hover {
  color: var(--header-middle-color-hover) !important;
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover) 10%,
    transparent
  ) !important;
}

/* Mobile menu button - WHITE by default */
.mobile-menu-btn {
  color: #ffffff !important;
}

.mobile-menu-btn svg {
  color: #ffffff !important;
}

.mobile-menu-btn:hover {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.mobile-menu-btn:hover svg {
  color: #ffffff !important;
}

/* Mobile menu button when sticky */
.sticky-header .mobile-menu-btn {
  color: var(--header-middle-color) !important;
}

.sticky-header .mobile-menu-btn svg {
  color: var(--header-middle-color) !important;
}

.sticky-header .mobile-menu-btn:hover {
  color: var(--header-middle-color-hover) !important;
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover) 10%,
    transparent
  ) !important;
}

.sticky-header .mobile-menu-btn:hover svg {
  color: var(--header-middle-color-hover) !important;
}

</style>
<style>
/* User actions - WHITE by default, no borders */
.user-action {
  color: #ffffff !important;
  background-color: transparent !important;
}


/* User actions glassmorphism on hover/focus */
.user-action:hover,
.user-action:focus {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(10px) !important;
  outline: none !important;
}

.user-action:hover svg,
.user-action:focus svg {
  color: #ffffff !important;
}

/* User actions when sticky - use CSS variables */
.sticky-header .user-action {
  color: var(--header-middle-color) !important;
}

.sticky-header .user-action svg {
  color: var(--header-middle-color) !important;
}

.sticky-header .user-action:hover {
  color: var(--header-middle-color-hover) !important;
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover) 10%,
    transparent
  ) !important;
  border-color: var(--header-middle-color-hover) !important;
  outline: none !important;
}

.sticky-header .user-action:hover svg {
  color: var(--header-middle-color-hover) !important;
}


/* Non-home page styling - always look like sticky */
.non-home-page .nav-link {
  color: var(--header-middle-color) !important;
}

.non-home-page .nav-link::after {
  background: var(--header-middle-color-hover) !important;
}

.non-home-page .nav-link:hover {
  color: var(--header-middle-color-hover) !important;
  opacity: 1 !important;
}

.non-home-page .search-input {
  color: var(--header-middle-color) !important;
  border-bottom-color: var(--header-middle-color) !important;
}

.non-home-page .search-input::placeholder {
  color: var(--header-middle-color, #6b7280) !important;
  opacity: 0.7;
}

.non-home-page .search-btn,
.non-home-page .clear-btn {
  color: var(--header-middle-color, #6b7280) !important;
}

.non-home-page .search-btn:hover,
.non-home-page .clear-btn:hover {
  color: var(--header-middle-color-hover) !important;
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover) 10%,
    transparent
  ) !important;
}

.non-home-page .user-action {
  color: var(--header-middle-color) !important;
}

.non-home-page .user-action svg {
  color: var(--header-middle-color) !important;
}

.non-home-page .user-action:hover {
  color: var(--header-middle-color-hover) !important;
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover) 10%,
    transparent
  ) !important;
}

.non-home-page .user-action:hover svg {
  color: var(--header-middle-color-hover) !important;
}

.non-home-page .mobile-menu-btn {
  color: var(--header-middle-color) !important;
}

.non-home-page .mobile-menu-btn svg {
  color: var(--header-middle-color) !important;
}

.non-home-page .mobile-menu-btn:hover {
  color: var(--header-middle-color-hover) !important;
  background-color: color-mix(
    in srgb,
    var(--header-middle-color-hover) 10%,
    transparent
  ) !important;
}

.non-home-page .mobile-menu-btn:hover svg {
  color: var(--header-middle-color-hover) !important;
}
</style>