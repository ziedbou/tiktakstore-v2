

<template>
  <div class="fixed z-40 bottom-0 left-0 right-0 ">
    <div class="p-2 px-4 gap-2 bg-white flex flex-row md:hidden">
      <QuantitySelector />
      <button
        class="w-full flex justify-center items-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer font-semibold rounded-lg transition-colors"
        @click="handleAddToCart_Before_Cofirm"
      >
      <ShoppingCart class="h-5 w-5 mr-2" />
      <span>Ajouter au panier</span>
    </button>
    </div>

    <div
      v-if="isBottomSheetOpen"
      class="fixed inset-0 bg-[#11111190] bg-opacity-50 z-40"
      @click="closeBottomSheet"
    ></div>
    
    <div
  class="fixed bottom-0 left-0 right-0 md:inset-x-[30%] md:inset-y-[20%] p-4 bg-white rounded-t-xl md:rounded-b-xl z-50 flex flex-col transition-transform duration-300 transform max-h-[90vh] md:max-h-[80vh]"
  :class="{ 'translate-y-0': isBottomSheetOpen, 'translate-y-full md:opacity-0 pointer-events-none': !isBottomSheetOpen }"
>
  <div class="flex justify-between items-center p-4 ">
    <h3 class="text-lg font-semibold">Veuillez choisir la couleur et la taille</h3>
    <button
      @click="closeBottomSheet"
      class="p-1 rounded-full hover:bg-gray-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
  
  <div class="flex flex-col flex-1 overflow-hidden">
    <div class="flex-1 overflow-y-auto p-4">
      <ProductVariants v-if="product && quantity == 1" :product="product" />
      <div v-if="product && quantity > 1">
        <div v-for="quan in quantity" class="flex flex-row gap-2 items-center" :key="quan">
          <span class="text-gray-700">#{{ quan }}</span>
          <DropDownVariants
            :product="product"
            :quantity="quantity"
            :index="quan - 1"
          />
        </div>
      </div>

    </div>
    
    <div class="">
      <button
        @click="handleAddToCart_After_Confirm"
        class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer font-semibold rounded-lg transition-colors"
      >
        Confirmer
      </button>
    </div>
  </div>
</div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import QuantitySelector from './QuantitySelector.vue';
import { useProductQuantity } from '@/composables/useProductQuantity.js';
import DropDownVariants from './DropDownVariants.vue';
import ProductVariants from './ProductVariants.vue';
import { addToCart } from '~/composables/services/cartService';
import { ShoppingCart } from 'lucide-vue-next';
const { getMultipleVariants } = useSelectedMultipleVariants()
const { selectedVariant, isSelectedByUser } = useSelectedVariant(); 
const { showSuccess, showError, showWarning } = useCustomToast();

const { quantity } = useProductQuantity()
const router = useRouter();

const { product } = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const isBottomSheetOpen = ref(false);
const isOpenCart = ref(true) ;
const isQuickCheckout = ref(false)
const { trackAddToCart } = useTracking()

onMounted(() => {
  eventBus.on("show-selectMultipleVariantsModal", (data) => {
    if (data == "checkout" || data == "quickCheckout") {
      isOpenCart.value = false
      if (data == "quickCheckout") {
        isQuickCheckout.value = true
      }
      openBottomSheet()
      return
    }
    if (data == "addToCart") {
      isOpenCart.value = true
      isQuickCheckout.value = false
      
      openBottomSheet()
      return
    }
    
  })
})

const handleAddToCart_Before_Cofirm = () => {

  if (quantity.value > 1) {
    // console.log("Quantity > 1 branch");

    if (product.declinaison == true && product.declinaisons.length > 0) {
      // console.log("Opening bottom sheet due to declinaison");
      openBottomSheet();
      return;
    }

    if (product.declinaison == false || (product.declinaisons?.length ?? 0) <= 0) {
      // console.log("No declinaison or empty, adding to cart");
      trackAddToCart(product);
      addToCart(product, quantity.value);
      return;
    }
  }

  if (quantity.value == 1) {
    // console.log("Quantity == 1 branch");

    if (isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0) {
      // console.log("Variant selected, adding selected variant");
      trackAddToCart(product);
      addToCart(selectedVariant.value);
      return;
    }

    if (!isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0) {
      // console.log("Prompting user to select variant");
      openBottomSheet();
      return;
    }

    if (product.declinaison == false || product.declinaisons.length <= 0) {
      // console.log("No declinaison, adding product directly");
      trackAddToCart(product);
      addToCart(product);
      return;
    }
  }

}

const handleAddToCart_After_Confirm = () => {
  const navigateToCheckout_reset = () => {
        if (isOpenCart.value == false && isQuickCheckout.value == false) {
          setTimeout(() => {
          router.push("/checkout")
          
        }, 300);
        }
        if (isQuickCheckout.value == true) {
          eventBus.emit('handleQuickCheckoutEvent', true)
        }
        isOpenCart.value = true
        isQuickCheckout.value = false
    }

    if ( quantity.value == 1) {
        if (isQuickCheckout.value == false) {
          trackAddToCart(product);
          addToCart(selectedVariant.value  , 1, null, null, isOpenCart.value);
          closeBottomSheet()
          navigateToCheckout_reset()
        }
        if (isQuickCheckout.value == true) {
          isSelectedByUser.value = true
          closeBottomSheet()
          eventBus.emit('handleQuickCheckoutEvent', true)
        }
    }
    if (quantity.value > 1) {
      trackAddToCart(product);
      const multipleVariants = getMultipleVariants(quantity.value)
      if ( multipleVariants && multipleVariants.length > 0 && !multipleVariants.includes(null) ) {
        multipleVariants.forEach(variant => {
          addToCart(variant , 1, null, null, isOpenCart.value);
        });
        closeBottomSheet()
        navigateToCheckout_reset()
      
      }
      else {
        showWarning('Veuillez sélectionner toutes les variantes');
      }
    }

  
}

const openBottomSheet = () => {
  isBottomSheetOpen.value = true;
};

const closeBottomSheet = () => {
  isBottomSheetOpen.value = false;
};
</script>
