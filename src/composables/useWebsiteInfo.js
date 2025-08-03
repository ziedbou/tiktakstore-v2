import { ref } from 'vue';
import { useFetch } from '#app';

export function useWebsiteInfo() {
  const websiteInfo = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  const { companyData } = useCompanyData();
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  
  const fetchWebsiteInfo = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await useFetch(`${baseURL}website/informations-read?slug=${companyData.value?.slug}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to fetch website information');
      }

      websiteInfo.value = data.value;
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching website info:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // Fetch data immediately when composable is used
  fetchWebsiteInfo();

  return {
    websiteInfo,
    error,
    isLoading,
    refetch: fetchWebsiteInfo,
  };
}