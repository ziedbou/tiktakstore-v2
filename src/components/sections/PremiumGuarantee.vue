<template>
  <div 
    class="services-grid"
    :style="{
      '--border-color': data.values.border_color,
      '--title-color': data.values.title_color,
      '--subtitle-color': data.values.subtitle_color
    }"
  >
    <div class="service-item">
      <div class="service-icon">
        <img :src="imghttps(data.values.image_1.image)">
      </div>
      <div class="service-content">
        <h3 class="service-title">{{ data.values.title_1 }}</h3>
        <p class="service-description">{{ data.values.subtitle_1 }}</p>
      </div>
    </div>

    <div class="service-item">
      <div class="service-icon">
        <img :src="imghttps(data.values.image_2.image)">
      </div>
      <div class="service-content">
        <h3 class="service-title">{{ data.values.title_2 }}</h3>
        <p class="service-description">{{ data.values.subtitle_2 }}</p>
      </div>
    </div>

    <div class="service-item">
      <div class="service-icon">
        <img :src="imghttps(data.values.image_3.image)">
      </div>
      <div class="service-content">
        <h3 class="service-title">{{ data.values.title_3 }}</h3>
        <p class="service-description">{{ data.values.subtitle_3 }}</p>
      </div>
    </div>

    <div class="service-item">
      <div class="service-icon">
        <img :src="imghttps(data.values.image_4.image)">
      </div>
      <div class="service-content">
        <h3 class="service-title">{{ data.values.title_4 }}</h3>
        <p class="service-description">{{ data.values.subtitle_4 }}</p>
      </div>
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
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border-color);
}

.service-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
}

.service-icon {
  flex-shrink: 0;
  width: 62px;
  height: 62px;
}

.service-icon img {
  width: 100%;
  height: 100%;
}

.service-icon svg {
  width: 100%;
  height: 100%;
  fill: #0066cc;
}

.service-content {
  text-align: left;
}

.service-title {
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  color: var(--title-color);
  text-transform: uppercase;
}

.service-description {
  font-size: 14px;
  color: var(--subtitle-color);
  margin: 0;
}

/* Responsive Design */
@media screen and (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 576px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .service-item {
    padding: 15px;
    justify-content: center;
  }
}
</style>
