<template>
  <div>
    <!-- Afficher un message de chargement -->
    <div v-if="loading">Chargement en cours...</div>

    <!-- Afficher un message d'erreur -->
    <div v-if="error" style="color: red">
      Une erreur s'est produite : {{ error }}
    </div>

    <!-- Afficher les composants dynamiques -->
    <section
      v-for="(item, index) in componentsList"
      :key="index"
      :style="{
        marginTop: item.props.data.design.margin_top + 'px',
        marginBottom: item.props.data.design.margin_bottom + 'px',
        paddingTop: item.props.data.design.padding_top + 'px',
        paddingBottom: item.props.data.design.padding_bottom + 'px',
        ...(item.props.data.design.background_color ? { backgroundColor: item.props.data.design.background_color } : {}),
        ...(item.props.data.design.background_image && item.props.data.design.background_image.image ? {
          backgroundImage: `url(${item.props.data.design.background_image.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        } : {})
      }"
    >
      <component
        :is="item.component"
        v-bind="item.props"
         :class="item.props.data.design.container || ''"
      />
    </section>
    <pre>
    {{ section?.default_response }}
      
    </pre>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "#imports"; // Utilisez useRoute de Nuxt 3

// Définir le layout à utiliser (si nécessaire)
definePageMeta({
  layout: "empty", // Utilise le layout `empty.vue`
});

const route = useRoute();
const componentsList = ref([]);
const config = useRuntimeConfig();
const baseURL = config.public.baseURL;

const slug = route.params.slug;
const loading = ref(true);
const error = ref(null);
const section = ref(null);

// Fonction pour charger un composant dynamiquement
const loadComponent = async (componentName, props = {}) => {
  try {
    // Charge le composant dynamiquement
    const componentModule = await import(
      `@/components/sections/${componentName}.vue`
    );
    const component = componentModule.default;

    // Ajoute le composant à la liste
    componentsList.value.push({
      component,
      props,
    });

  } catch (err) {
    console.error(
      `Erreur lors du chargement du composant ${componentName}:`,
      err
    );
    throw err; // Propager l'erreur pour la gestion globale
  }
};

// Charge les composants initiaux dynamiquement
const loadInitialComponents = async (componentName, props) => {
  await loadComponent(componentName, props);
};

// Démarre l'écoute des messages et charge les composants initiaux
onMounted(async () => {
  try {
    // Appel API pour récupérer les données
    const response = await $fetch(
      baseURL + "website/sections-forms/?slug_nuxt=" + slug
    );
    section.value = response[0];

    // Charge le composant dynamiquement avec les données de l'API
    if (section.value && section.value.slug_nuxt) {
      // console.log( '', section.value.default_response,"55555555")
      await loadInitialComponents(section.value.slug_nuxt, {
        data: section.value.default_response,
      });
    } else {
      throw new Error("Aucune section trouvée ou slug_nuxt manquant.");
    }
  } catch (err) {
    error.value = err.message;
    console.error("Erreur lors du chargement des composants :", err);
  } finally {
    loading.value = false;
  }
});
</script>

<style>
pre {
  padding: 20px;
  margin: 20px;
  background: #2b2b2b;
  color: #fff;
  border-radius: 20px;
  white-space: pre-wrap;
}
</style>
