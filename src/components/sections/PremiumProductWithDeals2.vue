<template>
  <div class="deal premium-product-with-deals-2">
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-8 col-lg-6">
        <div class="deal-content text-center">
          <h4>{{ data.values.sub_title }}</h4>
          <h2>{{ data.values.title }}</h2>
          <div class="premium-product-with-deals-2-timer my-5 d-flex justify-content-center">
            <div class="time-block">
              <div class="time-row">
                <span class="time-block__num js-timer-days-timer_ywjraz">{{ String(countdown.days).padStart(2, '0') }}</span>
                <span class="separator">:</span>
              </div>
              <span class="time-block__unit">{{ data.values.day_text }}</span>
            </div>
            <div class="time-block">
              <div class="time-row">
                <span class="time-block__num js-timer-hours-timer_ywjraz">{{ String(countdown.hours).padStart(2, '0') }}</span>
                <span class="separator">:</span>
              </div>
              <span class="time-block__unit">{{ data.values.hour_text }}</span>
            </div>
            <div class="time-block">
              <div class="time-row">
                <span class="time-block__num js-timer-minutes-timer_ywjraz">{{ String(countdown.minutes).padStart(2, '0') }}</span>
                <span class="separator">:</span>
              </div>
              <span class="time-block__unit">{{ data.values.min_text }}</span>
            </div>
            <div class="time-block">
              <div class="time-row">
                <span class="time-block__num js-timer-seconds-timer_ywjraz">{{ String(countdown.seconds).padStart(2, '0') }}</span>
              </div>
              <span class="time-block__unit">{{ data.values.sec_text }}</span>
            </div>
          </div>
          
          <div 
            v-show="isTimerCompleted" 
            class="premium-product-with-deals-2-timer-completed-text-timer_ywjraz"
          >
            <!-- Timer completed message can go here -->
          </div>
        </div>
        
        <div v-if="!sectionProducts || sectionProducts.length === 0" class="row my-5 mx-5">
          <div v-for="i in 2" :key="i" class="col-6">
            <div class="waiting mb-3" style="height:287px"></div>
            <div class="waiting mb-3" style="height:50px"></div>
            <div class="waiting" style="height:30px"></div>
          </div>
        </div>
        
        <div v-if="sectionProducts && sectionProducts.length > 0" class="row deal-products">
          <div 
            v-for="(product, index) in sectionProducts" 
            :key="product.id || index"
            class="col-6 deal-product text-center mb-14"
          >
            <figure class="product-media">
              <NuxtLink :to="getProductLink(product)">
                <img 
                  :src="imghttps(product.photo)" 
                  :alt="product.name"
                  class="product-image"
                />
              </NuxtLink>
            </figure>
            
            <div class="product-body mb-4">
              <h1 class="product-title mt-4 mb-3">
                <NuxtLink :to="getProductLink(product)">
                  {{ product.name }}
                </NuxtLink>
              </h1>
              
              <div 
                v-if="product.discount > 0" 
                class="product-price d-flex justify-content-center align-items-baseline mb-0"
              >
                <span class="new-price mb-0 mr-3">
                  {{ getPrice(product) }} {{ companyData?.currency }}
                </span>
                <span class="old-price mb-0">
                  {{ product.price }} {{ companyData?.currency }}
                </span>
              </div>
              
              <div 
                v-else 
                class="product-price mb-0 d-flex justify-content-center"
              >
                <h6 class="new-price mb-0">
                  {{ product.price }} {{ companyData?.currency }}
                </h6>
              </div>
            </div>
            
            <NuxtLink :to="getProductLink(product)" class="action">
              {{ data.values.btn_text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getProductLink, getPrice, imghttps } from '~/composables/services/helpers'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: [String, Number],

})

const { companyData } = useCompanyData()

const { data: sectionProducts, pending, error, refresh } = useGetProducts({
  type: 'list',
  cacheKey: `PremiumProductWithDeals2-${props.index}`,
  companyId: companyData.value.id,
  productList:  {products_ids: [props.data.values.product_1, props.data.values.product_2] }
});


const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

const isTimerCompleted = ref(false)
let countdownInterval = null

// Timer logic migrated from your original JavaScript
const initTimer = () => {
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24
  
  // Use the date from data.values.date (like your original code)
  // If no date is provided, fall back to hours duration
  let countDown
  
  if (props.data.values.date) {
    countDown = new Date(props.data.values.date).getTime()
  } else {
    // Fallback to hours duration if no specific date
    const hours = parseInt(props.data.values.hours) || 24
    countDown = new Date().getTime() + (hours * 60 * 60 * 1000)
  }
  
  countdownInterval = setInterval(() => {
    const now = new Date().getTime()
    const distance = countDown - now
    
    if (distance < 0) {
      // Timer completed - set all to 00
      countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
      isTimerCompleted.value = true
      clearInterval(countdownInterval)
      return
    }
    
    // Calculate time remaining (exact logic from your original JS)
    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)
    
    countdown.value = { days, hours, minutes, seconds }
  }, second)
}

