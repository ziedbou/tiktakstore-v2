<template>
  <div 
    class="feature-component"
    :style="{
      '--heading-size-mobile': '32px',
      '--heading-size-desktop': '46px',
      '--item-heading-size-mobile': '20px',
      '--item-heading-size-desktop': '24px',
      '--item-text-size': '16px',
      '--hover-text-size': '16px',
      '--hover-block-text-size': '14px',
      '--text-color': '#161616',
      '--hover-bg-color': '#c8d9bf',
      '--hover-block-bg': '#161616',
      '--hover-block-text': '#ffffff',
      '--padding-top-mobile': '27px',
      '--padding-top-desktop': '36px',
      '--padding-bottom-mobile': '27px',
      '--padding-bottom-desktop': '36px',
      '--padding-sides-mobile': '2rem',
      '--padding-sides-desktop': '5rem'
    }"
  >
    <div class="feature">
      <div class="feature-settings">
        <div class="feature-body">
          <div class="feature-left">
            <div class="feature-heading">
              <h3>{{ data.values.title }}</h3>
            </div>
            <div class="feature-items">
              <div class="feature-item">
                <div class="feature-icon">
                  <img :src="data.values.image1?.image" alt="">
                </div>
                <div class="feature-item-content">
                  <div class="feature-item-heading">
                    <h3>{{ data.values.subtitle1 }}</h3>
                  </div>
                  <div class="feature-item-text">
                    <p>{{ data.values.description1 }}</p>
                  </div>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">
                  <img :src="data.values.image2?.image" alt="">
                </div>
                <div class="feature-item-content">
                  <div class="feature-item-heading">
                    <h3>{{ data.values.subtitle2 }}</h3>
                  </div>
                  <div class="feature-item-text">
                    <p>{{ data.values.description2 }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="feature-right">
            <div class="feature-animate-bg">
              <img src="//section.store/cdn/shop/files/bg-illustration.svg?v=1718710959" alt="" loading="lazy">
            </div>
            <div class="feature-image">
              <img :src="data.values.product_image?.image" alt="">
            </div>
            <div 
              class="feature-hover-item feature-hover-item-1"
              @mouseenter="activateBlock(0)"
              @mouseleave="deactivateBlock(0)"
              @click="toggleBlock(0)"
            >
              <div class="feature-hover-item-icon">
                <img :src="data.values.icon1?.image" alt="">
              </div>
              <p class="feature-hover-item-text">{{ data.values.text_tag1 }}</p>
            </div>
            <div 
              class="feature-hover-item feature-hover-item-2"
              @mouseenter="activateBlock(1)"
              @mouseleave="deactivateBlock(1)"
              @click="toggleBlock(1)"
            >
              <div class="feature-hover-item-icon">
                <img :src="data.values.icon2?.image" alt="">
              </div>
              <p class="feature-hover-item-text">{{ data.values.text_tag2 }}</p>
            </div>
            <div 
              class="feature-hover-block feature-hover-block-1"
              :class="{ active: activeBlocks[0] }"
              @mouseenter="activateBlock(0)"
              @mouseleave="deactivateBlock(0)"
            >
              <p v-html="data.values.description_tag1"></p>
            </div>
            <div 
              class="feature-hover-block feature-hover-block-2"
              :class="{ active: activeBlocks[1] }"
              @mouseenter="activateBlock(1)"
              @mouseleave="deactivateBlock(1)"
            >
              <p v-html="data.values.description_tag2"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const activeBlocks = ref([false, false]);
const isMobile = ref(false);

function activateBlock(index) {
  if (!isMobile.value) {
    activeBlocks.value[index] = true;
  }
}

function deactivateBlock(index) {
  if (!isMobile.value) {
    activeBlocks.value[index] = false;
  }
}

function toggleBlock(index) {
  if (isMobile.value) {
    // Reset all blocks
    activeBlocks.value = activeBlocks.value.map(() => false);
    // Activate the clicked one
    activeBlocks.value[index] = true;
  }
}

function checkMobile() {
  isMobile.value = window.innerWidth < 1024;
}

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
</script>

<style scoped>
.feature {
  border-top: solid #000000 0px;
  border-bottom: solid #000000 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0rem;
  margin-right: 0rem;
  border-radius: 0px;
  overflow: hidden;
}

.feature-settings {
  margin: 0 auto;
  max-width: 120rem;
  padding-top: var(--padding-top-mobile);
  padding-bottom: var(--padding-bottom-mobile);
  padding-left: var(--padding-sides-mobile);
  padding-right: var(--padding-sides-mobile);
}

.feature-body {
  display: grid;
  gap: 54px;
}

.feature-heading {
  width: 100%;
  text-align: left;
}

.feature-heading * {
  margin: 0;
  font-size: var(--heading-size-mobile);
  color: var(--text-color);
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  font-family: "Fjalla One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.feature-items {
  margin-top: 32px;
  flex-direction: column;
  display: flex;
  gap: 32px;
}

.feature-item {
  display: flex;
  gap: 24px;
  align-items: start;
}

.feature-icon {
  flex: 0 0 52px;
}

.feature-icon img,
.feature-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-item-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.feature-item-heading * {
  margin: 0px;
  font-size: var(--item-heading-size-mobile);
  color: var(--text-color);
  line-height: 130%;
  text-transform: unset;
  transition: all 0.25s ease 0s;
  word-break: break-word;
  font-family: "Fjalla One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.feature-item-text * {
  margin: 0px;
  font-size: var(--item-text-size);
  color: var(--text-color);
  line-height: 150%;
  text-transform: unset;
  transition: all 0.25s ease 0s;
  word-break: break-word;
}

.feature-right {
  position: relative;
}

.feature-image {
  position: relative;
  z-index: 1;
}

.feature-image img,
.feature-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-hover-item {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px solid var(--text-color);
  background-color: var(--hover-bg-color);
  overflow: hidden;
  width: 100%;
  max-width: 164px;
}

.feature-hover-item-icon {
  flex: 0 0 20px;
}

.feature-hover-item-icon img,
.feature-hover-item-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-hover-item-text {
  margin: 0px;
  font-size: var(--hover-text-size);
  color: var(--text-color);
  line-height: 150%;
  text-transform: unset;
  transition: all 0.25s ease 0s;
  word-break: break-word;
  font-weight: 700;
  font-family: "Fjalla One", sans-serif;
  font-style: normal;
}

.feature-hover-block {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  transition: all 0.25s ease 0s;
  padding: 32px 32px;
  border-radius: 20px;
  border: 3px solid var(--hover-bg-color);
  background-color: var(--hover-block-bg);
  overflow: hidden;
  width: 100%;
  z-index: 2;
  max-width: 340px;
}

.feature-hover-block.active {
  pointer-events: all;
  opacity: 1;
  transition: all 0.25s ease 0s;
}

.feature-hover-block * {
  font-size: var(--hover-block-text-size);
  color: var(--hover-block-text);
  line-height: 160%;
  text-transform: unset;
  transition: all 0.25s ease 0s;
  word-break: break-word;
}

.feature-animate-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  width: 100%;
  height: 100%;
}

