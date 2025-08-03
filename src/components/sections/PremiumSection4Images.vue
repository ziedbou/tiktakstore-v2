<template>
  <div 
    class="premium-4-images"
    :class=" {'no-padding': data.design.container === 'container-fluid'}"
    :style="{
      '--section-border-radius': `${data.values.section_border_radius}px`,
      '--sub-title-1-color': data.values.sub_title_1_color,
      '--sub-title-3-color': data.values.sub_title_3_color,
      '--sub-title-4-color': data.values.sub_title_4_color,
      '--title-1-1-color': data.values.title_1_1_color,
      '--title-1-3-color': data.values.title_1_3_color,
      '--title-1-4-color': data.values.title_1_4_color,
      '--title-2-1-color': data.values.title_2_1_color,
      '--title-2-3-color': data.values.title_2_3_color,
      '--title-2-4-color': data.values.title_2_4_color,
      '--text-4-color': data.values.text_4_color,
      '--btn-1-color': data.values.btn_1_color,
      '--btn-1-background': data.values.btn_1_background,
      '--btn-1-color-hover': data.values.btn_1_color_hover,
      '--btn-1-background-hover': data.values.btn_1_background_hover,
      '--btn-3-color': data.values.btn_3_color,
      '--btn-3-background': data.values.btn_3_background,
      '--btn-3-color-hover': data.values.btn_3_color_hover,
      '--btn-3-background-hover': data.values.btn_3_background_hover,
      '--btn-4-color': data.values.btn_4_color,
      '--btn-4-background': data.values.btn_4_background,
      '--btn-4-color-hover': data.values.btn_4_color_hover,
      '--btn-4-background-hover': data.values.btn_4_background_hover
    }"
  >
    <div class="grid grid-cols-12 gapd-4">
      <!-- Image centrale pleine hauteur -->
      <div class="col-span-12 order-2 sm:order-1 md:col-span-12 lg:col-span-4 lg:order-2 relative overflow-hidden hover:shadow-lg transition-shadow duration-300 aspect-[7/8] md:aspect-video lg:aspect-[7/8.7]">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300" :style="{ backgroundImage: `url('${data.values.image_2.image}')` }"></div>
      </div>
      
      <!-- Section 1: Boucles d'oreilles et bagues -->
      <div class="col-span-12 order-1 sm:order-2 sm:col-span-6 lg:col-span-4 lg:order-1 relative flex flex-col items-center justify-center text-center p-6 group overflow-hidden aspect-[7/8] lg:aspect-[7/8.7]">
        <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" :src="imghttps(data.values.image_1.image)" alt="Banner" />
        <div class="banner-content text-center relative z-10 space-y-6">
          <h4 class="sub-title-1 text-sm uppercase tracking-widest font-light">{{ data.values.sub_title_1 }}</h4>
          <h3 class="title-1-1 text-4xl font-bold uppercase">{{ data.values.title_1_1 }}</h3>
          <h3 class="title-2-1 text-3xl uppercase font-semibold">{{ data.values.title_2_1 }}</h3>
          <a :href="data.values.link_1" class="btn-1 text-sm uppercase tracking-widest border-b-2 transition-colors duration-300 cursor-pointer">{{ data.values.link_text_1 }}</a>
        </div>
      </div>
      
      <!-- Section 3: Bracelets et chevillières -->
      <div class="col-span-12 order-3 sm:order-3 sm:col-span-6 lg:col-span-4 lg:order-3 relative flex flex-col items-center justify-center text-center p-6 group overflow-hidden aspect-[7/8] lg:aspect-[7/8.7]" style="background-color: #f9f9f9;">
        <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" :src="imghttps(data.values.image_3.image)" alt="Banner" />
        <div class="banner-content text-center relative z-10 space-y-6">
          <h4 class="sub-title-3 text-sm uppercase tracking-widest font-light">{{ data.values.sub_title_3 }}</h4>
          <h3 class="title-1-3 text-4xl font-bold uppercase">{{ data.values.title_1_3 }}</h3>
          <h3 class="title-2-3 text-3xl uppercase font-semibold">{{ data.values.title_2_3 }}</h3>
          <a :href="data.values.link_3" class="btn-3 text-sm uppercase tracking-widest border-b-2 transition-colors duration-300 cursor-pointer">{{ data.values.link_text_3 }}</a>
        </div>
      </div>

      <!-- Section 4: Collection Romantique 2024 -->
      <div class="col-span-12 order-4 lg:order-4 relative flex flex-col items-center md:items-end justify-center text-center p-10 pr-10 md:pr-32 group overflow-hidden" style="background-color: rgb(84, 77, 77); min-height: 500px;">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-101" :style="{ backgroundImage: `url('${data.values.image_4.image}')` }"></div>
        <div class="banner-content text-center relative z-10 space-y-4">
          <h4 class="sub-title-4 text-sm uppercase tracking-widest font-light">{{ data.values.sub_title_4 }}</h4>
          <h3 class="title-1-4 text-4xl font-bold uppercase">{{ data.values.title_1_4 }}</h3>
          <h3 class="title-2-4 text-4xl font-bold uppercase">{{ data.values.title_2_4 }}</h3>
          <p class="text-4 text-sm max-w-xl">{{ data.values.text_4 }}</p>
          <a :href="data.values.link_4" class="btn-4 mt-5 text-sm uppercase tracking-widest border-b-2 transition-colors duration-300 cursor-pointer">{{ data.values.link_text_4 }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.premium-4-images {
  border-radius: var(--section-border-radius);
  overflow: hidden;
}

/* Subtitle styling */
.sub-title-1 {
  color: var(--sub-title-1-color);
}
.sub-title-3 {
  color: var(--sub-title-3-color);
}
.sub-title-4 {
  color: var(--sub-title-4-color);
}

/* Title 1 styling */
.title-1-1 {
  color: var(--title-1-1-color);
}
.title-1-3 {
  color: var(--title-1-3-color);
}
.title-1-4 {
  color: var(--title-1-4-color);
}

/* Title 2 styling */
.title-2-1 {
  color: var(--title-2-1-color);
}
.title-2-3 {
  color: var(--title-2-3-color);
}
.title-2-4 {
  color: var(--title-2-4-color);
}

/* Text styling */
.text-4 {
  color: var(--text-4-color);
}

/* Button styling */
.btn-1, .btn-3, .btn-4 {
  padding: 12px 24px;
  display: inline-block;
}

.btn-1 {
  color: var(--btn-1-color);
  background-color: var(--btn-1-background);
  border-bottom-color: var(--btn-1-color);
}
.btn-1:hover {
  color: var(--btn-1-color-hover);
  background-color: var(--btn-1-background-hover);
  border-color: var(--btn-1-background-hover);
}

.btn-3 {
  color: var(--btn-3-color);
  background-color: var(--btn-3-background);
  border-bottom-color: var(--btn-3-color);
}
.btn-3:hover {
  color: var(--btn-3-color-hover);
  background-color: var(--btn-3-background-hover);
  border-color: var(--btn-3-background-hover);
}

.btn-4 {
  color: var(--btn-4-color);
  background-color: var(--btn-4-background);
  border-bottom-color: var(--btn-4-color);
}
.btn-4:hover {
  color: var(--btn-4-color-hover);
  background-color: var(--btn-4-background-hover);
  border-color: var(--btn-4-background-hover);
}

/* Additional styling from original CSS */
.banner-content {
  font-size: 1rem;
  max-width: 400px;
}

/* Fix hover effects */
.col-span-12.order-2.sm\:order-1:hover .absolute.inset-0 {
  transform: scale(1.1);
}

.group:hover img.absolute,
.group:hover .absolute.inset-0 {
  transform: scale(1.1);
}

@media screen and (max-width: 991px) {
  .banner-subtitle {
    font-size: 1.8rem;
  }
}

@media screen and (max-width: 575px) {
  .btn {
    font-size: 1rem;
  }
}

@media (min-width: 767px) and (max-width: 991px) {
  .banner-content {
    font-size: 0.8rem;
  }
}

.no-padding {
  padding: 0 !important;
}
</style>
