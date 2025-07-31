<template>
  <div class="flex flex-col gap-4 mt-6">
    <div class="flex items-center gap-4 flex-row">
      Quantity: <QuantitySelector />
    </div>
    <button
      class="w-full py-3 bg-transparent hover:bg-indigo-600 text-indigo-600 border cursor-pointer border-indigo-600 hover:text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
      @click="handleAddToCart"
    >
      <ShoppingCart class="h-5 w-5 mr-2 text-inherit" />
      <span>Ajouter au panier</span>
    </button>
    <button
      @click="handleAchatRapide"
      class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer font-semibold rounded-lg transition-colors"
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

const { trackAddToCart } = useTracking()
const router = useRouter();


const handleAddToCart = () => {

  if (quantity.value > 1) {
    if (product.declinaison == true && product.declinaisons.length > 0) {
     
        eventBus.emit("show-selectMultipleVariantsModal", "addToCart")
      return
    }

    if (product.declinaison == false || (product.declinaisons?.length ?? 0) <= 0 ) {
      trackAddToCart(product)
      addToCart(product, quantity.value);
      return
    }
  }
  if (quantity.value  == 1 ) {

    if (isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0 ) {
      trackAddToCart(product)
      addToCart(selectedVariant.value);
      return
    }

    if (!isSelectedByUser.value && product.declinaison == true && product.declinaisons.length > 0 ) {
      eventBus.emit("show-selectMultipleVariantsModal", "addToCart")
      return
    }
    if (product.declinaison == false || (product.declinaisons?.length ?? 0) <= 0 ) {
      trackAddToCart(product)
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