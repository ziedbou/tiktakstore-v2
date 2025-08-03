<template>
  <div class="premium-category-slider-section" :style="{
    '--scroll-background': data.values.scroll_background,
    '--scroll-background-hover': data.values.scroll_background_hover,
    '--scroll-color': data.values.scroll_color,
    '--scroll-color-hover': data.values.scroll_color_hover,
    '--category-block-border-radius': `${data.values.category_block_border_radius}px`,
    '--image-border-radius': `${data.values.image_border_radius}px`,
    '--title-color': data.values.title_color,
    '--title-color-hover': data.values.title_color_hover,
    '--sub-title-color': data.values.sub_title_color_hover,
  }">
    <h2 v-if="data.values.section_title" class="section-title" :class="data.values.section_title_font_weight">
      {{ data.values.section_title }}
    </h2>

    <swiper-container 
      class="categories-slider"
      :space-between="20"
      :speed="300"
      :breakpoints="{
        0: {
          slidesPerView: data.values.mobile_slide
        },
        580: {
          slidesPerView: data.values.tablet_slide
        },
        1100: {
          slidesPerView: data.values.desktop_slide
        }
      }"
      :navigation="{
        nextEl: '.nav-button-next',
        prevEl: '.nav-button-prev'
      }"
    >
      <swiper-slide v-for="(child, index) in data.values.children" :key="index">
        <div class="category-card">
          <div class="category-image-wrapper">
            <a :href="child.link" class="category-link">
              <img :src="imghttps(child.image.image)" alt="Category Image" class="category-image" width="137" height="137" />
            </a>
          </div>
          <div class="category-content">
            <a :href="child.link" class="category-title">{{ child.title }}</a>
            <h4 class="category-subtitle">
              {{ child.sub_title }}
            </h4>
          </div>
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import { imghttps } from '~/composables/services/helpers';

register();

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

</script>

<style scoped>
.premium-category-slider-section {
  position: relative;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
}

.nav-button {
  width: 48px;
  height: 48px;
  border-radius: 100px;
  background: var(--scroll-background, #f8f8f8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .15);
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: var(--scroll-background-hover, #e0e0e0);
}

.nav-button.swiper-button-disabled {
  opacity: 0.4;
  cursor: default;
}

.categories-slider {
  width: 100%;
  overflow: visible;
  margin-top: 1rem;
}

.category-card {
  border-radius: var(--category-block-border-radius, 10px);
  transition: all 0.35s ease;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin: 0 0 1.5rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  height: 100%;
}

.category-card:hover {
  box-shadow: 0 1rem 15px 1.5px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

.category-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.category-image {
  border-radius: var(--image-border-radius, 8px);
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-link:hover .category-image {
  transform: scale(1.05);
}

.category-content {
  text-align: center;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-title {
  color: var(--title-color, #333);
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.category-title:hover {
  color: var(--title-color-hover, #0066cc);
  text-decoration: underline;
}

.category-subtitle {
  color: var(--sub-title-color, #777);
  font-size: 0.9rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: 0;
}
</style>