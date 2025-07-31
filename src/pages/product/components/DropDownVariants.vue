<template>
  <div v-if="attributes.length > 0" class="w-full flex gap-2 flex-row my-4">
    <div class="w-full" v-for="attribute in attributes" :key="attribute.productoption">
      <select
        class="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        @change="selectOption(attribute.productoption, attribute.options.find(opt => opt.id === parseInt($event.target.value)))"
      >
        <option value="" disabled :selected="!selectedOptions[attribute.productoption]">
          Select {{ attribute.label }}
        </option>
        <option
          v-for="option in attribute.options"
          :key="option.id"
          :value="option.id"
          :disabled="!isOptionAvailable(attribute.productoption, option.id)"
          :class="{ 'text-gray-400': !isOptionAvailable(attribute.productoption, option.id) }"
          :selected="selectedOptions[attribute.productoption]?.id === option.id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, toRaw } from 'vue';
import { useSelectedMultipleVariants } from '~/composables/useSelectedMultipleVariants';
import { useSelectedVariant } from '~/composables/useSelectedVariants';

const props = defineProps({
  product: {
    required: true,
  },
  quantity: {
    required: true,
  },
  index: {
    required: true,
  },
});

const { setMultipleVariant, getMultipleVariants, initializeQuantity } = useSelectedMultipleVariants();

// Load existing variant from shared state
const currentVariant = computed(() => getMultipleVariants(props.quantity)[props.index]);
const selectedOptions = ref({});
const selectedOptionVariant = ref(currentVariant.value || null);

const { getSelectedVariant } = useSelectedVariant();
const { quantity } = useProductQuantity();

const attributes = computed(() => {
  const attrMap = new Map();
  props.product.declinaisons.forEach((dec) => {
    dec._attributs.forEach((attr) => {
      if (!attrMap.has(attr.productoption)) {
        attrMap.set(attr.productoption, {
          productoption: attr.productoption,
          label: attr.name,
          options: [],
        });
      }
      const attribute = attrMap.get(attr.productoption);
      if (!attribute.options.some(option => option.id === attr.id)) {
        attribute.options.push({
          id: attr.id,
          name: attr.name,
          value: attr.value,
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
    dec._attributs.some(attr => attr.productoption === productoption && attr.id === optionId)
  );
});

const initSelectedOptions = () => {
  const variant = getSelectedVariant();
  if (variant) {
    const initialOptions = {};
    variant._attributs.forEach(attr => {
      initialOptions[attr.productoption] = {
        id: attr.id,
        name: attr.name,
        value: attr.value,
      };
    });
    selectedOptions.value = initialOptions;
  }
};

const selectOption = (productoption, option) => {
  if (!option || !isOptionAvailable.value(productoption, option.id)) return;

  selectedOptions.value = {
    ...selectedOptions.value,
    [productoption]: option,
  };
  updateselectedOptionVariant();
};

const updateselectedOptionVariant = () => {
  console.log('%csrc\pages\product\components\DropDownVariants.vue:111  ', 'color: #007acc;', toRaw(getMultipleVariants(props.quantity)));
  if (Object.keys(selectedOptions.value).length !== attributes.value.length) {
    selectedOptionVariant.value = null;
    setMultipleVariant(props.quantity, props.index, null);
    return;
  }

  const variant = props.product.declinaisons.find((dec) =>
    attributes.value.every((attr) =>
      dec._attributs.some(
        (a) => a.productoption === attr.productoption && a.id === selectedOptions.value[attr.productoption].id
      )
    )
  );

  selectedOptionVariant.value = variant || null;
  setMultipleVariant(props.quantity,  props.index, {
    ...variant,
    selectedOptions: { ...selectedOptions.value },
  });
};

onMounted(() => {
  initializeQuantity(props.quantity);
  initSelectedOptions();
});

watch(
  () => getSelectedVariant(),
  () => {
    initSelectedOptions();
    updateselectedOptionVariant(); 
  },
  { deep: true }
);

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>