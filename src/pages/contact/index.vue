<template>
    <div
      class=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
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
          Nous contacter
        </h2>
        <p
          class="text-center text-md tracking-tight text-gray-700"
        >
          Nous apprécions vos commentaires et demandes de renseignements, alors n'hésitez pas à nous contacter.
        </p>
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
          class=" space-y-4"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label
              for="name"
              class="block text-sm/6 font-medium text-gray-900"
              >Nom</label
            >
            <div class="mt-2">
              <input
                v-model="form.name"
                type="text"
                name="name"
                id="name"
                required
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6"
                :class="{ 'border-red-500': errors.name }"
                @input="validateName"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                {{ errors.name }}
              </p>
            </div>
          </div>
  
          <div>
            <label
              for="email"
              class="block text-sm/6 font-medium text-gray-900"
              >Email</label
            >
            <div class="mt-2">
              <input
                v-model="form.email"
                type="email"
                name="email"
                id="email"
                required
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6"
                :class="{ 'border-red-500': errors.email }"
                @input="validateEmail"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>
          </div>
  
          <div>
            <label
              for="message"
              class="block text-sm/6 font-medium text-gray-900"
              >Message</label
            >
            <div class="mt-2">
              <textarea
                v-model="form.message"
                name="message"
                id="message"
                required
                rows="4"
                class="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--btn-primary-outline-border-color)] sm:text-sm/6"
                :class="{ 'border-red-500': errors.message }"
                @input="validateMessage"
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-600">
                {{ errors.message }}
              </p>
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              :disabled="isLoading || hasErrors"
              class="flex w-full justify-center px-3 py-2.5 text-sm/6 font-medium shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 btn-primary-solid disabled:cursor-not-allowed"
            >
              <span v-if="!isLoading">Envoyer</span>
              <span v-else>Traitement en cours...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
</div>
    
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const { companyData, companyId } = useCompanyData();
  
  const companyLogo = ref("");
  if (companyData.value) {
    companyLogo.value = `https://cdn.cloudtiktak.com/${companyData.value.logo}`;
  }
  
  const form = ref({
    name: "",
    email: "",
    message: "",
  });
  const errors = ref({
    name: "",
    email: "",
    message: "",
  });
  const isLoading = ref(false);
  const formError = ref(false);
  const errorMessage = ref("");
  const showSuccess = ref(false);
  const successMessage = ref("");
  
  const hasErrors = computed(() => {
    return Object.values(errors.value).some((error) => error !== "");
  });

  
const seo = {
  title: 'contact',
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

  const validateName = () => {
    if (!form.value.name) {
      errors.value.name = "Le nom est requis.";
    } else if (form.value.name.length < 2) {
      errors.value.name = "Le nom doit contenir au moins 2 caractères.";
    } else {
      errors.value.name = "";
    }
  };
  
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.value.email) {
      errors.value.email = "L'email est requis.";
    } else if (!emailRegex.test(form.value.email)) {
      errors.value.email = "Veuillez entrer un email valide.";
    } else {
      errors.value.email = "";
    }
  };
  
  const validateMessage = () => {
    if (!form.value.message) {
      errors.value.message = "Le message est requis.";
    } else if (form.value.message.length < 10) {
      errors.value.message = "Le message doit contenir au moins 10 caractères.";
    } else {
      errors.value.message = "";
    }
  };
  
  const handleSubmit = async () => {
    validateName();
    validateEmail();
    validateMessage();
  
    if (hasErrors.value) {
      return;
    }
  
    isLoading.value = true;
    formError.value = false;
    errorMessage.value = "";
    showSuccess.value = false;
    successMessage.value = "";
    const config = useRuntimeConfig()
    const baseURL = config.public.baseURL
    try {
      const response = await fetch(
        baseURL + "applications/form-contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            form: {
              email: form.value.email,
              name: form.value.name,
              message: form.value.message,
            },
            company: companyId.value,
          }),
        }
      );
        

      const data = await response.json();
      if (data != false) {
        formError.value = false;
        showSuccess.value = true;
        successMessage.value =
          data.message || "Votre message a été envoyé avec succès !";
        form.value = { name: "", email: "", message: "" };
        setTimeout(() => router.push("/"), 1000);
      } else {
        throw new Error(
          data.message || "Le message n'a pas pu être envoyé. Veuillez réessayer."
        );
      }
    } catch (error) {
      formError.value = true;
      errorMessage.value =
        error.message || "Une erreur s'est produite lors de l'envoi du message.";
    } finally {
      isLoading.value = false;
    }
  };
  </script>