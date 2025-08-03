<template>
  <div class="bg-white rounded-lg max-w-2xl w-full mx-auto py-6">
    <h1 class="text-2xl font-bold text-center text-blue-900 mb-6">Bundle & Save</h1>
    <div v-if="bundle" class="flex flex-row flex-wrap gap-y-5 justify-center mb-6">
        <div
        v-for="(product, index) in bundle?.bundles_product"
        :key="product.id"
        class="flex flex-row  "
        >
          <div
          class="flex items-center w-full max-w-[150px]"
        >
          <div class=" bg-gray-200 border border-gray-300 border-2 rounded-lg flex-1 min-w-0 flex flex-col items-center h-64">
            <div class="flex mb-4 min-w-full">
              <div class="bg-red-300 rounded-lg w-full h-32 flex items-center justify-center ">
                <img :src="imghttps(product.photo_thumb)" :alt="product.name" class="w-full rounded-t-md h-full object-cover" />
              </div>
            </div>
            <div class="px-2">
              <h2 class="text-center font-medium mb-1 text-sm line-clamp-3 overflow-hidden">{{ product.name }}</h2>
              <p class="text-center font-semibold mt-auto text-[#da252e]">{{ product.price }} TND</p>
            </div>
          </div>
        </div>
        <div
          v-if="index < bundle?.bundles_product?.length - 1"
          class="flex items-center  justify-center mx-4"
        >
          <span class="text-3xl text-gray-700">+</span>
        </div>
        </div>
    </div>
    
    <div v-if="bundle" class="flex flex-col items-center mb-6 text-center space-y-2">
  <div class="text-gray-400 line-through text-lg animate-bounce">
    {{ bundle.price }} TND
  </div>
  <div class="text-4xl font-bold text-[#da252e] animate-bounce animation-delay-100">
    {{ bundle.price - bundle.discount }} TND
  </div>
  <div class="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium inline-block animate-bounce animation-delay-200">
    Gagner {{ bundle.discount }} TND
  </div>
</div>

    <button @click="handleAddBundleProduct" class="w-full bg-[#da252e] text-white rounded-lg py-4 font-semibold hover:bg-[#c32028] transition">
      Ajouter tout à la carte
    </button>
    <div v-if="error" class="text-red-500 text-center mt-4">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { addToCart } from '~/composables/services/cartService';
import { imghttps } from '~/composables/services/helpers';

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
  extra: {
    type: Object,
    required: true,
    validator: (extra) => 'product_id' in extra,
  },
});

const bundle = ref(null);

const error = ref(null);
const { companyId } = useCompanyData();
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
// Chunk products into rows of 2 for sm: screens and above
const chunkedProducts = computed(() => {
  if (!bundle.value?.bundles_product) return [];
  const products = bundle.value.bundles_product;
  const chunks = [];
  for (let i = 0; i < products.length; i += 2) {
    chunks.push(products.slice(i, i + 2));
  }
  return chunks;
});

const fetchBundle = async () => {
  try {
    const data = await $fetch(`${baseURL}bundles/${companyId}/${props.extra.product_id}/`, {
      method: 'GET',
    });
    bundle.value = data;
  } catch (err) {
    console.error('Error fetching bundle data:', err);
    error.value = 'Failed to load bundle data.';
  }
};

const handleAddBundleProduct = async () => {
  if (!bundle.value || !bundle.value.bundles_product || bundle.value.bundles_product.length === 0) {
    error.value = 'No products available in this bundle.';
    return;
  }

  let options = bundle.value.bundles_product.map(product => ({
    product_name: product.name,
    quantity: 1,
    product_id: product.id,
    photo_thumb: product.photo_thumb,
    attrs: ""
  }));
  addToCart(props.product, 1, options);
};

onMounted(() => {
  fetchBundle();
});
</script>