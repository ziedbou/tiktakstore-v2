import { ref, watch } from 'vue'

export function usePhoneNumber( phoneNumberLength, initialPhoneNumber = '', isQuickCheckout = false) {

  const phoneNumberx = ref(initialPhoneNumber)
  const isSubmited = ref(false)

  watch(phoneNumberx, (newValue) => {
    if (
      phoneNumberLength &&
      newValue.length === phoneNumberLength && isSubmited.value === false 
    ) {
        if (isQuickCheckout) {
            eventBus.emit("createOrderAbandonned_quickCheckout")  
            
        }
        else {
            eventBus.emit("createOrderAbandonned_checkout")  
        }
        isSubmited.value = true
      
    }
  })

  return {
    phoneNumberx,
  }
}