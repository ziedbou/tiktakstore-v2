<template>
  <!-- Mobile menu -->
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-40 lg:hidden" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel
            class="relative flex w-full flex-col overflow-y-auto bg-gradient-to-br from-white to-gray-50 shadow-2xl"
          >
            <!-- Header -->
            <div
              class="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100"
            >
              <!-- Header Top - Logo and Close -->
              <div class="flex items-center px-6 py-4 relative">
                <!-- Logo (centered) -->
                <div class="flex-1 flex justify-center">
                  <NuxtLink
                    to="/"
                    class="flex items-center transition-transform duration-300 hover:scale-105"
                    @click="$emit('close')"
                  >
                    <NuxtImg
                      class="h-20 w-auto max-w-[160px] object-contain"
                      :src="cdnURL + companyData?.logo"
                      :alt="companyData?.name || 'company logo'"
                      width="auto"
                      height="48"
                      loading="eager"
                      format="webp"
                    />
                  </NuxtLink>
                </div>

                <!-- Close Button (positioned absolutely on right) -->
                <button
                  type="button"
                  class="absolute right-6 inline-flex items-center justify-center rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                  @click="$emit('close')"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Search Section -->
              <div class="px-6 pb-4">
                <div class="relative">
                  <form @submit.prevent="searchCall()" class="relative">
                    <input 
                      ref="searchInput"
                      v-model="search"
                      type="search" 
                      placeholder="Rechercher un produit..."
                      class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-300 text-sm"
                    />
                    <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Navigation Content -->

            <div class="space-y-2 p-4">
              <template
                v-for="category in navigation.categories"
                :key="category.name"
              >
                <!-- Category without submenu (DIRECT LINK) -->
                <template
                  v-if="!category.submenu || category.submenu.length === 0"
                >
                  <div class="rounded-lg bg-white transition-all duration-200">
                    <!-- External category link -->
                    <a
                      v-if="category.type === 'extern'"
                      :href="category.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center p-4 transition-all duration-200 group"
                      @click="$emit('close')"
                    >
                      <div class="flex items-center space-x-3">
                        <span class="text-md mobile-nav-link">{{
                          category.name
                        }}</span>
                        <svg
                          class="w-3 h-3 ml-1 text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
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
                      </div>
                    </a>
                    <!-- Internal category link -->
                    <NuxtLink
                      v-else
                      :to="category.href"
                      class="flex items-center p-4 transition-all duration-200 group"
                      @click="$emit('close')"
                    >
                      <div class="flex items-center">
                        <span class="text-md mobile-nav-link">{{
                          category.name
                        }}</span>
                      </div>
                    </NuxtLink>
                  </div>
                </template>

                <!-- Category with submenu (ACCORDION) -->
                <div
                  v-else
                  class="rounded-lg bg-white transition-all duration-200 overflow-hidden"
                  :class="{
                    'shadow-md': expandedCategories.includes(category.name),
                  }"
                >
                  <div
                    class="flex items-center justify-between p-4 cursor-pointer"
                    @click="toggleCategory(category.name)"
                  >
                    <div class="flex items-center">
                      <span class="text-md mobile-nav-link">{{
                        category.name
                      }}</span>
                    </div>

                    <div class="flex items-center space-x-2">
                      <!-- Dropdown arrow for accordion -->
                      <svg
                        class="w-5 h-5 transition-all duration-300 accordion-arrow"
                        :class="{
                          'rotate-180': expandedCategories.includes(
                            category.name
                          ),
                        }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <!-- Category Submenu -->
                  <div
                    v-if="expandedCategories.includes(category.name)"
                    class="accordion-slide"
                  >
                    <!-- Submenu Items -->
                    <div class="px-4 py-2 space-y-1">
                      <div
                        v-for="submenu in category.submenu"
                        :key="submenu.slug"
                        class="rounded-lg overflow-hidden"
                      >
                        <!-- Submenu without sub-submenu -->
                        <template
                          v-if="
                            !submenu.submenu || submenu.submenu.length === 0
                          "
                        >
                          <a
                            v-if="submenu.type === 'extern'"
                            :href="submenu.href"
                            :title="submenu.label"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200 rounded-lg group"
                            @click="$emit('close')"
                          >
                            <span
                              class="font-medium"
                              style="
                                color: var(
                                  --header-submenu-link-color,
                                  #444444
                                );
                              "
                              >{{ submenu.label }}</span
                            >
                            <svg
                              class="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100"
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
                            :to="submenu.href"
                            :title="submenu.label"
                            class="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200 rounded-lg group"
                            @click="$emit('close')"
                          >
                            <span
                              class="font-medium"
                              style="
                                color: var(
                                  --header-submenu-link-color,
                                  #444444
                                );
                              "
                              >{{ submenu.label }}</span
                            >
                          </NuxtLink>
                        </template>

                        <!-- Submenu with sub-submenu (accordion) -->
                        <div
                          v-else
                          class="bg-gray-50 rounded-lg"
                          :class="{
                            'shadow-md': expandedSubmenus.includes(
                              submenu.slug
                            ),
                          }"
                        >
                          <div
                            class="flex items-center justify-between p-3 cursor-pointer transition-all duration-200"
                            @click="toggleSubmenu(submenu.slug)"
                          >
                            <span
                              class="font-medium"
                              style="
                                color: var(
                                  --header-submenu-link-color,
                                  #444444
                                );
                              "
                              >{{ submenu.label }}</span
                            >

                            <div class="flex items-center space-x-2">
                              <!-- Dropdown arrow only -->
                              <svg
                                class="w-4 h-4 transition-all duration-300 accordion-arrow"
                                :class="{
                                  'rotate-180': expandedSubmenus.includes(
                                    submenu.slug
                                  ),
                                }"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>

                          <!-- Sub-submenu Items -->
                          <div
                            v-if="expandedSubmenus.includes(submenu.slug)"
                            class="accordion-slide"
                          >
                            <div class="px-4 py-2 space-y-1">
                              <template
                                v-for="subSubmenu in submenu.submenu"
                                :key="subSubmenu.slug"
                              >
                                <a
                                  v-if="subSubmenu.type === 'extern'"
                                  :href="subSubmenu.href"
                                  :title="subSubmenu.label"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="flex items-center p-2 transition-all duration-200 rounded-md text-sm group"
                                  @click="$emit('close')"
                                >
                                  <span
                                    style="
                                      color: var(
                                        --header-submenu-link-color,
                                        #444444
                                      );
                                    "
                                    >{{ subSubmenu.label }}</span
                                  >
                                  <svg
                                    class="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100"
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
                                  :to="subSubmenu.href"
                                  :title="subSubmenu.label"
                                  class="flex items-center p-2 transition-all duration-200 rounded-md text-sm group"
                                  @click="$emit('close')"
                                >
                                  <span
                                    style="
                                      color: var(
                                        --header-submenu-link-color,
                                        #444444
                                      );
                                    "
                                    >{{ subSubmenu.label }}</span
                                  >
                                </NuxtLink>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <!-- Footer -->
            <div
              class="mt-auto bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4"
            >
              <!-- CURRENT LAYOUT: Option 1 - Horizontal Compact 
              <div class="space-y-3">
                <div v-if="companyData?.phone" class="flex items-center justify-center">
                  <NuxtLink :to="`tel:${companyData.phone}`" class="phone-group flex items-center space-x-2 group transition-all duration-300">
                    <div class="phone-icon-mobile flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center">
                      <Icon name="ph:phone-bold" class="w-3.5 h-3.5" />
                    </div>
                    <span class="phone-link-mobile text-sm font-medium">
                      {{ companyData.phone }}
                    </span>
                  </NuxtLink>
                </div>
                
                <div class="text-center  border-t border-gray-200 pt-4">
                  <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Suivez-nous sur</div>
                  <div class="flex justify-center items-center space-x-3">
                    <NuxtLink v-if="storeInfo?.contact_settings?.facebook" :to="`https://facebook.com/${storeInfo.contact_settings.facebook}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                      <Icon name="ri:facebook-fill" class="w-4 h-4" />
                    </NuxtLink>
                    <NuxtLink v-if="companyData?.phone" :to="`https://wa.me/${companyData.phone.replace(/[^0-9]/g, '')}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                      <Icon name="ri:whatsapp-fill" class="w-4 h-4" />
                    </NuxtLink>
                    <NuxtLink v-if="storeInfo?.contact_settings?.instagram" :to="`https://instagram.com/${storeInfo.contact_settings.instagram}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                      <Icon name="ri:instagram-fill" class="w-4 h-4" />
                    </NuxtLink>
                    <NuxtLink v-if="storeInfo?.contact_settings?.tiktok" :to="`https://tiktok.com/@${storeInfo.contact_settings.tiktok}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                      <Icon name="ri:tiktok-fill" class="w-4 h-4" />
                    </NuxtLink>
                    <NuxtLink v-if="storeInfo?.contact_settings?.youtube" :to="`https://youtube.com/@${storeInfo.contact_settings.youtube}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                      <Icon name="ri:youtube-fill" class="w-4 h-4" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
