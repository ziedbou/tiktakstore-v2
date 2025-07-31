<template>
  <div v-if="attributes.length > 0 && product.declinaison" class="space-y-6">
    <div class="choices-product space-y-6">
      <!-- Dynamic Attribute Selection -->
      <div
        v-for="(attribute, index) in attributes"
        :key="attribute.productoption"
        class="option mb-6"
      >
        <h3 class="text-sm font-medium text-gray-600 mb-3">
          <span v-if="selectedOptions[attribute.productoption]" class="flex items-center gap-1">
            <span class="font-medium text-gray-700">{{ attribute.label }}:</span>
            <span class="font-bold text-gray-900">{{ selectedOptions[attribute.productoption].name }}</span>
          </span>
          <span v-else class="text-gray-500">{{ attribute.label }}</span>
        </h3>
        <!-- Image or Color-based Variants -->
        <div
          v-if="attribute.displaytype === 'images' || attribute.displaytype === 'colors'"
          class="flex flex-wrap gap-3"
        >
          <button
            v-for="option in attribute.options"
            :key="option.id"
            type="button"
            class="w-10 h-12 sm:w-14 sm:h-18 rounded-sm transition-all duration-200 relative"
            :class="{
              'ring-2 ring-indigo-600 ring-offset-2': selectedOptions[attribute.productoption]?.id === option.id,
              'opacity-50 !cursor-not-allowed border-gray-300': !isOptionAvailable(attribute.productoption, option.id),
            }"
            :style="attribute.displaytype === 'colors' ? { backgroundColor: option.value } : {}"
            :title="`Select ${option.name}`"
            :aria-label="`Select ${attribute.label} ${option.name}`"
            :disabled="!isOptionAvailable(attribute.productoption, option.id)"
            @click="selectOption(attribute.productoption, option); setSelectedByUser()"
          >
            <img
              v-if="attribute.displaytype === 'images' && option.image"
              :src="option.image"
              :alt="option.name"
              class="w-full h-full object-cover rounded-sm"
              loading="lazy"
            />
          </button>
        </div>
        <!-- Button or Dropdown Variants -->
        <div
          v-else
          class="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          <template v-if="attribute.displaytype === 'dropdown'">
            <select
              class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              @change="selectOption(attribute.productoption, attribute.options.find(opt => opt.id === parseInt($event.target.value)))"
            >
              <option
                v-for="option in attribute.options"
                :key="option.id"
                :value="option.id"
                :disabled="!isOptionAvailable(attribute.productoption, option.id)"
              >
                {{ option.name }}
              </option>
            </select>
          </template>
          <template v-else>
            <button
              v-for="option in attribute.options"
              :key="option.id"
              type="button"
              class="flex items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase transition-all duration-200"
              :class="{
                'border-transparent bg-indigo-600 text-white hover:bg-indigo-700': selectedOptions[attribute.productoption]?.id === option.id,
                'border-gray-200 bg-white text-gray-900 hover:bg-gray-50': selectedOptions[attribute.productoption]?.id !== option.id,
                'focus:ring-2 ring-indigo-600 ring-offset-2': true,
                'opacity-50 !cursor-not-allowed bg-gray-100 line-through text-gray-400 border-gray-300': !isOptionAvailable(attribute.productoption, option.id),
              }"
              :title="`Select ${option.name}`"
              :aria-label="`Select ${attribute.label} ${option.name}`"
              :disabled="!isOptionAvailable(attribute.productoption, option.id)"
              @click="selectOption(attribute.productoption, option); setSelectedByUser()"
            >
              {{ option.name.split('(')[0] }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useSelectedVariant } from '@/composables/useSelectedVariants.js';

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Initialize the composable
const { setSelectedVariant, setSelectedByUser } = useSelectedVariant();

// Reactive state
const selectedOptions = ref({});
const selectedVariant = ref(null);

// Computed property for product_filtred
const product_filtred = computed(() => {
  // Case 1: Product has no variants
  if (!props.product.declinaisons || props.product.declinaisons.length === 0) {
    return props.product;
  }

  // Case 2: Product has variants
  // Find the default variant with stock
  const defaultVariant = props.product.declinaisons.find(
    (dec) => dec.default && dec.stock > 0
  );

  if (defaultVariant) {
    return defaultVariant;
  }

  // If no default variant with stock, find the variant with the highest stock
  const highestStockVariant = props.product.declinaisons.reduce(
    (max, dec) => (dec.stock > max.stock ? dec : max),
    props.product.declinaisons[0]
  );

  return highestStockVariant.stock > 0 ? highestStockVariant : props.product.declinaisons[0];
});

// Initialize selected variant and store in composable
const initializeSelectedVariant = () => {
  if (product_filtred.value !== props.product) {
    // If product_filtred is a variant, set it as the selected variant
    selectedVariant.value = product_filtred.value;
    setSelectedVariant(product_filtred.value);

    // Pre-select the attributes for the selected variant
    product_filtred.value._attributs.forEach((attr) => {
      selectedOptions.value[attr.productoption] = {
        id: attr.id,
        name: attr.name,
        value: attr.value,
        image: product_filtred.value.photo_thumb || product_filtred.value.photo || 'https://via.placeholder.com/150?text=No+Image',
      };
    });
  } else {
    // If no variants, clear selected variant
    selectedVariant.value = null;
    setSelectedVariant(null);
    selectedOptions.value = {};
  }
};

// Run initialization
initializeSelectedVariant();

// Computed properties for attributes
const attributes = computed(() => {
  const attrMap = new Map();
  props.product.declinaisons.forEach((dec) => {
    dec._attributs.forEach((attr) => {
      if (!attrMap.has(attr.productoption)) {
        attrMap.set(attr.productoption, {
          productoption: attr.productoption,
          label: attr.is_color ? 'Color' : attr.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          displaytype: attr.displaytype,
          options: [],
        });
      }
      const existingAttr = attrMap.get(attr.productoption);
      if (!existingAttr.options.some(opt => opt.id === attr.id)) {
        existingAttr.options.push({
          id: attr.id,
          name: attr.name,
          value: attr.value,
          image: dec.photo_thumb || dec.photo || 'https://via.placeholder.com/150?text=No+Image',
        });
      }
    });
  });
  return Array.from(attrMap.values()).map(attr => ({
    ...attr,
    options: attr.options.sort((a, b) => a.name.localeCompare(b.name)),
  }));
});

const isOptionAvailable = computed(() => (productoption, optionId) => {
  return props.product.declinaisons.some((dec) =>
    dec._attributs.some((attr) => attr.productoption === productoption && attr.id === optionId) &&
    dec.stock > 0 &&
    Object.entries(selectedOptions.value).every(([key, opt]) => 
      key === productoption.toString() || 
      dec._attributs.some((attr) => attr.productoption === parseInt(key) && attr.id === opt.id)
    )
  );
});

// Methods
const selectOption = (productoption, option) => {
  if (!isOptionAvailable.value(productoption, option.id)) return;
  selectedOptions.value[productoption] = option;
  updateSelectedVariant();
};

const updateSelectedVariant = () => {
  if (Object.keys(selectedOptions.value).length !== attributes.value.length) {
    selectedVariant.value = null;
    setSelectedVariant(null);
    return;
  }

  const variant = props.product.declinaisons.find((dec) =>
    attributes.value.every((attr) =>
      dec._attributs.some(
        (a) => a.productoption === attr.productoption && a.id === selectedOptions.value[attr.productoption].id
      )
    )
  );

  selectedVariant.value = variant || null;
  setSelectedVariant(variant);
};
</script>