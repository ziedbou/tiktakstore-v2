<template>
  <div
    class="overflow-hidden"
    :style="{
      '--sub-title-color': data.values.sub_title_color,
      '--title-color': data.values.title_color,
      '--number-color': data.values.number_color,
      '--link-color': data.values.link_color,
      '--link-color-hover': data.values.link_color_hover,
      '--link-background': data.values.link_background,
      '--link-background-hover': data.values.link_background_hover,
    }"
  >
    <div class="sub-heading">
      <p>How to's</p>
    </div>
    <div class="heading">
      <h2>Step by Step</h2>
    </div>
    <div class="slider-wrapper">
      <div class="slider swiper preview" ref="swiperEl">
        <div class="swiper-wrapper">
          <div
            v-for="(child, index) in data.values.children"
            :key="index"
            class="swiper-slide item"
          >
            <div class="video">
              <video
                :src="child.video"
                :poster="child.poster || child.video + '?frame=1'"
                loading="lazy"
                loop
                muted
                playsinline
                preload="auto"
                @loadeddata="showFirstFrame"
              ></video>
              <button class="video-player">
                <svg
                  class="icon"
                  viewBox="0 0 200 200"
                  xml:space="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    class="icon-play_svg__st0"
                    d="M154.1 91.2 76.5 36.3c-7.5-5.3-17.9.1-17.9 9.3v109.8c0 9.2 10.4 14.6 17.9 9.3l77.6-54.9c6.4-4.6 6.4-14.1 0-18.6"
                  ></path>
                </svg>
              </button>
            </div>
            <p class="number">{{ index + 1 }}</p>
            <div class="text">
              <p>{{ child.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid">
      <div
        v-for="(child, index) in data.values.children"
        :key="index"
        class="item"
      >
        <div class="video">
          <video
            :src="child.video"
            :poster="child.poster || child.video + '?frame=1'"
            loading="lazy"
            loop
            muted
            playsinline
            preload="auto"
            @loadeddata="showFirstFrame"
          ></video>
          <button class="video-player">
            <svg
              class="icon"
              viewBox="0 0 200 200"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="icon-play_svg__st0"
                d="M154.1 91.2 76.5 36.3c-7.5-5.3-17.9.1-17.9 9.3v109.8c0 9.2 10.4 14.6 17.9 9.3l77.6-54.9c6.4-4.6 6.4-14.1 0-18.6"
              ></path>
            </svg>
          </button>
        </div>
        <p class="number">{{ index + 1 }}</p>
        <div class="text">
          <p>{{ child.description }}</p>
        </div>
      </div>
    </div>
    <div class="button-wrap">
      <NuxtLink class="button" to="/pages/404-2">
        <p class="button-inner">
          SHOP NOW
          <svg
            fill="none"
            height="192"
            viewBox="0 0 192 192"
            width="192"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M187.827 98.7858C188.123 98.4749 188.123 98.4749 188.123 98.1761C188.419 97.8652 188.419 97.5663 188.704 97.5663C189 96.9566 189 96.6458 189 96.0361C189 95.4263 189 94.8166 188.704 94.5058C188.704 94.195 188.408 93.8961 188.123 93.5852C188.123 93.2744 187.827 93.2744 187.827 92.9755L103.287 4.21945C102.41 3.29889 101.533 3 100.668 3C99.791 3 98.6295 3.31083 98.0488 4.21945C97.1719 5.14 96.8872 6.06058 96.8872 6.96919C96.8872 7.88974 97.1833 9.10918 98.0488 9.7189L175.587 92.0539H6.79206C4.75371 92.0539 3 93.895 3 96.0351C3 98.1751 4.75365 100.016 6.79206 100.016H175.575L97.7543 182.042C96.2967 183.572 96.2967 186.322 97.7543 187.852C99.2119 189.383 101.831 189.383 103.288 187.852L187.827 98.7858Z"
              fill="black"
            ></path>
            <path
              clip-rule="evenodd"
              d="M188.607 97.5657C188.432 97.5657 188.365 97.6788 188.27 97.8382C188.211 97.9378 188.141 98.0554 188.027 98.1748C188.027 98.4734 188.027 98.4734 187.731 98.7839L103.281 187.759C101.825 189.287 99.2085 189.287 97.7524 187.759C96.2963 186.23 96.2963 183.483 97.7524 181.954L175.492 100.013L6.88489 100.013C4.8486 100.013 3.09677 98.1739 3.09677 96.036C3.09677 93.8982 4.84866 92.059 6.88489 92.059L175.504 92.059L98.0465 9.80878C97.182 9.19968 96.8862 7.9815 96.8862 7.0619C96.8862 6.15422 97.1706 5.2346 98.0465 4.315C98.6267 3.40732 99.787 3.0968 100.663 3.0968C101.527 3.0968 102.403 3.39539 103.279 4.315L187.731 92.9796C187.731 93.1274 187.804 93.2021 187.877 93.2774C187.952 93.3543 188.027 93.4319 188.027 93.5887C188.046 93.6098 188.066 93.6308 188.085 93.6518C188.338 93.9267 188.584 94.1935 188.606 94.4689C188.607 94.482 188.607 94.4951 188.607 94.5083C188.903 94.8188 188.903 95.4279 188.903 96.037C188.903 96.6461 188.903 96.9566 188.607 97.5657ZM191.489 93.2767C191.79 93.8661 191.89 94.4204 191.934 94.7363C192.001 95.2226 192 95.7194 192 95.9856L192 96.037C192 96.0544 192 96.0729 192 96.0926C192 96.3523 192.001 96.8096 191.924 97.2931C191.828 97.8884 191.64 98.41 191.393 98.9184L190.546 100.663H190.212C190.127 100.759 190.038 100.852 189.988 100.905L189.974 100.92L105.527 189.891C102.85 192.701 98.1865 192.704 95.51 189.895C94.1476 188.464 93.5636 186.587 93.5636 184.857C93.5636 183.128 94.1468 181.252 95.5071 179.822M191.489 93.2767C191.316 92.7908 191.078 92.4357 190.938 92.2406C190.903 92.1912 190.866 92.142 190.828 92.0939V91.7408L105.522 2.17912C104.076 0.661813 102.397 0 100.663 0C99.3914 0 97.0569 0.401401 95.6212 2.37737C94.3151 3.83819 93.7895 5.45521 93.7895 7.0619C93.7895 8.26663 94.1183 10.6061 95.9608 12.111L168.333 88.9622L6.88489 88.9622C2.9981 88.9622 0 92.3316 0 96.036C0 99.7405 2.99801 103.11 6.88489 103.11L168.285 103.11"
              fill="black"
              fill-rule="evenodd"
            ></path>
            <path
              d="M169.5 104L16.5 102.5V90H171L97.5 10.5V7L107.5 4.5C131.167 29.6667 180.2 81.5 187 87.5C193.8 93.5 191.5 99 189.5 101L105.5 184L94 181.5L169.5 104Z"
              fill="black"
            ></path>
          </svg>
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const swiperEl = ref(null);
let swiperInstance = null;

// Make sure the video shows its first frame
const showFirstFrame = (event) => {
  const video = event.target;
  if (video) {
    // Set to first frame and ensure it's not playing
    video.currentTime = 0;
    video.pause();
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

  setTimeout(() => {
    if (swiperEl.value) {
      swiperInstance = new Swiper(swiperEl.value, {
        modules: [Navigation, Pagination],
        speed: 800,
        slidesPerView: "auto",
        spaceBetween: 10,
        grabCursor: true,
        initialSlide: 0,
        breakpoints: {
          320: {
            spaceBetween: 10,
            slidesPerView: 1.3,
          },
          768: {
            spaceBetween: 10,
            slidesPerView: 2,
          },
          1024: {
            spaceBetween: 20,
            slidesPerView: 3,
          },
        },
      });

      swiperEl.value.classList.remove("preview");

      const videoItems = document.querySelectorAll(".item");

      videoItems.forEach((item) => {
        const video = item.querySelector("video");
        const iframe = item.querySelector("iframe");

        if (window.innerWidth < 1024) {
          item.addEventListener("click", function () {
            if (item.classList.contains("active")) {
              if (video) {
                video.pause();
              }
              if (iframe) {
                iframe.src = iframe.getAttribute("data-src2");
              }
            } else {
              if (video) {
                video.play();
              }
              if (iframe) {
                iframe.src = iframe.getAttribute("data-src1");
              }
            }
            item.classList.toggle("active");
          });
        } else {
          item.addEventListener("mouseenter", function () {
            if (video) {
              video.play();
            }
            if (iframe) {
              iframe.src = iframe.getAttribute("data-src1");
            }
            item.classList.add("active");
          });

          item.addEventListener("mouseleave", function () {
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
            if (iframe) {
              iframe.src = iframe.getAttribute("data-src2");
            }
            item.classList.remove("active");
          });
        }
      });
    }
  }, 400);
});

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy();
    swiperInstance = null;
  }
});
</script>

