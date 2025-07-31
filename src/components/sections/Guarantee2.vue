<template>
  <div 
    class="default-container guarantee-2"
    :style="{
      '--box-border-radius':data.values.border_radius,
      '--box-bg': data.values.box_bg_color,
      '--box-bg-hover': data.values.box_bg_hover_color,
      '--box-border': data.values.box_border_color,
      '--box-border-hover': data.values.box_border_hover_color,
      '--title-color': data.values.title_color,
      '--title-color-hover': data.values.title_hover_color,
      '--text-color': data.values.text_color,
      '--text-color-hover': data.values.text_hover_color ,
      '--icon-color': data.values.icon_color || '#4f46e5',
      '--icon-color-hover': data.values.icon_hover_color || '#6366f1'
    }"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-3">
        <!-- First Box -->
        <div class="md:col-span-2 lg:col-span-1 lg:col-start-auto lg:row-start-auto cursor-pointer">
          <div class="icon-box flex flex-col items-center text-center sm:flex-row sm:text-left p-5 rounded cursor-pointer">
            <span class="icon-box-icon mb-3 sm:mb-0 sm:mr-4">
              <img 
                v-if="data.values.icon_1?.image_thumb" 
                class="icon w-10 h-10" 
                :src="data.values.icon_1.image_thumb" 
                alt=""
              >
              <i v-else class="icon-rocket text-3xl"></i>
            </span>
            <div class="icon-box-content">
              <h3 class="icon-box-title text-lg font-semibold mb-1">{{ data.values.title_1 }}</h3>
              <p class="text-sm">{{ data.values.subtitle_1 }}</p>
            </div>
          </div>
        </div>

        <!-- Second Box -->
        <div class="md:col-span-2 md:col-start-3 lg:col-span-1 lg:col-start-auto lg:row-start-auto cursor-pointer">
          <div class="icon-box flex flex-col items-center text-center sm:flex-row sm:text-left p-5 rounded">
            <span class="icon-box-icon mb-3 sm:mb-0 sm:mr-4">
              <img 
                v-if="data.values.icon_2?.image_thumb" 
                class="icon w-10 h-10" 
                :src="data.values.icon_2.image_thumb" 
                alt=""
              >
              <i v-else class="icon-rotate-left text-3xl"></i>
            </span>
            <div class="icon-box-content">
              <h3 class="icon-box-title text-lg font-semibold mb-1">{{ data.values.title_2 }}</h3>
              <p class="text-sm">{{ data.values.subtitle_2 }}</p>
            </div>
          </div>
        </div>

        <!-- Third Box -->
        <div class="md:col-span-2 md:col-start-2 md:row-start-2 lg:col-span-1 lg:col-start-auto lg:row-start-auto cursor-pointer">
          <div class="icon-box flex flex-col items-center text-center sm:flex-row sm:text-left p-5 rounded">
            <span class="icon-box-icon mb-3 sm:mb-0 sm:mr-4">
              <img 
                v-if="data.values.icon_3?.image_thumb" 
                class="icon w-10 h-10" 
                :src="data.values.icon_3.image_thumb" 
                alt=""
              >
              <i v-else class="icon-life-ring text-3xl"></i>
            </span>
            <div class="icon-box-content">
              <h3 class="icon-box-title text-lg font-semibold mb-1">{{ data.values.title_3 }}</h3>
              <p class="text-sm">{{ data.values.subtitle_3 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Additional custom styles for any non-Tailwind classes */
.icon-box {
  border-radius: var(--box-border-radius);  
  background-color: var(--box-bg);
  border: 2px solid var(--box-border);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.icon-box:hover {
  transform: translateY(-5px);
  background-color: var(--box-bg-hover);
  border-color: var(--box-border-hover);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.icon-box-title {
  color: var(--title-color);
  transition: color 0.3s ease;
}

.icon-box:hover .icon-box-title {
  color: var(--title-color-hover);
}

.icon-box p {
  color: var(--text-color);
  transition: color 0.3s ease;
}

.icon-box:hover p {
  color: var(--text-color-hover);
}

.icon-box-icon i {
  transition: color 0.3s ease;
}

</style>
