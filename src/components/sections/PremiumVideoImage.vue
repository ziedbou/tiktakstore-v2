<template>
  <div 
    class="overflow-hidden"
    :style="{
      '--heading-color': data.values.heading_color,
      '--subheading-color': data.values.subheading_color,
      '--text-color': data.values.text_color,
      '--button-color': data.values.button_color,
      '--button-bg-color': data.values.button_bg_color,
      '--button-hover-color': data.values.button_hover_color,
      '--button-bg-hover-color': data.values.button_bg_hover_color,
      '--button-border-radius': data.values.button_border_radius+'px',
      '--image-border-radius': data.values.image_border_radius+'px',
      '--video-border-radius': data.values.video_border_radius+'px',
      '--bg-color': data.values.bg_color || '#ffffff',
    }"
  >
    <div class="grid">
      <div class="media">
        <div class="secondary-media">         
          <img :src="imghttps(data.values.image.image)" alt="" loading="lazy">
        </div>
        <video 
          playsinline
          autoplay
          loop
          muted
          preload="metadata"
          @loadeddata="showFirstFrame"
          :poster="data.values.poster || ''"
        >
          <source :src="imghttps(data.values.video)" type="video/mp4">
        </video>
      </div>
      <div class="content">
        <div class="subheading"><h3>{{ data.values.sub_title }}</h3></div>
        <div class="heading"><h2>{{ data.values.title }}</h2></div>
        <div class="text"><p>{{ data.values.text }}</p></div>        
        <NuxtLink :to="data.values.link" class="button">{{ data.values.link_text }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { imghttps } from '~/composables/services/helpers';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Make sure the video shows its first frame
const showFirstFrame = (event) => {
  const video = event.target;
  if (video) {
    // Set to first frame and ensure it's not playing until autoplay kicks in
    video.currentTime = 0;
  }
};

onMounted(() => {
  // Initialize all videos immediately to ensure first frame is shown
  setTimeout(() => {
    document.querySelectorAll('video').forEach(video => {
      // Force video to load first frame
      if (video.readyState >= 2) {
        video.currentTime = 0;
      } else {
        video.addEventListener('loadeddata', () => {
          video.currentTime = 0;
        }, { once: true });
      }
    });
  }, 100);
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 60px;
  align-items: center;
  background-color: var(--bg-color);
}

.media {
  position: relative;
  order: 1;
  border-radius: 20px;
  aspect-ratio: 12/12;
}


.media video{
  background-color: inherit;
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
  box-shadow: none;
  border: 0px;
  border-radius: var(--video-border-radius);
}

.media svg {
  background-color: #DDDDDD;
}

.secondary-media {
  position: absolute;
  width: 100%;
  right: 50%;
  transform: translateX(50%);
  bottom: -10%;
  max-width: 50%;
  aspect-ratio: 9.6/12;
  box-shadow: 0px 4px 5px rgba(0,0,0, 0.2);
  border-radius: var(--image-border-radius);
  overflow: hidden;
}


.secondary-media img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.content {
  padding: 12px 12px;
  border-radius: 20px;
  background-color: var(--bg-color);
  order: 2;
}

.heading {
  margin-top: 6px;
  text-align: center;
}

.heading * {
  margin: 0;
  font-size: 30px;
  color: var(--heading-color);
  line-height: 130%;
  text-transform: unset;
}

.subheading {
  margin-top: 0px;
  text-align: center;
}

.subheading * {
  margin: 0;
  font-size: 18px;
  color: var(--subheading-color);
  line-height: 150%;
  text-transform: unset;
}

.text {
  margin-top: 8px;
  text-align: center;
}

.text * {
  margin: 0;
  font-size: 16px;
  color: var(--text-color);
  line-height: 150%;
  text-transform: unset;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  margin: 0;
  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;
  font-size: 14px;
  font-weight: 700;
  color: var(--button-color);
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 12px 12px;
  border-radius: var(--button-border-radius);
  background-color: var(--button-bg-color);
  transition: all 0.25s ease 0s;
  cursor: pointer;
}

.button:hover {
  color: var(--button-hover-color);
  background-color: var(--button-bg-hover-color);
  transition: all 0.25s ease 0s;
}

@media(min-width: 576px) {
  .grid {
    gap: 90px;
  }
}

@media(min-width: 768px) {
  .grid {
    gap: 120px;
  }
}

@media(min-width: 850px) {
  .grid {
    gap: 138px;
  }
}

@media(min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 100px;
  }

  .content {
    padding: 16px 16px;
  }

  .heading {
    margin-top: 8px;
    text-align: center;
  }

  .heading * {
    font-size: 34px;
  }

  .subheading {
    margin-top: 0px;
    text-align: center;
  }

  .subheading * {
    font-size: 18px;
  }

  .text {
    margin-top: 10px;
    text-align: center;
  }
  
  .text * {
    font-size: 16px;
  }

  .button {
    margin-top: 16px;
    padding: 16px 16px;
    font-size: 16px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .secondary-media {
    max-width: 50%;
    transform: translateX(0px);
    right: unset;
    bottom: unset;
    right: -10%;
    top: 51%;
    transform: translateY(-51%);
  }
}
</style>
