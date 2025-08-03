<template>
  <div class="section feature default-container">
    <div class="mx-auto">
      <div class="feature-heading">
        <p>{{ data.values.title }}</p>
      </div>
      
      <!-- Mobile image display -->
      <div class="feature-image feature-image-mobile">
        <img :src="imghttps(data.values.image.image)" alt="" loading="lazy">
      </div>
      
      <!-- Mobile features grid display -->
      <div class="feature-body">
        <div class="feature-items">
          <div class="feature-item" v-for="n in 6" :key="`mobile-item-${n}`">
            <div class="feature-icon">
              <img :src="imghttps(data.values[`icon_${n}`].image)" alt="" />
            </div>
            <p class="feature-title">{{ data.values[`title_${n}`] }}</p>
            <p class="feature-text">{{ data.values[`text_${n}`] }}</p>
          </div>
        </div>
        
        <!-- Desktop three-column layout -->
        <div class="feature-left">
          <div class="feature-item" v-for="n in 3" :key="`left-item-${n}`">
            <div class="feature-icon">
              <img :src="imghttps(data.values[`icon_${n}`].image)" alt="" />
            </div>
            <p class="feature-title">{{ data.values[`title_${n}`] }}</p>
            <p class="feature-text">{{ data.values[`text_${n}`] }}</p>
          </div>
        </div>
        
        <!-- Desktop center image display -->
        <div class="feature-image feature-image-desktop">
          <img :src="imghttps(data.values.image.image)" alt="" loading="lazy">
        </div>
        
        <!-- Desktop right column features -->
        <div class="feature-right">
          <div class="feature-item" v-for="n in 3" :key="`right-item-${n}`">
            <div class="feature-icon">
              <img :src="imghttps(data.values[`icon_${n+3}`].image)" alt="" />
            </div>
            <p class="feature-title">{{ data.values[`title_${n+3}`] }}</p>
            <p class="feature-text">{{ data.values[`text_${n+3}`] }}</p>
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
});
</script>

<style scoped>
.section {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0rem;
  margin-right: 0rem;
  overflow: hidden;
  border-radius: 0px;
}

.feature-heading {
  text-align: center;
}

.feature-heading p {
  margin: 0;
  font-size: 32px;
  color: #131313;
  line-height: 130%;
  font-weight: 400;
  font-style: normal;
}

.feature-body {
  margin-top: 22px;
}

.feature-image {
  margin-top: 22px;
  border-radius: 0px;
  border: 0px solid #000000;
  overflow: hidden;
  aspect-ratio: auto;
}

.feature-image img,
.feature-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-image svg {
  background-color: #AEAEAE;
}

.feature-image-desktop {
  display: none;
}

.feature-left,
.feature-right {
  display: none;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-icon {
  width: 40px;
  height: 40px;
}

.feature-icon img,
.feature-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-icon svg path {
  fill: #131313;
}

.feature-title {
  margin: 0;
  margin-top: 8px;
  font-size: 16px;
  color: #131313;
  line-height: 130%;
  text-transform: uppercase;
  word-wrap: break-word;
  text-align: center;
  font-weight: 300;
  font-style: normal;
}

.feature-text {
  margin: 0;
  margin-top: 6px;
  font-size: 16px;
  color: #131313;
  line-height: 140%;
  text-transform: unset;
  word-wrap: break-word;
  text-align: center;
  font-weight: 300;
  font-style: normal;
  display: none;
}

.feature-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

@media(min-width: 1024px) {
  .section {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0rem;
    margin-right: 0rem;
    border-radius: 0px;
  }
  
  .feature-heading {
    text-align: center;
  }

  .feature-heading p {
    font-size: 52px;
  }

  .feature-body {
    display: grid;
    margin-top: 24px;
    align-items: center;
    gap: 140px;
    grid-template-columns: 1fr 2fr 1fr;
  }

  .feature-left,
  .feature-right {
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-self: start;
  }

  .feature-image {
    margin-top: 0px;
    aspect-ratio: auto;
  }

  .feature-image-desktop {
    display: block;
  }

  .feature-image-mobile {
    display: none;
  }

  .feature-item {
    align-items: center;
  }

  .feature-icon {
    width: 50px;
    height: 50px;
  }

  .feature-title {
    margin-top: 16px;
    font-size: 20px;
    text-align: center;
  }

  .feature-text {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    display: block;
  }

  .feature-items {
    display: none;
  }
}
</style>