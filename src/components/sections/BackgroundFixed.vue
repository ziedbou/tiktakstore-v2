<template>
    <div
      class="parallax-container overflow-hidden"
      :class="{ 'no-padding': data.design.container === 'container-fluid' }"
      :style="{
        '--height': data.values.height + 'px',
        '--text-color': data.values.text_color,
        '--subtitle-color': data.values.subtitle_color,
        '--cta-background': data.values.background_button,
        '--cta-background-hover': data.values.cta_background_hover,
        '--cta-border-radius': data.values.cta_border_radius + 'px',
        '--cta-color': data.values.color_button,
        '--cta-color-hover': data.values.cta_color_hover,
        '--bg-image': `url(${imghttps(data.values.background.image)})`,
        '--bg-image-mobile': `url(${imghttps(data.values.image_mobile.image)})`,
      }"
    >
      <div
        class="h-[var(--height)] parallax-effect relative flex items-center justify-center bg-cover bg-center bg-fixed"
      >
        <!-- Overlay for better text readability -->
        <div class="absolute inset-0"></div>
        
        <!-- Content Container -->
        <div class="container mx-auto px-4 text-center relative z-10">
          <!-- Subtitle -->
          <h3
            v-if="data.values.subtitle"
            class="text-[var(--subtitle-color)] text-xl md:text-2xl lg:text-3xl font-light mb-4 animate-fade-in-up"
          >
            {{ data.values.subtitle }}
          </h3>
          
          <!-- Title -->
          <h1
            v-if="data.values.title"
            class="text-[var(--text-color)] text-3xl md:text-4xl lg:text-5xl font-bold mb-8 animate-fade-in-up animation-delay-200"
          >
            {{ data.values.title }}
          </h1>
          
          <!-- Button -->
          <NuxtLink
            class="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--cta-background)] text-[var(--cta-color)] hover:text-[var(--cta-color-hover)] rounded-[var(--cta-border-radius)] font-medium text-sm tracking-wide uppercase overflow-hidden transition-all duration-500 ease-out hover:bg-[var(--cta-background-hover)] hover:shadow-2xl hover:-translate-y-2"
          >
            <!-- Sliding background effect -->
            <div
              class="absolute inset-0 bg-[var(--cta-background-hover)] transform -translate-x-full group-hover:translate-x-0 group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"
            ></div>

            <span
              class="relative z-20 transition-all duration-300 group-hover:text-[var(--cta-color-hover)] group-hover/btn:text-[var(--cta-color-hover)]"
              >{{ data.values.button_text }}</span
            >
            <div class="w-5 h-5 relative overflow-hidden z-20">
              <MoveRight
                class="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-0 group-hover/btn:translate-x-8 group-hover/btn:opacity-0 group-hover:text-[var(--cta-color-hover)]"
              />
              <MoveRight
                class="w-5 h-5 absolute top-0 -left-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-100 group-hover/btn:translate-x-8 group-hover/btn:opacity-100 group-hover:text-[var(--cta-color-hover)]"
              />
            </div>
          </NuxtLink>





        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { imghttps } from '~/composables/services/helpers';
import { MoveRight } from "lucide-vue-next";

  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    index: [String, Number],
  });
  </script>
  
  <style scoped>
  .parallax-effect {
    background-image: var(--bg-image);
  }
  
  /* Mobile background */
  @media (max-width: 768px) {
    .parallax-effect {
      background-image: var(--bg-image-mobile);
      background-attachment: scroll; /* Disable fixed on mobile for better performance */
    }
  }
  
  /* Animation classes */
  .animate-fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
  }
  
  .animation-delay-400 {
    animation-delay: 0.4s;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>