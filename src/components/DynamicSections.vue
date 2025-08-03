<template>
  <DynamicSectionsSkeleton v-if="loading" />
  <template v-else>
    <section
      v-for="(item, index) in componentsList"
      :key="index"
      :id="item.props.data?.id"
      :class="item.props.data?.design?.class"
      :style="getSectionStyle(item.props.data?.design)"
    >
      <component
        v-if="item.component"
        :is="item.component"
        v-bind="item.props"
        :class="item.props.data?.design?.container || ''"
        :companyId="item.companyId"
        :index="index"
      />
      <div v-else>Component not found</div>
    </section>
  </template>
</template>

<script setup>
import { ref, shallowRef, watch } from 'vue';
import { componentMap } from '@/composables/utils/map.js';
import DynamicSectionsSkeleton from '@/components/DynamicSectionsSkeleton.vue';
import { useCompanyData } from '@/composables/useCompanyData';

const { companyData } = useCompanyData();

// Props
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

// State
const componentsList = shallowRef([]);
const loading = ref(true);
const pageData = ref([...props.data]);

// Utilitaire pour convertir px
const toPx = (val) => {
  if (!val || isNaN(val)) return '0px';
  return `${parseInt(val)}px`;
};
// Utilitaire pour construire les styles dynamiques
const getSectionStyle = (design = {}) => {
  return {
    marginTop: toPx(design.margin_top),
    marginBottom: toPx(design.margin_bottom),
    paddingTop: toPx(design.padding_top),
    paddingBottom: toPx(design.padding_bottom),
    ...(design.background_color ? { backgroundColor: design.background_color } : {}),
    ...(design.background_image?.image
      ? {
          backgroundImage: `url(${design.background_image.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }
      : {}),
  };
};

// Fonction pour importer un composant dynamiquement
const loadComponent = async (componentName, props = {}) => {
  try {
    const componentModule = await import(`@/components/sections/${componentName}.vue`);
    const component = componentModule.default;

    componentsList.value.push({
      component,
      props,
      companyId: companyData.value.id,
      currency: companyData.value.currency,
    });

    return true;
  } catch (err) {
    console.error(`Erreur lors du chargement de ${componentName}:`, err);
    return false;
  }
};

// Chargement de toutes les sections
const loadPageComponents = async (sections) => {
  for (const section of sections) {
    if (section.slug) {
      const componentName = componentMap[section.slug];
      if (componentName) {
        await loadComponent(componentName, { data: section });
      } else {
        console.warn(`Aucun composant trouvé pour le slug : ${section.slug}`);
      }
    }
  }
  loading.value = false;
};


// Lancement initial
watch(
  () => props.data,
  async (newData) => {
    if (Array.isArray(newData) && newData.length > 0) {
      componentsList.value = [];
      await loadPageComponents(newData);
    } else {
      loading.value = false;
    }
  },
  { immediate: true, deep: true }
);

</script>
