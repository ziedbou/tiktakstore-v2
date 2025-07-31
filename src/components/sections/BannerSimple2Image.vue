<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5" :style="{
    '--image-border-radius': data.values.img_border_radius + 'px',
    '--overlay-bg': data.values.overlay_bg || 'rgba(51, 51, 51, 0.25)',
    '--link-color': data.values.link_color || '#fff',
    '--link-hover-color': data.values.link_hover_color || '#eea287',
    '--subtitle-color': data.values.subtitle_color || '#777',
    '--title-color': data.values.title_color || '#333',
    '--cta-color': data.values.cta_color || '#eea287',
    '--cta-bg-hover': data.values.cta_bg_hover || '#eea287',
  }">
    <a :href="data.values.link_1 || '#'" class="banner-simple relative overflow-hidden group aspect-[16/9]">
      <div class="banner-bg h-full w-full"
        :style="{ backgroundImage: 'url(' + data.values.img_1.image + ')' }"></div>
      <div class="banner-overlay opacity-0 group-hover:opacity-100"></div>
      <div class="banner-content absolute inset-0 flex flex-col justify-center p-8 z-10 space-y-5">
        <p class="banner-subtitle uppercase tracking-wide w-fit text-sm">
          {{ data.values.subtitle_1 || "NEW ARRIVALS" }}
        </p>
        <h3 class="banner-title text-2xl w-fit md:text-3xl font-semibold">
          {{ data.values.title_1 || "WOMEN'S" }}
        </h3>
        <div class="banner-cta mt-2">
          <span class="cta-button">
            <p class="mt-0.5">{{ data.values.cta_text_1 || "SHOP NOW" }}</p>
            <svg class="banner-arrow" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8">
              </path>
            </svg>
          </span>
        </div>
      </div>
    </a>

    <a :href="data.values.link_2 || '#'" class="banner-simple relative overflow-hidden group  aspect-[16/9]">
      <div class="banner-bg w-full h-full"
        :style="{ backgroundImage: 'url(' + data.values.img_2.image + ')' }"></div>
      <div class="banner-overlay opacity-0 group-hover:opacity-100"></div>
      <div class="banner-content absolute inset-0 flex flex-col justify-center p-8 z-10 space-y-5">
        <p class="banner-subtitle uppercase tracking-wide w-fit text-sm">
          {{ data.values.subtitle_2 || "NEW ARRIVALS" }}
        </p>
        <h3 class="banner-title text-2xl w-fit md:text-3xl font-semibold">
          {{ data.values.title_2 || "MEN'S" }}
        </h3>
        <div class="banner-cta mt-2">
          <span class="cta-button">
            <p class="mt-0.5">{{ data.values.cta_text_2 || "SHOP NOW" }}</p>

            <svg class="banner-arrow" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8">
              </path>
            </svg>
          </span>
        </div>
      </div>
    </a>
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
.banner-simple {
  border-radius: var(--image-border-radius);
  transition: all 0.3s ease;
}

.banner-bg {
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.5s ease;
}

.banner-simple:hover .banner-bg {
  transform: scale(1.05);
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--overlay-bg);
  transition: opacity 0.3s ease;
  z-index: 1;
}

.banner-title {
  color: var(--title-color);
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: transform 0.3s, color 0.3s;
}

.banner-title:hover {
  color: var(--link-hover-color);
}

.banner-subtitle {
  color: var(--subtitle-color);
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: transform 0.3s, color 0.3s;
}

.banner-subtitle:hover {
  color: var(--link-hover-color);
}

.banner-simple:hover .banner-title,
.banner-simple:hover .banner-subtitle {
  transform: translateY(-2px);
}

.banner-cta {
  transition: all 0.3s ease;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border: 2px solid var(--cta-color, #eea287);
  color: var(--cta-color, #eea287);
  background-color: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.banner-simple:hover .cta-button {
  background-color: var(--cta-bg-hover, #eea287);
  color: white;
}

.banner-arrow {
  margin-left: 0.5rem;
  transition: transform 0.3s;
  display: inline-flex;
  align-items: center;
}
.banner-simple:hover .banner-arrow {
  transform: translateX(3px);
}
</style>
