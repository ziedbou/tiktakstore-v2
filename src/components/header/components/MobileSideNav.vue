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
            class="relative flex w-full flex-col overflow-y-auto bg-white shadow-2xl"
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
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>

            <!-- Navigation Content -->

            <div class="p-3">
              <template
                v-for="category in navigation.categories"
                :key="category.name"
              >
                <!-- Category without submenu (DIRECT LINK) -->
                <template
                  v-if="!category.submenu || category.submenu.length === 0"
                >
                  <div class="rounded-lg transition-all duration-200">
                    <!-- External category link -->
                    <a
                      v-if="category.type === 'extern'"
                      :href="category.href"
                      class="flex items-center p-3 transition-all duration-200 group nav-link-hover"
                      @click="$emit('close')"
                    >
                      <div class="flex items-center">
                        <span class="text-md mobile-nav-link">{{
                          category.name
                        }}</span>
                       
                      </div>
                    </a>
                    <!-- Internal category link -->
                    <NuxtLink
                      v-else
                      :to="category.href"
                      class="flex items-center p-3 transition-all duration-200 group nav-link-hover"
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
                <div v-else class="transition-all duration-200 overflow-hidden">
                  <div
                    class="flex items-center justify-between p-3 cursor-pointer accordion-header"
                    :class="{
                      'accordion-open': expandedCategories.includes(
                        category.name
                      ),
                    }"
                    @click="toggleCategory(category.name)"
                  >
                    <div class="flex items-center">
                      <span class="text-md mobile-nav-link">{{
                        category.name
                      }}</span>
                    </div>

                    <div class="flex items-center space-x-2">
                      <!-- Dropdown arrow for accordion -->
                      <ChevronUp
                        class="w-5 h-5 transition-all duration-300 accordion-arrow"
                        :class="{
                          'rotate-180': expandedCategories.includes(
                            category.name
                          ),
                        }"
                      />
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
                            class="flex items-center p-3 text-gray-700 transition-all duration-200 rounded-lg group nav-link-hover"
                            @click="$emit('close')"
                          >
                            <span
                              class="font-medium text-[var(--header-submenu-link-color)]"
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
                            class="flex items-center p-3 text-gray-700 transition-all duration-200 rounded-lg group nav-link-hover"
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
                        <div v-else>
                          <div
                            class="flex items-center justify-between p-3 cursor-pointer transition-all duration-200 accordion-header"
                            :class="{
                              'accordion-open': expandedSubmenus.includes(
                                submenu.slug
                              ),
                            }"
                            @click="toggleSubmenu(submenu.slug)"
                          >
                            <span
                              class="font-medium text-[var(--header-submenu-link-color)]"
                              >{{ submenu.label }}</span
                            >
                            <div class="flex items-center space-x-2">
                              <!-- Dropdown arrow only -->
                              <ChevronUp
                                class="w-4 h-4 transition-all duration-300 accordion-arrow"
                                :class="{
                                  'rotate-180': expandedSubmenus.includes(
                                    submenu.slug
                                  ),
                                }"
                              />
                            </div>
                          </div>

                          <!-- Sub-submenu Items -->
                          <div
                            v-if="expandedSubmenus.includes(submenu.slug)"
                            class="accordion-slide"
                          >
                            <div
                              class="px-4 py-2 space-y-1 sub-submenu-container"
                            >
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
                                  class="flex items-center p-2 transition-all duration-200 rounded-md text-sm group nav-link-hover"
                                  @click="$emit('close')"
                                >
                                  <span
                                  class="text-[var(--header-submenu-link-color)]"
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
                                  class="flex items-center p-2 transition-all duration-200 rounded-md text-sm group nav-link-hover"
                                  @click="$emit('close')"
                                >
                                  <span
                                  class="text-[var(--header-submenu-link-color)]"
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
            <div class="account-link-mobile flex gap-3 border-t border-gray-100 py-4 px-8">
                <!-- Account -->
            <NuxtLink
              to="/account"
              @click="$emit('close')"
              class="user-action-link-vertical w-fit flex flex-col items-center justify-center rounded-sm px-2 py-3 transition-all duration-300"
            >
              <Icon name="ph:user" class="w-6 h-6" />
              <span class="text-xs mobile-nav-link">Account</span>
            </NuxtLink>
            <div  @click="$emit('close')">
            <NavWishlistBtn
              :show-text="true"
              button-class="user-action-link-vertical flex flex-col rounded-sm items-center px-2 py-3 transition-all duration-200 text-center"
              text-class="text-xs text-[var(--header-submenu-link-color)] hover:text-[var(--header-submenu-link-color-hover)] transition-colorsss duration-200ss"
            />
          </div>
            </div>
            <!-- Footer -->
            <div
              class="mt-auto bottom-0 bg-white/90 backdrop-blur-md border-t border-gray-100 py-4 px-4"
            >
              <div class="space-y-4">
                <div v-if="companyData?.phone" class="text-center">
                  <NuxtLink
                    :to="`tel:${companyData.phone}`"
                    class="social-link-mobile inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition-all duration-300"
                  >
                    <Icon name="ph:phone-bold" class="w-3.5 h-3.5" />
                    <span class="text-xs font-medium">{{
                      companyData.phone
                    }}</span>
                  </NuxtLink>
                </div>
                <div class="flex justify-center items-center space-x-2.5">
                  <NuxtLink
                    v-if="storeInfo?.contact_settings?.facebook"
                    :to="`https://facebook.com/${storeInfo.contact_settings.facebook}`"
                    class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
                    target="_blank"
                  >
                    <Icon name="ri:facebook-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
                  <NuxtLink
                    v-if="companyData?.phone"
                    :to="`https://wa.me/${companyData.phone.replace(
                      /[^0-9]/g,
                      ''
                    )}`"
                    class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
                    target="_blank"
                  >
                    <Icon name="ri:whatsapp-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
                  <NuxtLink
                    v-if="storeInfo?.contact_settings?.instagram"
                    :to="`https://instagram.com/${storeInfo.contact_settings.instagram}`"
                    class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
                    target="_blank"
                  >
                    <Icon name="ri:instagram-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
                  <NuxtLink
                    v-if="storeInfo?.contact_settings?.tiktok"
                    :to="`https://tiktok.com/@${storeInfo.contact_settings.tiktok}`"
                    class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
                    target="_blank"
                  >
                    <Icon name="ri:tiktok-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
                  <NuxtLink
                    v-if="storeInfo?.contact_settings?.youtube"
                    :to="`https://youtube.com/@${storeInfo.contact_settings.youtube}`"
                    class="social-link-mobile w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
                    target="_blank"
                  >
                    <Icon name="ri:youtube-fill" class="w-3.5 h-3.5" />
                  </NuxtLink>
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
import { ChevronUp, X } from "lucide-vue-next";
import NavWishlistBtn from "~/components/header/components/NavWishlistBtn.vue";

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
    default: () => ({}),
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
    emit("close");
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
  color: var(--header-submenu-link-color-hover) !important;
}

