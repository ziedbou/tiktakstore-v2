<template>
  <section 
    class="brands-section"
  >
    <swiper-container
      ref="swiperRef"
      class="brands-swiper"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false
      }"
      :breakpoints="{
        320: {
          slidesPerView: data.values.mobile_slide_number,
        },
        640: {
          slidesPerView: data.values.mobile_slide_number,
          spaceBetween: 20
        },
        768: {
          slidesPerView: data.values.tablet_slide_number,
          spaceBetween: 30
        },
        1255: {
          slidesPerView: data.values.desktop_slide_number,
          spaceBetween: 30
        }
      }"
    >
    <template v-for="i in 2">
      <swiper-slide
        v-for="(child, index) in data.values.children" 
        :key="index"
      >
        <div class="brand-slide">
          <img :src="imghttps(child.image.image)">
        </div>
      </swiper-slide>
    </template>
    </swiper-container>
  </section>
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
.brands-section {
  padding: 40px 0;
  overflow: hidden;
}


.brand-slide {
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.brand-slide img {
  max-width: 120px;
  height: auto;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.3);
  transition: all 0.3s ease;
}

.brand-slide:hover img {
  filter: grayscale(0%) opacity(1);
}
</style>


