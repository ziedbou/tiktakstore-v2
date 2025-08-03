<template>
    <div 
      class="flex flex-wrap justify-center !px-1.5"
      :style="{
        '--cta-color': data.values.cta_color || 'rgb(71, 85, 105)',
        '--cta-color-hover': data.values.cta_color_hover || 'rgb(255, 255, 255)',
        '--cta-background': data.values.cta_background || 'rgba(71, 85, 105, 0.1) ',
        '--cta-background-hover': data.values.cta_background_hover || 'rgb(71, 85, 105)',
        '--cta-border-radius': (data.values.cta_border_radius || 0) + 'px',
        '--overlay': data.values.overlay || 'rgba(0, 0, 0, 0.1)',
        '--overlay-hover': data.values.overlay_hover || 'rgba(0, 0, 0, 0.4)',
        '--aspect-ratio': data.values.ratio || '2/3',
        '--border-radius': data.values.border_radius || '0px',
      }"
    >
          <div 
            v-for="(item, index) in data.values.children" 
            :key="index"
            :class="[cardColumnClass, 'px-2 mb-6']"
          >
            <NuxtLink 
              :to="item.link_widget"
              class="group block relative overflow-hidden rounded-[var(--border-radius)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <!-- Desktop/Image Content -->
              <div class="relative overflow-hidden">
                <NuxtImg
                  :src="imghttps(item.image.image)"
                  :alt="item.title"
                  class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 aspect-[var(--aspect-ratio)]"
                  loading="lazy"
                />
                <!-- Overlay -->
                <div class="absolute inset-0 bg-[var(--overlay)] group-hover:bg-[var(--overlay-hover)] transition-all duration-300"></div>
              </div>
              
              <!-- Content Section -->
              <div 
                :class="data.values.style === 'text-on-image'
                  ? 'absolute bottom-0 p-3' : 'p-5'"
                  class="bg-transparent"
              >
                <h3 class="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300">
                  {{ item.title }}
                </h3>
                <p class="text-gray-600 text-sm mb-4 truncate">
                  {{ item.description }}
                </p>
                <div
            class="group/btn relative inline-flex items-center gap-2 px-3 lg:px-4 py-3 lg:py-4 bg-[var(--cta-background)] text-[var(--cta-color)] hover:text-[var(--cta-color-hover)] rounded-[var(--cta-border-radius)] font-medium text-sm tracking-wide uppercase overflow-hidden transition-all duration-500 ease-out hover:bg-[var(--cta-background-hover)] hover:shadow-2xl hover:-translate-y-2"
          >
            <!-- Sliding background effect -->
            <div
              class="absolute inset-0 bg-[var(--cta-background-hover)] transform -translate-x-full group-hover:translate-x-0 group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"
            ></div>

            <span
              class="relative z-20 transition-all duration-300 group-hover:text-[var(--cta-color-hover)] group-hover/btn:text-[var(--cta-color-hover)]"
              >{{ item.link_label }}</span
            >
            <div class="w-5 h-5 relative overflow-hidden z-20">
              <MoveRight
                class="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-0 group-hover/btn:translate-x-8 group-hover/btn:opacity-0 group-hover:text-[var(--cta-color-hover)]"
              />
              <MoveRight
                class="w-5 h-5 absolute top-0 -left-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-100 group-hover/btn:translate-x-8 group-hover/btn:opacity-100 group-hover:text-[var(--cta-color-hover)]"
              />
            </div>
          </div>
              </div>
            </NuxtLink>
          </div>
        </div>
     
  
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { MoveRight } from "lucide-vue-next";
import { imghttps } from '~/composables/services/helpers';
  
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    section: {
      type: Object,
      default: () => ({}),
    },
  });

  // Bootstrap to Tailwind mapping for cards per row
  const bootstrapToTailwindMap = {
    "col-md-12": "w-full",           // 1 per row
    "col-md-6": "w-full sm:w-1/2",   // 2 per row  
    "col-md-4": "w-full sm:w-1/2 lg:w-1/3",  // 3 per row
    "col-md-3": "w-full sm:w-1/2 lg:w-1/4",  // 4 per row
  };

  // Parse column class from column string
  const cardColumnClass = computed(() => {
    return bootstrapToTailwindMap[props.data.values?.column || 'col-md-4'];
  });
  </script>
  
  