/* Accordion arrows using CSS variables */
.accordion-arrow {
  color: var(--header-submenu-link-color, #444444);
  transition: all 0.3s ease;
}

.accordion-arrow.rotate-180 {
  color: var(--header-submenu-link-color-hover);
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
  color: var(--header-submenu-link-color, #444444);
  background-color: color-mix(
    in srgb,
    var(--header-submenu-link-color, #444444) 4%,
    transparent
  );
}

.social-link-mobile:hover {
  color: var(--header-submenu-link-color-hover);
  background-color: color-mix(
    in srgb,
    var(--header-submenu-link-color-hover) 12%,
    transparent
  );
}

.social-link-mobile:focus {
  color: var(--header-submenu-link-color-hover);
  outline: 2px solid
    color-mix(
      in srgb,
      var(--header-submenu-link-color-hover) 70%,
      transparent
    ) !important;
  outline-offset: 2px;
  background-color: color-mix(
    in srgb,
    var(--header-submenu-link-color-hover) 12%,
    transparent
  );
}

/* Accordion open state styling */
.accordion-header.accordion-open {
  background-color: color-mix(
    in srgb,
    var(--header-submenu-link-color-hover) 8%,
    transparent
  );
  border-radius: 8px;
}

.accordion-header.accordion-open .mobile-nav-link {
  color: var(--header-submenu-link-color-hover) !important;
}

.accordion-header.accordion-open span {
  color: var(--header-submenu-link-color-hover) !important;
}

.accordion-header.accordion-open .accordion-arrow {
  color: var(--header-submenu-link-color-hover) !important;
}

/* Hover effects for all navigation links and accordion headers */
.nav-link-hover:hover {
  background-color: color-mix(
    in srgb,
    var(--header-submenu-link-color-hover) 8%,
    transparent
  );
  border-radius: 8px;
}

.nav-link-hover:hover .mobile-nav-link {
  color: var(--header-submenu-link-color-hover) !important;
}

.nav-link-hover:hover span {
  color: var(--header-submenu-link-color-hover) !important;
}

.accordion-header:hover {
  background-color: color-mix(
    in srgb,
    var(--header-submenu-link-color-hover) 8%,
    transparent
  );
  border-radius: 8px;
}

.accordion-header:hover .mobile-nav-link {
  color: var(--header-submenu-link-color-hover) !important;
}

.accordion-header:hover span {
  color: var(--header-submenu-link-color-hover) !important;
}

.accordion-header:hover .accordion-arrow {
  color: var(--header-submenu-link-color-hover) !important;
}

/* Sub-submenu container with lighter background when open */
.sub-submenu-container {
  background-color: color-mix(
    in srgb,
    var(--header-submenu-link-color-hover) 4%,
    transparent
  );
  border-radius: 6px;
  margin: 4px 0;
}
</style>
