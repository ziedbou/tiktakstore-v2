import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { getCartFromStorage } from '~/composables/services/cartService.js'
import eventBus from '~/composables/eventBus.js'

export const useFreeShipping = (options = {}) => {
  // Configuration with defaults
  const config = ref({
    threshold: 100, // Default threshold
    message: 'livraison gratuite', // Default message
    successMessage: '🎉 Livraison gratuite activée !', // Default success message
    currency: 'DT', // Default currency
    enabled: true, // Whether free shipping is enabled
    ...options
  })

  // Internal cart state for calculations
  const internalCart = ref(getCartFromStorage())
  
  // Banner visibility state
  const successBannerVisible = ref(true)

  // API function to fetch free shipping configuration
  const fetchFreeShippingConfig = async (companyId) => {
    try {
      const response = await $fetch(`/api/companies/${companyId}/free-shipping-config`)
      
      if (response && response.data) {
        config.value = {
          threshold: parseFloat(response.data.threshold) || 100,
          message: response.data.message || 'livraison gratuite',
          successMessage: response.data.successMessage || 'Livraison gratuite activée !',
          currency: response.data.currency || 'DT',
          enabled: response.data.enabled !== false,
          ...options
        }
      }
    } catch (error) {
      console.warn('Failed to fetch free shipping config, using defaults:', error)
    }
  }

  // Essential computed values
  const progressValue = computed(() => {
    if (!config.value.enabled) return 0
    
    const currentSubtotal = internalCart.value?.total_amount || 0
    return Math.min((currentSubtotal / config.value.threshold) * 100, 100)
  })

  const amountToAchieve = computed(() => {
    if (!config.value.enabled) return 0
    
    const currentSubtotal = internalCart.value?.total_amount || 0
    const remaining = Math.max(config.value.threshold - currentSubtotal, 0)
    return parseFloat(remaining.toFixed(2))
  })

  const messageText = computed(() => {
    return config.value.message
  })

  const successMessageText = computed(() => {
    return config.value.successMessage
  })

  const isEligible = computed(() => {
    if (!config.value.enabled) return false
    
    const currentSubtotal = internalCart.value?.total_amount || 0
    const isEligibleResult = currentSubtotal >= config.value.threshold
    
    return isEligibleResult
  })

  // Close success banner
  const closeSuccessBanner = () => {
    successBannerVisible.value = false
  }

  // Watch for free shipping achievement to show banner again
  watch(isEligible, (newValue, oldValue) => {
    // If user achieves free shipping (goes from false to true), show banner again
    if (newValue && !oldValue) {
      successBannerVisible.value = true
    }
  })

  // Sync cart with localStorage
  const syncCartWithLocalStorage = () => {
    internalCart.value = getCartFromStorage()
  }

  // Force sync method that components can call
  const forceSync = () => {
    syncCartWithLocalStorage()
  }

  // Setup event listeners
  onMounted(() => {
    syncCartWithLocalStorage()
    eventBus.on('cart-updated', syncCartWithLocalStorage)
  })

  onUnmounted(() => {
    eventBus.off('cart-updated')
  })

  // Return only essential values
  return {
    messageText,      // "livraison gratuite"
    successMessageText, // "Livraison gratuite activée !"
    progressValue,    // 75.5 (percentage)
    amountToAchieve,  // 24.50 (amount needed)
    isEligible,       // true/false if free shipping achieved
    successBannerVisible, // Banner visibility state
    closeSuccessBanner,   // Method to close banner
    forceSync,        // Method to force sync cart
    fetchFreeShippingConfig
  }
} 