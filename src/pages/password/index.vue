<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12"
  >
    <div class="text-center max-w-lg mx-auto">
      <!-- TikTak Pro Logo -->
      <div class="mb-8">
        <NuxtImg
          class="mx-auto h-auto max-w-82 w-full"
          src="https://api.tiktak.space/media/media/logo-tiktak-pro.svg"
          alt="TikTak Pro"
        />
      </div>

      <!-- Main Heading -->
      <h1 class="text-4xl font-extralight text-gray-900 mb-6">Accès protégé</h1>

      <!-- Subtitle -->
      <p class="text-gray-600 text-lg leading-relaxed mb-3">
        La boutique <span class="font-bold text-gray-800">{{ companyData?.name }}</span> est protégée par mot de passe.      
      </p>
      <p class="text-gray-400 text-base mb-8">
          Entrez le mot de passe pour accéder à la boutique.
        </p>
      <!-- Password Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Password Input -->
        <div class="relative">
          <input
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:border-[var(--btn-primary-outline-border-color)] bg-white transition-colors duration-200 outline-none"
            placeholder="Entrez le mot de passe"
            required
          />
          <button
            type="button"
            @click.prevent="togglePassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 z-10"
          >
            <Eye v-if="!showPassword" class="w-5 h-5" />
            <EyeOff v-else class="w-5 h-5" />
          </button>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="btn-primary-solid w-full font-medium py-3 px-6 flex items-center justify-center gap-2 disabled:!cursor-not-allowed"
        >
          <!-- Loading Spinner -->
          <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
          <span>{{
            isLoading ? "Vérification..." : "Accéder à la boutique"
          }}</span>
        </button>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3"
        >
          {{ "errorMessage" }}
        </div>
      </form>

      <!-- Store Owner Link -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <p class="text-gray-600 text-base">
          Êtes-vous le propriétaire de la boutique ?
          <a
            href="https://tiktak.space/"
            class="text-blue-600 hover:text-blue-700 underline"
          >
            Se connecter ici
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Eye, EyeOff, Loader2 } from "lucide-vue-next";
import { useCompanyData } from "@/composables/useCompanyData";

// Get company data
const { companyData } = useCompanyData();

// Reactive data

const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
  if (!password.value.trim()) {
    errorMessage.value = "Veuillez entrer le mot de passe";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Here you would typically validate the password with your backend
    // For now, we'll just simulate a successful login

    // Redirect or handle successful login
    // await navigateTo('/dashboard')
  } catch (error) {
    errorMessage.value = "Mot de passe incorrect. Veuillez réessayer.";
  } finally {
    isLoading.value = false;
  }
};

// Set page meta
useHead({
  title: "Accès protégé - TikTak Pro",
  meta: [
    {
      name: "description",
      content:
        "Page d'accès protégé par mot de passe pour la boutique TikTak Pro.",
    },
  ],
});
</script>
