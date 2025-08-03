<template>
  <section class="DealsOutlet-section">
    <div class="">
      <div class="deal-container">
        <!-- Section Header -->
        <div class="heading text-center">
          <h2 class="title">{{ data.values.section_title }}</h2>
          <p class="title-desc">{{ data.values.section_subtitle }}</p>
        </div>

        <div class="parent-row">
          <!-- Main Deal Column -->
          <div class="col-lg-6 deal-col">
            <div class="deal min-h-[550px] !bg-red-400 md:min-h-[300px] ">
              <img 
                class="cover" 
                :src="!mainProduct ? imghttps(mainProduct?.photo) : imghttps(data.values.image?.image)"
                :alt="mainProduct?.name || 'Deal image'"
                v-if="mainProduct || data.values.image?.image"
              />
              
              <div class="deal-top detal-up">
                <h2>{{ data.values.title_1 }}</h2>
                <h4>{{ data.values.title_2 }}</h4>
              </div>

              <div class="deal-content detal-up" v-if="mainProduct">
                <h3 class="product-title">
                  <NuxtLink :to="getProductLink(mainProduct)">
                    {{ mainProduct.name }}
                  </NuxtLink>
                </h3>

                <div class="product-price">
                  <span class="new-price">{{ getPrice(mainProduct) }} {{ companyData?.currency }} </span>
                  <span class="old-price" v-if="mainProduct.discount">
                    {{ mainProduct.price }} {{ companyData?.currency }} 
                  </span>
                </div>

                <NuxtLink :to="getProductLink(mainProduct)" class="btn btn-link flex flex-row gap-6">
                  <span>Voir detail 
                  </span>
                  <MoveRight />
                </NuxtLink>
                <div class="deal-bottom detal-up">
                  <div class="deal-countdown" :data-until="countdownTime">
                    <div class="countdown-display">
                      <div class="time-unit">
                        <span class="time-value">{{ countdown.days }}</span>
                        <span class="time-label">day</span>
                      </div>
                      <div class="time-unit">
                        <span class="time-value">{{ countdown.hours }}</span>
                        <span class="time-label">hours</span>
                      </div>
                      <div class="time-unit">
                        <span class="time-value">{{ countdown.minutes }}</span>
                        <span class="time-label">minutes</span>
                      </div>
                      <div class="time-unit">
                        <span class="time-value">{{ countdown.seconds }}</span>
                        <span class="time-label">seconds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Side Products Column -->
          <div class="col-lg-6 ">
            <div class="products ">
              <div class="row  h-full">
                <div v-for="product in sideProducts" :key="product.id">
                   <div class="product_cart shadow-[0_0_10px_#11111120] hover:shadow-[0_0_14px_#11111140]  h-full flex flex-col group relative overflow-hidden hover:-translate-y-3 transition-all duration-300">
                    <NuxtLink :to="getProductLink(product)" :class="[image_full ? 'p-0' : 'p-2 pb-0', 'relative flex']">
                        <img :src="imghttps(product.photo)" :alt="product.name" :style="{ borderRadius: image_full ? '0' : 'var(--product-card-border-radius ,5px)' }" class="relative aspect-square w-full object-cover lg:aspect-auto lg:h-80" />
                        <Tags
                          :product="product"
                          :outOfStockTagClass="image_full ? 'top-2.5 left-2.5' : 'top-4 left-4'"
                          :promoTagClass="image_full ? 'bottom-2.5 right-2.5' : 'bottom-2 right-4'"
                        />
                    </NuxtLink>
                    <div class="flex justify-between items-center p-2">
                      <div class="max-w-[70%]">
                        <h3 class="text-sm text-gray-700">
                          <NuxtLink :to="getProductLink(product)">
                            {{ product.name }}
                          </NuxtLink>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500" v-if="product?._category">
                          <NuxtLink :to="getCategoryLink(product)">
                            {{ product?._category?.name }}
                          </NuxtLink>
                          <span v-if="product.collection"> - {{ product.collection }}</span>
                        </p>
                      </div>
                      <p class="text-sm font-medium text-gray-900 flex flex-col items-end">
                        <span>{{ getPrice(product) }} {{ /*company.currency*/ "TND" }}</span>
                        <span v-if="product.discount" class="line-through text-xs text-gray-400">{{ product.price }} {{ /*company.currency*/ "TND" }}</span>
                      </p>
                    </div>
                    <div class="mt-auto py-3 w-full flex justify-center flex-1">
                      <button 
                      @click="addToCart(product)"
                        class="w-[80%] bg-white h-fit  mt-auto px-4 py-3 text-sm font-medium text-gray-900 hover:text-white border border-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all duration-300"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>

        <!-- More Button -->
        <div class="more-container text-center mb-0">
          <NuxtLink 
            :to="data.values.link_widget" 
            class="btn btn-outline-dark-2 btn-round btn-more"
          >
            <span>{{ data.values.buttom_text }}</span>
            <MoveRight />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { fetchSectionProducts } from '~/composables/services/productService'
