<template>
  <!-- Header Top Section -->
  <div class="header-top bg-white text-black border-b border-gray-200" style="background-color: var(--header-top-bg, #ffffff); color: var(--header-top-color, #000000);">
    <div class="header-container">
            <div class="flex items-center justify-between py-1.5">
        <!-- Left Side: Phone Number - Always Visible -->
        <div class="flex items-center space-x-4 flex-shrink-0">
          <NuxtLink v-if="companyData?.phone && showPhone" :to="`tel:${companyData.phone}`" class="phone-link flex items-center px-2 py-1 rounded-full transition-all duration-300">
            <Icon name="ph:phone" class="w-3.5 h-3.5 mr-1.5" />
            <span class="text-xs">{{ companyData.phone }}</span>
          </NuxtLink>
        </div>

        <!-- Center: Marquee Text - Takes available space -->
        <div class="flex-1 flex justify-center min-w-0">
          <TopBarMarquee v-if="showMarquee" :texts="marqueeTexts" :is-standalone="isMarqueeStandalone" />
        </div>
        
        <!-- Right Side: Navigation Links and Social Media - Always at right -->
        <div class="flex items-center gap-2 flex-shrink-0 max-w-fit">
                      <!-- Desktop: Show all links and social icons directly -->
            <div class="hidden md:flex items-center gap-1">
              <!-- Navigation Links -->
              <div v-if="showNavLinks" class="flex items-center space-x-2 mr-2">
                <NuxtLink 
                  v-for="link in staticLinks" 
                  :key="link.url"
                  :to="link.url" 
                  class="top-nav-link flex items-center px-2 py-1 rounded-full transition-all duration-300"
                >
                  <span class="text-xs">{{ link.label }}</span>
                </NuxtLink>
              </div>
              
              <!-- Social Media Links -->
              <div v-if="showSocialMedia" class="flex items-center gap-1">
              <NuxtLink v-if="storeInfo?.contact_settings?.facebook" :to="storeInfo.contact_settings.facebook" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                <Icon name="ri:facebook-fill" class="w-3.5 h-3.5" />
              </NuxtLink>
              <NuxtLink v-if="storeInfo.contact_settings.whatsapp" :to="`https://wa.me/${storeInfo.contact_settings.whatsapp}`" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                <Icon name="ri:whatsapp-fill" class="w-3.5 h-3.5" />
              </NuxtLink>
              <NuxtLink v-if="storeInfo?.contact_settings?.instagram" :to="storeInfo.contact_settings.instagram" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                <Icon name="ri:instagram-fill" class="w-3.5 h-3.5" />
              </NuxtLink>
              <NuxtLink v-if="storeInfo?.contact_settings?.tiktok" :to="storeInfo.contact_settings.tiktok" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                <Icon name="ri:tiktok-fill" class="w-3.5 h-3.5" />
              </NuxtLink>
              <NuxtLink v-if="storeInfo?.contact_settings?.youtube" :to="storeInfo.contact_settings.youtube" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
                <Icon name="ri:youtube-fill" class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>
          </div>

          <!-- Mobile: Dropdown for links only (no social icons) -->
          <div v-if="showNavLinks" class="md:hidden relative">
            <button 
              @click="toggleContactsAccordion" 
              class="contact-accordion-btn duration-300 flex items-center justify-end transition-all"
            >
              <span class="text-xs font-medium">Menu</span>
              <Icon 
                name="ph:caret-down" 
                :class="[isContactsOpen ? 'rotate-180' : 'rotate-0', 'w-3 h-3 ml-1.5 transition-transform duration-300']"
              />
            </button>

            <!-- Absolute Dropdown -->
            <div 
              v-if="isContactsOpen" 
              class="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-slide-down"
            >
              <!-- Navigation Links Section -->
              <div v-if="showNavLinks" class="py-2">
                <div class="space-y-1">
                  <NuxtLink 
                    v-for="link in staticLinks" 
                    :key="link.url"
                    :to="link.url" 
                    class="dropdown-link-item flex items-center justify-between px-4 py-3 bg-white transition-all duration-200 border-b border-gray-100 last:border-b-0 group"
                    @click="isContactsOpen = false"
                  >
                    <span class="text-xs font-medium">{{ link.label }}</span>
                    <Icon name="ph:arrow-right" class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TopBarMarquee from './TopBarMarquee.vue';

// Define props
const props = defineProps({
  companyData: {
    type: Object,
    default: () => ({})
  },
  storeInfo: {
    type: Object,
    default: () => ({})
  }
});

