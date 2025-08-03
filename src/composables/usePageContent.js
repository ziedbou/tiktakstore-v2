import { computed } from 'vue'
import { useFetch, useRuntimeConfig, useNuxtApp } from '#imports'
import { useCompanyData } from '@/composables/useCompanyData'

/**
 * Composable for fetching page content from API
 * 
 * @param {string} pageTypeOrId - Page type (e.g., 'home') or Page ID (e.g., '123') 
 * @param {boolean} isTypePage - true: fetch by page type, false: fetch by page ID (default: true)
 * @param {object} options - Additional useFetch options
 * 
 * @example
 * // Fetch home page by type (default behavior)
 * const { pageData } = usePageContent('home')
 * 
 * // Fetch landing page by ID
 * const { pageData } = usePageContent('456', false)
 */
export function usePageContent(pageTypeOrId, isTypePage = true, options = {}) {

  const { data, error } = getPageContent(pageTypeOrId, isTypePage, options)

  // Determine if we have results based on request type
  const hasResults = computed(() => {
    if (isTypePage) {
      // Page type requests return: { results: [...] }
      return data.value?.results?.length > 0
    } else {
      // Page ID requests return the page object directly
      return data.value && Object.keys(data.value).length > 0
    }
  })

  // Extract page data based on request type
  const pageData = computed(() => {
    if (isTypePage) {
      // Page type requests: return first result from results array
      if (data.value && data.value.results && data.value.results.length > 0) {
        return data.value.results[0]
      }
      return null
    } else {
      // Page ID requests: return the data directly (it's already the page object)
      return data.value
    }
  })

  return {
    data,
    pageData,
    error,
    hasResults,
  }
}

/**
 * Internal function to handle the actual API call
 */
function getPageContent(pageTypeOrId, isTypePage, options = {}) {
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  const companyId =  useCompanyData().companyId.value;
  // Build URL and cache key based on request type
  let url, cacheKey
  
  if (isTypePage) {
    // Request by page type: website/page-read/?page_type=${pageType}&company=${companyId}
    url = `${baseURL}website/page-read/?page_type=${pageTypeOrId}&company=${companyId}`
    cacheKey = `page-type-${pageTypeOrId}-${companyId}`
  } else {
    // Request by page ID: website/page-read/${pageId}/
    url = `${baseURL}website/page-read/${pageTypeOrId}/`
    cacheKey = `page-id-${pageTypeOrId}`
  }
  const defaultOptions = {
    key: cacheKey,
    server: true,
    lazy: false,
    fresh: false,
    getCachedData: (key, nuxtApp) =>  nuxtApp.payload.data[key] || nuxtApp.static.data[key]

  }

  return useFetch(url, { ...defaultOptions, ...options })
}
