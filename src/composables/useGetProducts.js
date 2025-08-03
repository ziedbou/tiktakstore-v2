/**
 * Dynamic hook to fetch products with caching
 * @param {Object} config - Configuration object
 * @param {string} config.type - 'single', 'list', or 'multiple'
 * @param {string} config.companyId - Company ID (default: '8GPmlML')
 * @param {Array} config.productIds - Array of product IDs (for 'single' and 'list' types)
 * @param {Object} config.productList - Section values object (for 'multiple' type)
 * @returns {Object} - useFetch result with products data
 */
export const useGetProducts = (config) => {
    const { type, companyId, productList = {}, cacheKey } = config

    const apiConfig = useRuntimeConfig()
    const baseURL = apiConfig.public.baseURL

    // Build API URL and params based on type
    const buildApiRequest = () => {
        let params = `?show-children=false&company=${companyId}`
        switch (type) {
            case 'single':
                if (!productList.products_ids?.[0]) {
                    throw new Error('Product ID is required for single product fetch')
                }
                params += `&ids_in=${productList.products_ids[0]}`
                return `${baseURL}products-read/${params}`

            case 'list':
                if (productList.dynamic) {
                    let ordering = productList.sort_by
                    let have_discount = productList.have_discount

                    const discount__gte = {
                        "discount_on": "1",
                        "discount_off": "0",
                        "both": "0",
                    }
                    let categories_in = productList.categories_in[0]
                    let size = productList.length

                    params += "&active=true&no_parent=true&size=" + size + "&ordering=" + ordering + "&discount__gte=" + discount__gte[have_discount] + "&has_category=" + categories_in
                } else {
                    let products_ids = productList.products_ids
                    let size = !products_ids.length ? productList.length : 30

                    params += "&active=true&no_parent=true&size=" + size + "&ids_in=" + products_ids.join(',')
                }
                return `${baseURL}products-read/${params}`

            case 'multiple':
                if (!productList) {
                    throw new Error('Product list is required for multiple products fetch')
                }

                // Check if productList is an array of product lists (for tabs)
                if (Array.isArray(productList)) {
                    // For multiple tabs, we'll return a special URL and handle it in transform
                    return `${baseURL}products-read/multiple-tabs`
                }

                if (productList.dynamic) {
                    let ordering = productList.sort_by
                    let have_discount = productList.have_discount

                    const discount__gte = {
                        "discount_on": "1",
                        "discount_off": "0",
                        "both": "0",
                    }
                    let categories_in = productList.categories_in[0]
                    let size = productList.length

                    params += "&active=true&no_parent=true&size=" + size + "&ordering=" + ordering + "&discount__gte=" + discount__gte[have_discount] + "&has_category=" + categories_in
                } else {
                    let products_ids = productList.products_ids
                    let size = !products_ids.length ? productList.length : 30

                    params += "&active=true&no_parent=true&size=" + size + "&ids_in=" + products_ids.join(',')
                }

                return `${baseURL}products-read/${params}`

            default:
                throw new Error(`Invalid type: ${type}. Must be 'single', 'list', or 'multiple'`)
        }
    }

    // Handle multiple product lists (tabs)
    if (type === 'multiple' && Array.isArray(productList)) {
        // Create multiple API calls
        const fetchPromises = productList.map((list) => {
            let params = `?show-children=false&company=${companyId}`

            if (Array.isArray(list)) {
                params += `&active=true&no_parent=true&size=${list.length}&ids_in=${list.join(',')}`
            } else if (typeof list === 'object' && list !== null) {
                // Handle object format (like your tab structure)
                if (list.dynamic) {
                    let ordering = list.sort_by
                    let have_discount = list.have_discount

                    const discount__gte = {
                        "discount_on": "1",
                        "discount_off": "0",
                        "both": "0",
                    }
                    let categories_in = list.categories_in[0]
                    let size = list.length

                    params += "&active=true&no_parent=true&size=" + size + "&ordering=" + ordering + "&discount__gte=" + discount__gte[have_discount] + "&has_category=" + categories_in
                } else {
                    let products_ids = list.products_ids
                    let size = !products_ids.length ? list.length : 30

                    params += "&active=true&no_parent=true&size=" + size + "&ids_in=" + products_ids.join(',')
                }
            }

            const url = `${baseURL}products-read/${params}`
            return $fetch(url)
        })

        return useLazyAsyncData(cacheKey, async () => {
            try {
                const results = await Promise.all(fetchPromises)
                return results.map(result => result?.results || [])
            } catch (error) {
                console.error('Error fetching multiple product lists:', error)
                return []
            }
        }, {
            server: false,
            default: () => [],
            getCachedData: (key, nuxtApp) => {
                return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
            },
        })
    }

    // Single product list
    const url = buildApiRequest()

    return useFetch(url, {
        key: cacheKey,
        server: false,
        lazy: true,
        getCachedData: (key, nuxtApp) =>  nuxtApp.payload.data[key] || nuxtApp.static.data[key],
        default: () => (type === 'single' ? null : []),
        transform: (data) => {
            switch (type) {
                case 'single':
                    return data?.results?.[0] || data
                case 'list':
                    return data?.results || []
                default:
                    return data?.results || data
            }
        }
    })
}


