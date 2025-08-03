// composables/useSelectedMultipleVariants.js
import { useState } from '#app';

export const useSelectedMultipleVariants = () => {
  const selectedVariants = useState('selectedMultipleVariants', () => ({}));
  const { getSelectedVariant } = useSelectedVariant();
  // console.log('useSelectedMultipleVariants initialized');

  const initializeQuantity = (quantity) => {
    // console.log(`initializeQuantity called with quantity: ${JSON.stringify(quantity, null, 2)}`);
    if (!selectedVariants.value[quantity]) {
      selectedVariants.value[quantity] = Array.from({ length: quantity }, () => getSelectedVariant() || null);
      // console.log(`Initialized variants for quantity ${JSON.stringify(quantity, null, 2)}: ${JSON.stringify(selectedVariants.value[quantity], null, 2)}`);
    }
    // console.log(`Current selectedVariants: ${JSON.stringify(selectedVariants.value, null, 2)}`);
  };

  const setMultipleVariant = (quantity, index, variant) => {
    // console.log(`setMultipleVariant called with quantity: ${JSON.stringify(quantity, null, 2)}, index: ${JSON.stringify(index, null, 2)}, variant: ${JSON.stringify(variant, null, 2)}`);
    initializeQuantity(quantity);
    selectedVariants.value[quantity][index] = variant;
    selectedVariants.value[quantity] = [...selectedVariants.value[quantity]];
    // console.log(`Variant set for quantity ${JSON.stringify(quantity, null, 2)}, index ${JSON.stringify(index, null, 2)}: ${JSON.stringify(selectedVariants.value[quantity], null, 2)}`);
    // console.log(`Current selectedVariants: ${JSON.stringify(selectedVariants.value, null, 2)}`);
  };

  const getMultipleVariants = (quantity) => {
    // console.log(`getMultipleVariants called with quantity: ${JSON.stringify(quantity, null, 2)}`);
    const variants = selectedVariants.value[quantity] || [];
    // console.log(`Returning variants for quantity ${JSON.stringify(quantity, null, 2)}: ${JSON.stringify(variants, null, 2)}`);
    return variants;
  };

  const clearMultipleVariants = (quantity) => {
    // console.log(`clearMultipleVariants called with quantity: ${JSON.stringify(quantity, null, 2)}`);
    if (selectedVariants.value[quantity]) {
      selectedVariants.value[quantity] = Array.from({ length: selectedVariants.value[quantity].length }, () =>  getSelectedVariant() || null);
      selectedVariants.value = { ...selectedVariants.value };
      // console.log(`Cleared variants for quantity ${JSON.stringify(quantity, null, 2)}: ${JSON.stringify(selectedVariants.value[quantity], null, 2)}`);
    }
    // console.log(`Current selectedVariants: ${JSON.stringify(selectedVariants.value, null, 2)}`);
  };

  const clearAllMultipleVariants = () => {
    // console.log('clearAllMultipleVariants called');
    Object.keys(selectedVariants.value).forEach((quantity) => {
      selectedVariants.value[quantity] = Array.from({ length: selectedVariants.value[quantity].length }, () =>  getSelectedVariant() || null);
      // console.log(`Cleared variants for quantity ${JSON.stringify(quantity, null, 2)}: ${JSON.stringify(selectedVariants.value[quantity], null, 2)}`);
    });
    selectedVariants.value = { ...selectedVariants.value };
    // console.log(`Current selectedVariants after clear: ${JSON.stringify(selectedVariants.value, null, 2)}`);
  };

  const updateQuantityMultipleVariants = (newQuantity, oldQuantity) => {
    // console.log(`updateQuantityMultipleVariants called with newQuantity: ${JSON.stringify(newQuantity, null, 2)}, oldQuantity: ${JSON.stringify(oldQuantity, null, 2)}`);
    if (newQuantity !== oldQuantity) {
      clearMultipleVariants(oldQuantity);
      initializeQuantity(newQuantity);
      // console.log(`Updated variants from oldQuantity ${JSON.stringify(oldQuantity, null, 2)} to newQuantity ${JSON.stringify(newQuantity, null, 2)}`);
    }
    // console.log(`Current selectedVariants: ${JSON.stringify(selectedVariants.value, null, 2)}`);
  };

  return {
    selectedMultipleVariants: selectedVariants,
    initializeQuantity,
    setMultipleVariant,
    getMultipleVariants,
    clearMultipleVariants,
    clearAllMultipleVariants,
    updateQuantityMultipleVariants,
  };
};



