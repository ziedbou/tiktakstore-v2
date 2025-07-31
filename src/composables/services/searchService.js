// searchService.js

/**
 * API - Rechercher des produits
 */
export async function searchProducts(apiUrl, companyId, searchTerm) {
  const { default: axios } = await import('axios')

  const response = await axios.get(`${apiUrl}products-read/`, {
    params: {
      company: companyId,
      active: true,
      no_parent: true,
      show_children: false,
      search: searchTerm,
    }
  })

  return response.data
}

/**
 * API - Rechercher des catégories
 */
export async function searchCollections(apiUrl, companyId, searchTerm) {
  const { default: axios } = await import('axios')

  const response = await axios.get(`${apiUrl}categories-read`, {
    params: {
      company: companyId,
      active: true,
      search: searchTerm,
    }
  })

  return response.data
}

/**
 * API - Recherche avec pagination (produits)
 */
export async function searchProductsWithPagination(apiUrl) {
  const { default: axios } = await import('axios')

  const urlSecure = apiUrl.replace('http:', 'https:')
  const response = await axios.get(urlSecure)

  return response.data
}

/**
 * Vide les résultats de recherche
 */
export function clearSearchResults() {
  return {
    results: [],
  }
}

