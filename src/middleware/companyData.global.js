import { useCompanyData } from '~/composables/useCompanyData.js';
import { useStoreInfo } from '~/composables/useStoreInfo.js';

export default defineNuxtRouteMiddleware(async (to) => {
  // console.log("Middleware running...");
  
  const { companyData, isLoading, fetchCompanyData } = useCompanyData();
  const { storeInfo, isLoading: storeInfoLoading, fetchStoreInfo } = useStoreInfo();
  const requestUrl = useRequestURL()
  
  // console.log("Middleware - companyData:", companyData.value?.account_type);
  // console.log("Middleware - isLoading:", isLoading.value);
  // console.log("Middleware - requestUrl:", requestUrl.href);
  
  // Fetch company data if it's not already loaded
  if (!companyData.value && !isLoading.value) {
    // console.log("Fetching company data...");
    await fetchCompanyData(requestUrl.href);
  } else {
    // console.log("Skipping fetch - data already exists or loading");
  }

  // Fetch store info if company data exists but store info doesn't
  if (companyData.value?.slug && !storeInfo.value && !storeInfoLoading.value) {
    // console.log("Fetching store info...");
    await fetchStoreInfo(companyData.value.slug);
  }

  // Skip redirect check if already on blocked page to prevent infinite loop
  if (to.path === '/blocked' || to.path === '/password') {
    return;
  }

  // Check if account type is commission and store is not activated
  if (companyData.value?.account_type === 'commission' && !companyData.value?.store_activated) {
    // console.log("Redirecting to /blocked - commission account with inactive store");
    //return navigateTo('/blocked');
    return navigateTo('/password');
  }
});