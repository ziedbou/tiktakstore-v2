<template>
  <div 
    class="premium-section" 
    :style="{
      '--bg-color': data.values.backgroundColor || '#eff5f6',
      '--text-color': data.values.textColor || '#1b3153',
      '--button-bg': data.values.buttonBgColor || '#f1cf79',
      '--button-hover-bg': data.values.buttonHoverBgColor || '#1b3153',
      '--button-border': data.values.buttonBorderColor || '#1b3153',
      '--scrolling-text-color': data.values.scrollingTextColor || '#b3bec8',
      '--border-color': data.values.borderColor || '#1b3153',
    }"
  >
    <div class="premium-container">
      <div class="premium-body">
        <div class="image-wrapper">
          <div class="image-container">
            <img :src="imghttps(data.values.imageUrl) || 'https://section.store/cdn/shop/files/slaapwijsheid-nl-GJW6b9vim1s-unsplash.jpg?v=1725196112'" :alt="data.values.imageAlt || ''" />
          </div>
          <a class="shop-button" :href="data.values.link_widget1736854000230">
            <p class="button-inner">
              {{ data.values.text1736854007976 || 'Shop now' }}
            </p>
          </a>
        </div>
        <div class="content-text">
          <p>{{ data.values.text1736853991157 }}</p>
        </div>
      </div>
      <div class="scrolling-text-wrapper">
        <div class="scrolling-text-list">
          <p v-for="(_, index) in 10" :key="`scroll-1-${index}`" class="scrolling-text-item">
            {{ data.values.text1736854004209 }}
          </p>
        </div>
        <div class="scrolling-text-list">
          <p v-for="(_, index) in 10" :key="`scroll-2-${index}`" class="scrolling-text-item">
            {{ data.values.text1736854004209 }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

defineProps({
  key: String,
  data: Object,
});
</script>

<style scoped>
.premium-section {
  overflow: hidden;
  background-color: var(--bg-color, #eff5f6);
}

.premium-container {
  margin: 0 auto;
  padding: 36px 1rem;
  position: relative;
  max-width: 1200px;
}

.premium-body {
  display: grid;
  gap: 24px;
  align-items: center;
  position: relative;
  z-index: 1;
  grid-template-columns: 1fr;
  grid-template-areas: "image" "content";
}

.image-wrapper {
  position: relative;
  grid-area: image;
}

.image-container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  border: 2px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 12/12;
}

.image-container img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shop-button {
  position: absolute;
  z-index: 2;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
  color: var(--text-color);
  line-height: 100%;
  text-align: center;
  padding: 14px 16px;
  border-radius: 100px;
  transition: all 0.25s ease 0s;
  background-color: var(--button-bg);
  border: 2px solid var(--button-border);
  cursor: pointer;
  font-weight: 700;
}

.button-inner {
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.shop-button:hover {
  color: var(--button-bg);
  background-color: var(--button-hover-bg);
  transition: all 0.25s ease 0s;
}

.content-text {
  grid-area: content;
}

.content-text p {
  margin: 0;
  font-weight: 700;
  text-align: left;
  font-size: 26px;
  color: var(--text-color);
  line-height: 130%;
  text-transform: unset;
  word-wrap: break-word;
}

.scrolling-text-wrapper {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: 200vw;
  position: relative;
  z-index: 0;
  left: -10vw;
  margin-top: 20px;
}

.scrolling-text-list {
  display: flex;
  white-space: nowrap;
  animation: ticker 40s infinite linear;
  flex-shrink: 0;
}

.scrolling-text-item {
  margin: 0;
  font-weight: 700;
  font-size: 40px;
  color: var(--scrolling-text-color, #b3bec8);
  line-height: 130%;
  margin-right: 30px;
  text-transform: unset;
  word-wrap: break-word;
  position: relative;
  flex-shrink: 0;
}

@keyframes ticker {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@media (min-width: 1024px) {
  .premium-container {
    padding: 48px 3rem;
  }
  
  .premium-body {
    gap: 80px;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "image content";
  }
  
  .image-container {
    aspect-ratio: 12/12;
  }
  
  .shop-button {
    padding: 14px 16px;
    font-size: 18px;
  }
  
  .content-text p {
    text-align: left;
    font-size: 38px;
  }
  
  .scrolling-text-wrapper {
    position: absolute;
    bottom: 10%;
    z-index: 0;
  }
  
  .scrolling-text-item {
    font-size: 72px;
    margin-right: 60px;
  }
}
</style>