// composables/useGlobalQuantity.js
import { ref } from 'vue';

const quantity = ref(1);

export function useProductQuantity() {
  const updateQuantity = (value) => {
    if (value >= 1) {
      quantity.value = value;
    }
  };

  const resetQuantity = () => {
    quantity.value = 1;
  };

  return {
    quantity,
    updateQuantity,
    resetQuantity,
  };
}