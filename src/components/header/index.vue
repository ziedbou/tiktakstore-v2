<template>
  <component
    v-if="headerComponent"
    :is="headerComponent"
    :storeInfo="storeInfo"
  />
  <div v-else class="header-fallback">
    <!-- Fallback content if no header template is found -->
    <p>Header template not found</p>
  </div>
</template>

<script setup>
import Header1 from '@/components/header/Header1.vue'
import Header2 from '@/components/header/Header2.vue'
import Header3 from '@/components/header/Header3.vue'
import Header4 from '@/components/header/Header4.vue'
import Header7 from '@/components/header/Header7.vue'

import { computed } from 'vue'
import { useStoreInfo } from '~/composables/useStoreInfo'

const { storeInfo } = useStoreInfo()

const templateNumber = computed(() => {
  return storeInfo.value?.homepage_settings?.menu_settings?.templateq || '7'
})

const headerComponent = computed(() => {
  switch (templateNumber.value) {
    case '1': return Header1
    case '2': return Header2
    case '3': return Header3
    case '4': return Header4
    case '7': return Header7
    default: return Header1
  }
})
</script>


<style scoped>
.header-fallback {
  padding: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  text-align: center;
  color: #6c757d;
}
</style>
