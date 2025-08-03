import { ref } from 'vue';

const selectedVariant = ref({});

export const useSelectedQuickModalVariants = () => {

  const setSelectedVariant = (variant) => {
    // console.log("variant", JSON.stringify(selectedVariant.value, null, 2))
    selectedVariant.value = variant;
  };

  const setSelectedByUser = () => {
  }

  const clearSelectedVariant = () => {
    selectedVariant.value = null;
  };

  const getSelectedVariant = () => {
    return selectedVariant.value;
  };

  return {
    selectedVariant,
    setSelectedVariant,
    clearSelectedVariant,
    setSelectedByUser,
    getSelectedVariant,
  };
};