-->
              <!-- LAYOUT OPTION 2: Super Minimal - Icons Only (Replace above div with this)
            
              <div class="flex items-center justify-center space-x-4 py-2">
                <NuxtLink v-if="companyData?.phone" :to="`tel:${companyData.phone}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300" title="Appeler">
                  <Icon name="ph:phone-bold" class="w-4 h-4" />
                </NuxtLink>
                <NuxtLink v-if="storeInfo?.contact_settings?.facebook" :to="`https://facebook.com/${storeInfo.contact_settings.facebook}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300" target="_blank" title="Facebook">
                  <Icon name="ri:facebook-fill" class="w-4 h-4" />
                </NuxtLink>
                <NuxtLink v-if="companyData?.phone" :to="`https://wa.me/${companyData.phone.replace(/[^0-9]/g, '')}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300" target="_blank" title="WhatsApp">
                  <Icon name="ri:whatsapp-fill" class="w-4 h-4" />
                </NuxtLink>
                <NuxtLink v-if="storeInfo?.contact_settings?.instagram" :to="`https://instagram.com/${storeInfo.contact_settings.instagram}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300" target="_blank" title="Instagram">
                  <Icon name="ri:instagram-fill" class="w-4 h-4" />
                </NuxtLink>
                <NuxtLink v-if="storeInfo?.contact_settings?.tiktok" :to="`https://tiktok.com/@${storeInfo.contact_settings.tiktok}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300" target="_blank" title="TikTok">
                  <Icon name="ri:tiktok-fill" class="w-4 h-4" />
                </NuxtLink>
                <NuxtLink v-if="storeInfo?.contact_settings?.youtube" :to="`https://youtube.com/@${storeInfo.contact_settings.youtube}`" class="social-link-mobile w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300" target="_blank" title="YouTube">
                  <Icon name="ri:youtube-fill" class="w-4 h-4" />
                </NuxtLink>
              </div>
               -->

              <!-- LAYOUT OPTION 3: Two-Row Grid (Replace above div with this) -->
              <!-- 
              <div class="space-y-2">
                <div class="flex items-center justify-center">
                  <NuxtLink v-if="companyData?.phone" :to="`tel:${companyData.phone}`" class="phone-group flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-50 transition-all duration-300">
                    <Icon name="ph:phone-bold" class="w-3.5 h-3.5 text-green-600" />
                    <span class="text-xs font-medium text-gray-700">{{ companyData.phone }}</span>
                  </NuxtLink>
                </div>
                <div class="flex justify-center items-center space-x-2">
                  <NuxtLink v-if="storeInfo?.contact_settings?.facebook" :to="`https://facebook.com/${storeInfo.contact_settings.facebook}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                    <Icon name="ri:facebook-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
                  <NuxtLink v-if="companyData?.phone" :to="`https://wa.me/${companyData.phone.replace(/[^0-9]/g, '')}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                    <Icon name="ri:whatsapp-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
                  <NuxtLink v-if="storeInfo?.contact_settings?.instagram" :to="`https://instagram.com/${storeInfo.contact_settings.instagram}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                    <Icon name="ri:instagram-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
                  <NuxtLink v-if="storeInfo?.contact_settings?.tiktok" :to="`https://tiktok.com/@${storeInfo.contact_settings.tiktok}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                    <Icon name="ri:tiktok-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
                  <NuxtLink v-if="storeInfo?.contact_settings?.youtube" :to="`https://youtube.com/@${storeInfo.contact_settings.youtube}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                    <Icon name="ri:youtube-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
                </div>
              </div>
              -->

              <!-- LAYOUT OPTION 4: Vertical Stack with Border (Replace above div with this) -->
              
              <div class="space-y-2.5">
                <div v-if="companyData?.phone" class="text-center">
                  <NuxtLink :to="`tel:${companyData.phone}`" class="social-link-mobile inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-300">
                    <Icon name="ph:phone-bold" class="w-3.5 h-3.5" />
                    <span class="text-xs font-medium">{{ companyData.phone }}</span>
                  </NuxtLink>
                </div>
                <div class="border-t border-gray-200 pt-2">
                  <div class="flex justify-center items-center space-x-2.5">
                    <NuxtLink v-if="storeInfo?.contact_settings?.facebook" :to="`https://facebook.com/${storeInfo.contact_settings.facebook}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                      <Icon name="ri:facebook-fill" class="w-3.5 h-3.5" />
                    </NuxtLink>
                    <NuxtLink v-if="companyData?.phone" :to="`https://wa.me/${companyData.phone.replace(/[^0-9]/g, '')}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                      <Icon name="ri:whatsapp-fill" class="w-3.5 h-3.5" />
                    </NuxtLink>
                    <NuxtLink v-if="storeInfo?.contact_settings?.instagram" :to="`https://instagram.com/${storeInfo.contact_settings.instagram}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                      <Icon name="ri:instagram-fill" class="w-3.5 h-3.5" />
                    </NuxtLink>
                    <NuxtLink v-if="storeInfo?.contact_settings?.tiktok" :to="`https://tiktok.com/@${storeInfo.contact_settings.tiktok}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                      <Icon name="ri:tiktok-fill" class="w-3.5 h-3.5" />
                    </NuxtLink>
                    <NuxtLink v-if="storeInfo?.contact_settings?.youtube" :to="`https://youtube.com/@${storeInfo.contact_settings.youtube}`" class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                      <Icon name="ri:youtube-fill" class="w-3.5 h-3.5" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
              
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

