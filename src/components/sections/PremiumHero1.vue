<template>
  <div 
    class="hero-body"
    :style="{
      '--title-size-mobile': data.values.title_size_mobile + 'px',
      '--title-size-desktop': data.values.title_size_desktop + 'px',
      '--text-size-mobile': data.values.text_size_mobile + 'px',
      '--text-size-desktop': data.values.text_size_desktop + 'px',
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--btn-color': data.values.btn_color,
      '--btn-background': data.values.btn_backgroung,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-background-hover': data.values.btn_backgroung_hover,
      '--btn-border-radius': data.values.btn_border_radius + 'px',
      '--img-border-radius': data.values.img_border_radius + 'px'
    }"
  >
    <div class="hero-content">
      <div class="hero-heading">
        <p><strong>{{ data.values.title }}</strong></p>
      </div>
      <div class="hero-text">
        <p>{{ data.values.description }}</p>
      </div>
      <a :href="data.values.link" class="hero-button">
        {{ data.values.btn_text }}
      </a>
    </div>
    <div class="hero-images">
      <div class="hero-images-wrapper">
        <div class="hero-images-gradient"></div>
        <div class="hero-images-left">
          <div class="hero-images-inner">
            <div 
              v-for="(child, index) in data.values.imgs_1" 
              :key="index"
              class="hero-image"
            >
              <img :src="imghttps(child.image)" alt="" loading="lazy">
            </div>
          </div>
        </div>
        <div class="hero-images-right">
          <div class="hero-images-inner">
            <div 
              v-for="(child, index) in data.values.imgs_2" 
              :key="index"
              class="hero-image"
            >
              <img :src="imghttps(child.image)" alt="" loading="lazy">
            </div>
          </div>
        </div>
        <div class="hero-images-gradient bottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.hero-body {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 40px;
  align-items: center;
}

.hero-content {
  margin-left: 0;
}

.hero-heading {
  margin-top: 20px;
  text-align: center;
}

.hero-heading * {
  margin: 0;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 110%;
  text-transform: unset;
}

.hero-text {
  margin-top: 18px;
  text-align: center;
}

.hero-text * {
  margin: 0;
  font-size: var(--text-size-mobile);
  color: var(--text-color);
  line-height: 170%;
  text-transform: unset;
}

.hero-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 250px;
  margin: 0;
  margin-top: 16px;
  font-size: 17px;
  color: var(--btn-color);
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 16px 24px;
  border-radius: var(--btn-border-radius);
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
  background-color: var(--btn-background);
  margin-left: auto;
  margin-right: auto;
}

.hero-button:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-background-hover);
  transition: all 0.25s ease 0s;
}

.hero-images-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  height: 300px;
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
}

.hero-images-left,
.hero-images-right {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.hero-images-inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 0px 5px;
}

.hero-image {
  border-radius: var(--img-border-radius);
  overflow: hidden;
  aspect-ratio: 12/9;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
}

.hero-image img,
.hero-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-image svg {
  background-color: #AFAFAF;
}

.hero-images-left {
  animation: leftImagesAnimation 60s linear infinite alternate;
}

.hero-images-right {
  animation: rightImagesAnimation 60s linear infinite alternate;
}

@keyframes leftImagesAnimation {
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-50%);
  }
}

@keyframes rightImagesAnimation {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
}

@media (min-width: 1024px) {
  .hero-body {
    grid-template-columns: repeat(2, 1fr);
    gap: 80px;
  }

  .hero-heading * {
    font-size: var(--title-size-desktop);
  }

  .hero-heading {
    margin-top: 0;
    text-align: left;
  }

  .hero-text {
    margin-top: 24px;
    text-align: left;
  }

  .hero-text * {
    font-size: var(--text-size-desktop);
  }

  .hero-button {
    margin-top: 40px;
    max-width: 250px;
    padding: 16px 24px;
    font-size: 18px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .hero-images-wrapper {
    height: 700px;
    max-width: 100%;
    gap: 20px;
  }

  .hero-images-gradient {
    height: 220px;
  }

  .hero-content {
    margin-left: 20px;
    order: 1;
  }

  .hero-images {
    order: 2;
  }

  .hero-image {
    aspect-ratio: 12/12;
  }
}

a:empty,
ul:empty,
dl:empty,
div:empty,
section:empty,
article:empty,
p:empty,
h1:empty,
h2:empty,
h3:empty,
h4:empty,
h5:empty,
h6:empty {
  display: none;
}
</style>
