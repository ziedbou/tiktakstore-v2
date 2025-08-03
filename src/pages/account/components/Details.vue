<template>
    <div class="">
        <div class="mb-4">
            <h1 class="text-xl md:text-xl  font-bold text-gray-800 gap-2 flex items-center  "><SquareUserRound/>Détails du compte</h1>
        </div>
        <div v-if="UserSubmitMessage" class="relative mb-6 rounded-md border p-4" :class="{ 'border-red-600 bg-red-50': UserSubmitError, 'border-green-600 bg-green-50': !UserSubmitError }">
        <button type="button" class="absolute right-2 top-2 text-gray-500" @click="UserSubmitMessage = ''">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <p class="text-sm text-gray-900">{{ UserSubmitMessage }}</p>
        </div>

        <form class="max-md:bg-white max-md:border max-md:border-gray-200 max-md:rounded-xl max-md:shadow max-md:p-6  space-y-6" @submit.prevent="updateUser">
        <div>
            <label for="name" class="block text-sm/6 font-medium text-gray-900">Nom complet *</label>
            <div class="mt-2">
            <input
                id="name"
                v-model="user.customer.name"
                type="text"
                required
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6"
            />
            </div>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
            <label for="phone" class="block text-sm/6 font-medium text-gray-900">Téléphone *</label>
            <div class="mt-2">
                <input
                id="phone"
                v-model="user.customer.phone"
                type="tel"
                required
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6"
                />
            </div>
            </div>
            <div>
            <label for="phone_extra" class="block text-sm/6 font-medium text-gray-900">Téléphone supplémentaire</label>
            <div class="mt-2">
                <input
                id="phone_extra"
                v-model="user.customer.phone_extra"
                type="tel"
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6"
                />
            </div>
            </div>
        </div>

        <div>
            <label for="code_tva" class="block text-sm/6 font-medium text-gray-900">Code TVA (facultatif)</label>
            <div class="mt-2">
            <input
                id="code_tva"
                v-model="user.customer.code_tva"
                type="text"
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6"
            />
            </div>
        </div>

        <div>
            <button
            type="submit"
            :disabled="isSubmitting"
            class="flex justify-center px-3 py-2.5 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 btn-primary-solid disabled:opacity-50"
            >
            {{ isSubmitting ? 'Enregistrement en cours...' : 'Enregistrer' }}
            <svg v-if="!isSubmitting" class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            </button>
        </div>
        </form>
  </div>
</template>

<script setup>
import { SquareUserRound } from 'lucide-vue-next'
import { ref } from 'vue'

const { userToken, userInfo } = defineProps({
  userInfo: {
    required: true,
    type: Object
  },
  userToken: {
    required: true,
    type: String
  }
})

const user = ref(userInfo)
const UserSubmitMessage = ref('')
const UserSubmitError = ref(false)
const isSubmitting = ref(false)
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
async function updateUser() {
  UserSubmitMessage.value = ''
  isSubmitting.value = true

  try {
    const response = await $fetch(baseURL + 'website/customer-update/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${userToken}`
      },
      body: user.value.customer
    })

    UserSubmitError.value = false
    UserSubmitMessage.value = 'Vos informations ont été enregistrées avec succès'
    localStorage.setItem('user', JSON.stringify(user.value))
  } catch (error) {
    UserSubmitError.value = true
    UserSubmitMessage.value = 'Une erreur est survenue, veuillez réessayer plus tard'
  } finally {
    isSubmitting.value = false
  }
}
</script>
