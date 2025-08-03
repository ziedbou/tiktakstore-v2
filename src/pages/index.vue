<template>
  <DynamicSections :data="pageData?.main_content" :key="dynamicKey" />
</template>

<script setup>
import { ref, reactive, isReactive, onMounted } from 'vue';
import { usePageContent } from '@/composables/usePageContent';
import DynamicSections from '@/components/DynamicSections.vue';
import { useCompanyData } from '@/composables/useCompanyData';
import { useIframeListener } from '@/composables/useIframeListener'; // Assuré que ce composable existe
import { componentMap } from '@/composables/utils/map.js';

const dynamicKey = ref(0);
const isIframed = ref(false);
const { companyData } = useCompanyData();

// Récupération de la page home
const { pageData } = usePageContent('home', true);

// Helper pour rendre une section réactive
const toReactiveSection = (section) => {
  if (!section || !section.slug) return null;
  return isReactive(section) ? section : reactive({ ...section });
};


// Fonction d'ajout d'un composant
const loadComponent = async (componentName, props = {}) => {
  console.log('init load component')
  try {
    const componentModule = await import(`@/components/sections/${componentName}.vue`);
    const component = componentModule.default;

    const sectionData = toReactiveSection(props.data);
    if (!sectionData) {
      console.warn("❌ Section invalide : slug manquant");
      return false;
    }

    if (!pageData.value.main_content) {
      pageData.value.main_content = [];
    }

    pageData.value.main_content = [
      ...pageData.value.main_content,
      sectionData
    ];

    dynamicKey.value++; // force le re-render
    console.log('✅ Composant ajouté avec succès:', componentName);
    return true;
  } catch (err) {
    console.error(`❌ Erreur lors du chargement de ${componentName}:`, err);
    return false;
  }
};

// Listener depuis l'iframe
const { listenForMessages } = useIframeListener(async (_data) => {
  if (_data.event_type === 'add-section') {
    console.log("🧩 Event: add-section");
    const componentName = _data.data.slug_nuxt || componentMap[_data.data.slug] || "EmptySection";
    const section_data = _data.data;
    await loadComponent(componentName, { data: section_data });
  }

  if (_data.event_type === "init-iframe") {
    isIframed.value = true;
  }

  console.log("💬 Message reçu:", _data);
  console.log("🧩 main_content actuel:", pageData.value.main_content);
});

onMounted(() => {
  console.log('----- Chargement initial de pageData:', pageData.value.main_content);
  listenForMessages();
  console.log("*--------- Écouteur iframe actif");
});
</script>
