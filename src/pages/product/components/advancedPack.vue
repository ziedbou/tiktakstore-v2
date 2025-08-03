<template>
    <div class="mt-4" v-if="features.length > 0">
        <div v-if="loading">Chargement...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else-if="productPack">
        <CustomSelectDropdown
            v-for="(feature, index) in features"
            :key="index"
            v-model="selectedOptions[index]"
            :options="options"
            :displaytype="attributeDisplayType"
            :label="label"
            placeholder="Sélectionner une couleur"
            @change="option => handleDeclinaisonChange(option, index)"
        />
        <div class="flex flex-col gap-4 mt-6">
     
            <button
            class="w-full py-3 cursor-pointer font-semibold rounded-lg flex items-center justify-center btn-primary-solid"
            @click="handleAddToCart"
            >
              <ShoppingCart class="h-5 w-5 mr-2 text-inherit" />
              <span>Ajouter le pack au panier</span>
            </button>
                
        </div>
        </div>
        <div v-else-if="productPackWithoutDeclinaison" class="flex flex-col gap-2">
         <div
          v-for="product in productPackWithoutDeclinaison"
          :key="product.id"
          class="rounded-lg shadow p-2 flex flex-row items-center bg-gray-200"
        >
          <img
            :src="imghttps(product.photo_thumb || product.photo)"
            :alt="product.name"
            class="w-15 h-15 object-cover rounded "
          />
          <div class="flex flex-col text-left ml-4">
            <div class="font-semibold text-md mb-1">{{ product.name }}</div>
            <div class="text-indigo-600 font-bold text-md mb-2">{{ product.price }} TND</div>
          </div>
          <!-- Add more product info or actions here if needed -->
        </div>
        <div class="flex flex-col gap-4 mt-6">
     
            <button
            class="w-full py-3 cursor-pointer font-semibold rounded-lg flex items-center justify-center btn-primary-solid"
            @click="handleAddToCart"
            >
              <ShoppingCart class="h-5 w-5 mr-2 text-inherit" />
              <span>Ajouter le pack au panier</span>
          </button>
        </div>
      </div>
        <div v-else class="text-gray-500">Aucun produit trouvé.</div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, toRaw } from 'vue'
  import CustomSelectDropdown from './packComponents/CustomSelectDropdown.vue'
  import { ShoppingCart } from 'lucide-vue-next';
  import { addToCart } from '~/composables/services/cartService';
import { imghttps } from '~/composables/services/helpers';
  
  const { product } = defineProps({
    product: {
      type: Object,
      required: true,
    }
  })
  
  const features = computed(() => {
    return toRaw(product?.features) || []
  })
  
  // Reactive state
  const productPack = ref(null)
  const productPackWithoutDeclinaison = ref(null)
  const selectedDeclinaisons = ref([]) // Array to store selected declinaisons
  const selectedOptions = ref([]) // Array to store selected declinaisons
  const loading = ref(true)
  const error = ref(null)
  const label = ref("")
  const {quantity} = useProductQuantity()
  const { showWarning } = useCustomToast() 
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  const {companyId} = useCompanyData() 
  

  const handleAddToCart = () => {
    if (selectedDeclinaisons.value && !(Object.keys(selectedDeclinaisons.value).length < features.value.length)) {
        addToCart(product, quantity.value, selectedDeclinaisons.value);
    }
    else if (productPackWithoutDeclinaison.value && productPackWithoutDeclinaison.value.length > 0) {
        let options = productPackWithoutDeclinaison.value.map(prod => ({
            product_name: prod.name,
            quantity: 1,
            product_id: prod.id,
            photo_thumb: prod.photo_thumb }));

        addToCart(product, quantity.value, options);
        // console.log('productPackWithoutDeclinaison.value', productPackWithoutDeclinaison.value)
    }
    else {
       showWarning("Veuillez sélectionner toutes les déclinaisons avant d'ajouter au panier.");
    }
  }
  
  // Fetch API data
  const fetchProduct = async () => {
    try {
      const idsIn = features.value.join(',')
      const response = await fetch(
        baseURL + 'products-read/?page=1&active=true&ids_in=' + idsIn + '&company=' + companyId.value + '&size=10',
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      )
      // console.log("responsebaseURL", baseURL + 'products-read/?page=1&active=true&ids_in=' + idsIn + '&company=' + companyId.value + '&size=10')
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      if (data.results[0].declinaisons.length == 0) {
        productPackWithoutDeclinaison.value = data.results
      }
      else {
        productPack.value = data.results[0]
        label.value = data.results[0].declinaisons[0]?.name
      }
      // console.log("datares", data.results[0])
    } catch (err) {
      error.value = `Erreur lors du chargement des données: ${err.message}`
    } finally {
      loading.value = false
    }
  }
  
  // Transform declinaisons into options for CustomSelectDropdown
  const options = computed(() => {
    return productPack.value?.declinaisons?.map(declinaison => ({
        id: declinaison?._attributs?.[0]?.id,
        name: declinaison?._attributs?.[0]?.name,
        value: declinaison?._attributs?.[0]?.value,
        is_color: declinaison?._attributs?.[0]?.is_color,
        image: declinaison?.photo_thumb,
        stock: declinaison?.stock,
        order_without_stock: declinaison?.order_without_stock,
        // Additional fields for selectedDeclinaisons format
        product_name: declinaison?.product_name || productPack.value?.name || 'Unknown Product',
        product_id: declinaison?.product_id || declinaison?._attributs?.[0]?.id || 'Unknown ID',
        photo_thumb: declinaison?.photo_thumb || '',
        attrs: declinaison?._attributs?.[0]?.name || '',
        quantity: declinaison?.quantity || 1 // Default to 1 if not provided
    })) || []
  })
  
  // console.log("options", options.value)
  
  // Determine displaytype
  const attributeDisplayType = computed(() => {
    return productPack.value.declinaisons?.[0]?._attributs[0]?.displaytype || 'dropdown'
  })
  
  // Handle declinaison change and update the array
  const handleDeclinaisonChange = (option, index) => {
    // console.log('Selected declinaison:', option, 'at index:', index)
    // Update or add the selected declinaison to the array
    selectedDeclinaisons.value[index] = {
        product_name: option.product_name,
        quantity: option.quantity || 1,
        product_id: option.product_id,
        photo_thumb: option.photo_thumb,
        attrs: option.attrs
    }
    selectedOptions.value[index] = option

      // console.log('Selected declinaisons array:', selectedDeclinaisons.value)
  }
  
  // Fetch data on component mount
  if (features.value.length > 0) {
    fetchProduct()
  }
  // console.log("productPack", product)
  </script>