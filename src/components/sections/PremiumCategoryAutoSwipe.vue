<template>
  <div
    :style="{
      '--link-bg-color': data.values.link_background_color,
      '--link-bg-color-hover': data.values.link_background_color_hover,
      '--border-radius': `${data.values.border_radius}px`,
      '--border-color': data.values.border_color,
      '--border-color-hover': data.values.border_color_hover,
      '--text-color': data.values.text_color,
      '--text-color-hover': data.values.text_color_hover
    }"
    class="premium-category-auto-swipe"
  >
    <swiper-container
      class="category-swiper"
      :slides-per-view="'auto'"
      :space-between="20"
      :loop="true"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      :breakpoints="{
        320: {
          slidesPerView: data.values.small_mobile_slide_number,
        },
        640: {
          slidesPerView: data.values.mobile_slide_number,
        },
        768: {
          slidesPerView: data.values.tablet_slide_number,
        },
        1255: {
          slidesPerView: data.values.desktop_slide_number,
        },
      }"
    >
    <template v-for="i in 2">
      <swiper-slide v-for="(child, index) in data.values.children" :key="index" class="category-slide my-1">
        <a :href="child.link" class="category-card">
          <img :src="child.image.image" :alt="child.text" class="category-icon">
          <span class="category-name">{{ child.text }}</span>
        </a>
      </swiper-slide>
      </template>
    </swiper-container>
  </div>
</template>

<script setup>
import { register } from "swiper/element/bundle";
import "swiper/css";

register();

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.premium-category-auto-swipe {
  width: 100%;
}

.category-swiper {
  width: 100%;
  padding: 20px 2px;
  overflow: hidden;
}

.category-card {
  background: var(--link-bg-color);
  border-radius: var(--border-radius);
  padding: 7% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 200px;
  border: 1px solid;
  border-color: var(--border-color);
}

.category-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-color-hover);
  background: var(--link-bg-color-hover);
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.category-icon {
  width: 50px;
  height: 50px;
}

.category-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  transition: color 0.2s;
}

.category-card:hover .category-name {
  color: var(--text-color-hover);
}
</style>
