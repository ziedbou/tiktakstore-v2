<template>
  <div class="my-5">
    <p class="text-center font-medium text-gray-800">Offre spéciale</p>
    <div
      v-for="(formula, index) in sortedFormulas"
      :key="index"
      class="border rounded-lg p-4 mb-3 cursor-pointer relative overflow-hidden"
      :class="quantity === formula.quantity ? 'border-indigo-600' : 'border-gray-200'"
    >
      <div
        class="flex items-center justify-between"
        @click="toggleCollapse(index)"
      >
        <div class="flex items-center">
          <div
            class="w-5 h-5 rounded-full border flex items-center justify-center"
            :class="quantity === formula.quantity ? 'border-indigo-600' : 'border-gray-300'"
          >
            <div
              v-if="quantity === formula.quantity"
              class="w-3 h-3 rounded-full bg-indigo-600"
            ></div>
          </div>
          <span class="ml-3 text-gray-800">
            Acheter {{ formula.quantity }} à {{ getPriceOfProduct(product, formula.quantity) }} {{ currency }} seulement
          </span>
        </div>
        <div class="flex flex-col items-end">
          <div class="text-gray-700 text-nowrap">
            {{ getPriceOfProduct(product, formula.quantity, true) }} {{ currency }}
          </div>
          <div class="text-gray-400 text-sm line-through">
            {{ (product.price * formula.quantity).toFixed(2) }} {{ currency }}
          </div>
        </div>
      </div>
      <Transition name="slide">
        <div
          v-show="activeIndex === index && index !== 0 && product?.declinaisons.length > 0"
          class="mt-3 flex flex-col"
        >
          <div
            v-for="quan in Array.from({ length: formula.quantity }, (_, i) => i + 1)"
            :key="quan"
            class="flex items-center gap-2 w-full"
          >
          <span class="text-gray-700">#{{ quan }}</span>
            <DropDownVariants
              v-if="product"
              :product="product"
              :quantity="formula.quantity"
              :index="quan - 1"
            />
          </div>
        </div>
      </Transition>
      <div
        v-if="index === sortedFormulas.length - 1"
        class="absolute top-0 right-0"
      >
        <div class="bg-indigo-600 text-white text-xs py-[1px] px-2 rounded-tr-lg rounded-bl-lg">
          Meilleure offre
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, Transition } from 'vue';
import { findFormulaByQuantity } from '~/composables/services/helpers.js';
import { useProductQuantity } from '~/composables/useProductQuantity.js';
import { useSelectedMultipleVariants } from '~/composables/useSelectedMultipleVariants.js';
import DropDownVariants from './DropDownVariants.vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  extra: {
    type: Object,
    default: null,
  },
});

const activeIndex = ref(null);
const { quantity, updateQuantity } = useProductQuantity();
const { initializeQuantity, updateQuantityMultipleVariants } = useSelectedMultipleVariants();

// Initialize variants for the initial quantity
initializeQuantity(quantity.value);

// Watch for quantity changes to update variants
watch(quantity, (newQuantity, oldQuantity) => {
  updateQuantityMultipleVariants(newQuantity, oldQuantity);
});

const sortedFormulas = computed(() => {
  const formulas = props.product?.formula || [];
  const hasQuantityOne = formulas.some(formula => formula.quantity === 1);
  const defaultFormula = {
    quantity: 1,
    discount: 0,
    discount_type: null,
  };
  const updatedFormulas = hasQuantityOne ? formulas : [defaultFormula, ...formulas];
  return [...updatedFormulas].sort((a, b) => a.quantity - b.quantity);
});

const toggleCollapse = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null;
  } else {
    activeIndex.value = index;
    const selectedQuantity = sortedFormulas.value[index].quantity;
    updateQuantity(selectedQuantity); // Update global quantity
  }
};

const currency = computed(() => props.extra?.currency || 'TND');

const getPriceOfProduct = (product, quantity = 1, total = false) => {
  if (!product) return 0;

  let price = product.price;

  if (product.discount && product.discount_type) {
    if (product.discount_type === 'fixed_amount') {
      price = price - product.discount;
    } else if (product.discount_type === 'percent') {
      price = price - (price * product.discount / 100);
    }
  }

  if (product.formula && product.formula.length > 0 && quantity > 1) {
    const formula = findFormulaByQuantity(product.formula, quantity);
    if (formula) {
      if (formula.discount_type === 'fixed_amount') {
        price = product.price - formula.discount;
      } else if (formula.discount_type === 'percent') {
        price = product.price - (product.price * formula.discount / 100);
      }
    }
  }

  const finalPrice = total ? price * quantity : price;
  return parseFloat(finalPrice).toFixed(2);
};
</script>

<style>
/* Animation styles for slide effect */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}
.slide-enter-from,
slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
</style>