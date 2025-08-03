<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5" 
      :style="{
        '--image-border-radius': data.values.image_border_radius+'px' || '15px',
        '--banner-overlay-bg': data.values.overlay_bg || 'rgba(255, 255, 255, 0.1)',
        '--banner-content-border-color': data.values.content_border_color || '#ffffff6b',
        '--banner-content-hover-bg': data.values.content_hover_bg || 'rgba(255, 255, 255, 0.4)',
        '--banner-link-color': data.values.link_color || '#777',
        '--banner-link-hover-color': data.values.link_hover_color || '#cc6666',
        '--banner-subtitle-color': data.values.subtitle_color || '#777',
        '--banner-subtitle-hover-color': data.values.subtitle_hover_color || '#cc6666',
        '--banner-title-color': data.values.title_color || '#fff',
        '--banner-title-hover-color': data.values.title_hover_color || '#cc6666',
      }"
    >
      <!-- Left Banner (Large) -->
      <NuxtLink :to="data.values.link_1" class="banner banner-large p-4 md:p-8 hover:shadow-md overflow-hidden aspect-[10/11] md:aspect-auto relative">
        <div class="banner-overlay"></div>
        <div class="banner-bg" :style="{ backgroundImage: 'url(' + imghttps(data.values.image_1.image) + ')' }"></div>
        <div class="banner-content text-left pl-8 md:pl-12">
          <p class="banner-subtitle text-sm md:text-base mb-1">{{ data.values.subtitle_1 }}</p>
          <h3 class="banner-title text-2xl md:text-4xl text-gray-800 mb-3 md:mb-4 max-w-64">{{ data.values.title_1 }}</h3>
          <span class="banner-link mt-2 inline-flex items-center">
            {{ data.values.cta_text_1 }}
            <span class="banner-arrow">→</span>
          </span>
        </div>
      </NuxtLink>

      <!-- Right Column (Two Banners) -->
      <div class="flex flex-col gap-3 md:gap-5">
        <!-- Top Right Banner -->
        <NuxtLink :to="data.values.link_2" class="banner p-4 md:p-8 hover:shadow-md overflow-hidden h-[240px] md:h-[290px] relative">
          <div class="banner-overlay"></div>
          <div class="banner-bg" :style="{ backgroundImage: 'url(' + imghttps(data.values.image_2.image) + ')' }"></div>
          <div class="banner-content text-left pl-8">
            <p class="banner-subtitle text-sm md:text-base mb-1">{{ data.values.subtitle_2 }}</p>
            <h3 class="banner-title text-xl md:text-2xl text-gray-800 mb-2 md:mb-3 max-w-64">{{data.values.title_2}}</h3>
            <span class="banner-link mt-1 inline-flex items-center">
              {{ data.values.cta_text_2 }}
              <span class="banner-arrow">→</span>
            </span>
          </div>
        </NuxtLink>
        
        <!-- Bottom Right Banner -->
        <NuxtLink :to="data.values.link_3" class="banner p-4 md:p-8 hover:shadow-md overflow-hidden h-[240px] md:h-[290px] relative">
          <div class="banner-overlay"></div>
          <div class="banner-bg" :style="{ backgroundImage: 'url(' + imghttps(data.values.image_3.image) + ')' }"></div>
          <div class="banner-content text-left pl-8">
            <p class="banner-subtitle text-sm md:text-base mb-1">{{ data.values.subtitle_3 }}</p>
            <h3 class="banner-title text-xl md:text-2xl text-gray-800 mb-2 md:mb-3 max-w-64">{{data.values.title_3}}</h3>
            <span class="banner-link mt-1 inline-flex items-center">
              {{ data.values.cta_text_3 }}
              <span class="banner-arrow">→</span>
            </span>
          </div>
        </NuxtLink>
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
.banner {
  border-radius: var(--image-border-radius);
  transition: all 0.3s ease;
}
.banner-large {
  transition: height 0s;
}
.banner-large .banner-content {
  border-color: var(--banner-content-border-color);
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
  z-index: -1;
}

.banner:hover .banner-bg {
  transform: scale(1.05);
}

.banner-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  border: 4px solid;
  border-color: transparent;
  border-radius: var(--image-border-radius);
  transition: all 0.3s;
}

.banner-link {
  display: inline-block;
  position: relative;
  color: var(--banner-link-color);
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s;
  font-size: 0.9rem;
  width: fit-content;
}

.banner-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--banner-link-color);
  transition: all 0.3s;
}

.banner-link:hover {
  color: var(--banner-link-hover-color);
}

.banner-link:hover .banner-arrow {
  transform: translateX(3px);
}

.banner-link:hover::after {
  background-color: var(--banner-link-hover-color);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--banner-overlay-bg);
  z-index: 1;
}

.banner-title {
  color: var(--banner-title-color);
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
  transition: transform 0.3s, color 0.3s;
}

.banner-title:hover {
  color: var(--banner-title-hover-color);
}

.banner-subtitle {
  color: var(--banner-subtitle-color);
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  transition: transform 0.3s, color 0.3s;
}

.banner-subtitle:hover {
  color: var(--banner-subtitle-hover-color);
}

.banner:hover .banner-title,
.banner:hover .banner-subtitle {
  transform: translateY(-2px);
}

.banner:hover .banner-content {
  border-color: var(--banner-content-border-color);
  background-color: var(--banner-content-hover-bg);
}

.banner-arrow {
  margin-left: 0.5rem;
  transition: transform 0.3s;
}
</style>
