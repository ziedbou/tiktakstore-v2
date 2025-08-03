<!-- Header Component (e.g., layouts/default.vue or components/Header.vue) -->
<template>
  <div class="bg-white mobile-menu-container">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open" class="mobile-menu-transition-root">
      <Dialog class="relative z-40 lg:hidden mobile-menu-dialog" @close="open = false">
        <TransitionChild as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
          class="mobile-menu-overlay-transition">
          <div class="fixed inset-0 bg-black/25 mobile-menu-overlay" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex mobile-menu-content">
          <TransitionChild as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
            class="mobile-menu-panel-transition">
            <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl mobile-menu-panel">
              <div class="flex px-4 pt-5 pb-2 mobile-menu-close-button-container">
                <button type="button" class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 mobile-menu-close-button" @click="open = false">
                  <span class="absolute -inset-0.5 mobile-menu-close-button-overlay" />
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="size-6 mobile-menu-close-icon" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <div class="mt-2 mobile-menu-links">
                <div class="space-y-1 mobile-menu-categories">
                  <div v-for="category in navigation.categories" :key="category.name" Facultatifclass="border-b border-gray-100 last:border-b-0 mobile-menu-category">
                    <!-- Category Header -->
                    <div class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 mobile-menu-category-header" 
                         @click="toggleCategory(category.name)">
                      <span class="text-gray-900 font-medium text-base mobile-menu-category-title">{{ category.name }}</span>
                      <svg 
                        :class="[expandedCategories.includes(category.name) ? 'rotate-180' : 'rotate-0', 'w-5 h-5 text-gray-400 transition-transform duration-200 mobile-menu-category-icon']"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    <!-- Expanded Content -->
                    <div v-if="expandedCategories.includes(category.name)" 
                         class="bg-gray-50 border-t border-gray-100 animate-slide-down mobile-menu-category-content">
                      <!-- View All Link -->
                      <div class="px-4 py-3 border-b border-gray-200 mobile-menu-view-all">
                        <NuxtLink 
                          :to="category.href" 
                          class="flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200 mobile-menu-view-all-link"
                          @click="open = false"
                        >
                          <svg class="w-4 h-4 mr-2 mobile-menu-view-all-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                          Voir tous les {{ category.name }}
                        </NuxtLink>
                      </div>
                      
                      <!-- Submenu items -->
                      <div v-if="category.submenu && category.submenu.length > 0" class="px-4 py-2 space-y-1 mobile-menu-submenu">
                        <div v-for="submenu in category.submenu" :key="submenu.slug" class="mobile-menu-submenu-item">
                          <!-- Submenu Item -->
                          <div class="flex items-center justify-between py-2 cursor-pointer hover:bg-white rounded-md px-2 transition-colors duration-200 mobile-menu-submenu-header"
                               @click="toggleSubmenu(submenu.slug)">
                            <NuxtLink 
                              :to="submenu.href" 
                              :title="submenu.label"
                              class="flex-1 text-gray-700 hover:text-gray-900 font-medium text-sm mobile-menu-submenu-link"
                              @click="open = false"
                            >
                              {{ submenu.label }}
                            </NuxtLink>
                            <svg 
                              v-if="submenu.submenu && submenu.submenu.length > 0"
                              :class="[expandedSubmenus.includes(submenu.slug) ? 'rotate-180' : 'rotate-0', 'w-4 h-4 text-gray-400 transition-transform duration-200 ml-2 mobile-menu-submenu-icon']"
                              fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          
                          <!-- Sub-submenu items -->
                          <div v-if="submenu.submenu && submenu.submenu.length > 0 && expandedSubmenus.includes(submenu.slug)" 
                               class="ml-4 space-y-1 border-l-2 border-indigo-100 pl-3 animate-slide-down mobile-menu-sub-submenu">
                            <NuxtLink 
                              v-for="subSubmenu in submenu.submenu" 
                              :key="subSubmenu.slug"
                              :to="subSubmenu.href" 
                              :title="subSubmenu.label"
                              class="block text-gray-600 hover:text-indigo-600 text-sm py-1.5 px-2 rounded-md hover:bg-white transition-colors duration-200 mobile-menu-sub-submenu-link"
                              @click="open = false"
                            >
                              {{ subSubmenu.label }}
                            </NuxtLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6 mobile-menu-pages">
                <div v-for="page in navigation.pages" :key="page.name" class="flow-root mobile-menu-page-item">
                  <NuxtLink :to="page.href" class="-m-2 block p-2 font-medium text-gray-900 mobile-menu-page-link">{{ page.name }}</NuxtLink>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6 mobile-menu-auth">
                <div class="flow-root mobile-menu-signin">
                  <NuxtLink to="/signin" class="-m-2 block p-2 font-medium text-gray-900 mobile-menu-signin-link">Sign in</NuxtLink>
                </div>
                <div class="flow-root mobile-menu-register">
                  <NuxtLink to="/register" class="-m-2 block p-2 font-medium text-gray-900 mobile-menu-register-link">Create account</NuxtLink>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6 mobile-menu-currency">
                <NuxtLink to="/currency" class="-m-2 flex items-center p-2 mobile-menu-currency-link">
                  <img src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 shrink-0 mobile-menu-currency-img" />
                  <span class="ml-3 block text-base font-medium text-gray-900 mobile-menu-currency-text">CAD</span>
                  <span class="sr-only">, change currency</span>
                </NuxtLink>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white header-container">
      <p class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8 header-promo">
        Get free delivery on orders over $100
      </p>

      <nav aria-label="Top" class="container-medium nav-container">
        <div class="border-b border-gray-200 nav-top-bar">
          <div class="flex py-2 items-center nav-content">
            <button type="button" class="relative rounded-md bg-white p-2 pl-0 text-gray-400 lg:hidden nav-menu-button" @click="open = true">
              <span class="absolute -inset-0.5 nav-menu-button-overlay" />
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="size-6 nav-menu-icon" aria-hidden="true" />
            </button>

            <div class="md:ml-4 flex lg:ml-0 nav-logo-container">
              <NuxtLink to="/" class="nav-logo-link">
                <span class="sr-only">Your Company</span>
                <NuxtImg 
                  class="h-20 w-auto max-h-[60px] md:max-h-[70px] max-w-[100px] md:max-w-[130px] object-contain nav-logo-img" 
                  :src="cdnURL + companyData?.logo" 
                  alt="company logo"
                  width="auto"
                  height="32"
                  loading="eager"
                  format="webp"
                />
              </NuxtLink>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch nav-popover-group">
              <div class="flex h-full space-x-8 nav-popover-container">
                <!-- Categories with submenus -->
                <Popover v-for="category in navigation.categories" :key="category.name" class="flex nav-popover" v-slot="{ open, close }">
                  <div class="relative flex nav-popover-item">
                    <PopoverButton :class="[open ? 'text-indigo-600 underline border-transparent' : 'border-transparent text-gray-700 hover:text-gray-800', 'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors outline-none duration-200 ease-out nav-popover-button']">
                      <span class="hover:underline nav-popover-title">{{ category.name }}</span>
                      <svg v-if="category.submenu && category.submenu.length > 0" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg" class="ml-1 nav-popover-icon">
                        <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
                      </svg>
                    </PopoverButton>
                  </div>

                  <transition 
                    enter-active-class="transition ease-out duration-200" 
                    enter-from-class="opacity-0" 
                    enter-to-class="opacity-100" 
                    leave-active-class="transition ease-in duration-150" 
                    leave-from-class="opacity-100" 
                    leave-to-class="opacity-0"
                    class="nav-popover-transition"
                  >
                    <PopoverPanel v-if="category.submenu && category.submenu.length > 0" class="absolute inset-x-0 top-full text-sm text-gray-500 z-50 nav-popover-panel">
                      <div class="relative bg-white shadow-lg border border-gray-200 nav-popover-content">
                        <div class="mx-auto max-w-7xl px-8 py-6 nav-popover-inner">
                          <!-- Main category link -->
                          <NuxtLink @click="close" :to="category.href" class="text-indigo-600 font-medium hover:underline mb-4 block nav-popover-main-link">
                            Voir tous les produits {{ category.name }}
                          </NuxtLink>
                          
                          <!-- Submenu items -->
                          <ul class="space-y-2 nav-popover-submenu">
                            <li v-for="submenu in category.submenu" :key="submenu.slug" class="relative group nav-popover-submenu-item">
                              <div class="flex items-center justify-between nav-popover-submenu-header">
                                <NuxtLink 
                                  :to="submenu.href" 
                                  :title="submenu.label"
                                  class="hover:underline text-gray-700 hover:text-gray-900 font-medium flex items-center nav-popover-submenu-link"
                                  @click="close"
                                >
                                  <span>{{ submenu.label }}</span>
                                  <svg v-if="submenu.submenu && submenu.submenu.length > 0" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg" class="ml-1 nav-popover-submenu-icon">
                                    <path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"></path>
                                  </svg>
                                </NuxtLink>
                              </div>
                              
                              <!-- Sub-submenu -->
                              <ul v-if="submenu.submenu && submenu.submenu.length > 0" class="ml-4 mt-2 space-y-1 transition-opacity duration-200 nav-popover-sub-submenu">
                                <li v-for="subSubmenu in submenu.submenu" :key="subSubmenu.slug" class="nav-popover-sub-submenu-item">
                                  <NuxtLink 
                                    :to="subSubmenu.href" 
                                    :title="subSubmenu.label"
                                    class="text hover:underline text-gray-600 hover:text-gray-800 text-sm block py-1 nav-popover-sub-submenu-link"
                                    @click="close"
                                  >
                                    {{ subSubmenu.label }}
                                  </NuxtLink>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>

                <!-- Direct page links (no submenus) -->
                <NuxtLink 
                  v-for="page in navigation.pages" 
                  :key="page.name" 
                  :to="page.href" 
                  class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 nav-page-link"
                >
                  <span class="animation-underline nav-page-title">{{ page.name }}</span>
                </NuxtLink>
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center nav-right-section">
              <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 nav-auth-section">
                <NuxtLink to="/login" class="text-sm font-medium text-gray-700 hover:text-gray-800 nav-signin-link">Sign in</NuxtLink>
                <span class="h-6 w-px bg-gray-200 nav-auth-divider" aria-hidden="true" />
                <NuxtLink to="/register" class="text-sm font-medium text-gray-700 hover:text-gray-800 nav-register-link">Create account</NuxtLink>
              </div>

              <div class="hidden lg:ml-8 lg:flex nav-currency-section">
                <NuxtLink to="/currency" class="flex items-center text-gray-700 hover:text-gray-800 nav-currency-link">
                  <img src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 shrink-0 nav-currency-img" />
                  <span class="ml-3 block text-sm font-medium nav-currency-text">CAD</span>
                  <span class="sr-only">, change currency</span>
                </NuxtLink>
              </div>

              <!-- Search Component -->
              <Search />

              <div class="ml-4 flow-root lg:ml-6 nav-cart">
                <button class="group flex items-center p-2 relative nav-cart-button" @click="toggleCart">
                  <ShoppingBagIcon class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500 nav-cart-icon" aria-hidden="true" />
                  <span class="absolute top-0 -right-1 flex items-center justify-center h-4 px-[5px] w-auto rounded-full bg-red-600 text-white text-xs font-semibold nav-cart-count">
                    {{ cartCount }}
                  </span>
                  <span class="sr-only">items in cart, view bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
  <Cart :open="cartOpen" @close="cartOpen = false" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {
  Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup,
  PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels,
  TransitionChild, TransitionRoot
} from '@headlessui/vue';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useCompanyData } from '@/composables/useCompanyData';
import Cart from '~/components/Cart';
import Search from '@/components/Search.vue'; // Import the new Search component
import { useMenu } from '~/composables/useMenu';
import eventBus from '@/composables/eventBus.js';
import { NuxtLink } from '#components';

