<template>
  <div>
      <!-- Toast component added here -->
    <Toast />
    <Header v-if="!hiddenRoutes.some(route => $route.path.includes(route))" />
    <main>
      <slot />
    </main>
    <Footer v-if="!hiddenRoutes.some(route => $route.path.includes(route))"/>
  </div>
</template>

<script setup>
import Header from '~/components/header/index.vue'
import Footer from '~/components/Footer.vue'
import { useCompanyData } from '~/composables/useCompanyData';
import { useStoreInfo } from '~/composables/useStoreInfo';
import { onMounted } from 'vue';
import { processTransporters } from '@/composables/services/cartService';
import Toast from '@/components/Toast.vue';
import { generateHeadData } from '@/composables/services/head.js';

const { companyData } = useCompanyData();
const { storeInfo } = useStoreInfo();

// Routes where header and footer should be hidden
const hiddenRoutes = ['/landing-page', '/checkout', '/upsell', '/blocked'];
const config = useRuntimeConfig()
const baseURL = config.public.baseURL

// Clean head management using service function
useHead(() => generateHeadData({
  storeInfo: storeInfo.value,
  companyData: companyData.value,
  baseURL
}));

// Use useLazyFetch for client-side only (delayed, not priority)
const { data: transportData, error: transportError, execute: fetchTransporters } = await useLazyFetch(
  () => companyData.value?.works_with_transport && companyData.value?.id 
    ? `${baseURL}transports-read/?company=${companyData.value.id}` 
    : null,
  {
    key: `transporters-${companyData.value?.id}`,
    server: false,
    immediate: false, // Do NOT fetch immediately
    lazy: true,
    default: () => ({ results: [] }),
    onResponse: (response) => {
      if (response.response?._data) {
        processTransporters(response.response._data, companyData.value);
      }
    }
  }
);

onMounted(() => {
  // Delay the API call for transporters (not a priority)
  setTimeout(() => {
    fetchTransporters();
  }, 1500); // 1.5 seconds delay
})
</script>


