<template>
  <div class="min-w-full ">
    <div class="mb-6">
        <h1 class="text-xl md:text-xl font-bold text-gray-800 flex items-center gap-2 "><MapPinHouse/>Gérer Vos Adresses</h1>
        <p class="text-gray-600 text-sm mt-4">Organisez et gérez toutes vos adresses de livraison</p>
    </div>
 
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      <div v-for="(address, index) in user.customer.addresses" :key="address.id" 
           class="bg-white rounded-lg shadow border border-gray-200 p-6">
        
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ address.title }}
          </h3>
        </div>
        
        <div class="space-y-2 text-gray-600 mb-6">
          <p class="flex items-center">
            <i class="fas fa-user mr-2 text-indigo-600"></i>
            {{ address.contact || 'Aucun contact' }}
          </p>
          <p class="flex items-center">
            <i class="fas fa-map-marker-alt mr-2 text-indigo-600"></i>
            {{ address.address }}
          </p>
          <p class="flex items-center">
            <i class="fas fa-map mr-2 text-indigo-600"></i>
            {{ address.gouvernorat }}
          </p>
          <p class="flex items-center">
            <i class="fas fa-building mr-2 text-indigo-600"></i>
            {{ address.delegation }}
          </p>
          <p class="flex items-center">
            <i class="fas fa-mail-bulk mr-2 text-indigo-600"></i>
            {{ address.code_postal || 'Aucun code postal' }}
          </p>
        </div>
        
        <div class="flex space-x-3">
          <button @click="openAddressModal(address, index)" 
                  class="flex-1 rounded-md bg-indigo-600 px-3 py-2.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center">
            <i class="fas fa-edit mr-2"></i> Modifier
          </button>
          <button @click="deleteAddress(index)" 
                  class="flex-1 rounded-md bg-gray-300 px-3 py-2.5 text-sm/6 font-semibold text-gray-700 shadow-xs hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 flex items-center justify-center">
            <i class="fas fa-trash mr-2"></i> Supprimer
          </button>
        </div>
      </div>
      
      <button @click="addAddress" 
              class="bg-white rounded-lg shadow border-2 border-dashed border-blue-300 p-8 flex flex-col items-center justify-center hover:border-indigo-600 hover:bg-blue-50 min-h-64">
        <div class="bg-blue-100 rounded-full p-4 mb-4">
          <MapPinHouse />
        </div>
        <span class="text-sm font-semibold text-gray-700">Ajouter Nouvelle Adresse</span>
        <span class="text-sm text-gray-500 mt-2">Cliquez pour créer une nouvelle adresse</span>
      </button>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-[#11111160] bg-opacity-50"></div>

        <div class="relative bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full border border-gray-200">

          <div class="text-lg font-semibold mb-4">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-bold ">
                {{ addressToEdit.id ? 'Modifier l\'Adresse' : 'Ajouter une Adresse' }}
              </h2>
              <button @click="closeModal" 
                      class="rounded-md bg-white bg-opacity-20 px-3 py-2.5 text-sm/6 font-semibold  shadow-xs hover:bg-opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">

                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
              </button>
            </div>
          </div>

          <form @submit.prevent="saveAddress" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm/6 font-medium text-gray-900 mb-2">
                  <i class="fas fa-tag mr-2 text-indigo-600"></i>Titre
                </label>
                <input v-model="addressToEdit.title" type="text" 
                       class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                       placeholder="Ex: Maison, Bureau, etc." required>
              </div>
              
              <div>
                <label class="block text-sm/6 font-medium text-gray-900 mb-2">
                  <i class="fas fa-user mr-2 text-indigo-600"></i>Contact
                </label>
                <input v-model="addressToEdit.contact" type="text" 
                       class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                       placeholder="Nom du contact">
              </div>
              
              <div>
                <label class="block text-sm/6 font-medium text-gray-900 mb-2">
                  <i class="fas fa-mail-bulk mr-2 text-indigo-600"></i>Code Postal
                </label>
                <input v-model="addressToEdit.code_postal" type="text" 
                       class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                       placeholder="Ex: 1000">
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm/6 font-medium text-gray-900 mb-2">
                  <i class="fas fa-map-marker-alt mr-2 text-indigo-600"></i>Adresse
                </label>
                <input v-model="addressToEdit.address" type="text" 
                       class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                       placeholder="Adresse complète" required>
              </div>
              
              <div>
                <label class="block text-sm/6 font-medium text-gray-900 mb-2">
                  <i class="fas fa-map mr-2 text-indigo-600"></i>Gouvernorat
                </label>
                <select v-model="addressToEdit.gouvernorat" @change="updateGouvernorat($event.target.value)" 
                        class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required>
                  <option v-for="gouv in gouvernorats" :value="gouv">{{ gouv }}</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm/6 font-medium text-gray-900 mb-2">
                  <i class="fas fa-building mr-2 text-indigo-600"></i>Délégation
                </label>
                <input v-model="addressToEdit.delegation" list="delegations" 
                       class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                       placeholder="Sélectionner ou taper" required>
                <datalist id="delegations">
                  <option v-for="dlg in options" :value="dlg">{{ dlg }}</option>
                </datalist>
              </div>
            </div>
            
            <div class="flex space-x-4 pt-2">
              <button type="button" @click="closeModal"
                      class="flex-1 rounded-md bg-gray-300 px-3 py-2.5 text-sm/6 font-semibold text-gray-700 shadow-xs hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 flex items-center justify-center">
                <i class="fas fa-times mr-2"></i> Annuler
              </button>
              <button type="submit" 
                      class="flex-1 rounded-md bg-indigo-600 px-3 py-2.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center">
                <i class="fas fa-save mr-2"></i> Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPinHouse } from 'lucide-vue-next'