const { companyId, companyData } = useCompanyData();

// Get CDN URL from runtime config
const config = useRuntimeConfig();
const cdnURL = config.public.cdnURL;

// Use the new composable for menu data with SSR
const { menuData: navigation, error: menuError } = useMenu({ 
  companyId: companyId.value, 
  position: 'header' 
});

const cartOpen = ref(false);
const open = ref(false);
const cartCount = ref(0);

function toggleCart() {
  cartOpen.value = !cartOpen.value;
}

onMounted(() => {
  // Update cart count from localStorage - only runs on client side
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.value = cart._details?.length;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    cartCount.value = 0;
  }
  
  // Setup event listener for cart updates
  eventBus.on('cart-updated', () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartCount.value = cart._details?.length;
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  });
  
  eventBus.on('open-cart', () => {
    cartOpen.value = true; // Open the cart dialog
  });
});

const expandedCategories = ref([]);
const expandedSubmenus = ref([]);

function toggleCategory(categoryName) {
  const index = expandedCategories.value.indexOf(categoryName);
  if (index > -1) {
    expandedCategories.value.splice(index, 1);
    expandedSubmenus.value = [];
  } else {
    expandedCategories.value.push(categoryName);
  }
}

function toggleSubmenu(submenuSlug) {
  const index = expandedSubmenus.value.indexOf(submenuSlug);
  if (index > -1) {
    expandedSubmenus.value.splice(index, 1);
  } else {
    expandedSubmenus.value.push(submenuSlug);
  }
}

onUnmounted(() => {
  eventBus.off('open-cart'); // Clean up the listener
  eventBus.off('cart-updated'); // Clean up cart update listener
});
</script>

<style scoped>
.animation-underline {
  position: relative;
  transition: all 0.3s ease;
}

.animation-underline::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.animation-underline:hover::after {
  width: 100%;
}

@keyframes slide-down {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out forwards;
}
</style>