// Define props
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  navigation: {
    type: Object,
    required: true,
  },
  companyData: {
    type: Object,
    default: () => ({}),
  },
  storeInfo: {
    type: Object,
    default: () => ({})
  },
});

// Define emits
const emit = defineEmits(["close"]);

// Get CDN URL from runtime config
const config = useRuntimeConfig();
const cdnURL = config.public.cdnURL;
const baseURL = config.public.baseURL;

// Reactive variables
const expandedCategories = ref([]);
const expandedSubmenus = ref([]);
const search = ref("");
const searchInput = ref(null);

// Functions
function toggleCategory(categoryName) {
  const index = expandedCategories.value.indexOf(categoryName);
  if (index > -1) {
    expandedCategories.value.splice(index, 1);
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

function searchCall() {
  if (search.value.trim()) {
    navigateTo(`/search?product=${encodeURIComponent(search.value.trim())}`);
    emit('close');
  }
}
</script>

<style scoped>
/* Smooth accordion animation */
.accordion-slide {
  animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  overflow: hidden;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    max-height: 400px;
    transform: translateY(0);
  }
}

/* Mobile navigation hover effects using CSS variables */
.mobile-nav-link {
  color: var(--header-submenu-link-color, #444444);
  transition: color 0.2s ease;
}

.mobile-nav-link:hover {
  color: var(--header-submenu-link-color-hover, #a0a0a0) !important;
}

/* Accordion arrows using CSS variables */
.accordion-arrow {
  color: var(--header-submenu-link-color, #444444);
  transition: all 0.3s ease;
}

.accordion-arrow.rotate-180 {
  color: var(--header-submenu-link-color-hover, #a0a0a0);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #94a3b8, #64748b);
}

/* Mobile social links with dynamic background */
.social-link-mobile {
  color: var(--header-top-color, #000000);
  background-color: color-mix(in srgb, var(--header-top-color, #000000) 4%, transparent);
}

.social-link-mobile:hover {
  color: var(--header-top-color-hover, #7b7b7b);
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 12%, transparent);
}

.social-link-mobile:focus {
  color: var(--header-top-color-hover, #7b7b7b);
  outline: 2px solid color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 70%, transparent) !important;
  outline-offset: 2px;
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 12%, transparent);
}

/* Mobile phone number with dynamic styling - group hover */
.phone-icon-mobile {
  background-color: color-mix(in srgb, var(--header-top-color, #000000) 15%, transparent);
  color: var(--header-top-color, #000000);
}

.phone-group:hover .phone-icon-mobile {
  color: var(--header-top-color-hover, #7b7b7b);
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 12%, transparent);
}

.phone-icon-mobile:focus {
  color: var(--header-top-color-hover, #7b7b7b);
  outline: 2px solid color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 70%, transparent) !important;
  outline-offset: 2px;
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 15%, transparent);
}

.phone-link-mobile {
  color: var(--header-top-color, #000000);
}

.phone-group:hover .phone-link-mobile {
  color: var(--header-top-color-hover, #7b7b7b);
}

.phone-link-mobile:focus {
  color: var(--header-top-color-hover, #7b7b7b);
  outline: 2px solid color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 70%, transparent) !important;
  outline-offset: 2px;
}
</style>
