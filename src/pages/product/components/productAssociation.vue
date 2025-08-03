<template>
  <div class="mb-10 md:mb-5">
    <h2 class="font-medium mb-4 md:mb-3">{{ associated_products?.name }}</h2>
    <div class="product-association mx-auto">
      <NuxtLink
        v-for="dec in associated_products?.products"
        :key="dec.id"
        :to="getProductLink(dec)"
        class=" transition-opacity duration-1000 hover:opacity-75"
        :class="{ 'ring-2 ring-[var(--btn-primary-outline-border-color-hover)] ring-offset-2': product.id === dec.id }"
        data-toggle="tooltip"
        data-placement="top"
        :title="`Sélectionnez ${dec.name}`"
      >
        <img
          :src="imghttps(dec.photo_thumb || dec.photo)"
          :alt="product.name"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getProductLink, imghttps } from '~/composables/services/helpers';
import { NuxtLink } from '#components';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (product) => {
      return 'id' in product && 'name' in product && 'has_associtation' in product;
    },
  },

});

const { companyId } = useCompanyData()
const associated_products = ref(null);

const config = useRuntimeConfig();
const baseURL = config.public.baseURL;

const fetchAssociatedProducts = async () => {
  if (props.product?.has_associtation && companyId.value) {
    try {
      const response = await axios.get(
        `${baseURL}associated-products-search-read/${props.product.id}/${companyId.value}`
      );
      associated_products.value = response.data;
    } catch (error) {
      console.error('Error fetching associated products:', error);
    }
  }
};

onMounted(() => {
  fetchAssociatedProducts();
});
</script>

<style scoped>

.product-association {
  padding-top: 0.2rem;
  margin-bottom: 1.6rem;
  display: flex;
  flex-wrap: wrap;
  row-gap: 6px;
  justify-content: center;
}

.product-association a {
  display: flex;
  align-items: center;
  max-width: 80px;
  min-width: _0px;
  height: 80px;
  margin-right: 10px;
  border: 0.5px solid #fff;
  transition: box-shadow 0.35s ease;
  border-radius: 7px;
}

.product-association a:last-child {
  margin-right: 0;
}

.product-association img {
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 7px;
  width: 100%;
  height: 100%;
}


</style>