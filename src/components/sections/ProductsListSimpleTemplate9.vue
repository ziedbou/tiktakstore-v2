<!-- ProductGrid.vue -->
<template>
  <div :style="{
    '--product-card-border-radius': data.values.product_card_border_radius+'px',
    '--product-card-border-color': data.values.product_card_border_color,
    '--product-card-border-color-hover': data.values.product_card_border_color_hover,
    '--product-card-bg-color': data.values.product_card_bg_color,
    '--product-card-bg-color-hover': data.values.product_card_bg_color_hover,
    '--product-card-add-to-cart-bg': data.values.product_card_add_to_cart_bg,
    '--product-card-add-to-cart-bg-hover': data.values.product_card_add_to_cart_bg_hover,
    '--product-card-add-to-cart-color': data.values.product_card_add_to_cart_color,
    '--product-card-add-to-cart-color-hover': data.values.product_card_add_to_cart_color_hover,
    '--product-card-add-to-cart-border-color': data.values.product_card_add_to_cart_border_color,
    '--product-card-add-to-cart-border-color-hover': data.values.product_card_add_to_cart_border_color_hover,
  }">
    <h2 class="text-3xl text-center mb-6">{{ data.values.title }}</h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="product in sectionProducts" :key="product.id">
        <component
          :is="dynamicComponent"
          :product="product"
          :image_full="props.data.values.product_card_product_image_full_width"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { fetchSectionProducts } from "~/composables/services/productService";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
});

const sectionProducts = ref([]);
const dynamicComponent = shallowRef(null);
// Load component dynamically
const loadComponent = async (componentName = "ProductCard_3") => {
  try {
    const module = await import(
      `@/components/product-cards/${componentName}.vue`
    );
    dynamicComponent.value = module.default;
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error);
  }
};

const getSectionProducts = async () => {
  sectionProducts.value = await fetchSectionProducts({
    sectionValues: props.data.values,
    companyId: props.companyId,
  });
};

onMounted(() => {
  loadComponent(props.data.values.card_type);
  getSectionProducts();
});

</script>
