<template>
    <div
      class="flex flex-wrap items-center"
      :class="{ 'no-padding': data.design?.container === 'container-fluid' }" 
      :style="{
        '--banners-border-radius': data.values.banners_border_radius + 'px' || '0px',
        '--banners-gap': data.values.banners_gap + 'px' || '0px',
        '--overlay-color': data.values.overlay_color || 'rgba(0, 0, 0, 0.2)',
      }"
    >
      <div
        v-for="(image, index) in data.values.children"
        :key="index"
        :class="[
          bootstrapToTailwindMap[image.width_mobile] || 'w-full',
          bootstrapToTailwindMap[image.width] || 'w-full',
        ]"
        class="banner-item"
        :style="{
          padding: 'calc(var(--banners-gap) / 2)',
        }"
      >
        <NuxtLink
          v-if="image.link"
          :to="image.link"
          class="banner-image-container"
        >
          <div class="banner-image-wrapper">
            <NuxtImg
              :src="imghttps(image.img.image)"
              class="banner-image"
            />
          </div>
          <div class="banner-overlay"></div>
        </NuxtLink>
  
        <div v-else class="banner-image-container">
          <div class="banner-image-wrapper">
            <NuxtImg
              :src="imghttps(image.img.image)"
              class="banner-image"
            />
          </div>
          <div class="banner-overlay"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { imghttps } from "~/composables/services/helpers";
  // Define props
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  });
  
  // Legacy Bootstrap to Tailwind mapping
  const bootstrapToTailwindMap = {
    // Desktop classes
    "col-lg-12": "lg:w-full",
    "col-lg-9": "lg:w-3/4",
    "col-lg-8": "lg:w-2/3",
    "col-lg-6": "lg:w-1/2",
    "col-lg-4": "lg:w-1/3",
    "col-lg-3": "lg:w-1/4",
    // Mobile classes
    "col-12": "w-full",
    "col-6": "w-1/2",
  };
  </script>
  
  <style scoped>
  .banner-item {
    flex-shrink: 0;
    box-sizing: border-box;
  }
  
  .banner-image-container {
    position: relative;
    overflow: hidden;
    border-radius: var(--banners-border-radius);
    width: 100%;
    height: auto;
    display: block;
    background: transparent;
  }
  
  .banner-image-wrapper {
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: var(--banners-border-radius);
  }
  
  .banner-image {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--banners-border-radius);
    transition: transform 0.3s ease-in-out;
  }
  
  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--overlay-color);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
    border-radius: var(--banners-border-radius);
  }
  
  .banner-image-container:hover .banner-overlay {
    opacity: 1;
  }
  
  .banner-image-container:hover .banner-image {
    transform: scale(1.01);
  }
  </style>