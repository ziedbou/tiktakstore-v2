<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12">
    <div class="text-center max-w-3xl mx-auto">
      <!-- TikTak Pro Logo -->
      <div class="mb-12">
        <img 
          class="mx-auto h-24 w-auto" 
          src="https://tiktakpro.tn/images/logo.svg" 
          alt="TikTak Pro" 
        />
      </div>

      <!-- Main Heading -->
      <h1 class="text-4xl font-extralight text-gray-900 mb-6">
        La boutique {{ companyData?.name }} n'est pas encore activée
      </h1>

      <!-- Subtitle -->
      <p class="text-gray-600 text-lg leading-relaxed">
        Vous pouvez activer votre boutique à partir de l'espace administrateur
        <br />
        (activation instantanée)
      </p>
    </div>
  </div>
</template>

<script setup>
import { useCompanyData } from '@/composables/useCompanyData';

// Get company data
const { companyData } = useCompanyData();

// Set page meta
useHead({
  title: 'Boutique non activée - TikTak Pro',
  meta: [
    { name: 'description', content: 'Cette boutique n\'est pas encore activée. Activation disponible depuis l\'espace administrateur.' }
  ]
});
</script> 