// Computed properties for top bar settings
const topBarSettings = computed(() => {
  return props.storeInfo?.topbar_settings || {};
});

const showPhone = computed(() => {
  // Show phone by default if topBarSettings is empty or if explicitly enabled
  if (!topBarSettings.value || Object.keys(topBarSettings.value).length === 0) {
    return true;
  }
  return topBarSettings.value?.show_phone_number;
});

const showSocialMedia = computed(() => {
  // Show social media by default if topBarSettings is empty or if explicitly enabled
  if (!topBarSettings.value || Object.keys(topBarSettings.value).length === 0) {
    return true;
  }
  return topBarSettings.value?.show_social_icons;
});

const showNavLinks = computed(() => {
  return topBarSettings.value?.static_links && topBarSettings.value.static_links.length > 0;
});

const staticLinks = computed(() => {
  return topBarSettings.value?.static_links || [];
});

const marqueeTexts = computed(() => {
  return topBarSettings.value?.marquee_texts || [];
});

const showMarquee = computed(() => {
  return marqueeTexts.value.length > 0;
});

const isMarqueeStandalone = computed(() => {
  return !showPhone.value && !showNavLinks.value && !showSocialMedia.value;
});
// Reactive variables
const isContactsOpen = ref(false);

// Functions
function toggleContactsAccordion() {
  isContactsOpen.value = !isContactsOpen.value;
}
</script>

<style scoped>
/* Mobile menu slide-down animation */
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

/* Social links styling with CSS variables */
.social-link {
  color: var(--header-top-color, #000000);
}

.social-link:hover {
  color: var(--header-top-color-hover, #7b7b7b);
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 10%, transparent);
}

/* Phone link styling - matches social icons */
.phone-link {
  color: var(--header-top-color, #000000);
}

.phone-link:hover {
  color: var(--header-top-color-hover, #7b7b7b);
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 10%, transparent);
}

.phone-link:focus {
  color: var(--header-top-color-hover, #7b7b7b);
  outline: 2px solid color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 70%, transparent) !important;
  outline-offset: 2px;
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 10%, transparent);
}

/* Specific focus styles for social links only - Brand-aware */
.social-link:focus {
  color: var(--header-top-color-hover, #7b7b7b);
  outline: 2px solid color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 70%, transparent) !important;
  outline-offset: 2px;
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 10%, transparent);
}

/* Mobile contact accordion styling - minimalistic */
.contact-accordion-btn {
  color: var(--header-top-color, #000000);
}

.contact-accordion-btn:hover {
  color: var(--header-top-color-hover, #7b7b7b);
}

.contact-accordion-btn:focus {
  outline: none;
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
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 10%, transparent);
}

/* Dropdown link items styling with submenu colors */
.dropdown-link-item {
  color: var(--header-submenu-link-color, #444444);
}

.dropdown-link-item:hover {
  color: var(--header-submenu-link-color-hover);
  background-color: color-mix(in srgb, var(--header-submenu-link-color-hover) 8%, transparent);
}

  .dropdown-link-item:focus {
    color: var(--header-submenu-link-color-hover);
    outline: none;
    background-color: color-mix(in srgb, var(--header-submenu-link-color-hover) 8%, transparent);
  }


.dropdown-link-item .ph-arrow-right {
  color: var(--header-submenu-link-color, #444444);
}

.dropdown-link-item:hover .ph-arrow-right {
  color: var(--header-submenu-link-color-hover);
}



/* Top navigation links styling - matches phone and social links */
.top-nav-link {
  color: var(--header-top-color, #000000);
}

.top-nav-link:hover {
  color: var(--header-top-color-hover, #7b7b7b);
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 10%, transparent);
}

.top-nav-link:focus {
  color: var(--header-top-color-hover, #7b7b7b);
  outline: 2px solid color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 70%, transparent) !important;
  outline-offset: 2px;
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 10%, transparent);
}

/* Mobile navigation links styling */
.top-nav-link-mobile {
  color: var(--header-top-color, #000000);
  background-color: color-mix(in srgb, var(--header-top-color, #000000) 4%, transparent);
}

.top-nav-link-mobile:hover {
  color: var(--header-top-color-hover, #7b7b7b);
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 12%, transparent);
}

.top-nav-link-mobile:focus {
  color: var(--header-top-color-hover, #7b7b7b);
  outline: 2px solid color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 70%, transparent) !important;
  outline-offset: 2px;
  background-color: color-mix(in srgb, var(--header-top-color-hover, #7b7b7b) 15%, transparent);
}
</style>
