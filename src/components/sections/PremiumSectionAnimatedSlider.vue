<template>
  <section class="slider-container full-width-mobile-desktop overflow-hidden">
    <swiper-container
      :autoplay="autoplayOptions"
      :loop="true"
      :slides-per-view="1"
      :pagination="paginationOptions"
      :speed="500"
      class="swiper-element"
    >
      <swiper-slide v-for="(child, index) in data.values.children" :key="index" class="slide">
        <div class="content-left">
            <div class="tag">{{ child.tag_text }}</div>
            <h2 class="title">{{ child.title }}</h2>
            <p class="subtitle">{{ child.subtitle }}</p>
            <p class="price">
              {{ child.price_text }} <span>{{ child.price }}</span>
            </p>
            <a :href="child.link" class="shop-btn">{{ child.btn_text }}</a>
          </div>
          <div class="content-right">
            <img :src="child.image.image" alt="Slide Image" class="w-full max-w-[600px] h-auto rounded-lg" />
          </div>
      </swiper-slide>
    </swiper-container>
  </section>
</template>

<script lang="ts" setup>
import "swiper/element/bundle";
import { onMounted, markRaw } from "vue";
import { register } from "swiper/element/bundle";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
register(); 

interface Design {
  [key: string]: any;
}

interface Values {
  children: Array<{
    tag_text: string;
    title: string;
    subtitle: string;
    price_text: string;
    price: string;
    btn_text: string;
    link: string;
    image: {
      image: string;
    };
  }>;
  slider_border_radius: number;
  tag_background: string;
  tag_color: string;
  tag_border_radius: number;
  title_color: string;
  subtitle_color: string;
  text_1_color: string;
  text_2_color: string;
  btn_backgroud: string;
  btn_color: string;
  btn_border_radius: number;
  btn_backgroud_hover: string;
  btn_color_hover: string;
  btn_pagination: string;
  active_btn_pagination: string;
}

interface PropType {
  data: {
    design: Design;
    values: Values;
  };
}

const props = defineProps<PropType>();

// Swiper options - using markRaw for configuration objects
const autoplayOptions = {
  delay: 3000,
  disableOnInteraction: false,
};

const paginationOptions = markRaw({
  clickable: true,
});

onMounted(() => {
  // console.log("Data from props:", props.data.design);
});
</script>


<style scoped>
/* Styles spécifiques au composant */

.swiper {
  transition: background-color 1s;
  width: 100%;
  border-radius: v-bind('data.values.slider_border_radius + "px"');
}

.swiper .swiper-wrapper {
  align-items: center;
}

.swiper-slide {
  display: flex !important;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 50px;
  height: auto;
}

/* Styles pour desktop */
.content-left {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.content-right {
  opacity: 0;
  transform: translateY(-30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.swiper-slide.swiper-slide-active .content-left,
.swiper-slide.swiper-slide-active .content-right {
  opacity: 1;
  transform: translateY(0);
}

/* Styles pour mobile */
@media (max-width: 768px) {
  .swiper-slide {
    flex-direction: column;
    gap: 30px;
  }

  .content-left {
    order: 1;
    text-align: center;
    padding: 0 20px;
    transform: translateX(-30px);
  }

  .content-right {
    order: 2;
    width: 100%;
    padding: 0 20px;
    transform: translateX(30px);
  }

  .swiper-slide.swiper-slide-active .content-left,
  .swiper-slide.swiper-slide-active .content-right {
    transform: translateX(0);
  }
}

.tag {
  background: v-bind('data.values.tag_background');
  color: v-bind('data.values.tag_color');
  padding: 5px 15px;
  border-radius: v-bind('data.values.tag_border_radius + "px"');
  display: inline-block;
  margin-bottom: 20px;
  font-size: 14px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 15px;
  line-height: 1.2;
  color: v-bind('data.values.title_color');
}

.subtitle {
  color: v-bind('data.values.subtitle_color');
  margin-bottom: 20px;
}

.price {
  font-size: 32px;
  margin-bottom: 30px;
  color: v-bind('data.values.text_1_color');
}

.price span {
  color: v-bind('data.values.text_2_color');
}

.shop-btn {
  background: v-bind('data.values.btn_backgroud');
  color: v-bind('data.values.btn_color');
  padding: 12px 30px;
  border-radius: v-bind('data.values.btn_border_radius + "px"');
  text-decoration: none;
  display: inline-block;
  font-weight: bold;
  transition: background 0.3s;
}

.shop-btn:hover {
  background: v-bind('data.values.btn_backgroud_hover');
  color: v-bind('data.values.btn_color_hover');
}

.swiper-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: v-bind('data.values.btn_pagination');
  opacity: 0.5;
  transition: width 0.3s;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: v-bind('data.values.active_btn_pagination');
  width: 30px;
  border-radius: 5px;
}
</style>

<style scoped>
.slider-container {
  width: 100%;
  overflow: hidden;
  padding: 2rem 0;
}

.swiper-element {
  width: 100%;
  height: 100%;
}

.slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 300px;
  background: #353434;
}

.slide-content {
  max-width: 600px;
  padding: 1rem;
}

.swiper-pagination-bullet {
  background-color: #999;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.swiper-pagination-bullet-active {
  background-color: #000;
  opacity: 1;
}
</style>
