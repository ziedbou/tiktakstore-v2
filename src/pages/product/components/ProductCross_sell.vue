<template>
  <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full mx-auto">
    <h1 class="text-2xl font-bold text-center text-blue-900 mb-6">Bundle & Save</h1>
    <div v-if="bundle" class="flex flex-col gap-6 mb-6">
      <div v-for="(row, rowIndex) in chunkedProducts" :key="rowIndex" class="flex flex-wrap gap-4">
        <div
          v-for="(product, colIndex) in row"
          :key="product.id"
          class="flex items-center w-full sm:w-[calc(50%-0.5rem)]"
        >
          <div class="border rounded-lg p-4 flex-1 min-w-0 flex flex-col items-center h-64">
            <div class="flex justify-center mb-4">
              <div class="bg-gray-100 rounded-lg p-2 w-24 h-24 flex items-center justify-center">
                <img :src="product.photo_thumb" :alt="product.name" class="max-w-full max-h-full object-contain" />
              </div>
            </div>
            <h2 class="text-center font-medium mb-1 text-sm line-clamp-2 overflow-hidden">{{ product.name }}</h2>
            <p class="text-center font-semibold mt-auto">{{ product.price }} TND</p>
          </div>
          <div
            v-if="colIndex < row.length - 1"
            class="flex items-center justify-center mx-4"
          >
            <span class="text-3xl text-gray-400">+</span>
          </div>
        </div>
      </div>
      
    </div>
    <div v-if="bundle" class="flex justify-between items-center mb-6">
      <div class="flex items-baseline">
        <span class="font-semibold mr-2">Total:</span>
        <span class="text-gray-500 line-through text-sm mr-2">{{ bundle.price }} TND</span>
        <span class="text-indigo-600 font-bold text-2xl">{{ bundle.price - bundle.discount }} TND</span>
      </div>
      <div class="bg-white border border-gray-300 rounded-full py-1 px-4">
        <span class="text-gray-800">Gagner {{ bundle.discount }} TND</span>
      </div>
    </div>
    <button class="w-full bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 transition">
      Ajouter tout à la carte
    </button>
    <div v-if="error" class="text-red-500 text-center mt-4">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
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

onMounted(() => {
  fetchBundle();
});
</script>