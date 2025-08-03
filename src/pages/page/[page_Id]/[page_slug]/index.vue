<template>
  <DynamicSections v-if="pageData" :data="pageData.main_content || []" />
  <DynamicSectionsSkeleton v-else-if="!error" />
  <div v-else class="text-center p-8">
    <p>Failed to load page content. Please try again later.</p>
  </div>
</template>

<script setup>
  import { watch } from "vue";
import { usePageContent } from '@/composables/usePageContent';
import DynamicSections from '@/components/DynamicSections.vue';
import DynamicSectionsSkeleton from '@/components/DynamicSectionsSkeleton.vue';

const route = useRoute();
const router = useRouter();
const pageId = route.params.page_Id;

// Fetch page by ID using usePageContent composable
const { pageData, error } = usePageContent(
  pageId,           // Page ID
  false,            // isTypePage = false (fetch by ID, not by type)
  { 
    lazy: false,    // Load immediately
    default: () => null, // Provide default value
  }
);

// Check if page is active and of type "landing", redirect to 404 if not
watch(pageData, (newPageData) => {
  if (newPageData && (!newPageData.active /*|| newPageData.page_type !== "content"*/)) {
    router.push("/404");
    // console.log("Page is not active");
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