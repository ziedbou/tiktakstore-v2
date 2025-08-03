<template>
    <div
      class="flex justify-center flex-col lg:flex-row lg:items-center gap-8"
      :style="{
        '--overlay-color': data.values.overlay_color,
        '--title-2-color': data.values.title_2_color,
        '--description-2-color': data.values.description_2_color,
        '--title-1-color': data.values.title_1_color,
        '--description-color': data.values.description_color,
        '--cta-color': data.values.cta_color,
        '--cta-color-hover': data.values.cta_color_hover,
        '--cta-border-radius': data.values.cta_border_radius + 'px',
        '--cta-background': data.values.cta_background,
        '--cta-background-hover': data.values.cta_background_hover,
      }"
    >
      <!-- Banner Section - Order last on large screens -->
      <div class="lg:w-1/2">
        <div class="relative">
          <NuxtLink
            :to="data.values.link"
            class="block relative overflow-hidden rounded-lg"
          >
            <div class="aspect-[750/800]">
              <NuxtImg
                :src="imghttps(data.values.image_background.image)"
                :alt="data.values.title"
                class="w-full h-full object-cover"
              />
            </div>
  
            <!-- Banner Overlay Content -->
            <div
              class="absolute inset-0 bg-transparent hover:bg-[var(--overlay-color)] bg-opacity-30 flex items-center justify-center transition-all duration-300"
            >
              <div class="text-center p-8">
                <h2
                  class="text-xl md:text-2xl font-medium mb-4 text-[var(--title-2-color)]"
                >
                  {{ data.values.title_2 }}
                </h2>
  
                <div class="text-md mb-6 text-[var(--description-2-color)]">
                  {{ data.values.description_2 }}
                </div>
  
                <NuxtLink
                  v-if="data.values.button_text || data.values.link"
                  :to="data.values.link"
                  class="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--cta-background)] text-[var(--cta-color)] hover:text-[var(--cta-color-hover)] rounded-[var(--cta-border-radius)] font-medium text-sm tracking-wide uppercase overflow-hidden transition-all duration-500 ease-out hover:bg-[var(--cta-background-hover)] hover:shadow-2xl hover:-translate-y-2"
                >
                  <!-- Sliding background effect -->
                  <div
                    class="absolute inset-0 bg-[var(--cta-background-hover)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                  ></div>
  
                  <span class="relative z-20 transition-all duration-300">{{
                    data.values.button_text
                  }}</span>
                  <div class="w-5 h-5 relative overflow-hidden z-20">
                    <svg
                      class="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                    <svg
                      class="w-5 h-5 absolute top-0 -left-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
  
      <!-- Content Section -->
      <div class=" ">
        <div class="text-center mb-8">
          <h2
            class="text-2xl md:text-xl font-medium mb-2 text-[var(--title-1-color)]"
          >
            {{ data.values.title }}
          </h2>
          <p class="text-sm text-[var(--description-color)] max-w-md mx-auto">
            {{ data.values.description }}
          </p>
        </div>
  
        <!-- Product Cards Container -->
        <div class="flex justify-center">
          <div class="max-w-lg w-full">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center">
              <!-- Product cards will be inserted here -->
              <!-- You mentioned you already have product card components -->
              <div v-for="product in sectionProducts" :key="product.id">
                <component
                  :is="dynamicComponent"
                  :product="product"
                  :image_full="
                    props.data.values.product_card_product_image_full_width
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { imghttps } from "~/composables/services/helpers";
  import { useGetProducts } from "~/composables/useGetProducts";
  import { useCompanyData } from "@/composables/useCompanyData";
  const { companyId } = useCompanyData();
  // Props
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    index: {
      type: [String, Number],
      required: true,
    },
  });
  
  const { data: sectionProducts  } = useGetProducts({
    type: "list",
    cacheKey: `ProductsCollection1-${props.index}`,
    companyId: companyId.value,
    productList: {
      products_ids: [props.data.values.product_1, props.data.values.product_2,props.data.values.product_3],
    },
  });
  
  const dynamicComponent = shallowRef(null);
  // Load component dynamically
  const loadComponent = async (componentName = "ProductCard_11") => {
    try {
      const module = await import(
        `@/components/product-cards/${componentName}.vue`
      );
      dynamicComponent.value = module.default;
    } catch (error) {
      console.error(`Failed to load component: ${componentName}`, error);
    }
  };
  
  onMounted(() => {
    loadComponent("ProductCard_11");
  });
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  