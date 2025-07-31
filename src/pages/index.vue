<template>
  <DynamicSections :data="pageData?.main_content" />
</template>

<script setup>
import { usePageContent } from '@/composables/usePageContent';
import DynamicSections from '@/components/DynamicSections.vue';

// Fetch home page by type (isTypePage defaults to true)
const { pageData } = usePageContent('home',true);

console.log("pageData XXXXXXXXXXXX ", pageData.value, pageData);

// SEO setup
// Test SEO directly on homepage
/*useSeoMeta({
  title: "HOMEPAGE DIRECT SEO TEST - This should show up"
});*/

// Let layout handle SEO for homepage
/*useHead({
  title: "HOMEPAGE TEST TITLE - Should appear in browser tab"
});*/
/*useHead(() => ({
  title: pageData.value?.seo_title || pageData.value?.name || 'Home',
  meta: [
    {
      name: 'description',
      content: pageData.value?.seo_description || pageData.value?.short_description || '',
    },
    {
      property: 'og:title',
      content: pageData.value?.seo_title || pageData.value?.name || 'Home',
    },
    {
      property: 'og:description',
      content: pageData.value?.seo_description || pageData.value?.short_description || '',
    },
    { property: 'og:image', content: pageData.value?.seo_image || '' },
  ],
}));
*/
</script>
