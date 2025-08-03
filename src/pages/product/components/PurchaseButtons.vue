<template>
  <div class="flex flex-col gap-2 mt-6">
    <div class="flex items-center gap-4 flex-row mb-2">
      Quantity: <QuantitySelector />
    </div>
    <button
      class="w-full py-3 cursor-pointer font-medium rounded-lg transition-colors flex items-center justify-center btn-primary-solid"
      @click="handleAddToCart"
    >
      <ShoppingCart class="h-5 w-5 mr-2 " />
      <span >Ajouter au panier</span>
    </button>
    <button
      @click="handleAchatRapide"
      class="w-full py-3 cursor-pointer font-medium btn-primary-outline"
    >
      Acheter maintenant
    </button>
  </div>
</template>

<script setup>
import { ShoppingCart } from 'lucide-vue-next';
import QuantitySelector from './QuantitySelector.vue';
import { useProductQuantity } from '@/composables/useProductQuantity.js';
import { useSelectedVariant } from '@/composables/useSelectedVariants.js'; 
import { addToCart, getCartFromStorage } from '~/composables/services/cartService';

const { quantity } = useProductQuantity();
const { selectedVariant, isSelectedByUser } = useSelectedVariant(); 
const { product } = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const router = useRouter();


const handleAddToCart = () => {

  if (quantity.value > 1) {
    if (product.declinaison == true && product.declinaisons.length > 0) {
     
        eventBus.emit("show-selectMultipleVariantsModal", "addToCart")
      return
    }

    if (product.declinaison == false || (product.declinaisons?.length ?? 0) <= 0 ) {
      addToCart(product, quantity.value);
      return
    }
  }
  if (quantity.value  == 1 ) {

    if (isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0 ) {
      addToCart(selectedVariant.value);
      return
    }

    if (!isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0 ) {
      eventBus.emit("show-selectMultipleVariantsModal", "addToCart")
      return
    }
    if (product.declinaison == false || (product.declinaisons?.length ?? 0) <= 0 ) {
      addToCart(product);
      return
    }
   
  }
}



const handleAchatRapide = () => {

  if (quantity.value > 1) {
    if (product.declinaison == true && product.declinaisons.length > 0) {
     
        eventBus.emit("show-selectMultipleVariantsModal", "checkout")

      return
    }

    if (product.declinaison == false || (product.declinaisons?.length ?? 0) <= 0 ) {
      addToCart(product, quantity.value, null, null, false);
      router.push("/checkout")
      return
    }
  }

  if (quantity.value  == 1 ) {

    if (isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0 ) {
      addToCart(selectedVariant.value , 1, null, null, false);
      router.push("/checkout")
      return
    }

    if (!isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0 ) {
      eventBus.emit("show-selectMultipleVariantsModal", "checkout")
      return
    }
    if (product.declinaison == false || (product.declinaisons?.length ?? 0) <= 0 ) {
      addToCart(product , 1, null, null, false);
      router.push("/checkout")
      return
    }

  }
}


</script>