import { computed } from 'vue'
import { useCompanyData } from './useCompanyData'

export function useMenuSection(id) {

    const { companyId } = useCompanyData()
    const baseURL = useRuntimeConfig().public.baseURL
    // Compose the URL
    const url = computed(() => `${baseURL}website/menus-read/${id}?company=${companyId.value}`)

    // Use Nuxt's useFetch composable
    const { data, status, error} = useFetch(url, {
        server: false,
        lazy: true,
        pick: ['menus'],
    })

    // Extract menus safely
    const menuData = computed(() => data.value?.menus || [])
    // Compute loading state
    const isLoading = computed(() => status.value === 'pending')

    return {
        menuData,
        isLoading,
        error,
    }
}
