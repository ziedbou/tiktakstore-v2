<!-- components/Breadcrumb.vue -->
<template>
  <nav aria-label="Breadcrumb" class="flex items-center text-sm py-4">
    <ol class="flex items-center space-x-1">
      <li v-for="(item, index) in items" :key="index" class="flex items-center">
        <!-- Add chevron separator except for first item -->
        <div v-if="index > 0" class="text-gray-400 mx-1">
          <ChevronRight class="size-4" />
        </div>
        
        <!-- Link for non-last items -->
        <NuxtLink 
          v-if="index < items.length - 1" 
          :to="item.url" 
          class="text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          {{ item.label }}
        </NuxtLink>
        
        <!-- Current page (last item) -->
        <span 
          v-else 
          :class="[
            'font-medium', 
            useColors ? 'text-primary-600' : 'text-gray-900'
          ]"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => {
      // Validate each item has label and url properties
      return value.every(item => 'label' in item && 'url' in item);
    }
  },
  useColors: {
    type: Boolean,
    default: true
  }
});
</script>