<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
  <div class=" max-md:w-full md:w-[450px]  mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6">

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        v-if="companyLogo"
        :src="companyLogo"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl/9 font-medium tracking-tight text-gray-900"
      >
        Connectez-vous à votre compte
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div
        v-if="loginFormError"
        class="mb-6 p-4 bg-red-100 text-red-700 rounded-md"
      >
        {{ errorMessage }}
      </div>

      <form
        class="space-y-4"
        @submit.prevent="login()"
      >
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Adresse email</label
          >
          <div class="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              v-model="loginForm.email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color-hover)] sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm/6 font-medium text-gray-900"
            >Mot de passe</label
          >
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              v-model="loginForm.password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color-hover)] sm:text-sm/6"
            />
          </div>
        </div>
        <div class="flex items-center justify-end">
          <div class="text-sm">
            <NuxtLink
              to="/forget-password"
              class="font-medium text-[var(--btn-primary-outline-color)] hover:text-[var(--btn-primary-outline-color-hover)]"
              >Mot de passe oublié?</NuxtLink
            >
          </div>
        </div>
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full justify-center px-3 py-2.5 text-sm/6 font-medium shadow-xs btn-primary-solid disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
            <span v-else>Connexion</span>
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Vous n'êtes pas membre ?
        <NuxtLink
          to="/register"
          class="font-medium text-[var(--btn-primary-outline-color)] hover:text-[var(--btn-primary-outline-color-hover)]"
          >S'inscrire</NuxtLink 
        >
      </p>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const isClient = import.meta.client;
const router = useRouter();
const { companyId } = useCompanyData();
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
const cdnUrl = config.public.cdnURL
if (isClient) {
  const user = localStorage.getItem("user");
  if (user) {
    router.push("/account");
  }
}

const { companyData } = useCompanyData();

const companyLogo = ref("");
if (companyData.value) {
  companyLogo.value = cdnUrl + companyData.value.logo;
}

const loginFormError = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);

const loginForm = ref({
  username: "",
  email: "",
  password: "",
});

const seo = {
  title: 'Page de connexion ' + companyData.value?.name,
  description: '',
  image: '',
  url: useFullUrl(),
};

useHead({
  title: seo.title,
  meta: [
    { name: 'description', content: seo.description },
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:image', content: seo.image },
    { property: 'og:url', content: seo.url },
    { name: 'twitter:title', content: seo.title },

  ]
});


const login = async () => {
  isLoading.value = true;
  loginForm.value.username = `${loginForm.value.email}_${companyId.value}`;
  loginFormError.value = false;
  errorMessage.value = "";

  try {
    const response = await $fetch(
      baseURL + "auth/login/",
      {
        method: "POST",
        body: loginForm.value,
      }
    );

    if (isClient) {
      const user = response.user;
      const token = response.key;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("_token", token);
      
      // Sync wishlist from API after login
      const { syncWishlistFromApi } = useWishlist()
      await syncWishlistFromApi()
      
      router.push("/account");
    }
  } catch (error) {
    loginFormError.value = true;
    // console.log(JSON.stringify(Object.keys(error.response._data)));
    if (error.response?.status === 400) {
      errorMessage.value =
        error.response._data[Object.keys(error.response._data)[0]][0];
    } else {
      errorMessage.value =
        error.data?.errors?.join(" ") || "Échec de connexion";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