<style scoped>
.sub-heading {
  text-align: center;
}

.sub-heading * {
  margin: 0;
  font-size: 14px;
  color: var(--sub-title-color);
  line-height: 130%;
  text-transform: unset;
  text-decoration: none;
  font-family: "Avenir Next", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.heading {
  text-align: center;
  margin-top: 10px;
}

.heading * {
  margin: 0;
  font-size: 32px;
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
  text-decoration: none;
  font-family: "Bauer Bodoni", serif;
  font-weight: 400;
  font-style: normal;
}

.slider {
  margin-top: 40px !important;
  overflow: visible !important;
}

.slider-wrapper {
  display: block;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  overflow: visible;
}

.grid {
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  margin-top: 40px;
}

.video {
  position: relative;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  border-radius: 0px;
  overflow: hidden;
  transition: all 0.25s ease 0s;
  box-sizing: border-box !important;
  aspect-ratio: 12/12;
  background-color: #f5f5f5; /* Light background while loading */
}

.video video,
.video iframe {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  border: 0;
  box-shadow: 0;
  opacity: 1; /* Ensure video is visible */
  background-color: #f5f5f5; /* Light background while loading */
}

/* Show first frame */
video[poster] {
  object-fit: cover;
  object-position: center;
}

.video-player {
  background: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.25s ease 0s;
  border: none;  
  cursor: pointer; 
  z-index: 2;
  padding: 0px;
  display: flex;
}

.video-player svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-player path {
  fill: #ffffff;
}

.item.active .video-player {
  display: none;
}

.number {
  margin: 0;
  display: block;
  text-transform: unset;
  word-wrap: break-word;
  font-size: 20px;
  line-height: 100%;
  color: var(--number-color);
  margin-top: 20px;
  text-align: center;
  font-family: "Bodoni Poster", serif;
  font-weight: 900;
  font-style: normal;
}

.text {
  display: block;
  text-transform: unset;
  word-wrap: break-word;
  margin-top: 10px;    
}

.text * {
  margin: 0;
  font-size: 14px;
  line-height: 150%;
  color: #333333;
  text-align: center;
  font-family: "Avenir Next", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.button-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  gap: 10px;
  width: 100%;
  margin: 0;
  margin-top: 40px;
  font-size: 13px;
  color: var(--link-color);
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 16px 24px;
  border-radius: 0px;
  transition: all 1s ease 0s;
  background-color: var(--link-background);
  border: 0px;
  cursor: pointer;
  font-weight: 700;
  font-family: "Avenir Next", sans-serif;
  font-style: normal;
}

.button-inner {
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.button:hover .button-inner {
  color: var(--link-color-hover);
  transition: all 0.25s ease 0s;
}

.button svg {
  width: 14px;
  height: 14px;
  transition: all 0.25s ease 0s;
}

.button svg path {
  fill: var(--link-color);
  transition: all 0.25s ease 0s;
}

.button:hover svg path {
  fill: var(--link-color-hover);
  transition: all 0.25s ease 0s;
}

.button:hover {
  background-color: var(--link-background-hover);
  transition: all 0.25s ease 0s;
}

.slider-wrapper {
  display: block;
}

.grid {
  display: none;
}

/* Make sure swiper slides display properly */
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  width: auto;
}

/* Fix for preview mode */
.slider.preview {
  overflow: hidden !important;
}

.slider.preview .swiper-wrapper {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.slider.preview .item {
  width: 100%;
}

.slider.preview .item:not(:first-child) {
  margin-left: 10px;
}

@media (min-width: 1024px) {
  .sub-heading {
    text-align: center;
  }

  .sub-heading * {
    font-size: 18px;
  }
  
  .heading {
    text-align: center;
    margin-top: 12px;
  }

  .heading * {
    font-size: 52px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 40px;
  }

  .video-player {      
    display: none !important;
  }

  .number {
    font-size: 32px;
    margin-top: 20px;
    text-align: center;
  }

  .text * {
    font-size: 16px;
    margin-top: 10px;
    text-align: center;
  }

  .button-wrap {
    justify-content: center;
  }

  .button {
    margin-top: 48px;
    padding: 16px 24px;
    font-size: 13px;
  }

  .video {
    aspect-ratio: 12/12;
  }

  .slider-wrapper {
    display: none;
  }
  .grid {
    display: grid;
  }

  .slider.preview .item:not(:first-child) {
    margin-left: 20px;
  } 

  .slider.preview .item {
    width: calc(100% / 3 - (20px * 2));
  }
}
</style>
