<template>
  <div
    class="flex flex-col gap-3 md:gap-5"
    :style="{
      '--image-border-radius': data.values.image_border_radius + 'px',
      '--banner-overlay-bg':
        data.values.overlay_bg || 'rgba(255, 255, 255, 0.1)',
      '--banner-content-border-color':
        data.values.content_border_color || '#ffffff6b',
      '--banner-content-hover-bg':
        data.values.content_hover_bg || 'rgba(255, 255, 255, 0.0)',
      '--banner-link-color': data.values.link_color || '#ffffff',
      '--banner-hover-color': data.values.hover_color || '#cc6666',
      '--banner-subtitle-color': data.values.subtitle_color || '#ffffff',
      '--banner-title-color': data.values.title_color || '#ffffff',
    }"
  >
    <!-- First Row - Two Large Banners stacked on mobile, side by side on md+ -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
      <!-- First Banner -->
      <a
        :href="data.values.url_1"
        class="banner p-4 md:p-6 hover:shadow-md overflow-hidden relative block aspect-[44/25]"
      >
        <div class="banner-overlay"></div>
        <div
          class="banner-bg"
          :style="{ backgroundImage: 'url(' + data.values.image_1.image + ')' }"
        ></div>
        <div class="banner-content text-center">
          <p class="banner-subtitle text-sm md:text-base mb-4">
            {{ data.values.subtitle_1 || "NEW COLLECTION" }}
          </p>
          <h3 class="banner-title text-xl md:text-3xl mb-2 md:mb-3">
            {{ data.values.title_1 || "SHOP WOMEN'S" }}
          </h3>
          <span class="banner-link mt-1 inline-flex items-center">
            {{ data.values.link_text_1 || "DISCOVER NOW" }}
            <span class="banner-arrow">→</span>
          </span>
        </div>
      </a>

      <!-- Second Banner -->
      <a
        :href="data.values.url_2"
        class="banner p-4 md:p-6 hover:shadow-md overflow-hidden relative block aspect-[44/25]"
      >
        <div class="banner-overlay"></div>
        <div
          class="banner-bg"
          :style="{ backgroundImage: 'url(' + data.values.image_2.image + ')' }"
        ></div>
        <div class="banner-content text-center">
          <p class="banner-subtitle text-sm md:text-base mb-4">
            {{ data.values.subtitle_2 || "NEW COLLECTION" }}
          </p>
          <h3 class="banner-title text-xl md:text-3xl mb-2 md:mb-3">
            {{ data.values.title_2 || "SHOP MEN'S" }}
          </h3>
          <span class="banner-link mt-1 inline-flex items-center">
            {{ data.values.link_text_2 || "DISCOVER NOW" }}
            <span class="banner-arrow">→</span>
          </span>
        </div>
      </a>
    </div>

    <!-- Bottom Row - Three Banners with layout: 2 on top, 1 full width below on smaller screens -->
    <div
      class="grid grid-cols-1 grid-rows-3 md:grid-cols-4 md:grid-rows-2 lg:grid-cols-6 lg:grid-rows-1 gap-4 md:gap-5"
    >
      <!-- Third Banner -->
      <a
        :href="data.values.url_3"
        class="col-span-0 md:col-span-2 lg:col-span-2 banner p-4 xl:p-6 hover:shadow-md overflow-hidden relative block aspect-[29/15]"
      >
        <div class="banner-overlay"></div>
        <div
          class="banner-bg"
          :style="{ backgroundImage: 'url(' + data.values.image_3.image + ')' }"
        ></div>
        <div class="banner-content banner-small-content-right space-y-2 md:space-y-0 lg:space-y-0 xl:space-y-3">
          <p class="banner-subtitle text-sm md:text-base">
            {{ data.values.subtitle_3 || "FLIP FLOP" }}
          </p>
          <h3 class="banner-title text-xl md:text-2xl ">
            {{ data.values.title_3 || "SUMMER SALE -70% OFF" }}
          </h3>
          <span class="banner-link mt-1 inline-flex items-center">
            {{ data.values.link_text_3 || "SHOP NOW" }}
            <span class="banner-arrow">→</span>
          </span>
        </div>
      </a>

      <!-- Fourth Banner -->
      <a
        :href="data.values.url_4"
        class="col-span-0 col-start-0 md:col-span-2 md:col-start-3 lg:col-start-3 banner p-4 xl:p-6 hover:shadow-md overflow-hidden relative block aspect-[29/15]"
      >
        <div class="banner-overlay"></div>
        <div
          class="banner-bg"
          :style="{ backgroundImage: 'url(' + data.values.image_4.image + ')' }"
        ></div>
        <div class="banner-content banner-small-content-left space-y-2 md:space-y-0 lg:space-y-0 xl:space-y-3">
          <p class="banner-subtitle text-sm md:text-base">
            {{ data.values.subtitle_4 || "ACCESSORIES" }}
          </p>
          <h3 class="banner-title text-xl md:text-2xl ">
            {{ data.values.title_4 || "2019 WINTER UP TO 50% OFF" }}
          </h3>
          <span class="banner-link mt-1 inline-flex items-center">
            {{ data.values.link_text_4 || "SHOP NOW" }}
            <span class="banner-arrow">→</span>
          </span>
        </div>
      </a>

      <!-- Fifth Banner -->
      <a
        :href="data.values.url_5"
        class="col-span-0 col-start-0 md:col-span-2 md:col-start-2 md:row-start-2 lg:row-start-1 lg:col-start-5 banner p-4 xl:p-6 hover:shadow-md overflow-hidden relative block aspect-[29/15]"
      >
        <div class="banner-overlay"></div>
        <div
          class="banner-bg"
          :style="{ backgroundImage: 'url(' + data.values.image_5.image + ')' }"
        ></div>
        <div class="banner-content banner-small-content-right space-y-2 md:space-y-0 lg:space-y-0 xl:space-y-3">
          <p class="banner-subtitle text-sm md:text-base">
            {{ data.values.subtitle_5 || "NEW IN" }}
          </p>
          <h3 class="banner-title text-xl md:text-2xl ">
            {{ data.values.title_5 || "WOMEN'S SPORTSWEAR" }}
          </h3>
          <span class="banner-link mt-1 inline-flex items-center">
            {{ data.values.link_text_5 || "SHOP NOW" }}
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
  align-items: center;
  padding: 2rem;
  border: 4px solid;
  border-color: transparent;
  border-radius: var(--image-border-radius);
  transition: all 0.3s;
}

.banner-small-content-right {
  align-items: flex-start;
  padding-left: 45%;
  padding-right: 10px;
}

.banner-small-content-left {
  align-items: flex-start;
  padding-right: 45%;
  padding-left: 10px;
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
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--banner-link-color);
  transition: all 0.3s;
}

.banner-link:hover {
  color: var(--banner-hover-color);
}

.banner-link:hover .banner-arrow {
  transform: translateX(3px);
}

.banner-link:hover::after {
  background-color: var(--banner-hover-color);
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
  letter-spacing: -0.01em;
  transition: transform 0.3s, color 0.3s;
  color: var(--banner-title-color);
}

.banner-title:hover {
  color: var(--banner-hover-color);
}

.banner-subtitle {
  color: var(--banner-subtitle-color);
  font-weight: 300;
  letter-spacing: -0.01em;
  transition: transform 0.3s, color 0.3s;
}

.banner-subtitle:hover {
  color: var(--banner-hover-color);
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
