<template>
  <div class="py-10 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-lg w-full text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-indigo-600 mb-4">404</h1>
        <div class="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
      </div>
      
      <div class="mb-8">
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Page Introuvable</h2>
        <p class="text-gray-600 text-lg leading-relaxed">
          Oups ! La page que vous recherchez n'existe pas. Elle a peut-être été déplacée, supprimée ou l'URL saisie est incorrecte.
        </p>
      </div>
      
      <div class="mb-8">
        <svg class="w-64 h-64 mx-auto text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" opacity="0.3"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 9 15.5 9 14 9.67 14 10s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 9 8.5 9 7 9.67 7 10s.67 1.5 1.5 1.5zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      </div>
      
      <div class="space-y-4">
        <button 
          @click="handleGoHome"
          class="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Retour à l'accueil
        </button>
        
      </div>
      
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

useHead({
  title: '404 - Page Introuvable',
  meta: [
    { name: 'description', content: 'La page que vous recherchez n\'a pas pu être trouvée.' }
  ]
})

const handleGoHome = () => {
  navigateTo('/')
}

const handleGoBack = () => {
  if (process.client && window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/')
  }
}

onBeforeUnmount(() => {
  clearError()
})
</script>