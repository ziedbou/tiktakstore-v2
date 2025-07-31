<template>
  <footer class="bg-gray-900 footer-container">
    <div class="container-medium mx-auto px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32 footer-content">
      <div class="xl:grid xl:gap-8 footer-grid">
        <!-- Bloc logo (1/5) -->
        <div class="footer-logo-section">
          <NuxtLink to="/" class="footer-logo-link">
            <span class="sr-only">Your Company</span>
            <NuxtImg 
              class="h-20 w-auto max-h-[60px] md:max-h-[70px] max-w-[100px] md:max-w-[130px] object-contain footer-logo-img" 
              :src="cdnURL + companyData?.logo" 
              alt="company logo"
              width="auto"
              height="32"
              loading="eager"
              format="webp"
            />
          </NuxtLink>
        </div>

        <!-- Blocs menus (4/5) -->
        <div class="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 col-span-7 xl:mt-0 footer-menu-section">
          <div v-for="section in navigation.categories" :key="section.label" class="footer-menu-column">
            <h3 class="text-sm/6 font-semibold text-white footer-menu-title">{{ section.label }}</h3>
            <ul role="list" class="mt-6 space-y-4 footer-menu-list">
              <li v-for="item in section.submenu" :key="item.label" class="footer-menu-item">
                <a 
                  v-if="item.slug" 
                  :href="`/${item.slug}`" 
                  class="text-sm/6 text-gray-400 hover:text-white footer-menu-link"
                >
                  {{ item.label }}
                </a>
                <span 
                  v-else 
                  v-html="item.label" 
                  class="text-sm/6 text-gray-400 hover:text-white footer-menu-text"
                ></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 footer-copyright-section">
        <p class="text-sm/6 text-gray-400 w-fit mx-auto footer-copyright-text">
          {{companyData?.name}} – Powered by
          <a 
            href="https://www.tiktakpro.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="hover:text-[#f89c0e] font-semibold transition-colors duration-200 footer-copyright-link"
          >
            TikTak PRO.
          </a> 
          ©  All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useMenu } from '~/composables/useMenu'
import { useCompanyData } from '@/composables/useCompanyData';
const {companyId, companyData } = useCompanyData();
// Use the new composable for footer menu data with SSR
const { menuData: footerMenuData, error: menuError } = useMenu({ 
  companyId: companyId.value, 
  position: 'footer' 
});
const config = useRuntimeConfig();

const cdnURL = config.public.cdnURL;


// Create navigation object with the footer data and social links
const navigation = computed(() => ({
  categories: footerMenuData.value || [],
  social: [] // Add your social links here if needed
}));
</script>