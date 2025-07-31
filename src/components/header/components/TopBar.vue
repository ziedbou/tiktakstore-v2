<template>
  <!-- Header Top Section -->
  <div class="header-top bg-white text-black border-b border-gray-200" style="background-color: var(--header-top-bg, #ffffff); color: var(--header-top-color, #000000);">
    <div class="header-container">
      <!-- Desktop View -->
      <div class="hidden md:flex justify-between items-center py-1.5 max-sm:flex-col max-sm:gap-2 max-sm:text-center">
        <!-- Left Side: Contact Info -->
        <div class="flex items-center space-x-4">
          <NuxtLink v-if="companyData?.phone && showPhone" :to="`tel:${companyData.phone}`" class="phone-link flex items-center px-2 py-1 rounded-full transition-all duration-300">
            <Icon name="ph:phone" class="w-3.5 h-3.5 mr-1.5" />
            <span class="text-xs">{{ companyData.phone }}</span>
          </NuxtLink>
        </div>
        
        <!-- Right Side: Navigation Links and Social Media -->
        <div class="flex items-center gap-2">
          <!-- Navigation Links -->
          <div v-if="showNavLinks" class="flex items-center space-x-3 mr-4">
            <NuxtLink to="/page/about" class="top-nav-link flex items-center px-2 py-1 rounded-full transition-all duration-300">
              <Icon name="ph:info" class="w-3.5 h-3.5 mr-1" />
              <span class="text-xs">À propos de nous</span>
            </NuxtLink>
            <NuxtLink to="/contact" class="top-nav-link flex items-center px-2 py-1 rounded-full transition-all duration-300">
              <Icon name="ph:envelope" class="w-3.5 h-3.5 mr-1" />
              <span class="text-xs">Contactez-nous</span>
            </NuxtLink>
            <NuxtLink to="/login" class="top-nav-link flex items-center px-2 py-1 rounded-full transition-all duration-300">
              <Icon name="ph:sign-in" class="w-3.5 h-3.5 mr-1" />
              <span class="text-xs">Se connecter</span>
            </NuxtLink>
          </div>
          
          <!-- Social Media Links -->
          <div v-if="showSocialMedia" class="flex items-center gap-2">
            <NuxtLink v-if="storeInfo?.contact_settings?.facebook" :to="`https://facebook.com/${storeInfo.contact_settings.facebook}`" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
              <Icon name="ri:facebook-fill" class="w-3.5 h-3.5" />
            </NuxtLink>
            <NuxtLink v-if="companyData?.phone" :to="`https://wa.me/${companyData.phone.replace(/[^0-9]/g, '')}`" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
              <Icon name="ri:whatsapp-fill" class="w-3.5 h-3.5" />
            </NuxtLink>
            <NuxtLink v-if="storeInfo?.contact_settings?.instagram" :to="`https://instagram.com/${storeInfo.contact_settings.instagram}`" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
              <Icon name="ri:instagram-fill" class="w-3.5 h-3.5" />
            </NuxtLink>
            <NuxtLink v-if="storeInfo?.contact_settings?.tiktok" :to="`https://tiktok.com/@${storeInfo.contact_settings.tiktok}`" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
              <Icon name="ri:tiktok-fill" class="w-3.5 h-3.5" />
            </NuxtLink>
            <NuxtLink v-if="storeInfo?.contact_settings?.youtube" :to="`https://youtube.com/@${storeInfo.contact_settings.youtube}`" class="social-link w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300" target="_blank">
              <Icon name="ri:youtube-fill" class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Mobile Accordion View -->
      <div class="md:hidden py-2">
        <button 
          @click="toggleContactsAccordion" 
          class="contact-accordion-btn duration-300 flex items-center justify-end transition-all w-full"
        >
          <span class="text-xs font-medium">{{ getAccordionTitle() }}</span>
          <Icon 
            name="ph:caret-down" 
            :class="[isContactsOpen ? 'rotate-180' : 'rotate-0', 'w-3 h-3 ml-1.5 transition-transform duration-300']"
          />
        </button>
        
        <!-- Accordion Content -->
        <div 
          v-if="isContactsOpen" 
          class="contact-accordion-content mt-3 pb-3 animate-slide-down bg-white rounded-lg border border-gray-100 shadow-sm"
        >
          <div class="px-4 space-y-4">
            <!-- Navigation Links Section -->
            <div v-if="showNavLinks" class="border-b border-gray-200 pb-4">
              <div class="text-center mb-3">
                <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">Menu rapide</span>
              </div>
              <div class="space-y-2">
                <NuxtLink to="/page/about" class="top-nav-link-mobile flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-300">
                  <Icon name="ph:info" class="w-4 h-4 mr-2" />
                  <span class="text-sm">À propos de nous</span>
                </NuxtLink>
                <NuxtLink to="/contact" class="top-nav-link-mobile flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-300">
                  <Icon name="ph:envelope" class="w-4 h-4 mr-2" />
                  <span class="text-sm">Contactez-nous</span>
                </NuxtLink>
                <NuxtLink to="/login" class="top-nav-link-mobile flex items-center justify-center px-3 py-2 rounded-lg transition-all duration-300">
                  <Icon name="ph:sign-in" class="w-4 h-4 mr-2" />
                  <span class="text-sm">Se connecter</span>
                </NuxtLink>
              </div>
            </div>

            <!-- Phone Number -->
            <div v-if="companyData?.phone && showPhone" class="flex items-center justify-center border-b border-gray-200 py-4">
              <NuxtLink :to="`tel:${companyData.phone}`" class="phone-group flex items-center space-x-3 group transition-all duration-300">
                <div class="phone-icon-mobile flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center">
                  <Icon name="ph:phone-bold" class="w-4.5 h-4.5" />
                </div>
                <span class="phone-link-mobile text-sm font-medium">
                  {{ companyData.phone }}
                </span>
              </NuxtLink>
            </div>

            <!-- Social Media Links Grid -->
            <div v-if="showSocialMedia" class="space-y-3">
              <div class="text-center">
                <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">Suivez-nous</span>
              </div>
              <div class="flex justify-center items-center space-x-4">
                <NuxtLink v-if="storeInfo?.contact_settings?.facebook" :to="`https://facebook.com/${storeInfo.contact_settings.facebook}`" class="social-link-mobile w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                  <Icon name="ri:facebook-fill" class="w-5 h-5" />
                </NuxtLink>
                <NuxtLink v-if="companyData?.phone" :to="`https://wa.me/${companyData.phone.replace(/[^0-9]/g, '')}`" class="social-link-mobile w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                  <Icon name="ri:whatsapp-fill" class="w-5 h-5" />
                </NuxtLink>
                <NuxtLink v-if="storeInfo?.contact_settings?.instagram" :to="`https://instagram.com/${storeInfo.contact_settings.instagram}`" class="social-link-mobile w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                  <Icon name="ri:instagram-fill" class="w-5 h-5" />
                </NuxtLink>
                <NuxtLink v-if="storeInfo?.contact_settings?.tiktok" :to="`https://tiktok.com/@${storeInfo.contact_settings.tiktok}`" class="social-link-mobile w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                  <Icon name="ri:tiktok-fill" class="w-5 h-5" />
                </NuxtLink>
                <NuxtLink v-if="storeInfo?.contact_settings?.youtube" :to="`https://youtube.com/@${storeInfo.contact_settings.youtube}`" class="social-link-mobile w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:shadow-md" target="_blank">
                  <Icon name="ri:youtube-fill" class="w-5 h-5" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Define props
const props = defineProps({
  companyData: {
    type: Object,
    default: () => ({})
  },
  storeInfo: {
    type: Object,
    default: () => ({})
  },
  showNavLinks: {
    type: Boolean,
    default: false
  },
  showPhone: {
    type: Boolean,
    default: true
  },
  showSocialMedia: {
    type: Boolean,
    default: true
  }
});

// Reactive variables
const isContactsOpen = ref(false);

// Functions
function toggleContactsAccordion() {
  isContactsOpen.value = !isContactsOpen.value;
}

function getAccordionTitle() {
  if (props.showNavLinks && props.showPhone && props.showSocialMedia) {
    return 'Contacts & Menu';
  } else if (props.showNavLinks) {
    return 'Menu';
  } else {
    return 'Contacts';
  }
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