import { ref } from 'vue'

const {userToken, userInfo} = defineProps({
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

const token = userToken
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
const gouvernorats = ref(["Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Le Kef","Mahdia","Mannouba","Medenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]) // Replace with actual governorates
const options = ref([]) 
const isModalOpen = ref(false)
const addressToEdit = ref({})
const selectedAddressIndex = ref(null)

const addAddress = () => {
  addressToEdit.value = {
    id: null,
    title: 'New Address',
    address: '',
    default: false,
    code_tva: '',
    gouvernorat: 'Ariana',
    delegation: '',
    contact: '',
    code_postal: '',
    phone: '',
    phone_extra: '',
    customer: userInfo?.customer?.id
  }
  selectedAddressIndex.value = null
  isModalOpen.value = true
}

const openAddressModal = (address, index) => {
  addressToEdit.value = { ...address }
  selectedAddressIndex.value = index
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveAddress = async () => {
  try {
    if (addressToEdit.value.id) {
      // Update existing address
      const response = await $fetch(`${baseURL}website/addresses/${addressToEdit.value.id}/`, {
        method: 'PATCH',
        headers: { Authorization: `Token ${token}` },
        body: addressToEdit.value
      })
      user.value.customer.addresses[selectedAddressIndex.value] = response
    } else {
      // Add new address
      const response = await $fetch(`${baseURL}website/addresses/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}` },
        body: addressToEdit.value
      })
      user.value.customer.addresses.push(response)
    }
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user.value))
    }, 100)
    closeModal()
  } catch (error) {
    console.error('Error saving address:', error)
  }
}

const deleteAddress = async (index) => {
  try {
    const address = user.value.customer.addresses[index]
    if (address.id) {
      await $fetch(`${baseURL}website/addresses/${address.id}/`, {
        method: 'DELETE',
        headers: { Authorization: `Token ${token}` }
      })
    }
    user.value.customer.addresses.splice(index, 1)
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(user.value))
    }, 100)
  } catch (error) {
    console.error('Error deleting address:', error)
  }
}

const updateGouvernorat = (gouv) => {
  options.value = gouv === 'Ariana' ? ['Ariana', 'Raoued', 'Sidi Thabet'] : ['Other']
}
</script>