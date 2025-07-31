<template>
  <div class="section scrolling" :class="{ 'no-padding': data.design.container === 'container-fluid' }">
    <div class="section-settings">
      <div class="scrolling-image-slider">
        <div class="marquee-horizontal">
          <div v-for="i in 5" :key="i" class="track-horizontal">
            <div 
              v-for="(child, index) in data.values.children" 
              :key="`track-${i}-item-${index}`" 
              class="scrolling-image-slide scrolling-image-slide-image"
              :style="{ borderRadius: '400px', border: '0px solid #000000' }"
            >
              <NuxtLink :to="child.link">
                <img :alt="child.text || ''" loading="lazy" :src="child.image.image" />
              </NuxtLink>
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
.section {
  overflow: hidden;
}

.scrolling-image-slider {
  margin-top: 0px;
  display: flex;
}

.scrolling-image-slide {
  width: 100%;
  flex: 0 0 180px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 12/12;
}

.scrolling-image-slide img,
.scrolling-image-slide svg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.scrolling-image-slide > svg {
  background-color: #a0a0a0;
}

.marquee-horizontal {
  position: relative;
  z-index: 2;
  display: inline-flex;
  overflow: hidden;
  width: 100%;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

[dir="rtl"] .marquee-horizontal {
  flex-direction: row-reverse;
}

.track-horizontal {
  padding-left: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-shrink: 0;
  width: calc((180px * 6) + (20px * 6));
  gap: 20px;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
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

.clip {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  background-color: transparent !important;
}

.scrolling-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1b1b1b80;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.25s ease 0s;
}

.scrolling-image-slide:hover .scrolling-hover {
  opacity: 1;
  transition: all 0.25s ease 0s;
}

.scrolling-icon {
  flex: 0 0 24px;
  height: 24px;
}

.scrolling-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scrolling-icon svg path {
  fill: #ffffff;
}

@media(min-width: 1024px) {
  .scrolling-image-slider {
    margin-top: 0px;
  }

  .scrolling-image-slide {
    flex: 0 0 300px;
    aspect-ratio: 12/12;
  }

  .track-horizontal {
    padding-left: 20px;
    width: calc((300px * 6) + (20px * 6));
    gap: 20px;
  }
}
</style>