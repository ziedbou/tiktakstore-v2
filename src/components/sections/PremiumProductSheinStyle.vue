<template>
  <section class="section-shein-list-product-section">
    <h3 class="text-2xl font-medium">{{ data.values.title }}</h3>
    <div class="product-gallery">
      <ProductCard_14
        v-for="product in sectionProducts"
        :key="product.id"
        :product="product"
        :image_full="true"
      />
    </div>
  </section>
</template>

<script setup>
import { useGetProducts } from "~/composables/useGetProducts";
import { useCompanyData } from '@/composables/useCompanyData';
import ProductCard_14 from '~/components/product-cards/ProductCard_14.vue';

const { companyId } = useCompanyData();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: [String, Number],
})

// Use the new hook to fetch section products with caching
const { data: sectionProducts, pending } = useGetProducts({
  type: 'list',
  cacheKey: `PremiumProductSheinStyle-${props.index}`,
  companyId: companyId.value,
  productList: props.data.values.products_list
});
</script>

<style scoped>
h3 a {
  font-weight: bold;
}

p {
  font-weight: 400;
}

/* Product Gallery */
.product-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-gallery {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .product-gallery {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
