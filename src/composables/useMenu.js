import { useRuntimeConfig } from '#imports'
import { getLink } from '~/composables/services/helpers'

export const useMenu = ({ companyId, position = 'header', name = '', menuId = null }) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL

  const params = {
    position,
    name,
    active: true,
    company: companyId,
  }

  if (menuId) params.id = menuId

  // Build query string
  const queryString = new URLSearchParams(params).toString()
  const url = `${baseURL}website/menus-read/?${queryString}`

  const { data: response, error } = useFetch(url, {
    key: `menu-${position}-${companyId}-${name}-${menuId || 'default'}`,
    server: true,
    lazy: true,
    default: () => ([]),
    getCachedData: (key) => {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  })

  const menuData = computed(() => {
    if (!response.value || !response.value[0]) return position === 'header' ? { categories: [] } : []
    
    const rawMenus = response.value[0]?.menus || []
    // Header style
    if (position === 'header') {
      const categories = rawMenus
        .map(item => ({
          id: item.cat_id || item.slug,
          name: item.label,
          href: item.is_home?'/':item.type === 'extern' ? item.href : getLink(item),
          submenu: (item.submenu || []).map(sub => ({
            label: sub.label,
            href: getLink(sub),
            slug: sub.slug,
            type: sub.type,
            submenu: (sub.submenu || []).map(sub => ({
              label: sub.label,
              href: getLink(sub),
              slug: sub.slug,
              type: sub.type
            }))
          })),
          type: item.type,
          sections: [],
          featured: []
        }))


      return {
        categories
      }
    }

    // Footer style
    if (position === 'footer') {
      return rawMenus.map(section => ({
        label: section.label,
        submenu: (section.submenu || []).map(sub => ({
          label: sub.label,
          href: getLink(sub),
          slug: sub.slug,
          type: sub.type
        }))
      }))
    }

    return []
  })

  return {
    menuData,
    error,
    pending: computed(() => !response.value)
  }
} 