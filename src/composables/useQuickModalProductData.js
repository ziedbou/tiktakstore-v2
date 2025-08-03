import { ref } from 'vue'
import { useCompanyData } from './useCompanyData'

export function useQuickModalProductData(productId) {
  const productData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  const { companyId, fetchCompanyData } = useCompanyData()

  async function fetchProductData() {
    if (!companyId.value) {
      await fetchCompanyData()
    }

    if (!companyId.value) {
      error.value = 'Company ID not available'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const ENDPOINT_API = baseURL + 'products-read/'
      const fullApi = `${ENDPOINT_API}${productId}/?company=${companyId.value}`

      const res = await $fetch(fullApi)

      productData.value = res
      // console.log("productData__", fullApi, res)
    } catch (err) {
      error.value = err.message || 'Failed to fetch product data'
    } finally {
      isLoading.value = false
    }
  }

  return {
    productData,
    isLoading,
    error,
    fetchProductData
  }
}