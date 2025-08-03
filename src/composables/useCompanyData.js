import { useState, useFetch } from 'nuxt/app'
import { getSlugOrServer } from './services/helpers'


export function useCompanyData() {
  const companyData = useState('companyData', () => null)
  const companyId = useState('companyId', () => null)
  const isLoading = useState('companyLoading', () => false)
  const error = useState('companyError', () => null)

  async function fetchCompanyData(host) {
    isLoading.value = true
    error.value = null
    
    const config = useRuntimeConfig();
    const baseURL = config.public.baseURL;
  
    try {
      const [identifier, type] = getSlugOrServer(host)
      // console.log("identifier",host)
      const ENDPOINT_API = baseURL + 'get-store/'
      const fullApi = `${ENDPOINT_API}?${type}=${identifier}`
      // console.log("fullApi", fullApi)
      const { data, error: fetchError } = await useFetch(fullApi)
      //  console.log("fetcheddata", data)
      if (fetchError.value) {
        throw new Error(fetchError.value.message || 'Failed to fetch company data')
      }

      companyData.value = data.value
      companyId.value = data.value.id
    } catch (err) {
      error.value = err.message || 'Failed to fetch company data'
    } finally {
      isLoading.value = false
    }
  }

  return {
    companyData,
    isLoading,
    error,
    companyId,
    fetchCompanyData,
  }
}

//  const host = window.location.host
// const host = "https://belvie.tn"
//const host = "benyaghlane.tn"
// const host = "https://joby.tiktak-store.com/"
// const host = "fediafashion.com"
//  const host = "https://velvia.tiktak-store.com/product-list/77887/jelbeb/"
// const host = "https://benyaghlane.tn/product/57625/snacks/477347/daddy's-chips-chevre-et-miel-70-gr/"
// const host = "https://pingoo.tn/product/35550/bricolage/566838/nettoyeur-haute%20pression/"
// const host = "https://showroom.com.tn/product/29383/robes/636384/robe-shatha/"
// const host = "https://maprincesse.tn/product/39109/serre-t%C3%AAtes-/229967/ensemble-de-3-bandeaux/"
// console.log("host_____________", host)