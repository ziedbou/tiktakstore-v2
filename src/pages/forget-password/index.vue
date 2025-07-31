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
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Réinitialiser le mot de passe du compte
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div
        v-if="showSuccess"
        class="mb-6 p-4 bg-green-100 text-green-700 rounded-md"
      >
        {{ successMessage }}
      </div>
      <div
        v-if="loginFormError"
        class="mb-6 p-4 bg-red-100 text-red-700 rounded-md"
      >
        {{ errorMessage }}
      </div>

      <form
        v-if="!showSuccess"
        class=" space-y-4"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Adresse email</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              required
              class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Envoyer</span>
            <span v-else>Envoi en cours...</span>
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Vous avez déjà un compte ?
        <NuxtLink
          to="/login"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
          >Se connecter</NuxtLink
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
const { companyId, companyData } = useCompanyData();

if (isClient) {
  const user = localStorage.getItem("user");
  if (user) {
    router.push("/account");
  }
}

const companyLogo = ref("");
if (companyData.value) {
  companyLogo.value = `https://cdn.cloudtiktak.com/${companyData.value.logo}`;
}

const email = ref("");
const isLoading = ref(false);
const loginFormError = ref(false);
const errorMessage = ref("");
const showSuccess = ref(false);
const successMessage = ref("");

const handleSubmit = async () => {
  isLoading.value = true;
  loginFormError.value = false;
  errorMessage.value = "";
  showSuccess.value = false;
  successMessage.value = "";
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL
  try {
    const response = await fetch(
      baseURL + "website/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          company_id: companyId.value,
          website: window.location.origin.split("/")[2],
          // website: "belvie.tn",
        }),
      }
    );

    if (response.ok) {
      const text = await response.text();
      loginFormError.value = false;
      showSuccess.value = true;
      successMessage.value =
        "Un e-mail de réinitialisation du mot de passe a été envoyé avec succès ! Veuillez vérifier votre boîte de réception.";
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          "Échec de la demande de réinitialisation du mot de passe. Veuillez réessayer."
      );
    }
  } catch (error) {
    loginFormError.value = true;
    errorMessage.value =
      error.message ||
      "Une erreur s'est produite lors de la demande de réinitialisation du mot de passe.";
  } finally {
    isLoading.value = false;
  }
};
</script>
