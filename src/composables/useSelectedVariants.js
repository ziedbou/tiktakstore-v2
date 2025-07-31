// composables/useSelectedVariant.js
import { ref } from 'vue';

// Reactive state to store the selected variant
const selectedVariant = ref({});
const isSelectedByUser = ref(false);

export const useSelectedVariant = () => {

  // Method to set the selected variant
  const setSelectedVariant = (variant) => {
    // console.log("variant", JSON.stringify(selectedVariant.value, null, 2))
    selectedVariant.value = variant;
  };

  const setSelectedByUser = () => {
    isSelectedByUser.value = true
  }

  // Method to clear the selected variant
  const clearSelectedVariant = () => {
    selectedVariant.value = null;
  };

  // Method to get the selected variant
  const getSelectedVariant = () => {
    return selectedVariant.value;
  };

  return {
    selectedVariant,
    isSelectedByUser,
    setSelectedVariant,
    clearSelectedVariant,
    setSelectedByUser,
    getSelectedVariant,
  };
};