/**
 * Smart Wishlist Composable
 * 
 * Always uses localStorage as source of truth for wishlist data
 * Syncs favorites to API by updating entire customer object when user is authenticated
 * 
 * Required API Endpoint:
 * - POST   {baseURL}/website/customer-update/    - Update customer object including favourite array
 * 
 * Authentication required: user object in localStorage + _token in localStorage
 * Endpoint requires Authorization: Token {_token} header
 */

import { ref, computed, readonly } from 'vue'
import eventBus from '@/composables/eventBus.js'
import { useCustomToast } from '~/composables/useCustomToast'
// Global reactive state
const wishlistItems = ref([])
const isLoading = ref(false)
const isAddingItem = ref(false)
const isRemovingItem = ref(false)
const isInitialized = ref(false)
const error = ref(null)

export const useWishlist = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  // Computed property for wishlist count
  const wishlistCount = computed(() => wishlistItems.value.length)


  const { showSuccess, showWarning } = useCustomToast()
  // Check if user is authenticated
  const isAuthenticated = () => {
    if (import.meta.client) {
      // Check for _token in localStorage
      const token = localStorage.getItem('_token')
      return !!token
    }
    return false
  }

  // No longer fetching wishlist from API - always use localStorage

  // Update customer data including favorites
  const { execute: executeUpdateCustomer, status: statusUpdate } = useFetch(`${baseURL}website/customer-update/`, {
    method: 'POST',
    server: false,
    immediate: false,
    onResponse({ response }) {
      if (response.ok) {
        // Update was successful
        // console.log('Customer favorites updated successfully')
      }
    },
    onResponseError({ response }) {
      console.error('Failed to update customer favorites:', response.status)
      error.value = 'Un erreur est survenue, veuillez réessayer plus tard'
    }
  })

  // Sync favorites to API by updating entire customer object
  const syncFavoritesToApi = async (favorites) => {
    if (!isAuthenticated()) return

    try {
      // Get current user from localStorage
      const userData = localStorage.getItem('user')
      if (!userData) return

      const user = JSON.parse(userData)
      if (!user.customer) return

      // Update customer favorites and sync to API
      const updatedCustomer = {
        ...user.customer,
        favourite: favorites
      }

      const token = localStorage.getItem('_token')
      
      // Use $fetch because headers passed through execute() sometimes
      // get lost; $fetch guarantees they are forwarded.
      await $fetch(`${baseURL}website/customer-update/`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: updatedCustomer,
        credentials: 'omit' // we rely solely on the explicit token
      })

      // Update local user object with new favorites
      user.customer.favourite = favorites
      localStorage.setItem('user', JSON.stringify(user))

    } catch (err) {
      console.error('Error syncing favorites to API:', err)
      error.value = 'Un erreur est survenue, veuillez réessayer plus tard'
    }
  }

  // Loading state only for initial load and adding items
  const isLoadingAny = computed(() => 
    isLoading.value || isAddingItem.value
  )

  // Initialize wishlist from localStorage (fallback/guest mode)
  const initializeWishlistFromStorage = () => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem('wishlist')
        wishlistItems.value = stored ? JSON.parse(stored) : []
        isInitialized.value = true
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error)
        wishlistItems.value = []
        isInitialized.value = true
      }
    }
  }

  // Save wishlist to localStorage (guest mode or sync)
  const saveWishlistToStorage = () => {
    if (import.meta.client) {
      try {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value))
        // Emit event for components that need to know about updates
        eventBus.emit('wishlist-updated')
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error)
      }
    }
  }

  // Initialize wishlist (localStorage + API sync if authenticated)
  const initializeWishlist = async () => {
    // Only initialize if not already done
    if (isInitialized.value) {
      return
    }

    isLoading.value = true
    error.value = null

    try {
      // Always load from localStorage first (for instant UI)
      initializeWishlistFromStorage()

      // If user is authenticated, sync from API to get latest favorites
      if (isAuthenticated()) {
        await syncWishlistFromApi()
      }
    } catch (err) {
      console.error('Error initializing wishlist:', err)
      wishlistItems.value = []
      isInitialized.value = true
    } finally {
      isLoading.value = false
    }
  }

  // Sync wishlist from API to localStorage (when user logs in)
  const syncWishlistFromApi = async () => {
    if (!isAuthenticated()) return

    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('user')
      if (!userData) return

      const user = JSON.parse(userData)
      if (!user.customer || !user.customer.favourite) return

      // Update localStorage with API favorites
      const apiFavorites = user.customer.favourite.map(id => String(id))
      wishlistItems.value = apiFavorites
      saveWishlistToStorage()


    } catch (err) {
      console.error('Error syncing wishlist from API:', err)
    }
  }

  // Get wishlist count
  const getWishlistCount = () => {
    return wishlistCount.value
  }

  // Add to wishlist (localStorage + API sync)
  const addToWishlist = async (productId) => {
    if (!productId) return false
    
    const id = String(productId)
    error.value = null
    
    // Check if already in wishlist
    if (wishlistItems.value.includes(id)) {
      return false
    }

    isAddingItem.value = true

    try {
      // Always add to localStorage first
      wishlistItems.value.push(id)
      saveWishlistToStorage()

      // Sync to API if user is authenticated (background operation)
      if (isAuthenticated()) {
        // Don't await - run in background
        syncFavoritesToApi([...wishlistItems.value], false).finally(() => {
          isAddingItem.value = false
        })
      } else {
        isAddingItem.value = false
      }
      showSuccess('Produit ajouté aux favoris');
      return true
    } catch (err) {
      console.error('Error adding to wishlist:', err)
      error.value = 'Un erreur est survenue, veuillez réessayer plus tard'
      isAddingItem.value = false
      return false
    }
  }

  // Remove from wishlist (localStorage + API sync)
  const removeFromWishlist = async (productId) => {
    
    if (!productId) return false
    
    const id = String(productId)
    const index = wishlistItems.value.indexOf(id)
    error.value = null
    
    if (index === -1) {
      return false
    }

    try {
      // Always remove from localStorage first - immediate UI update
      wishlistItems.value.splice(index, 1)
      saveWishlistToStorage()

      // Sync to API if user is authenticated (background operation)
      if (isAuthenticated()) {
        // Don't await - run in background, don't set loading states
        syncFavoritesToApi([...wishlistItems.value], true).catch(err => {
          console.error('Error syncing remove to API:', err)
          // Don't show error for background sync failures
        })
      }
      showWarning('Produit retiré des favoris');
      return true
    } catch (err) {
      console.error('Error removing from wishlist:', err)
      error.value = 'Un erreur est survenue, veuillez réessayer plus tard'
      return false
    }
  }

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    if (!productId) return false
    const id = String(productId)
    return wishlistItems.value.includes(id)
  }

  // Smart toggle wishlist (API or localStorage)
  const toggleWishlist = async (productId) => {
    if (isInWishlist(productId)) {
      return await removeFromWishlist(productId)
      
    } else {
      return await addToWishlist(productId)
     
    }
  }

  // Get all wishlist items
  const getWishlistItems = () => {
    return [...wishlistItems.value]
  }

  // Clear wishlist (localStorage only)
  const clearWishlist = () => {
    error.value = null
    
    try {
      // Always clear localStorage
      wishlistItems.value = []
      saveWishlistToStorage()

      // Sync to API if user is authenticated (background operation)
      if (isAuthenticated()) {
        syncFavoritesToApi([]).catch(err => {
          console.error('Error syncing clear to API:', err)
        })
      }
    } catch (err) {
      console.error('Error clearing wishlist:', err)
      error.value = 'Failed to clear wishlist'
    }
  }


  // Initialize on first use (but don't auto-initialize to prevent double loading)
  // Let the page handle initialization explicitly

  return {
    // State
    wishlistItems: readonly(wishlistItems),
    wishlistCount,
    isLoading: readonly(isLoading),
    isLoadingAny: readonly(isLoadingAny),
    isAddingItem: readonly(isAddingItem),
    isRemovingItem: readonly(isRemovingItem),
    isInitialized: readonly(isInitialized),
    error: readonly(error),
    
    // Core functions
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    getWishlistItems,
    getWishlistCount,
    clearWishlist,
    
    // Initialization & sync
    initializeWishlist,
    syncWishlistFromApi,
  
    // Legacy functions for backward compatibility
    initializeWishlistFromStorage,
    saveWishlistToStorage
  }
}

