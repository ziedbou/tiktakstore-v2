<template>
  <DynamicSectionsSkeleton v-if="loading" />
  <template v-else>
    <section
      v-for="(item, index) in componentsList"
      :key="index"
      :id="item.props.data.id"
      :class="item.props.data.design.class"
      :style="{
        marginTop: item.props.data.design.margin_top + 'px' || 0,
        marginBottom: item.props.data.design.margin_bottom + 'px' || 0,
        paddingTop: item.props.data.design.padding_top + 'px' || 0,
        paddingBottom: item.props.data.design.padding_bottom + 'px' || 0,
        ...(item.props.data.design.background_color
          ? { backgroundColor: item.props.data.design.background_color }
          : {}),
        ...(item.props.data.design.background_image &&
        item.props.data.design.background_image.image
          ? {
              backgroundImage: `url(${item.props.data.design.background_image.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }
          : {}),
      }"
    >
      <component
        v-if="item.component"
        :is="item.component"
        v-bind="item.props"
        :class="item.props.data.design.container || ''"
        :companyId="item.companyId"
      />
      <div v-else>Component not found</div>
    </section>
  </template>
</template>

<script setup>
import { ref, shallowRef } from "vue";
import { componentMap } from "@/composables/utils/map.js";

const { companyData } = useCompanyData();

// State variables
const componentsList = shallowRef([]);
const loading = ref(true);

const { data } = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const pageData = ref(toRaw(data));

const loadComponent = async (componentName, props = {}) => {
  try {
    const componentModule = await import(
      `@/components/sections/${componentName}.vue`
    );
    const component = componentModule.default;
    console.log("companyData.value : ",companyData.value)
    componentsList.value = [
      ...componentsList.value,
      {
        component,
        props,
        companyId: companyData.value.id,
        currency: companyData.value.currency,
      },
    ];

    return true;
  } catch (err) {
    console.error(`Error loading component ${componentName}:`, err);
    return false;
  }
};

// Load all page components
const loadPageComponents = async () => {
  if (pageData.value && pageData.value && Array.isArray(pageData.value)) {
    // Reset components list to ensure clean state
    componentsList.value = [];

    // Sequential loading - one by one to preserve order
    for (const section of pageData.value) {
      if (section.active && section.slug) {
        console.log("section.slug : ",section.slug)
        // Map the API slug to the component name using componentMap
        const mappedComponentName = componentMap[section.slug];
        console.log("mappedComponentName : ",mappedComponentName)
        if (mappedComponentName) {
        console.log("mappedComponentName : ",mappedComponentName)
          try {
            await loadComponent(mappedComponentName, { data: section });
            console.log(`Loaded component: ${mappedComponentName} for slug: ${section.slug}`);
          } catch (err) {
            console.error(`Failed to load section ${section.slug}:`, err);
          }
        } else {
          console.warn(`No component mapping found for slug: ${section.slug}`);
        }
      }
    }
    loading.value = false;
  } else {
    loading.value = false;
  }
};

// Watch for pageData to become available, then load components
watch(
  pageData,
  async (newPageData) => {
    if (newPageData?.length > 0) {
      await loadPageComponents();
    }
  },
  { immediate: true }
);
</script>