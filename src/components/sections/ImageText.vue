<template>
    <div
      :class="{ 'no-padding': data.design.container === 'container-fluid' }"
      :style="{
        '--border-radius': data.values.border_radius + 'px',
      }"
    >    
        <div class="flex flex-col lg:flex-row w-full gap-4">
            <!-- Image Section -->
            <div
            :class="[
              imageColumnClass,
              {
                'order-1 lg:order-2': data.values.inverse_mobile,
                'order-2 lg:order-2': !data.values.inverse_mobile
              }
            ]"
          >
            <NuxtLink v-if="data.values.link" :to="data.values.link" class="block h-full">
              <NuxtImg
                :src="imghttps(data.values.image.image)"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                :style="{ borderRadius: 'var(--border-radius)' }"
                loading="lazy"
              />
            </NuxtLink>
            <NuxtImg
              v-else
              :src="imghttps(data.values.image.image)"
              class="w-full h-full object-cover"
              :style="{ borderRadius: 'var(--border-radius)' }"
              loading="lazy"
            />
          </div>
          <!-- Text Section -->
          <div
            :class="[
              textColumnClass,
              'flex items-center justify-center',
              {
                'order-2 lg:order-1': data.values.inverse_mobile,
                'order-1 lg:order-1': !data.values.inverse_mobile
              }
            ]"
          >
            <div 
                v-html="data.values.content"
              ></div>
          </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { imghttps } from "~/composables/services/helpers";

  const props = defineProps({
    data: {
      type: Object,
      required: true,
    }
  });

  // Bootstrap to Tailwind mapping (only for your specific options)
  const bootstrapToTailwindMap = {
    "col-md-6": "w-full lg:w-1/2",     // 50%
    "col-md-9": "w-full lg:w-3/4",     // 75%
    "col-md-8": "w-full lg:w-2/3",     // 66.67%
    "col-md-3": "w-full lg:w-1/4",     // 25%
    "col-md-4": "w-full lg:w-1/3",     // 33.33%
  };

  // Parse column widths from column_width string
  const columnWidths = computed(() => {
    
    const columns = props.data.values.column_width.trim().split(/\s+/);
    const textColumn = columns[0];
    const imageColumn = columns[1];
    
    return {
      text: bootstrapToTailwindMap[textColumn],
      image: bootstrapToTailwindMap[imageColumn]
    };
  });

  const textColumnClass = computed(() => columnWidths.value.text);
  const imageColumnClass = computed(() => columnWidths.value.image);
  </script>
  