import { useState } from 'nuxt/app'
import { useCompanyData } from './useCompanyData'

export function useProductExtraData(productId = '309613') {
  const productExtraData = useState('productExtraData', () => null)
  const isLoading = useState('productExtraLoading', () => false)
  const error = useState('productExtraError', () => null)
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  const { companyId, fetchCompanyData } = useCompanyData()

  async function fetchProductExtraData() {
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
        const ENDPOINT_API = baseURL + 'product-extra-read/'
        const fullApi = `${ENDPOINT_API}?product=${productId}&company=${companyId.value}`

        const res = await $fetch(fullApi)

        productExtraData.value = res[0]
        // console.log("productExtraData__", fullApi, res)
    } catch (err) {
        error.value = err.message || 'Failed to fetch product extra data'
    } finally {
        isLoading.value = false
    }
  }

  return {
    productExtraData,
    isLoading,
    error,
    fetchProductExtraData
  }
}