.feature-animate-bg svg,
.feature-animate-bg img {
  display: block;
  width: 100%;
  height: 100%;
  animation: 40s linear infinite rotate360;
}

.feature-hover-item-1 {
  left: 0%;
  top: 26%;
  transform: translate(-0%, -26%);
}

.feature-hover-block-1 {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.feature-hover-item-2 {
  left: 100%;
  top: 83%;
  transform: translate(-100%, -83%);
}

.feature-hover-block-2 {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.feature-left {
  order: 1;
}

.feature-right {
  order: 2;
}

@keyframes rotate360 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (min-width: 1024px) {
  .feature-settings {
    padding-top: var(--padding-top-desktop);
    padding-bottom: var(--padding-bottom-desktop);
    padding-left: var(--padding-sides-desktop);
    padding-right: var(--padding-sides-desktop);
  }

  .feature-body {
    grid-template-columns: 1fr 1fr;
    gap: 54px;
    align-items: center;
  }

  .feature-heading * {
    font-size: var(--heading-size-desktop);
  }

  .feature-items {
    margin-top: 54px;
    gap: 32px;
  }

  .feature-item {
    gap: 32px;
  }

  .feature-icon {
    flex: 0 0 76px;
  }

  .feature-item-heading * {
    font-size: var(--item-heading-size-desktop);
  }

  .feature-hover-item-icon {
    flex: 0 0 30px;
  }

  .feature-hover-block {
    padding: 32px 32px;
    max-width: 300px;
  }

  .feature-hover-item-1 {
    left: 0%;
    top: 18%;
    transform: translate(-0%, -18%);
  }

  .feature-hover-block-1 {
    left: calc(0% - 164px);
    top: 18%;
    transform: translate(calc((0% - 40px) * -1), calc((18% + 20px) * -1));
  }

  .feature-hover-item-2 {
    left: 90%;
    top: 80%;
    transform: translate(-90%, -80%);
  }

  .feature-hover-block-2 {
    left: calc(90% - 164px);
    top: 80%;
    transform: translate(calc((90% - 40px) * -1), calc((80% + 20px) * -1));
  }

  .feature-left {
    order: 1;
  }

  .feature-right {
    order: 2;
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
