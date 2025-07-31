<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  <div class=" max-md:w-full md:w-[600px]  mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6">
      <div class="sm:mx-auto sm:w-full sm:max-w-lg">
        <img class="mx-auto h-10 w-auto" v-if="companyLogo" :src="companyLogo" alt="Your Company" />

        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Créer un compte
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
    
        <div v-if="submitError" class="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{{ submitError }}</div>
        <form class="space-y-4" @submit.prevent="register">


          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="first_name" class="block text-sm/6 font-medium text-gray-900">Prénom</label>
              <div class="mt-2">
                <input
                  id="first_name"
                  v-model="signUpForm.first_name"
                  type="text"
                  class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  :class="{ 'outline-red-600': errors.first_name }"
                />
                <p v-if="errors.first_name" class="mt-1 text-sm text-red-600">{{ errors.first_name }}</p>
              </div>
            </div>
            <div>
              <label for="last_name" class="block text-sm/6 font-medium text-gray-900">Nom de famille</label>
              <div class="mt-2">
                <input
                  id="last_name"
                  v-model="signUpForm.last_name"
                  type="text"
                  class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  :class="{ 'outline-red-600': errors.last_name }"
                />
                <p v-if="errors.last_name" class="mt-1 text-sm text-red-600">{{ errors.last_name }}</p>
              </div>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Adresse e-mail</label>
            <div class="mt-2">
              <input
                id="email"
                v-model="signUpForm.email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                :class="{ 'outline-red-600': errors.email }"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="phone" class="block text-sm/6 font-medium text-gray-900">Téléphone</label>
              <div class="mt-2">
                <input
                  id="phone"
                  v-model="signUpForm.phone"
                  type="text"
                  class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  :class="{ 'outline-red-600': errors.phone }"
                />
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
              </div>
            </div>
            <div>
              <label for="phone_extra" class="block text-sm/6 font-medium text-gray-900">Téléphone supplémentaire</label>
              <div class="mt-2">
                <input
                  id="phone_extra"
                  v-model="signUpForm.phone_extra"
                  type="text"
                  class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="password" class="block text-sm/6 font-medium text-gray-900">Mot de passe</label>
              <div class="mt-2">
                <input
                  id="password"
                  v-model="signUpForm.password"
                  type="password"
                  autocomplete="new-password"
                  class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  :class="{ 'outline-red-600': errors.password }"
                />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
              </div>
            </div>
            <div>
              <label for="password2" class="block text-sm/6 font-medium text-gray-900">Confirmer le mot de passe</label>
              <div class="mt-2">
                <input
                  id="password2"
                  v-model="signUpForm.password2"
                  type="password"
                  autocomplete="new-password"
                  class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  :class="{ 'outline-red-600': errors.password2 }"
                />
                <p v-if="errors.password2" class="mt-1 text-sm text-red-600">{{ errors.password2 }}</p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            >
              {{ isSubmitting ? 'Inscription en cours...' : 'S\'inscrire' }}
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
          Vous avez déjà un compte ?
          <NuxtLink to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500">Se connecter</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const  {companyId, companyData} = useCompanyData()
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
const cdnURL = config.public.cdnURL;

const companyLogo = ref('')
if (companyData.value) {
  companyLogo.value = cdnURL + companyData.value.logo
}

const router = useRouter();

const isClient = import.meta.client
if (isClient) {
  const user = localStorage.getItem('user');
  if (user) {
    router.push('/account');
  }
}


const signUpForm = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  phone_extra: '',
  password: '',
  password2: '',
  profile: false,
  username: '',
  company: companyId.value,
  code_tva: null,
});

const errors = ref({});
const submitError = ref('');
const isSubmitting = ref(false);

const validateForm = () => {
  const newErrors = {};
  if (!signUpForm.value.first_name.trim()) newErrors.first_name = 'Le prénom est requis';
  if (!signUpForm.value.last_name.trim()) newErrors.last_name = 'Le nom de famille est requis';
  if (!signUpForm.value.phone.match(/^\+?\d{7,}$/)) newErrors.phone = 'Numéro de téléphone invalide';
  if (signUpForm.value.password !== signUpForm.value.password2) newErrors.password2 = 'Les mots de passe ne correspondent pas';
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const register = async () => {
  submitError.value = '';
  if (!validateForm()) return;

  isSubmitting.value = true;
  const submitData = {
    ...signUpForm.value,
    username: `${signUpForm.value.email}_${signUpForm.value.company}`,
    code_tva: 0,
    company: signUpForm.value.company,
  };

  try {
    const data = await $fetch(baseURL + 'register-user', {
      method: 'POST',
      body: submitData,
    });

    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('user_id', data.id);
      localStorage.setItem('_token', data.token);
      router.push('/account');
    }
  } catch (error) {
    if (error.response?.status === 400) {
      submitError.value = error.response._data[Object.keys(error.response._data)[0]][0] ;
    } else {
      submitError.value = error.data?.errors?.join(' ') || 'Échec de l\'inscription';
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>