<template>
    <div class="mt-4">
        <div v-if="loading">Chargement...</div>
        <div v-else-if="error" class="text-red-500">{{ error }}</div>
        <div v-else-if="productPack.declinaisons?.length">
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
            class="w-full py-3 bg-transparent hover:bg-indigo-600 text-indigo-600 border cursor-pointer border-indigo-600 hover:text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
            @click="handleAddToCart"
            >
                <ShoppingCart class="h-5 w-5 mr-2 text-inherit" />
                <span>Ajouter au panier</span>
                </button>
                
            </div>
        </div>
        <div v-else>Aucune déclinaison disponible.</div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, toRaw } from 'vue'
  import CustomSelectDropdown from './packComponents/CustomSelectDropdown.vue'
  import { ShoppingCart } from 'lucide-vue-next';
  import { addToCart } from '~/composables/services/cartService';
  
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
  const productPack = ref({})
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
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }
      const data = await response.json()
      productPack.value = data.results[0] || {}
      console.log("datares", data.results[0])
      label.value = data.results[0].declinaisons[0].name
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
  
  console.log("options", options.value)
  
  // Determine displaytype
  const attributeDisplayType = computed(() => {
    return productPack.value.declinaisons?.[0]?._attributs[0]?.displaytype || 'dropdown'
  })
  
  // Handle declinaison change and update the array
  const handleDeclinaisonChange = (option, index) => {
    console.log('Selected declinaison:', option, 'at index:', index)
    // Update or add the selected declinaison to the array
    selectedDeclinaisons.value[index] = {
        product_name: option.product_name,
        quantity: option.quantity || 1,
        product_id: option.product_id,
        photo_thumb: option.photo_thumb,
        attrs: option.attrs
    }
    selectedOptions.value[index] = option

      console.log('Selected declinaisons array:', selectedDeclinaisons.value)
  }
  
  // Fetch data on component mount
  fetchProduct()
  </script>