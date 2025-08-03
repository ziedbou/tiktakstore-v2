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
          Réinitialiser votre mot de passe
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div
          v-if="showSuccess"
          class="mb-6 p-4 bg-green-100 text-green-700 rounded-md"
        >
          {{ successMessage }}
        </div>
        <div v-if="formError" class="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {{ errorMessage }}
        </div>

        <form
          v-if="!showSuccess"
          class="space-y-4"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label
              for="new-password"
              class="block text-sm/6 font-medium text-gray-900"
              >Nouveau mot de passe</label
            >
            <div class="mt-2">
              <input
                v-model="newPassword"
                type="password"
                name="new-password"
                id="new-password"
                autocomplete="new-password"
                required
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color-hover)] sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              for="confirm-password"
              class="block text-sm/6 font-medium text-gray-900"
              >Confirmer le mot de passe</label
            >
            <div class="mt-2">
              <input
                v-model="confirmPassword"
                type="password"
                name="confirm-password"
                id="confirm-password"
                autocomplete="new-password"
                required
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color-hover)] sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="flex w-full justify-center px-3 py-2.5 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 btn-primary-solid disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading">Valider</span>
              <span v-else>Traitement en cours...</span>
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
          Vous avez déjà un compte ?
          <NuxtLink
            to="/login"
            class="font-semibold text-[var(--btn-primary-outline-color)] hover:text-[var(--btn-primary-outline-color-hover)]"
            >Se connecter</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const isClient = import.meta.client;
const router = useRouter();
const route = useRoute();
const { companyId, companyData } = useCompanyData();
const config = useRuntimeConfig()
const baseURL = config.public.baseURL
const cdnURL = config.public.cdnURL;
if (isClient) {
  const user = localStorage.getItem("user");
  if (user) {
    router.push("/account");
  }
}

const companyLogo = ref("");
if (companyData.value) {
  companyLogo.value = `${cdnURL}${companyData.value.logo}`;
}

const newPassword = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const formError = ref(false);
const errorMessage = ref("");
const showSuccess = ref(false);
const successMessage = ref("");
const token = ref("");
const username = ref("");

onMounted(() => {
  if (isClient) {
    token.value = route.query.token || "";
    username.value = route.query.username || "";
    if (!token.value || !username.value) {
      formError.value = true;
      errorMessage.value =
        "Lien de réinitialisation invalide. Veuillez vérifier le lien ou demander un nouveau.";
    }
  }
});

const handleSubmit = async () => {
  isLoading.value = true;
  formError.value = false;
  errorMessage.value = "";
  showSuccess.value = false;
  successMessage.value = "";

  if (newPassword.value !== confirmPassword.value) {
    formError.value = true;
    errorMessage.value = "Les mots de passe ne correspondent pas.";
    isLoading.value = false;
    return;
  }

  try {
    const response = await fetch(
      baseURL + "website/reset-password-confirm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword.value,
          confirm_password: confirmPassword.value,
          token: token.value,
          username: username.value,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      formError.value = false;
      showSuccess.value = true;
      successMessage.value =
        data.message ||
        "Votre mot de passe a été réinitialisé avec succès ! Vous pouvez maintenant vous connecter.";
      newPassword.value = "";
      confirmPassword.value = "";
      setTimeout(() => router.push("/login"), 1000);
    } else {
      throw new Error(
        data.message ||
          "Échec de la réinitialisation du mot de passe. Veuillez réessayer."
      );
    }
  } catch (error) {
    formError.value = true;
    errorMessage.value =
      error.message ||
      "Une erreur s'est produite lors de la réinitialisation du mot de passe.";
  } finally {
    isLoading.value = false;
  }
};
</script>
```
