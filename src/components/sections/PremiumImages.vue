<template>
  <div :class="{ 'no-padding': data.design?.container === 'container-fluid' }">
    <div class="section-image-grid">
      <div class="mx-auto">
        <div class="image-grid">
          <a :href="data.values.link_1" class="image-item">
            <div class="image-bg">
              <img 
                :src="imghttps(data.values.image_1?.image)" 
                :alt="data.values.title_1" 
                loading="lazy" 
                :style="{ borderRadius: data.values.image_border_radius + 'px' }"
              />
            </div>
            <div class="image-title">
              <p :class="data.values.font_weight">
                {{ data.values.title_1 }}
              </p>
            </div>
            <div 
              class="image-button" 
              :style="{ borderRadius: data.values.btn_border_radius + 'px' }"
            >
              {{ data.values.btn_text_1 }}
            </div>
          </a>
          
          <a :href="data.values.link_2" class="image-item">
            <div class="image-bg">
              <img 
                :src="imghttps(data.values.image_2?.image)" 
                :alt="data.values.title_2" 
                loading="lazy" 
                :style="{ borderRadius: data.values.image_border_radius + 'px' }"
              />
            </div>
            <div class="image-title">
              <p :class="data.values.font_weight">
                {{ data.values.title_2 }}
              </p>
            </div>
            <div 
              class="image-button" 
              :style="{ borderRadius: data.values.btn_border_radius + 'px' }"
            >
              {{ data.values.btn_text_2 }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.section-image-grid {
  margin-top: 0px;
  margin-bottom: 0px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
  gap: 0px;
  padding: 0px 0px;
  overflow: hidden;
}

.image-item {
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 28px 16px;
  border-radius: 0px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  aspect-ratio: 12/12;
}

.image-item::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0);
  z-index: 1;
}

.image-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.image-bg img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-title {
  text-align: center;
  position: relative;
  z-index: 2;
}

.image-title * {
  margin: 0;
  font-size: v-bind('data.values.title_font_size_mobile + "px"');
  color: v-bind('data.values.title_color');
  line-height: 110%;
  text-transform: unset;
  font-style: normal;
}

.image-button {
  font-size: 14px;
  font-weight: 700;
  color: v-bind('data.values.btn_color');
  line-height: 120%;
  text-transform: unset;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 12px 38px;
  background-color: v-bind('data.values.btn_background_color + data.values.btn_opacity');
  transition: all 0.25s ease 0s;
  position: relative;
  z-index: 2;
  margin: 30px auto 0 auto;
  font-weight: 500;
  font-style: normal;
}

.image-button:hover {
  color: v-bind('data.values.btn_color_hover');
  background-color: v-bind('data.values.btn_background_hover + data.values.btn_opacity_hover');
  transition: all 0.25s ease 0s;
}

@media(min-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media(min-width: 1024px) {
  .section-image-grid {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .image-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0px;
    padding: 0px 0px;
  }

  .image-item {
    padding: 42px 26px;
    justify-content: end;
    aspect-ratio: 12/12;
  }

  .image-title {
    text-align: center;
  }

  .image-title * {
    font-size: v-bind('data.values.title_font_size_desktop + "px"');
  }

  .image-button {
    margin-top: 16px;
    gap: 28px;
    padding: 16px 50px;
    font-size: 16px;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
</style>
