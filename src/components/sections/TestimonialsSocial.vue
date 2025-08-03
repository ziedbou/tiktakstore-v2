<template>
  <div class="TestimonialsSocial-container">
    <div class="cta cta-separator">
      <div class="row">
        <div class="col-lg-6">
          <div class="cta-wrapper cta-text text-center">
            <h3 class="cta-title ml-0">{{ data?.values?.title_left }}</h3>
            <p class="cta-desc ml-0">{{ data?.values?.description }}</p>
            <div class="social-icons social-icons-colored justify-content-center">
              <a 
                v-if="storeInfo?.contact_settings?.facebook" 
                :href="socialMedia(storeInfo?.contact_settings?.facebook, 'facebook')" 
                class="social-icon" 
                title="Facebook" 
                target="_blank"
              >
                <Icon name="ri:facebook-fill" class="w-5 h-5" />
              </a>
              
              <a 
                v-if="storeInfo?.contact_settings?.whatsapp" 
                :href="socialMedia(storeInfo?.contact_settings?.whatsapp, 'whatsapp')" 
                class="social-icon" 
                title="WhatsApp" 
                target="_blank"
              >
                <Icon name="ri:whatsapp-fill" class="w-5 h-5" />
              </a>
              
              <a 
                v-if="storeInfo?.contact_settings?.twitter" 
                :href="socialMedia(storeInfo?.contact_settings?.twitter, 'twitter')" 
                class="social-icon" 
                title="Twitter" 
                target="_blank"
              >
                <Icon name="ri:twitter-fill" class="w-5 h-5" />
              </a>
              
              <a 
                v-if="storeInfo?.contact_settings?.instagram" 
                :href="socialMedia(storeInfo?.contact_settings?.instagram, 'instagram')" 
                class="social-icon" 
                title="Instagram" 
                target="_blank"
              >
                <Icon name="ri:instagram-fill" class="w-5 h-5" />
              </a>
              
              <a 
                v-if="storeInfo?.contact_settings?.youtube" 
                :href="socialMedia(storeInfo?.contact_settings?.youtube, 'youtube')" 
                class="social-icon" 
                title="YouTube" 
                target="_blank"
              >
                <Icon name="ri:youtube-fill" class="w-5 h-5" />
              </a>
              
              <a 
                v-if="storeInfo?.contact_settings?.linkedin" 
                :href="socialMedia(storeInfo?.contact_settings?.linkedin, 'linkedin')" 
                class="social-icon" 
                title="LinkedIn" 
                target="_blank"
              >
                <Icon name="ri:linkedin-box-fill" class="w-5 h-5" />
              </a>
              
              <a 
                v-if="storeInfo?.contact_settings?.snapchat" 
                :href="socialMedia(storeInfo?.contact_settings?.snapchat, 'snapchat')" 
                class="social-icon" 
                title="Snapchat" 
                target="_blank"
              >
                <Icon name="ri:snapchat-fill" class="w-5 h-5" />
              </a>
              
              <a 
                v-if="storeInfo?.contact_settings?.tiktok" 
                :href="socialMedia(storeInfo?.contact_settings?.tiktok, 'tiktok')" 
                class="social-icon" 
                title="TikTok" 
                target="_blank"
              >
                <Icon name="ri:tiktok-fill" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div class="col-lg-6">
          <div class="cta-wrapper text-center">
            <h3 class="cta-title mb-2 ml-0">{{ data?.values?.title_right }}</h3>
            
            <div v-if="!data?.values?.children || data?.values?.children?.length === 0" class="debug-info">
              <p>No testimonials data found. Check data structure:</p>
            </div>
            
            <div v-else class="testimonials-container">
                <Swiper
                :modules="[Navigation, Pagination]"
                :slides-per-view="1"
                :space-between="20"
                :loop="true"
                :pagination="{ enabled:true, clickable: true }"
                :navigation="{ 
                  enabled: false,
                  hideOnClick: false
                }"
                :breakpoints="{
                  1500: {
                    navigation: {
                      enabled: true
                    }
                  }
                }"
                class="testimonials-slider"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
              >
                <SwiperSlide 
                  v-for="(testimonial, index) in data?.values?.children" 
                  :key="`testimonial-${index}`"
                >
                  <blockquote class="testimonial testimonial-icon text-center flex items-center">
                        <Icon name="fa6-solid:quote-left" class="w-10 mb-4 h-10" />

                    <p class="testimonial-text">{{ testimonial?.message || 'No message available' }}</p>
                    <cite class="testimonial-author">
                      {{ testimonial?.message_from || 'Anonymous' }}<span v-if="testimonial?.owner">,
                      <span class="testimonial-role">{{ testimonial?.owner }}</span></span>
                    </cite>
                  </blockquote>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { socialMedia } from '~/composables/services/helpers'

