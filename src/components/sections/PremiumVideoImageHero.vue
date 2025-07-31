<template>
  <div class="overflow-hidden">
    <div class="grid-items">
      <!-- Video Item -->
      <div class="grid-item video-item">
        <div class="grid-content">
          <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#212121" fill-rule="evenodd" clip-rule="evenodd"
              d="M4,12l8,8,1.41-1.41L7.83,13H20V11H7.83l5.59-5.59L12,4Z"></path>
          </svg>
          <div class="grid-text">
            <p class="grid-item-subheading">{{ data.values.video_sub_title }}</p>
            <NuxtLink :to="data.values.video_link">
              <p class="grid-item-heading">{{ data.values.video_title }}</p>
            </NuxtLink>
          </div>
        </div>
        <div class="grid-media">
          <video 
            playsinline 
            autoplay 
            loop 
            muted 
            preload="metadata" 
            :src="data.values.video"
            @loadeddata="handleVideoLoad"
            ref="videoEl"
          ></video>
          <div class="grid-action" @click="toggleVideo">
            <svg class="grid-pause" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
              <title>Pause</title>
              <path d="M0 0H4V14H0V0Z" fill="currentColor"></path>
              <path d="M8 0H12V14H8V0Z" fill="currentColor"></path>
            </svg>
            <svg class="grid-play" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
              <title>Play</title>
              <path d="M12 7L0 14L6.1196e-07 0L12 7Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Image Item -->
      <div class="grid-item image-item">
        <div class="grid-content">
          <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd"
              d="M4,12l8,8,1.41-1.41L7.83,13H20V11H7.83l5.59-5.59L12,4Z"></path>
          </svg>
          <div class="grid-text">
            <p class="grid-item-subheading">{{ data.values.image_sub_title }}</p>
            <NuxtLink :to="data.values.image_link">
              <p class="grid-item-heading">{{ data.values.image_title }}</p>
            </NuxtLink>
          </div>
        </div>
        <div class="grid-media">
          <img :src="data.values.image.image" alt="" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const videoEl = ref(null);
const isVideoPlaying = ref(true);

const handleVideoLoad = (event) => {
  const video = event.target;
  if (video) {
    // Ensure video shows its first frame
    video.currentTime = 0;
  }
};

const toggleVideo = (e) => {
  e.preventDefault();
  const btn = e.currentTarget;
  const video = videoEl.value;
  
  btn.classList.toggle('active');
  
  if (btn.classList.contains('active')) {
    if (video) {
      video.pause();
    }
  } else {
    if (video) {
      video.play();
    }
  }
};

onMounted(() => {
  // Initialize video first frame
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (video.readyState >= 2) {
      video.currentTime = 0;
    } else {
      video.addEventListener('loadeddata', () => {
        video.currentTime = 0;
      }, { once: true });
    }
  });
});
</script>

<style scoped>
.grid-items {
  margin-top: 12px;
  display: grid;
  align-items: start;
  grid: auto-flow dense 425px / repeat(1,minmax(0,1fr));
  row-gap: 20px;
}

.grid-item {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.video-item {
  background-color: #f3f3f3;
}

.image-item {
  background-color: #f3f3f3;
}


.grid-media {
  flex: 1 0 auto;
  border-radius: 8px;
  position: absolute;
  left: -0.5%;
  right: 0;
  top: -0.5%;
  bottom: 0;
  width: 101%;
  height: 101%;
}

.grid-media:after {
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, 0.1);
  border-radius: 8px;
}

.video-item .grid-media:after {
  background-color: rgba(0,0,0,0);
}

.image-item .grid-media:after {
  background-color: rgba(0,0,0,0.1);
}

.grid-media img,
.grid-media > svg,
.grid-media iframe,
.grid-media video {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  box-shadow: none;
  border: 0px;
  border-radius: 8px;
}

.grid-content {
  flex: 1 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  gap: 20px;
  transform: translateX(-64px);
  transition: all 0.35s ease 0s;
  align-items: end;
}

.grid-item:hover .grid-content {
  transform: translateX(0px);
  transition: all 0.35s ease 0s;
}

.grid-content svg {
  flex: 0 0 48px;
  height: 48px;
  transform: rotate(180deg);
  opacity: 0;
  transition: all 0.35s ease 0s;
}

.grid-item:hover .grid-content svg {
  opacity: 1;
  transition: all 0.35s ease 0s;
}

.grid-item-heading {
  margin: 0px;
  margin-top: 3px;
  font-size: 24px;
  color: #212121;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  font-style: normal;
}

.video-item .grid-item-heading,
.video-item .grid-item-subheading {
  color: #212121;
}

.image-item .grid-item-heading,
.image-item .grid-item-subheading {
  color: #ffffff;
}

.grid-item-subheading {
  margin: 0px;
  font-size: 16px;
  color: #212121;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
}

.grid-action {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  bottom: 20px;
  right: 16px;
  background-color: #ffffff;
  cursor: pointer;
}

.grid-action svg {
  width: 14px;
  height: 14px;
}

.grid-action.active .grid-pause,
.grid-action .grid-play {
  display: none;
}

.grid-action.active .grid-play {
  display: block;
}

.grid-action svg path {
  fill: #000000;
}

/*@media(min-width: 576px) {
  .grid-items {
    gap: 90px;
  }
}

@media(min-width: 768px) {
  .grid-items {
    gap: 120px;
  }
}

@media(min-width: 850px) {
  .grid-items {
    gap: 138px;
  }
}*/

@media(min-width: 1024px) {
  .grid-items {
    margin-top: 16px;
    gap: 20px;
    --calculated-row-height: max(150px, min(100vw / 5, 220px));
    grid: auto-flow dense var(--calculated-row-height) / repeat(4,minmax(0,1fr));
  }

  .grid-item {
    justify-content: space-between;
    flex-direction: row;
    grid-template-columns: repeat(2, 1fr);
    padding: 20px 16px;
  }

  .grid-content {
    transform: translateX(-64px);
  }

  .grid-item-heading {
    font-size: 36px;
  }

  .grid-action {
    bottom: 20px;
    right: 16px;
    width: 60px;
    height: 60px;
  }

  .video-item {
    grid-area: span 3 / span 2;
  }

  .image-item {
    grid-area: span 3 / span 2;
  }
}
</style>
