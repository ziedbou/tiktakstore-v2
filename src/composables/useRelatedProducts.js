// ~/composables/useRelatedProducts.js
import { useState } from '#app';
import { useCompanyData } from '~/composables/useCompanyData';

export function useRelatedProducts() {
  // Shared state for related products
  console.log('useRelatedProducts__')

  const relatedProducts = useState('relatedProducts', () => []);
  const isLoading = useState('relatedProductsLoading', () => false);
  const error = useState('relatedProductsError', () => null);

  // Get company data from useCompanyData composable
  const { companyId, } = useCompanyData();

  // API base URL from runtimeConfig
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL

  // Function to fetch related products
  const fetchRelatedProducts = async (categoryId, productId) => {
    if (!categoryId || !productId || !companyId.value) {
      error.value = new Error('Missing category ID, product ID, or company ID');
      relatedProducts.value = [];
      return;
    }

    isLoading.value = true;
    error.value = null;
    // console.log('begin related product')
    try {
        const response = await $fetch(
            `${baseURL}products-read/?active=true&no_parent=true&show-children=false&has_category=${categoryId}&company=${companyId.value}&size=6&ids_not_in=${productId}`
        );
        relatedProducts.value = response.results || [];
        // console.log('related product respoonse___', response)
    } catch (err) {
        error.value = err;
        relatedProducts.value = [];
    } finally {
        isLoading.value = false;
    }
};

  return {
    relatedProducts,
    isLoading,
    error,
    fetchRelatedProducts,
  };
}