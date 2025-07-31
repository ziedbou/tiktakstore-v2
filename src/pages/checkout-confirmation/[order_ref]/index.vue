<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading state -->
      <div
        v-if="pending"
        class="flex flex-col items-center justify-center py-20"
      >
        <div
          class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        ></div>
        <p class="mt-4 text-gray-600">Chargement de votre commande...</p>
      </div>

      <!-- Error state -->
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center py-20"
      >
        <div class="rounded-full bg-red-100 p-3 mb-4">
          <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Commande introuvable</h2>
        <p class="text-gray-600 text-center mb-6">
          Nous n'avons pas pu trouver votre commande. Veuillez vérifier votre référence de commande.
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Retour à l'accueil
        </NuxtLink>
      </div>

      <!-- Success state -->
      <div v-else-if="orderData">
        <!-- Success header (outside the box) -->
        <div class="text-center mb-8">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Commande envoyée avec succès</h1>
          <p class="text-gray-600">Votre commande a été bien enregistrée</p>
        </div>

        <!-- Order details box -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <!-- Company and order info header - full width with gray background -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <!-- Left side: Logo and company info -->
              <div class="flex items-center space-x-6">
                <NuxtImg
                  :src="`https://cdn.cloudtiktak.com${companyData.logo}`"
                  alt="Company Logo"
                  class="h-12 object-contain"
                />
                <div>
                  <h2 class="text-lg font-semibold text-gray-900 mb-1">{{ companyData.name }}</h2>
                  <p class="text-sm text-gray-600">Commande #{{ orderData.order_number || orderData.id }} • {{ formatDate(orderData.created_at) }}</p>
                </div>
              </div>
              
              <!-- Right side: Contact info -->
              <div class="text-right">
                <p class="text-sm text-gray-600">{{ companyData.city || 'Tunis' }}</p>
                <p class="text-sm text-gray-600">Tél: {{ companyData.phone }}</p>
              </div>
            </div>
          </div>

          <!-- Order details -->
          <div class="px-6 py-6">
            <!-- Customer information section -->
            <div class="mb-8">
              <h3 class="text-sm font-medium text-gray-900 mb-3">Informations client</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ orderData.name }}</p>
                  <p class="text-sm text-gray-600">Tél: {{ orderData.phone }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 mb-1">Adresse de livraison</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ orderData.address }}, {{ orderData.gouvernorat }} {{ orderData.delegation }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Order items table -->
            <div class="mb-8">
              <div class="overflow-hidden">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Désignation</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prix unitaire</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Remise</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sous-total</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="item in orderData.details" :key="item.id">
                      <td class="px-4 py-4">
                        <div class="flex items-center">
                          <img
                            :src="imghttps(item.product_thumb)"
                            :alt="item.product_name"
                            class="w-12 h-12 rounded-md object-cover mr-3"
                          />
                          <div>
                            <p class="text-sm font-medium text-gray-900">
                              {{ item.quantity }} × {{ item.product_name }} {{ item.product_ref }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-4 text-right text-sm text-gray-900">
                        {{ formatPrice(item.final_price) }} {{ companyData.currency }}
                      </td>
                      <td class="px-4 py-4 text-right text-sm text-gray-900">
                        {{ formatPrice(item.discount) }} {{ companyData.currency }}
                      </td>
                      <td class="px-4 py-4 text-right text-sm font-medium text-gray-900">
                        {{ formatPrice(item.final_price * item.quantity) }} {{ companyData.currency }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Order totals -->
            <div class="border-t border-gray-200 pt-6">
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Sous-total</span>
                  <span class="text-gray-900">{{ formatPrice(orderData.total_after_discount + orderData.discount - orderData.transport_price) }} {{ companyData.currency }}</span>
                </div>
                
                <div v-if="orderData.discount > 0" class="flex justify-between text-sm">
                  <span class="text-gray-600">Réduction</span>
                  <span class="text-gray-900">{{"- " + formatPrice(orderData.discount) }} {{ companyData.currency }}</span>
                </div>
                
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Frais de livraison</span>
                  <span class="text-gray-900">{{ formatPrice(orderData.transport_price) }} {{ companyData.currency }}</span>
                </div>
                
                <div class="flex justify-between text-base font-semibold border-t border-gray-200 pt-3">
                  <span class="text-gray-900">Total</span>
                  <span class="text-gray-900">
                    <template v-if="orderData.discount > 0">
                      <span class="line-through font-medium text-gray-500 mx-2">
                        {{
                          companyData.currency +
                          " " +
                          formatPrice(orderData.total_after_discount + orderData.discount)
                        }}
                      </span>
                      <span>
                        {{
                          companyData.currency +
                          " " +
                          formatPrice(orderData.total_after_discount)
                        }}
                      </span>
                    </template>
                    <template v-else>
                      <span>
                        {{ companyData.currency }} {{ formatPrice(orderData.total_amount) }}
                      </span>
                    </template>
                  </span>
                </div>
              </div>
            </div>

            <!-- Thank you message and button -->
            <div class="text-center mt-8 pt-6 border-t border-gray-200">
              <p class="text-gray-600 mb-6">Merci pour votre commande</p>
              <button
                @click="$router.push('/')"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Revenir à la page d'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCompanyData } from "@/composables/useCompanyData";
import { imghttps } from "~/composables/services/helpers";

const { companyData } = useCompanyData();
const route = useRoute();
const orderRef = route.params.order_ref;
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
// SSR API call to fetch order details
const { data: orderData, pending, error } = await useFetch(
  `${baseURL}get-order-by-idref/${orderRef}/${companyData.value.id}`,
  {
    key: `order-${orderRef}`,
    server: true,
  }
);

// Format price to show proper decimals
const formatPrice = (price) => {
  return parseFloat(price || 0).toFixed(3);
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Set page title
useHead({
  title: orderData.value 
    ? `Confirmation de commande #${orderData.value.order_number || orderData.value.id}` 
    : 'Confirmation de commande',
});
</script>

<style scoped>
/* Custom styles to match the screenshot */
</style>