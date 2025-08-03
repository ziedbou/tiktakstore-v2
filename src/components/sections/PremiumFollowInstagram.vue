<template>
  <div class="tiktak-section" :style="{
    '--btn-color': data.values.btn_color,
    '--btn-color-hover': data.values.btn_color_hover || '#ffffff',
    '--btn-background': data.values.btn_background,
    '--btn-back-hover': data.values.btn_back_hover
  }">
    <div class="section instafeed">
      <div class="section-settings">
        <div class="instafeed-top">
          <div class="instafeed-left">
            <div class="instafeed-heading">
              <p>{{ data.values.title }}</p>
            </div>
            <div class="instafeed-text">
              <p>{{ data.values.text }}</p>
            </div>
          </div>
          <NuxtLink 
            :to="data.values.instagram_link" 
            :target="data.values.is_external ? '_blank' : ''" 
            class="instafeed-button"
          >
            {{ data.values.btn_text }}
          </NuxtLink>
        </div>
      </div>
      <div class="instafeed-image-slider">
        <div class="marquee-horizontal">
          <div 
            v-for="i in 4"
            :key="i"
            class="track-horizontal"
          >
            <div 
              v-for="(child, index) in data.values.children" 
              :key="`track-${i}-item-${index}`"
              class="instafeed-image-slide"
            >
              <img :src="imghttps(child.image.image)" alt="" loading="lazy">
            </div>
          </div>
        </div>
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
  section: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.section {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0rem;
  margin-right: 0rem;
  border-radius: 0px;
}

.section-settings {
  margin: 0 auto;
  padding-top: 27px;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  max-width: 1200px;
}

.instafeed-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.instafeed-heading {
  text-align: center;
}

.instafeed-heading p {
  margin: 0;
  font-size: 32px;
  color: #1a192e;
  line-height: 130%;
  text-transform: unset;
}

.instafeed-text {
  text-align: center;
  margin-top: 9px;
}

.instafeed-text p {
  margin: 0;
  font-size: 16px;
  color: #1a192e;
  line-height: 130%;
  text-transform: unset;
}

.instafeed-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 250px;
  margin: 0;
  margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
  font-size: 16px;
  color: var(--btn-color);
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 18px 32px;
  border-radius: 100px;
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
  background-color: var(--btn-background);
  border: 1px solid var(--btn-color);
}

.instafeed-button:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-back-hover);
  border: 1px solid var(--btn-back-hover);
  transition: all 0.25s ease 0s;
}

.instafeed-button svg {
  width: 14px;
  height: 14px;
}

.instafeed-button svg path {
  fill: #1a192e;
  transition: all 0.25s ease 0s;
}

.instafeed-button:hover svg path {
  fill: #ffffff;
  transition: all 0.25s ease 0s;
}

.instafeed-image-slider {
  margin-top: 32px;
  padding-bottom: 27px;
}

.instafeed-image-slide {
  width: 100%;
  flex: 0 0 180px;
  overflow: hidden;
  border-radius: 24px;
  border: 0px solid #000000;
  aspect-ratio: 12/12;
}

.instafeed-image-slide img,
.instafeed-image-slide svg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.instafeed-image-slide svg {
  background-color: #a0a0a0;
}

.marquee-horizontal {
  position: relative;
  z-index: 2;
  display: inline-flex;
  overflow: hidden;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
}

.track-horizontal {
  padding-left: 20px;
  display: flex;
  flex-shrink: 0;
  width: calc((180px * 5) + (20px * 5));
  gap: 20px;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  will-change: transform;
  animation: marquee-horizontal-left 32000ms linear infinite;
}

@keyframes marquee-horizontal-left {
  0% {
    transform: translateZ(0);
    visibility: visible;
  }
  
  100% {
    transform: translate3d(-100%,0,0);
  }
}

@keyframes marquee-horizontal-right {
  0% {
    transform: translate3d(-100%,0,0);
    visibility: visible;
  }
  
  100% {
    transform: translateZ(0);
  }
}

@media(min-width: 1024px) {
  .section {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0rem;
    margin-right: 0rem;
    border-radius: 0px;
  }
  
  .section-settings {
    padding: 0 5rem;
    padding-top: 36px;
    padding-left: 5rem;
    padding-right: 5rem;
  }

  .instafeed-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
  }

  .instafeed-left {
    display: block;
  }

  .instafeed-heading {
    text-align: left;
  }

  .instafeed-heading p {
    font-size: 52px;
  }

  .instafeed-text {
    margin-top: 12px;
    text-align: left;
  }

  .instafeed-text p {
    font-size: 16px;
  }

  .instafeed-button {
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-top: 0px;
    max-width: 250px;
    padding: 18px 32px;
    font-size: 20px;
  }

  .instafeed-image-slider {
    margin-top: 90px;
    padding-bottom: 36px;
  }

  .instafeed-image-slide {
    flex: 0 0 350px;
    aspect-ratio: 12/12;
  }

  .track-horizontal {
    padding-left: 40px;
    width: calc((350px * 5) + (40px * 5));
    gap: 40px;
  }
}
</style>