const { storeInfo } = useStoreInfo()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const onSwiper = (swiper) => {
  // console.log('Swiper initialized:', swiper)
}

const onSlideChange = (swiper) => {
  // console.log('Slide changed to:', swiper.activeIndex)
}

watch(() => props.data, (newData) => {
  // console.log('Data changed:', newData)
}, { deep: true })

onMounted(() => {
  // console.log('Component mounted with data:', props.data)
  // console.log('Testimonials data:', props.data?.values?.children)
})
</script>

<style scoped lang="scss">
.TestimonialsSocial-container {
  padding: 10px 0;

    .cta-separator {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    }

    .row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    }

    .col-lg-6 {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0 15px;
    }

    .cta-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 20px;
    }

    .cta-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 20px;
    line-height: 1.2;
    }

    .cta-desc {
    font-size: 1.1rem;
    color: #6c757d;
    margin-bottom: 30px;
    line-height: 1.6;
    }

    .social-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    }

    .social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #fff;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 20px;
    }

    .social-icon:hover {
    transform: translateY(-3px);
    }

    .social-icon i {
    font-size: 20px;
    }

    .testimonials-container {
    position: relative;
    padding: 20px 0;
    min-height: 300px; 
    }

    .testimonials-slider {
    padding: 0 20px;
    height: 100%;
    }

    .testimonial {
    background: #fff;
    padding: 40px 30px;
    border-radius: 15px;
    position: relative;
    margin: 20px 0;
    min-height: 250px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    }

    .quote-icon {
    font-size: 4rem;
    color: #3498db;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 20px;
    }

    .testimonial-text {
    font-size: 1.1rem;
    color: #555;
    font-style: italic;
    line-height: 1.6;
    margin-bottom: 25px;
    flex-grow: 1;
    }

    .testimonial-author {
    font-style: normal;
    font-weight: 600;
    color: #2c3e50;
    font-size: 1rem;
    }

    .testimonial-role {
    font-weight: 400;
    color: #6c757d;
    }

    .debug-info {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    text-align: left;
    }

    .debug-info pre {
    background: #f1f3f4;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 12px;
    }

    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
        visibility: hidden;
    color: #3498db;
    font-size: 18px;
    font-weight: bold;
    }

    :deep(.swiper-button-next:after),
    :deep(.swiper-button-prev:after) {
    font-size: 18px;
    }

    :deep(.swiper-pagination-bullet) {
    width: 12px;
    height: 12px;
    border: 3px solid #bdc3c7;
    background: none;
    opacity: 1;
    }

    :deep(.swiper-pagination-bullet-active) {
    background: #2c3e50;
    border-width: 0;

    }

    :deep(.swiper) {
    height: 100%;
    }

    :deep(.swiper-wrapper) {
    height: 100%;
    }

    :deep(.swiper-slide) {
    height: auto;
    display: flex;
    align-items: center;
    }

    @media (max-width: 991px) {
    .col-lg-6 {
        flex: 0 0 100%;
        max-width: 100%;
        margin-bottom: 40px;
    }
    
    .cta-title {
        font-size: 2rem;
    }
    
    .social-icon {
        width: 45px;
        height: 45px;
        font-size: 18px;
    }
    }

    @media (max-width: 767px) {
    .cta-title {
        font-size: 1.75rem;
    }
    
    .cta-desc {
        font-size: 1rem;
    }
    
    .testimonial {
        padding: 30px 20px;
        min-height: 200px;
    }
    
    .quote-icon {
        font-size: 3rem;
    }
    }

    @media (max-width: 575px) {
    .default-container {
        padding: 40px 0;
    }
    
    .cta-wrapper {
        padding: 20px 10px;
    }
    
    .social-icons {
        gap: 10px;
    }
    
    .social-icon {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }
    }
}

</style>