onMounted(() => {
  initTimer()
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped lang="scss">
.premium-product-with-deals-2 .deal-content h4 {
  color: v-bind('data.values.sub_title_color');
  font-weight: 400;
  font-size: v-bind('data.values.sub_title_size_mobile + "px"');
  line-height: 1.3;
  margin-bottom: 2rem;
}

@media screen and (min-width: 992px) {
  .premium-product-with-deals-2 .deal-content h4 {
    font-size: v-bind('data.values.sub_title_size_desktop + "px"');
  }
}

.premium-product-with-deals-2 .deal-content h2 {
  font-weight: 500;
  font-size: v-bind('data.values.title_size_mobile + "px"');
  line-height: 1.1;
  letter-spacing: -.025em;
}

@media screen and (min-width: 1200px) {
  .premium-product-with-deals-2 .deal-content h2 {
    font-size: v-bind('data.values.title_size_desktop + "px"');
  }
}

@media screen and (min-width: 768px) {
  .premium-product-with-deals-2 .deal-content h2 {
    font-size: v-bind('data.values.title_size_tablet + "px"');
  }
}

.premium-product-with-deals-2 .premium-product-with-deals-2-timer {
  display: flex;
  align-items: center;
  gap: 16px; 
}

.premium-product-with-deals-2 .premium-product-with-deals-2-timer .time-row {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.premium-product-with-deals-2 .premium-product-with-deals-2-timer .time-block__num {
  min-width: 27px;
  text-align: center;
}

.premium-product-with-deals-2 .premium-product-with-deals-2-timer .separator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -10px;
}

.premium-product-with-deals-2 .premium-product-with-deals-2-timer .time-block__num,
.premium-product-with-deals-2 .premium-product-with-deals-2-timer .separator {
  margin: 0px;
  font-size: v-bind('data.values.date_size_number_mobile + "px"');
  color: v-bind('data.values.date_color_number');
  line-height: 100%;
  text-transform: unset;
}

.premium-product-with-deals-2 .premium-product-with-deals-2-timer .time-block__unit {
  display: block;
  width: 100%;
  text-align: center;
  margin: 0px;
  margin-top: 10px;
  font-size: v-bind('data.values.date_size_text_mobile + "px"');
  color: v-bind('data.values.date_color_text');
  line-height: 100%;
  text-transform: unset;
  font-weight: 400;
  font-style: normal;
}

@media (min-width: 1024px) {
  .premium-product-with-deals-2 .premium-product-with-deals-2-timer .time-block__unit {
    margin-top: 10px;
    font-size: v-bind('data.values.date_size_text_desktop + "px"');
  }

  .premium-product-with-deals-2 .premium-product-with-deals-2-timer .time-block__num,
  .premium-product-with-deals-2 .premium-product-with-deals-2-timer .separator {
    font-size: v-bind('data.values.date_size_number_desktop + "px"');
  }

  .premium-product-with-deals-2 .premium-product-with-deals-2-timer .separator {
    right: -14.8px;
  }

  .premium-product-with-deals-2 .premium-product-with-deals-2-timer .time-block__num {
    min-width: 48.6px;
  }
}

.premium-product-with-deals-2 .product-media {
  border-radius: v-bind('data.values.image_border_radius + "px"');
}

.premium-product-with-deals-2 .deal-product .action {
  font-size: 14px;
  font-weight: 400;
  border-radius: 20px;
  letter-spacing: 0.1em;
  color: v-bind('data.values.btn_color');
  padding: 1rem 1.5rem;
  border-bottom: 0.2rem solid v-bind('data.values.btn_border_color');
  transition: all 0.3s;
  text-decoration: none;
  color: v-bind('data.values.btn_color_hover');
  background-color: v-bind('data.values.btn_background_hover');
}

@media screen and (max-width: 700px){
    .premium-product-with-deals-2 .deal-product .action {
        font-size: 1rem;
     padding: 1.1rem .5rem;

    }
}


.premium-product-with-deals-2-timer-completed-text-timer_ywjraz {
  display: none;
}

.premium-product-with-deals-2 {

  
  .waiting {
    background: #f0f0f0;
    border-radius: 4px;
    animation: pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
  }
  
  .col-sm-12, .col-md-8, .col-lg-6, .col-6 {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .col-sm-12 { flex: 0 0 100%; max-width: 100%; }
  .col-6 { flex: 0 0 50%; max-width: 50%; }
  
  @media (min-width: 768px) {
    .col-md-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
  }
  
  @media (min-width: 992px) {
    .col-lg-6 { flex: 0 0 50%; max-width: 50%; }
  }
  
  .justify-content-center { justify-content: center; }
  .text-center { text-align: center; }
  .d-flex { display: flex; }
  .align-items-baseline { align-items: baseline; }
  .my-5 { margin-top: 3rem; margin-bottom: 3rem; }
  .mx-5 { margin-left: 3rem; margin-right: 3rem; }
  .mb-3 { margin-bottom: 1rem; }
  .mb-4 { margin-bottom: 1.5rem; }
  .mb-0 { margin-bottom: 0; }
  .mt-4 { margin-top: 1.5rem; }
  .mr-3 { margin-right: 1rem; }
  
  .product-image {
    width: 100%;
    height: 200px;
    max-height: 200px;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .new-price {
    font-weight: 600;
    color: #333;
  }
  
  .old-price {
    text-decoration: line-through;
    color: #999;
  }
  
  .product-title a {
    color: #333;
    text-decoration: none;
  }
  
  .product-title a:hover {
    color: #007bff;
  }
}
</style>