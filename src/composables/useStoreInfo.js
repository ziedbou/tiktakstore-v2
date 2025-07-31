import { useState, useFetch } from 'nuxt/app'

export function useStoreInfo() {
  const storeInfo = useState('storeInfo', () => null)
  const isLoading = useState('storeInfoLoading', () => false)
  const error = useState('storeInfoError', () => null)

  async function fetchStoreInfo(slug) {
    isLoading.value = true
    error.value = null
    
    try {
      // console.log("fetching store info for slug:", slug)
      const config = useRuntimeConfig()
      const baseURL = config.public.baseURL
      const ENDPOINT_API = baseURL + 'website/informations-read'
      const fullApi = `${ENDPOINT_API}?slug=${slug}`
      const { data, error: fetchError } = await useFetch(fullApi,{
        key: `store-info-${slug}`,
        fresh: false,
        lazy: false,
        server: true,
        getCachedData: (key) => {
          const nuxtApp = useNuxtApp()
          return nuxtApp.payload.data[key] || nuxtApp.static?.data?.[key]
        }
      })
      // console.log("fetcheddata", data)
      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to fetch store info')
      }

      storeInfo.value = data.value
    } catch (err) {
      error.value = err.message || 'Failed to fetch store info'
    } finally {
      isLoading.value = false
    }
  }

  return {
    storeInfo,
    isLoading,
    error,
    fetchStoreInfo,
  }
} 