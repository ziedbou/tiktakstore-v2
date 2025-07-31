<template>
  <section class="section-shein-list-product-section">
    <h3>{{ data.values.title }}</h3>
  <div class="product-gallery">
 
  <div
    class="product-card"
    v-for="product in sectionProducts"
    :key="product.id"
  >
    <div class="product-image">
      <NuxtLink :to="getProductLink(product)">
        <img :src="imghttps(product.photo)" :alt="product.name" />
      </NuxtLink>
    </div>
    <div class="product-info">  
      <h3 class="product-name">
        <NuxtLink :to="getProductLink(product)">
          {{ product.name }}
        </NuxtLink>
      </h3>
      <p>{{ product?._category?.name }}</p>
      <div class="product-price-cart">
        <span class="product-price">
          <span
            v-if="product.discount"
            class="original-price old-price"
            style="margin-right: 5px"
          >
            {{ product.price }}
          </span>
          {{ getPrice(product) }} 
        </span>

        <button
          v-if="!product.declinaison"
          class="add-to-cart-btn"
          @click="addToCartThisProduct(1, $event, product)"
        >
          <CartIcon />
        </button>

        <NuxtLink
          v-if="product.declinaison"
          class="add-to-cart-btn"
          :to="getProductLink(product)"
        >
          <CartIcon />
        </NuxtLink>
      </div>
    </div>
  </div>
</div>

  </section>
</template>

 
<script setup>
import { ref, onMounted } from 'vue'
import { fetchSectionProducts } from '~/composables/services/productService'
import { getProductLink, getPrice, imghttps } from '~/composables/services/helpers'

const sectionProducts = ref([])

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
})

const getSectionProducts = async () => {
  sectionProducts.value = await fetchSectionProducts({
    sectionValues: props.data.values,
    companyId: props.companyId,
    })
}

onMounted(() => {
  getSectionProducts()
})
</script>

 



<style scoped>

h3 a{
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

/* Product Card */
.product-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

/* Product Image */
.product-image {
  position: relative;
  padding-bottom: 133%;
  overflow: hidden;
}
.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.product-card:hover .product-image img {
  transform: scale(1.05);
}

/* Product Info */
.product-info {
  padding: 12px 15px;
}
.product-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

/* Price and Add to Cart Button */
.product-price-cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.product-price {
  font-size: 16px;
  font-weight: 600;
  color: #111;
}
.add-to-cart-btn {
  background-color: transparent;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}
.add-to-cart-btn:hover {
  background-color: #f0f0f0;
}
.add-to-cart-btn svg {
  width: 20px;
  height: 20px;
  color: #333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-gallery {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }

  .product-name {
    font-size: 13px;
    height: 36px;
  }

  .product-price {
    font-size: 14px;
  }

  .add-to-cart-btn {
    width: 32px;
    height: 32px;
  }
}
@media (max-width: 480px) {
  .product-gallery {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .product-info {
    padding: 8px 10px;
  }

  .product-name {
    margin-bottom: 8px;
  }
}
</style>
