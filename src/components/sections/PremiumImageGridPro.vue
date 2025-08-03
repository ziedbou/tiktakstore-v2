<template>
  <div class="w-full bg-[#EDF1F2] py-10">
    <div class="mx-auto max-w-screen-xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <a
          v-for="(child, index) in data.values.children"
          :key="index"
          :href="child.link"
          class="relative rounded-lg overflow-hidden group"
        >
          <!-- Image -->
          <img
            :src="imghttps(child.image.image)"
            :alt="child.image.alt || ''"
            loading="lazy"
            class="w-full h-full object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
          />

          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/30 z-10"></div>

          <!-- Title -->
          <div
            class="absolute bottom-16 w-full text-center z-20"
          >
            <h2 class="text-white text-3xl font-semibold tracking-wide">
              {{ child.title }}
            </h2>
          </div>

          <!-- Button -->
          <div class="absolute bottom-4 w-full text-center z-20">
            <span
              class="inline-block bg-white text-black font-bold px-6 py-2 rounded-md text-sm transition duration-200"
              :style="{
                color: data.values.link_color,
                backgroundColor: data.values.link_background,
                borderRadius: data.values.link_border_radius + 'px'
              }"
            >
              {{ child.link_text }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
