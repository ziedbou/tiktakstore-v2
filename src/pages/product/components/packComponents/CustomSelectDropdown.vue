<template>
  <div class="relative" ref="dropdownRef">
    <label v-if="label" class="block text-sm font-medium text-gray-700 my-2">
      {{ label }}
    </label>
    
    <button
      @click="toggleDropdown"
      class="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <template v-if="selectedOption">
            <span
              v-if="displaytype === 'colors' || (displaytype != 'images' && selectedOption.is_color)"
              class="w-8 h-8 rounded-full"
              :style="{ backgroundColor: selectedOption.value }"
            ></span>
            <img
              v-else-if="displaytype === 'images' && selectedOption.image"
              :src="selectedOption.image"
              :alt="selectedOption.name"
              class="w-8 h-8 rounded-full object-cover"
            />
            <span class="text-gray-700">{{ selectedOption.name }}</span>
          </template>
          <span v-else class="text-gray-500">{{ placeholder }}</span>
        </div>
        <svg
          class="w-5 h-5 text-gray-400 transition-transform"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
      >
        <button
          v-for="option in options"
          :key="option.id"
          type="button"
          class="w-full px-4 py-3 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 flex items-center space-x-3 transition-colors"
          :class="{
            'bg-blue-100 text-blue-700': selectedOption?.id === option.id,
            'text-gray-700': selectedOption?.id !== option.id,
            'opacity-50 cursor-not-allowed': !isOptionAvailable(option)
          }"
          :disabled="!isOptionAvailable(option)"
          @click="selectOption(option)"
        >
          <span
            v-if="displaytype === 'colors' || (displaytype != 'images' && option.is_color)"
            class="w-8 h-8 rounded-full"
            :style="{ backgroundColor: option.value }"
          ></span>
          <img
            v-else-if="displaytype === 'images' && option.image"
            :src="option.image"
            :alt="option.name"
            class="w-8 h-8 rounded-full object-cover"
          />
          <span>{{ option.name }}</span>
          <span v-if="!isOptionAvailable(option)" class="ml-auto text-red-500 text-sm">Out of stock</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'Choisir une option'
  },
  label: {
    type: String,
    default: ''
  },
  displaytype: {
    type: String,
    default: 'dropdown',
    validator: (value) => ['images', 'colors', 'buttons', 'dropdown'].includes(value)
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'change'])

// Local reactive data
const isOpen = ref(false)
const selectedOption = ref(props.modelValue)
const dropdownRef = ref(null)

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option) => {
  if (isOptionAvailable(option)) {
    selectedOption.value = option
    isOpen.value = false
    emit('update:modelValue', option)
    emit('change', option)
  }
}

const isOptionAvailable = (option) => {
  return option.stock > 0 || option.order_without_stock
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  selectedOption.value = newValue
})

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>