<template>
  <div class="premium-steps" :style="{
    '--header-color': data.values.header_color,
    '--title-color': data.values.title_color,
    '--slide-title-color': data.values.slide_title_color,
    '--slide-text-color': data.values.slide_text_color,
    '--stars-color': data.values.stars_color
  }">
    <div class="heading mb-5">
      <h2>{{ data.values.title }}</h2>
    </div>

      <div class="steps">
        <div 
          v-for="(child, index) in data.values.children" 
          :key="index" 
          class="inner" 
          :class="{ 'alternate': (index + 1) % 2 === 0 }"
        >
          <!-- Desktop view -->
          <div class="desktop-view">
            <div class="left">
              <div class="image">
                <img :src="child.image.image" :alt="child.slide_title" loading="lazy" />
              </div>
            </div>
            <div class="right">
              <p class="number">{{ index + 1 }}.</p>
              <h3 class="title">{{ child.slide_title }}</h3>
              <div class="text">
                <p>{{ child.slide_text }}</p>
              </div>
              <div class="stars">
                <svg v-for="i in 5" :key="i" fill="none" height="19" viewBox="0 0 20 19" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" :fill="data.values.stars_color"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Mobile view -->
          <div class="mobile-view">
            <div class="mobile-top" :class="{ 'mobile-alternate': (index + 1) % 2 === 0 }">
              <div class="mobile-image">
                <img :src="child.image.image" :alt="child.slide_title" loading="lazy" />
              </div>
              <div class="mobile-title-container">
                <p class="number">{{ index + 1 }}.</p>
                <h3 class="title">{{ child.slide_title }}</h3>
              </div>
            </div>
            <div class="mobile-bottom">
              <div class="text">
                <p>{{ child.slide_text }}</p>
              </div>
              <div class="stars">
                <svg v-for="i in 5" :key="i" fill="none" height="19" viewBox="0 0 20 19" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" :fill="data.values.stars_color"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.premium-steps {
  margin-top: 0px;
  margin-bottom: 0px;
}



.heading {
  background-color: var(--header-color);
  text-align: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 36px;
  padding-bottom: 36px;
}

.heading * {
  margin: 0;
  font-size: 16px;
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.steps:last-child {
  border-bottom: 1px solid #e2dedd !important;
}

.inner {
  border-bottom: 1px solid #e2dedd;
}

/* Mobile view */
.desktop-view {
  display: none;
}

.mobile-view {
  display: block;
  padding-bottom: 30px;
}

.mobile-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.mobile-alternate {
  flex-direction: row-reverse;
}

.mobile-image {
  flex: 1;
  width: 50%;
  border-radius: 0px;
  border: 0px solid #000000;
  overflow: hidden;
  position: relative;
  aspect-ratio: 9.6/11;
}

.mobile-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-title-container {
  flex: 1;
  width: 50%;
}

.mobile-bottom {
  margin-top: 20px;
}

.image img, .image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image svg {
  background-color: #AEAEAE;
}

.number {
  margin: 0;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 52px;
  color: var(--slide-title-color);
  line-height: 100%;
  text-transform: unset;
  font-style: italic;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 400;
}

.title {
  display: block;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-top: 6px;
  font-size: 24px;
  color: var(--slide-title-color);
  line-height: 100%;
  text-transform: unset;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.text {
  text-align: center;
  margin-top: 22px;
}

.text * {
  margin: 0;
  font-size: 18px;
  color: var(--slide-text-color);
  line-height: 130%;
  text-transform: unset;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.stars {
  margin-top: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
}

.stars svg, .stars img {
  display: block;
  width: 16px;
  height: 16px;
  object-fit: cover;
}

@media(min-width: 1024px) {
  .heading {
    text-align: center;
    padding-left: 5rem;
    padding-right: 5rem;
    padding-top: 60px;
    padding-bottom: 60px;
  }

  .heading * {
    font-size: 24px;
  }

  /* Desktop view */
  .desktop-view {
    display: flex;
    align-items: stretch;
    gap: 80px;
    border: 0px;
  }

  .mobile-view {
    display: none;
  }

  .left, .right {
    flex: 1 0;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .image {
    width: 100%;
    border-radius: 0px;
    border: 0px solid #000000;
    overflow: hidden;
    position: relative;
    aspect-ratio: 9.6/11;
  }

  .number {
    text-align: left;
    font-size: 100px;
  }

  .title {
    text-align: left;
    margin-top: 8px;
    font-size: 50px;
  }

  .text {
    text-align: left;
    margin-top: 12px;
  }

  .text * {
    font-size: 24px;
  }

  .stars {
    margin-top: 12px;
    justify-content: start;
  }
}

.alternate .desktop-view {
  flex-direction: row-reverse;
}
</style>
