<template>
  <div class="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-3 md:gap-5"
    :style="{
      '--image-border-radius': data.values.image_border_radius+'px',
      '--banner-overlay-bg': data.values.overlay_bg || 'rgba(255, 255, 255, 0.1)',
      '--banner-content-border-color': data.values.content_border_color || '#ffffff6b',
      '--banner-content-hover-bg': data.values.content_hover_bg || 'rgba(255, 255, 255, 0.4)',
      '--banner-link-color': data.values.link_color || '#ffffff',
      '--banner-link-hover-color': data.values.link_hover_color || '#ffffff',
      '--banner-subtitle-color': data.values.subtitle_color || '#ffffff',
      '--banner-title-color': data.values.title_color || '#ffffff',
    }"
  >
    <!-- First Banner -->
    <div class="md:col-span-4 lg:col-span-4">
      <a :href="data.values.url_1" class="banner primary-banner p-4 md:p-6 hover:shadow-md overflow-hidden relative block aspect-[3/4] h-auto lg:aspect-auto lg:h-full">
        <div class="banner-overlay"></div>
        <div class="banner-bg" :style="{ backgroundImage: 'url(' + data.values.image_1.image + ')' }"></div>
        <div class="banner-content text-left pl-6 md:pl-8">
          <p class="banner-subtitle text-sm md:text-base mb-1">{{ data.values.subtitle_1 || 'New Collection' }}</p>
          <h3 class="banner-title text-xl md:text-2xl mb-2 md:mb-3 max-w-64">{{ data.values.title_1 || 'Featured Products' }}</h3>
          <span class="banner-link mt-1 inline-flex items-center">
            {{ data.values.cta_text_1 || 'Shop Now' }}
            <span class="banner-arrow">→</span>
          </span>
        </div>
      </a>
    </div>

    <!-- Fourth Banner -->
    <div class="md:col-span-4 lg:col-span-4 lg:order-last">
      <a :href="data.values.url_4" class="banner primary-banner p-4 md:p-6 hover:shadow-md overflow-hidden relative block aspect-[3/4] h-auto lg:aspect-auto lg:h-full">
        <div class="banner-overlay"></div>
        <div class="banner-bg" :style="{ backgroundImage: 'url(' + data.values.image_4.image + ')' }"></div>
        <div class="banner-content text-left pl-6 md:pl-8">
          <p class="banner-subtitle text-sm md:text-base mb-1">{{ data.values.subtitle_4 || 'Special Offers' }}</p>
          <h3 class="banner-title text-xl md:text-2xl mb-2 md:mb-3 max-w-64">{{ data.values.title_4 || 'Season Sale' }}</h3>
          <span class="banner-link mt-1 inline-flex items-center">
            {{ data.values.cta_text_4 || 'Shop Now' }}
            <span class="banner-arrow">→</span>
          </span>
        </div>
      </a>
    </div>

    <!-- Middle Column (Two Banners) -->
    <div class="grid md:col-span-8 lg:col-span-4 lg:order-2 md:grid md:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-5">
      <!-- Top Middle Banner -->
      <a :href="data.values.url_2" class="banner p-4 md:p-6 hover:shadow-md overflow-hidden min-h-[260px] sm:min-h-[300px] relative block">
        <div class="banner-overlay"></div>
        <div class="banner-bg" :style="{ backgroundImage: 'url(' + data.values.image_2.image + ')' }"></div>
        <div class="banner-content text-left pl-6 md:pl-8">
          <p class="banner-subtitle text-sm md:text-base mb-1">{{ data.values.subtitle_2 || 'Limited Time' }}</p>
          <h3 class="banner-title text-xl md:text-2xl mb-2 md:mb-3 max-w-64">{{ data.values.title_2 || 'New Arrivals' }}</h3>
          <span class="banner-link mt-1 inline-flex items-center">
            {{ data.values.cta_text_2 || 'Shop Now' }}
            <span class="banner-arrow">→</span>
          </span>
        </div>
      </a>
      
      <!-- Bottom Middle Banner -->
      <a :href="data.values.url_3" class="banner p-4 md:p-6 hover:shadow-md overflow-hidden min-h-[260px] sm:min-h-[300px] relative block">
        <div class="banner-overlay"></div>
        <div class="banner-bg" :style="{ backgroundImage: 'url(' + data.values.image_3.image + ')' }"></div>
        <div class="banner-content text-left pl-6 md:pl-8">
          <p class="banner-subtitle text-sm md:text-base mb-1">{{ data.values.subtitle_3 || 'Trending Items' }}</p>
          <h3 class="banner-title text-xl md:text-2xl mb-2 md:mb-3 max-w-64">{{ data.values.title_3 || 'Popular Products' }}</h3>
          <span class="banner-link mt-1 inline-flex items-center">
            {{ data.values.cta_text_3 || 'Discover Now' }}
            <span class="banner-arrow">→</span>
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
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

/* Style for banners 1 and 4 */
.primary-banner .banner-content {
  border-color: var(--banner-content-border-color);
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
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
  transition: transform 0.3s;
  color: var(--banner-title-color);
}

.banner-subtitle {
  color: var(--banner-subtitle-color);
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  transition: transform 0.3s, color 0.3s;
}

.banner-subtitle:hover {
  color: var(--banner-link-hover-color);
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