// productService.js
import axios from 'axios'
import { useRuntimeConfig } from '#imports'
/**
 * Calcule le stock total d'un produit (y compris déclinaisons)
 */
export function calculateTotalStock(product) {
  if (!product) return 0

  try {
    if (product.declinaisons?.length) {
      return product.declinaisons.reduce((total, decl) => total + (decl.stock || 0), 0)
    } else {
      return product.stock || 0
    }
  } catch (error) {
    console.error('Erreur calculateTotalStock:', error)
    return 0
  }
}

/**
 * Vérifie et ajuste la quantité max dans le panier
 */
export function checkMaxStock(detail) {
  try {
    if (detail.quantity > detail._product.stock) {
      detail.quantity = detail._product.stock
    }
    return detail._product.stock
  } catch (error) {
    console.error('Erreur checkMaxStock:', error)
    return 0
  }
}

/**
 * API - Récupérer produits fréquemment achetés ensemble
 */
export async function getFrequentlyBoughtTogether(apiUrl, companyId, categoryId, productId) {
  const { default: axios } = await import('axios')

  const response = await axios.get(`${apiUrl}products-read/`, {
    params: {
      active: true,
      no_parent: true,
      show_children: false,
      has_category: categoryId,
      company: companyId,
      size: 6,
      ids_not_in: productId,
    }
  })

  return response.data?.results || []
}

/**
 * Retourne la liste des attributs d'un produit sous forme de texte
 */
export function getProductAttributesText(product) {
  try {
    if (!product?._attributs) return ''
    return product._attributs.map(attr => attr.name).join(' ')
  } catch (error) {
    console.error('Erreur getProductAttributesText:', error)
    return ''
  }
}

 


export const fetchSectionProducts = async ({ sectionValues, companyId = '8GPmlML' }) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  let params = `?show-children=false&company=${companyId}`

  if (sectionValues.dynamic) {
    const ordering = sectionValues.sort_by
    const have_discount = sectionValues.have_discount

    const discount__gte = {
      discount_on: '1',
      discount_off: '0',
      both: '0',
    }

    const categories_in = sectionValues.categories_in
    const size = sectionValues.length

    params += `&active=true&no_parent=true&size=${size}&ordering=${ordering}&discount__gte=${discount__gte[have_discount]}&has_category=${categories_in}`
  } else {
    const products_ids = sectionValues.products_ids || []
    const size = products_ids.length ? 30 : sectionValues.length

    params += `&active=true&no_parent=true&size=${size}&ids_in=${products_ids.join(',')}`
  }

  try {
    const response = await axios.get(`${baseURL}products-read/${params}`)
    // console.log('Produits section:', `${baseURL}products-read/${params}`)
    return response.data.results || []
  } catch (error) {
    console.error('Erreur chargement produits section:', error)
    return []
  }
}
