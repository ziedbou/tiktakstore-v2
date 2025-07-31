<template>
  <div class="max-md:px-4">
    <div class="mb-8">
      <ProductTitle :extra="extra" :product="product" />
      <div class="-mb-5"></div>
      <ProductPrice :extra="extra" :product="product" />
      <h1 class="text-lg text-center font-md text-gray-800 mt-4">Choisissez vos produits</h1>
    </div>

    <div v-if="loading" class="text-center text-gray-600">Chargement...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <div v-else class="flex flex-col lg:flex-row gap-8">
      <div class="flex-1">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div class="aspect-square bg-gray-100 p-4 flex items-center justify-center">
              <img
                :src="product?.photo"
                alt="Product Image"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-3 text-center">{{ product.name }}</h3>
              <div
                v-if="getQuantity(product.id) > 0"
                class="flex items-center justify-center gap-3 mb-4"
              >
                <button
                  @click="decrementQuantity(product.id)"
                  class="w-8 h-8 bg-black text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
                  :disabled="getQuantity(product.id) <= 0"
                >
                  <span class="text-lg">−</span>
                </button>
                <span class="text-xl font-semibold min-w-[2rem] text-center text-blue-600">
                  {{ getQuantity(product.id) }}
                </span>
                <button
                  @click="incrementQuantity(product.id)"
                  class="w-8 h-8 bg-black text-white rounded flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <span class="text-lg">+</span>
                </button>
              </div>
              <button
                v-else
                @click="addToPack(product)"
                class="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Ajouter au pack
              </button>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center mt-8 gap-4">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="text-lg">←</span> précédant
          </button>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">{{ currentPage }} sur {{ totalPages }}</span>
          </div>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            suivant <span class="text-lg">→</span>
          </button>
        </div>
      </div>

      <div class="lg:w-80 max-md:fixed max-md:inset-x-0 max-md:bottom-0 z-10">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-md:pb-4 sticky top-6">
          <div
            class="flex items-center justify-between mb-6 max-md:mb-4 cursor-pointer"
            @click="toggleCart"
          >
            <div class="flex items-center gap-3">
              <div class="flex md:hidden w-8 h-8 bg-black rounded items-center justify-center">
                <span
                  class="text-white text-lg transition-transform"
                  :class="{ 'rotate-180': isCartExpanded }"
                >
                  ↑
                </span>
              </div>
              <span class="font-semibold text-gray-800">Votre pack</span>
            </div>
            <span class="text-gray-500 text-lg font-bold ">{{ cartTotalQuantity }} / {{ product?.stock }} </span>
          </div>

          <div v-if="isCartExpanded || !isMobile" class="space-y-4 mb-6 max-md:max-h-56 overflow-y-auto ">
            <div
              v-for="item in cartItems"
              :key="item.product_id"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div
                class="w-12 h-12 rounded flex items-center justify-center"
              >
                <img
                  :src="item?.photo_thumb"
                  alt="Product Image"
                  class="w-full h-full object-cover rounded"
                />
              </div>
              <div class="flex-1">
                <span class="text-sm font-medium text-gray-800">{{ item.product_name }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click="decrementQuantity(item.product_id)"
                  class="w-6 h-6 bg-gray-300 text-gray-600 rounded flex items-center justify-center text-sm hover:bg-gray-400 transition-colors"
                >
                  −
                </button>
                <span class="text-sm font-semibold min-w-[1.5rem] text-center">{{ item.quantity }}</span>
                <button
                  @click="incrementQuantity(item.product_id)"
                  class="w-6 h-6 bg-gray-300 text-gray-600 rounded flex items-center justify-center text-sm hover:bg-gray-400 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            v-if="isCartExpanded || !isMobile"
            @click="handleAddToCart"
            class="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors max-md:mb-0 mb-4"
          >
            Ajouter le pack au panier
          </button>

          <div v-if="isCartExpanded || !isMobile" class="text-center">
            <button
              @click="emptyCart"
              class="text-blue-600 hover:text-blue-800 text-sm underline transition-colors"
            >
              Vider le box
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, toRaw } from 'vue'
import { addToCart } from '~/composables/services/cartService';
import ProductPrice from './ProductPrice.vue';
import ProductTitle from './ProductTitle.vue';

const { product } = defineProps({
  product: {
    type: Object,
    required: true,
  },
  extra: {
    type: Object,
    default: null,
  },
})

const features = computed(() => {
  return toRaw(product?.features) || []
})

const productPack = ref({})
const loading = ref(true)
const error = ref(null)
const { showWarning } = useCustomToast()
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
const cartItems = ref([])
const { companyId } = useCompanyData()
const { trackAddToCart } = useTracking()

const incrementQuantity = (id) => {
  if (cartTotalQuantity.value < product?.stock) {
    const item = cartItems.value.find(i => i.product_id === id)
    if (item) {
      item.quantity += 1
    }
  } else {
    showWarning("Stock maximum atteint.")
  }
}
const cartTotalQuantity = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
)

const getQuantity = (id) => {
  const item = cartItems.value.find(i => i.product_id === id)
  return item ? item.quantity : 0
}

const decrementQuantity = (id) => {
  const item = cartItems.value.find(i => i.product_id === id)
  if (item && item.quantity > 1) {
    item.quantity -= 1
  } else if (item && item.quantity === 1) {
    cartItems.value = cartItems.value.filter(i => i.product_id !== item.product_id)
  }
}
const isCartExpanded = ref(false)

const isMobile = computed(() => {
  if (process.client) {
    return window.innerWidth < 768 
  }
  return true
})

const toggleCart = () => {
  if (isMobile.value) {
    isCartExpanded.value = !isCartExpanded.value
  }
}

const handleAddToCart = () => {
  if (cartItems.value &&  (cartTotalQuantity.value == product?.stock)) {
    trackAddToCart(product)
    addToCart(product, 1, cartItems.value)
  } else {
    showWarning("Veuillez sélectionner toutes les packs avant d'ajouter au panier.")
  }
}

const addToPack = (prod) => {
  if (cartTotalQuantity.value < product?.stock) {
    const existingItem = cartItems.value.find(item => item.product_id === prod.product_id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
       cartItems.value.push({
        product_name: prod.name,
        quantity: 1,
        product_id: prod.id,
        photo_thumb: prod.photo_thumb,
        attrs: ""
        
      })
    }
  } else {
    showWarning("Stock maximum atteint.")
  }
}
const emptyCart = () => {
  cartItems.value = []
}

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
    productPack.value = data.results || []
  } catch (err) {
    error.value = `Erreur lors du chargement des données: ${err.message}`
  } finally {
    loading.value = false
  }
}


const productsPerPage = 6
const currentPage = ref(1)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage
  return productPack.value.slice(start, start + productsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(productPack.value.length / productsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

fetchProduct()
</script>