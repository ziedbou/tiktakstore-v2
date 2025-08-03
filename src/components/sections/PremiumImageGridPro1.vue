<template>
  <div 
    class="section image-grid-section default-container"
    :style="{
      '--title-color': data.values.title_color,
      '--link-color': data.values.link_color,
      '--link-border-radius': data.values.link_border_radius + 'px',
      '--link-background': data.values.link_background,
      '--link-color-hover': data.values.link_color_hover,
      '--link-background-hover': data.values.link_background_hover
    }"
  >
    <div class="mx-auto">
      <div class="image-grid">
        <a 
          v-for="(child, index) in data.values.children" 
          :key="index" 
          class="image-item" 
          :href="child.link"
        >
          <div class="image-bg">
            <img :src="imghttps(child.image.image)" alt="" loading="lazy" />
          </div>
          <div class="image-title">
            <h2>{{ child.title }}</h2>
          </div>
          <div class="image-button">
            {{ child.text_link }}
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
    required: true,
  },
});
</script>

<style scoped>
.section {
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
  padding: 16px 16px;
  border: 0px solid #000000;
  border-radius: 0px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  aspect-ratio: 9.6/14;
}

.image-item:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.1);
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

.image-bg img,
.image-bg svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-bg svg {
  background-color: #DEDEDE;
}

.image-title {
  text-align: left;
  position: relative;
  z-index: 2;
}

.image-title * {
  margin: 0;
  font-size: 55px;
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
}

.image-button {
  margin: 0px;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 700;
  color: var(--link-color);
  line-height: 100%;
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
  border-radius: var(--link-border-radius);
  background-color: var(--link-background);
  gap: 21px;
  transition: all 0.25s ease 0s;
  position: relative;
  z-index: 2;
}

.image-button:hover {
  color: var(--link-color-hover);
  background-color: var(--link-background-hover);
  transition: all 0.25s ease 0s;
}

.image-button-icon {
  display: block;
  width: 20px;
  height: 20px;
}

.image-button-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-button svg path {
  stroke: #ffffff;
  transition: all 0.25s ease 0s;
}

.image-button:hover svg path {
  stroke: #ffffff;
  transition: all 0.25s ease 0s;
}

@media(min-width: 768px) {
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media(min-width: 1024px) {
  .section {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .image-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0px;
    padding: 0px 0px;
  }

  .image-item {
    padding: 16px 16px;
    justify-content: end;
    aspect-ratio: 9.6/14;
  }

  .image-title {
    text-align: left;
  }

  .image-title * {
    font-size: 48px;
  }

  .image-button {
    margin-top: 16px;
    gap: 28px;
    padding: 16px 50px;
    font-size: 14px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>