<template>
  <main class="">
    <div class="mb-6">
      <h1 class="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Archive class="w-6 h-6" />
        Commandes
      </h1>
      <p v-if="customerOrders.length === 0" class="text-gray-600 text-sm mt-4">
        Aucune commande n'a encore été passée.
      </p>
      <div v-if="formError" class="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
        {{ errorMessage }}
      </div>
    </div>

    <div v-if="customerOrders.length > 0" class="overflow-x-auto">
      <table class="w-full border-collapse bg-white shadow-sm rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-700 text-sm font-semibold">
            <th class="py-3 px-4 text-left">Numéro</th>
            <th class="py-3 px-4 text-left">Date</th>
            <th class="py-3 px-4 text-left">Total</th>
            <th class="py-3 px-4 text-left">Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in customerOrders"
            :key="order.order_number"
            class="border-b border-gray-200 text-gray-600 text-sm"
          >
            <td class="py-3 px-4">{{ order.order_number }}</td>
            <td class="py-3 px-4">{{ formatDate(order.created_at) }}</td>
            <td class="py-3 px-4">
              {{ order.total_after_discount }} {{ companyData?.currency || '' }}
            </td>
            <td class="py-3 px-4">
              <span class="inline-block px-2 py-1 bg-green-100rounded">
                {{ order.step_name }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <NuxtLink
      to="/"
      class="mt-6 inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      ALLER À LA BOUTIQUE
    </NuxtLink>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Archive } from 'lucide-vue-next';
import { useCompanyData } from '~/composables/useCompanyData'; // Adjust path as needed

const { userToken } = defineProps({
  userToken: {
    required: true,
    type: String,
  },
});

const { companyData } = useCompanyData();
const customerOrders = ref([]);
const formError = ref(false);
const errorMessage = ref('');
const isClient = import.meta.client;

const config = useRuntimeConfig()
const baseURL = config.public.baseURL

const fetchCustomerOrders = async () => {
  if (!userToken) {
    formError.value = true;
    errorMessage.value = 'Aucun jeton d\'authentification fourni.';
    return;
  }

  try {
    const response = await $fetch(baseURL + 'website/get-customer-orders/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });

    customerOrders.value = response
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    formError.value = true;
    errorMessage.value = error.message || 'Erreur lors du chargement des commandes.';
    customerOrders.value = []; 
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

onMounted(() => {
  if (isClient) {
    fetchCustomerOrders();
  }
});
</script>
```