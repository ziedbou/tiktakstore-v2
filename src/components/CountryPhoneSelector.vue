<template>
  <div class="relative w-full">
    <div 
      :class="[
        'flex rounded-md transition-all duration-200 ring-offset-0',
        error ? 
          `ring-2 ring-red-500/50 border border-red-500 ${errorRingClass}` : 
          'focus-within:ring-2 focus-within:ring-indigo-500/20 border border-gray-300 hover:border-gray-400 focus-within:border-indigo-500'
      ]"
    >
      <!-- Country dropdown part -->
      <Listbox v-model="selectedCountry" as="div" class="relative">
        <ListboxButton
          class="h-full w-[110px] relative cursor-default py-2.5 pl-3 pr-8 text-left bg-gray-50 border-r border-gray-300 flex items-center transition-colors duration-200 focus:outline-none sm:text-sm rounded-l-md"
        >
          <span v-if="selectedCountry" class="truncate flex items-center">
            <img 
              :src="getFlagUrl(selectedCountry.code)" 
              :alt="selectedCountry.name" 
              class="w-5 h-auto mr-1.5 inline-block" 
            />
            <span class="font-medium">{{ selectedCountry.phoneCode }}</span>
          </span>
          <span v-else class="block truncate text-gray-500">{{ placeholder }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5">
            <ChevronUpDownIcon class="h-4 w-4 text-gray-500" aria-hidden="true" />
          </span>
        </ListboxButton>

        <div class="relative">
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
              class="absolute z-50 top-2 left-0 mt-1 max-h-64 w-72 overflow-auto rounded-md bg-white py-1.5 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
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
                    placeholder="Rechercher un pays..."
                    v-model="searchQuery"
                    @click.stop
                    autocomplete="new-password"
                    :name="`country-search-${Date.now()}`"
                    ref="searchInput"
                  />
                </div>
              </div>

              <div v-if="filteredCountries.length === 0" class="py-3 px-3.5 text-sm text-gray-500 text-center">
                Aucun résultat trouvé
              </div>

              <ListboxOption
                v-for="country in filteredCountries"
                :key="country.code"
                :value="country"
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
                      <img 
                        :src="getFlagUrl(country.code)" 
                        :alt="country.name" 
                        class="w-5 h-auto mr-2.5 shadow-sm" 
                      />
                      <span :class="[selected ? 'font-medium' : 'font-normal']">
                        {{ country.name }}
                      </span>
                      <span class="ml-1.5 text-xs text-gray-500 font-medium">{{ country.phoneCode }}</span>
                    </div>
                  </div>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>

      <!-- Phone number input part -->
      <input
        type="tel"
        :id="inputId"
        :name="inputId"
        v-model="phoneNumber"
        :required="required"
        :maxlength="maxLength"
        :placeholder="inputPlaceholder"
        class="block w-full px-3 py-2.5 text-base text-gray-900 focus:outline-none sm:text-sm/6 bg-white rounded-r-md"
      />
    </div>
    <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
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
import { COUNTRIES } from '@/composables/utils/countries'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '+XX'
  },
  inputPlaceholder: {
    type: String,
    default: 'Numéro de téléphone'
  },
  inputId: {
    type: String,
    default: 'phone'
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
  },
  required: {
    type: Boolean,
    default: false
  },
  defaultCountry: {
    type: String,
    default: 'TN' // Default to Tunisia
  },
  maxLength: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

// Reference for selected country
const selectedCountry = ref(COUNTRIES.find(country => country.code === props.defaultCountry) || COUNTRIES.find(country => country.code === 'FR'))

// Store just the phone number part (without country code)
const phoneNumber = ref('')

// Combined value (country code + phone number)
const combinedValue = computed(() => {
  if (!selectedCountry.value) return phoneNumber.value
  return `${selectedCountry.value.phoneCode}${phoneNumber.value}`
})

// Update model value when either country or phone changes
watch(combinedValue, (newVal) => {
  emit('update:modelValue', newVal)
})

// Update phone number when model value changes externally
watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    phoneNumber.value = ''
    return
  }
  
  // Try to extract country code and phone number
  const countryCode = COUNTRIES.find(country => newVal.startsWith(country.phoneCode))
  if (countryCode) {
    selectedCountry.value = countryCode
    phoneNumber.value = newVal.substring(countryCode.phoneCode.length)
  } else {
    // If no matching country code, just set the phone number
    phoneNumber.value = newVal
  }
}, { immediate: true })

// Search functionality
const searchQuery = ref('')

// Filter countries based on search query
const filteredCountries = computed(() => {
  if (!searchQuery.value) return COUNTRIES

  const query = searchQuery.value.toLowerCase()
  
  return COUNTRIES.filter(country => {
    const name = country.name.toLowerCase()
    const code = country.code.toLowerCase()
    const phoneCode = country.phoneCode.toLowerCase()
    
    // Smart search: match by name start, name contains, code, or phone code
    return name.startsWith(query) || 
           name.includes(query) || 
           code.includes(query) ||
           phoneCode.includes(query)
  })
})

// Function to get flag image URL from country code
const getFlagUrl = (countryCode) => {
  if (!countryCode) return ''
  
  // Using flagcdn.com which provides flag images by country code
  return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`
}

// Reset search when dropdown closes
watch(() => selectedCountry.value, () => {
  searchQuery.value = ''
})

// Reference for search input
const searchInput = ref(null)

// Focus search input after dropdown opens
const focusSearchInput = () => {
  nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus()
    }
  })
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