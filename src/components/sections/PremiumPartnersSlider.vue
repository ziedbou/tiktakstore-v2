<template>
  <div 
    class="premium-partners-wrapper"
    :style="{
    '--mobile-slide': data.values.mobile_slide,
    '--tablet-slide': data.values.tablet_slide,
    '--desktop-slide': data.values.desktop_slide,
  }"
  >
      <swiper-container
        :space-between="16"
        :loop="true"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }"
        :breakpoints="{
          0: {
            slidesPerView: data.values.mobile_slide,
          },
          580: {
            slidesPerView: data.values.tablet_slide,
          },
          1100: {
            slidesPerView: data.values.desktop_slide,
          },
        }"
      >
        <template v-for="i in 2">
          <swiper-slide v-for="(child, index) in data.values.children" :key="`${i}-${index}`" class="partner-slide">
            <a :href="child.link" class="brand">
              <img :src="imghttps(child.image.image)" alt="Partner Logo" />
            </a>
          </swiper-slide>
        </template>
      </swiper-container>
 
  </div>
</template>

<script setup>
import { register } from "swiper/element/bundle";
import "swiper/css";
import { imghttps } from "~/composables/services/helpers";

register();

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

</script>

<style scoped>

.partner-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;
  transition: transform 0.3s ease;
}

.brand:hover {
  transform: translateY(-5px);
}

.brand img {
  max-width: 100%;
  max-height: 80px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .premium-partners-wrapper {
    padding: 20px 0;
  }
  
  .brand img {
    max-height: 60px;
  }
}
</style>