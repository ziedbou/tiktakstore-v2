<template>
  <div class="relative w-full">
    <Listbox v-model="selectedGouv" as="div" @update:modelValue="onModelUpdate" v-slot="{ open }">
      <div 
        class="relative"
        @click="isOpen = open"
      >
        <ListboxButton
          :class="[
            'relative w-full cursor-default rounded-md py-2.5 pl-3.5 pr-10 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 sm:text-sm',
            error ? 
              `bg-white border border-red-500 focus:border-red-600 focus:ring-red-500/20 ${errorRingClass}` : 
              'bg-white border border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-500/20'
          ]"
        >
          <span v-if="selectedGouv" class="truncate flex items-center">
            {{ selectedGouv }}
          </span>
          <span v-else class="block truncate text-gray-500">{{ placeholder }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
            <ChevronUpDownIcon class="h-4.5 w-4.5 text-gray-500" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
          @after-enter="focusSearchInput"
        >
          <ListboxOptions
            class="absolute z-10 mt-1.5 max-h-64 w-full overflow-auto rounded-md bg-white py-1.5 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            <!-- Search input -->
            <div class="sticky top-0 z-10 bg-white px-2.5 py-2 border-b border-gray-100">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  class="block w-full rounded-md border-0 bg-gray-50 py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-500/30 transition-all duration-200 sm:text-sm sm:leading-6"
                  placeholder="Rechercher un gouvernorat..."
                  v-model="searchQuery"
                  @click.stop
                  autocomplete="new-password"
                  :name="`gouv-search-${Date.now()}`"
                  ref="searchInput"
                />
              </div>
            </div>

            <div v-if="filteredGouvs.length === 0" class="py-3 px-3.5 text-sm text-gray-500 text-center">
              Aucun résultat trouvé
            </div>

            <ListboxOption
              v-for="gouv in filteredGouvs"
              :key="gouv"
              :value="gouv"
              v-slot="{ active, selected }"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-indigo-50 text-indigo-900' : 'text-gray-900 hover:bg-gray-50',
                  selected ? 'bg-indigo-50/70' : '',
                  'relative cursor-pointer select-none px-3.5 py-2.5 transition-colors duration-100'
                ]"
              >
                <div class="flex items-center">
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600"
                  >
                    <CheckIcon class="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <div :class="[selected ? 'pl-7': '', 'flex items-center truncate']">
                    <span :class="[selected ? 'font-medium' : 'font-normal']">
                      {{ gouv }}
                    </span>
                  </div>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { GOUVERNORATS } from '@/composables/utils/countries'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Sélectionnez un gouvernorat'
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  errorRingClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// Selected gouvernorat (controlled component)
const selectedGouv = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Reference to search input element
const searchInput = ref(null)

// Search functionality
const searchQuery = ref('')

// Track dropdown open state
const isOpen = ref(false)

// Watch for dropdown open state changes
watch(isOpen, (newValue) => {
  if (newValue) {
    // Focus the search input when dropdown opens
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus()
      }
    })
  } else {
    // Clear search when dropdown closes
    searchQuery.value = ''
  }
})

// Filter gouvernorats based on search query
const filteredGouvs = computed(() => {
  if (!searchQuery.value) return GOUVERNORATS

  const query = searchQuery.value.toLowerCase()
  
  return GOUVERNORATS.filter(gouv => {
    const name = gouv.toLowerCase()
    
    // Smart search: match by name start or contains
    return name.startsWith(query) || name.includes(query)
  })
})

const onModelUpdate = (value) => {
  selectedGouv.value = value
}

const focusSearchInput = () => {
  if (searchInput.value) {
    searchInput.value.focus()
  }
}
</script>

<style scoped>
/* Optional: Custom scrollbar styling */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
  background-color: transparent;
}
</style> 