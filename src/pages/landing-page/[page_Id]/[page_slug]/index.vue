<template>
  <DynamicSections :data="pageData?.main_content || []" />
</template>

<script setup>
import { watch } from "vue";
import { usePageContent } from '@/composables/usePageContent';
import DynamicSections from '@/components/DynamicSections.vue';

const route = useRoute();
const router = useRouter();
const pageId = route.params.page_Id;

// Fetch landing page by ID - much simpler API!
const { pageData } = usePageContent(
  pageId,           // Page ID
  false,            // isTypePage = false (fetch by ID, not by type)
  { 
    lazy: false,    // Load immediately
    server: true    // Enable SSR
  }
);

// Check if page is active and of type "landing", redirect to 404 if not
watch(pageData, (newPageData) => {
  if (newPageData && (!newPageData.active || newPageData.page_type !== "landing")) {
    router.push("/404");
  } 
}, { immediate: true });

// Set SEO meta tags based on the API response
useHead(() => ({
  title: pageData.value?.seo_title || pageData.value?.name || "Page",
  meta: [
    {
      name: "description",
      content:
        pageData.value?.seo_description ||
        pageData.value?.short_description ||
        "",
    },
    {
      property: "og:title",
      content: pageData.value?.seo_title || pageData.value?.name || "Page",
    },
    {
      property: "og:description",
      content:
        pageData.value?.seo_description ||
        pageData.value?.short_description ||
        "",
    },
    { property: "og:image", content: pageData.value?.seo_image || "" },
    { property: "og:url", content: route.fullPath },
  ],
}));


</script>
