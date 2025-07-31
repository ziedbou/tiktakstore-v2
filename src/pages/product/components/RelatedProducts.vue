<template>
  <div v-if="products.length > 0" class="mt-10 border-t max-md:px-4 border-gray-200 pt-8">
    <h3 class="text-lg font-heading font-semibold text-charcoal mb-4">
      Produits dans la même catégorie
    </h3>

    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 animate-pulse">
      <div
        v-for="i in 3"
        :key="i"
        class="border border-gray-200 rounded-lg overflow-hidden bg-white"
      >
        <div class="aspect-square bg-gray-300"></div>
        <div class="p-4 space-y-3">
          <div class="h-5 bg-gray-300 rounded w-3/4"></div>
          <div class="flex justify-between">
            <div class="h-4 bg-gray-300 rounded w-1/3"></div>
            <div class="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
          <div class="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>

    <div v-else class="realtive">
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-3">
        <div v-for="product in products" :key="product.id" class="relative group">
          <component
            :is="dynamicComponent"
            :product="product"
            :image_full="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

export interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
}

defineProps<{
  products: RelatedProduct[];
  loading?: boolean;
}>();


const dynamicComponent = shallowRef(null);

const loadComponent = async (componentName = "ProductCard_12") => {
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
  loadComponent();
})

</script>

<style scoped></style>