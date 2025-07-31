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
import { computed, shallowRef } from 'vue'
import { useStoreInfo } from '~/composables/useStoreInfo';
const { storeInfo } = useStoreInfo()

// Get template number from company data
const templateNumber = computed(() => {
  return storeInfo.value?.homepage_settings?.menu_settings?.template || '1'
})


const styleSettings = computed(() => {
  return storeInfo.value?.homepage_settings?.style || {}
})

// Dynamic header component reference
const headerComponent = shallowRef(null)

// Load the appropriate header component based on template
const loadHeaderComponent = async (template) => {
  try {
    const componentModule = await import(`@/components/header/Header${template}.vue`)
    headerComponent.value = componentModule.default
    console.log(`Loaded header component: Header${template} for template: ${template}`)
  } catch (error) {
    console.error(`Failed to load header component Header${template}:`, error)
    headerComponent.value = null
  }
}

// Load component synchronously for SSR
if (templateNumber.value) {
  loadHeaderComponent(templateNumber.value)
} else {
  // Fallback to Header1 if no template is specified
  console.log("No template specified, falling back to Header1")
  loadHeaderComponent('1')
}
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