import { getProductLink, getPrice, imghttps, getCategoryLink } from '~/composables/services/helpers'
import Tags from '../product-cards/product-tags/Tags.vue'
import { addToCart } from '~/composables/services/cartService'
import { MoveRight } from 'lucide-vue-next'
const {companyData} = useCompanyData()
const sectionProducts = ref([])
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})
const dynamicComponent = shallowRef(null);

const loadComponent = async (componentName = "ProductCard_5") => {
  try {
    const module = await import(
      `@/components/product-cards/${componentName}.vue`
    );
    dynamicComponent.value = module.default;
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error);
  }
};

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  }
})

const mainProduct = computed(() => {
  return sectionProducts.value.find(product => product.id === props.data.values.main_product_id) || sectionProducts.value[0]
})

const sideProducts = computed(() => {
  return sectionProducts.value.filter(product => 
    product.id === props.data.values.product_1 || product.id === props.data.values.product_2
  )
})

const countdownTime = computed(() => `+${props.data.values.hours}h`)

let countdownInterval = null

const getSectionProducts = async () => {
  sectionProducts.value = await fetchSectionProducts({
    sectionValues: props.data.values,
    companyId: props.companyId,
  })
}

const startCountdown = () => {
  const hours = parseInt(props.data.values.hours) || 24
  const endTime = new Date().getTime() + (hours * 60 * 60 * 1000)
  
  countdownInterval = setInterval(() => {
    const now = new Date().getTime()
    const distance = endTime - now
    
    if (distance < 0) {
      clearInterval(countdownInterval)
      countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return
    }
    
    countdown.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    }
  }, 1000)
}

onMounted(() => {
  loadComponent();
  getSectionProducts()
  startCountdown()
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
.DealsOutlet-section {
  padding: 60px 15px;

  .heading {
    margin-bottom: 50px;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
  }

  .title-desc {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 0;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
  }

  .parent-row {
    display: flex;
    flex-direction: row;
    gap: 30px;
  }


  @media screen and (max-width: 1300px) {
    .parent-row {
      flex-direction: column;
    }
    
  }

  .col-lg-6 {
    flex: 1;
  }

  .deal {
    position: relative;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    height: 100%;
  }

  .deal .cover {
    position: absolute;
    inset: 0;
    width: 100%;
    object-fit: cover;
    height: 100%;
  }

  .deal-top {
    position: absolute;
    top: 20px;
    left: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .deal-top h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .deal-top h4 {
    font-size: 1.2rem;
    font-weight: 400;
    margin: 0;
  }

  .deal-content {
    padding: 20px;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
  }

  .product-title {
    margin-bottom: 15px;
  }

  .product-title a {
    color: #333;
    text-decoration: none;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .product-title a:hover {
    color: #007bff;
  }

  .product-price {
    margin-bottom: 20px;
  }

  .new-price {
    font-size: 1.5rem;
    font-weight: 700;
    margin-right: 10px;
  }

  .old-price {
    font-size: 1.2rem;
    color: #999;
    text-decoration: line-through;
  }

  .btn-link {
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn-link:hover {
    color: #0056b3;
  }

  .deal-bottom {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 5rem;
  }

  .countdown-display {
    display: flex;
    justify-content: center;
    gap: 20px;
    z-index: 5;
    
  }

  .time-unit {
    text-align: center;
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 60px;
  }

  .time-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    line-height: 1;
  }

  .time-label {
    display: block;
    font-size: 0.8rem;
    color: #666;
    margin-top: 5px;
  }

  .products {
    height: 100%;
  }

  .product-item {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .product-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .product-image:hover img {
    transform: scale(1.05);
  }

  .product-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #28a745;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .product-info {
    padding: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .product-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;
    flex-grow: 1;
  }

  .product-name a {
    color: #333;
    text-decoration: none;
  }

  .product-name a:hover {
    color: #007bff;
  }

  .product-info .product-price {
    margin-bottom: 15px;
  }

  .product-info .new-price {
    font-size: 1.2rem;
    font-weight: 700;
    color: #e74c3c;
  }

  .product-info .old-price {
    font-size: 1rem;
    color: #999;
    text-decoration: line-through;
    margin-left: 8px;
  }

  .add-to-cart-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.3s ease;
  }

  .add-to-cart-btn:hover {
    background: #0056b3;
  }

  .more-container {
    margin-top: 40px;
  }

  .btn-outline-dark-2 {
    background: transparent;
    border: 2px solid #333;
    color: #333;
    padding: 12px 24px;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
  }

  .btn-outline-dark-2:hover {
    background: #333;
    color: white;
  }

  .text-center {
    text-align: center;
  }

  @media (max-width: 768px) {
    .countdown-display {
      gap: 10px;
    }
    
    .time-unit {
      min-width: 45px;
      padding: 10px;
    }
    
    .time-value {
      font-size: 1.2rem;
    }
    
    .title {
      font-size: 2rem;
    }
  }
}

</style>