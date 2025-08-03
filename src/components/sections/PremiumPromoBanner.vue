<template>
  <div 
    class="premium-promo-container" 
    :style="{
      '--banner-background': data.values.banner_background,
      '--title-1-color': data.values.title_1_color,
      '--title-1-size-mobile': data.values.title_1_size_mobile + 'px',
      '--title-1-size-desktop': data.values.title_1_size_desktop + 'px',
      '--title-2-color': data.values.title_2_color,
      '--title-2-size-mobile': data.values.title_2_size_mobile + 'px',
      '--title-2-size-desktop': data.values.title_2_size_desktop + 'px',
      '--text-1-color': data.values.text_1_color,
      '--text-1-size-mobile': data.values.text_1_size_mobile + 'px',
      '--text-2-color': data.values.text_2_color,
      '--text-2-size-mobile': data.values.text_2_size_mobile + 'px',
      '--date-background': data.values.date_background,
      '--date-border-radius': data.values.date_border_radius + 'px',
      '--date-color-number': data.values.date_color_number,
      '--date-color-text': data.values.date_color_text,
      '--date-size-number-mobile': data.values.date_size_number_mobile + 'px',
      '--date-size-number-desktop': data.values.date_size_number_desktop + 'px',
      '--date-size-text-mobile': data.values.date_size_text_mobile + 'px',
      '--date-size-text-desktop': data.values.date_size_text_desktop + 'px',
      '--btn-color': data.values.btn_color,
      '--btn-background': data.values.btn_background,
      '--btn-border-radius': data.values.btn_border_radius + 'px',
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-background-hover': data.values.btn_background_hover,
      '--image-border-radius': data.values.image_border_radius + 'px'
    }"
  >
    <div class="premium-promo-section premium-promo-left-section">
      <div v-if="data.values.show_date" class="premium-promo-timer">
        <div class="premium-promo-time-block">
          <div class="premium-promo-time-row">
            <span class="premium-promo-time-block__num premium-promo-js-timer-days">00</span>
          </div>
          <span class="premium-promo-time-block__unit">{{ data.values.day_text }}</span>
        </div>
        <div class="premium-promo-time-block">
          <div class="premium-promo-time-row">
            <span class="premium-promo-time-block__num premium-promo-js-timer-hours">00</span>
          </div>
          <span class="premium-promo-time-block__unit">{{ data.values.hour_text }}</span>
        </div>
        <div class="premium-promo-time-block">
          <div class="premium-promo-time-row">
            <span class="premium-promo-time-block__num premium-promo-js-timer-minutes">00</span>
          </div>
          <span class="premium-promo-time-block__unit">{{ data.values.min_text }}</span>
        </div>
        <div class="premium-promo-time-block">
          <div class="premium-promo-time-row">
            <span class="premium-promo-time-block__num premium-promo-js-timer-seconds">00</span>
          </div>
          <span class="premium-promo-time-block__unit">{{ data.values.sec_text }}</span>
        </div>
      </div>
      <div class="premium-promo-timer-completed-text" v-if="data.values.show_date"></div>
      <div class="premium-promo-discount-text">
        <p :class="{ 'animate-text': data.values.show_title_anim }">{{ data.values.title_1 }}</p>
      </div>
    </div>
    <div class="premium-promo-separator"></div>
    <div class="premium-promo-section premium-promo-right-section">
      <div class="premium-promo-content-section">
        <h2 class="premium-promo-content-title">{{ data.values.title_2 }}</h2>
        <p class="premium-promo-content-text-1">{{ data.values.sub_title }}</p>
        <p class="premium-promo-content-text-2">{{ data.values.texte_2 }}</p>
        <a class="premium-promo-link" :href="data.values.link">
          <span class="premium-promo-link-text">{{ data.values.text_link }}</span>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8">
            </path>
          </svg>
        </a>
      </div>
      <div class="premium-promo-flip-container">
        <div class="premium-promo-flipper">
          <div class="premium-promo-front">
            <img :src="imghttps(data.values.image_1.image)" alt="premium-promo-front Image" class="premium-promo-card-image">
          </div>
          <div class="premium-promo-back">
            <img :src="imghttps(data.values.image_2.image)" alt="premium-promo-back Image" class="premium-promo-card-image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { imghttps } from '~/composables/services/helpers';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

let timerInterval = null;

function initTimer() {
  if (!props.data.values.show_date) return;

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
  
  const countDown = new Date(props.data.values.date).getTime();
  
  clearInterval(timerInterval);
  
  timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDown - now;
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    
    const daysElement = document.querySelector('.premium-promo-js-timer-days');
    const hoursElement = document.querySelector('.premium-promo-js-timer-hours');
    const minutesElement = document.querySelector('.premium-promo-js-timer-minutes');
    const secondsElement = document.querySelector('.premium-promo-js-timer-seconds');
    
    if (daysElement) daysElement.innerText = days;
    if (hoursElement) hoursElement.innerText = hours;
    if (minutesElement) minutesElement.innerText = minutes;
    if (secondsElement) secondsElement.innerText = seconds;
    
    if (distance < 0) {
      if (daysElement) daysElement.innerText = '00';
      if (hoursElement) hoursElement.innerText = '00';
      if (minutesElement) minutesElement.innerText = '00';
      if (secondsElement) secondsElement.innerText = '00';
      
      const completedTextElement = document.querySelector('.premium-promo-timer-completed-text');
      if (completedTextElement) completedTextElement.style.display = 'block';
      
      clearInterval(timerInterval);
    }
  }, second);
}

onMounted(() => {
  initTimer();
});

/*watch(() => props.data, () => {
  initTimer();
}, { deep: true });*/
</script>

<style scoped>
.premium-promo-container {
  height: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.premium-promo-section {
  background-color: var(--banner-background);
  padding: 20px 4%;
  display: flex;
  align-items: center;
  border-radius: 20px;
  height: auto;
  flex-direction: column;
  width: 100%;
}

.premium-promo-left-section {
  display: flex;
  flex-direction: column !important;
}

.premium-promo-right-section {
  flex-grow: 1;
  justify-content: space-between;
}

.premium-promo-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 25px;
}

.premium-promo-timer .premium-promo-time-row {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.premium-promo-time-block {
  padding: 10px;
  border-radius: var(--date-border-radius);
  background-color: var(--date-background);
}

.premium-promo-timer .premium-promo-time-block__num {
  min-width: 27px;
  text-align: center;
  font-size: var(--date-size-number-mobile);
  color: var(--date-color-number);
  font-weight: 700;
  line-height: 100%;
  margin: 0;
  text-transform: unset;
}

.premium-promo-timer .premium-promo-time-block__unit {
  display: block;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-top: 10px;
  font-size: var(--date-size-text-mobile);
  color: var(--date-color-text);
  line-height: 100%;
  text-transform: unset;
  font-weight: 400;
  font-style: normal;
}

.premium-promo-discount-text {
  margin-bottom: 25px;
  max-width: 320px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.premium-promo-discount-text p {
  font-size: var(--title-1-size-mobile);
  font-weight: 900;
  color: var(--title-1-color);
  line-height: 1.3;
  width: 100%;
  text-align: center;
  transition: all 0.35s ease;
}

.premium-promo-discount-text p.animate-text {
  animation: beat-text-shadow .35s infinite alternate;
}

.premium-promo-content-section {
  margin-bottom: 30px;
  text-align: center;
  max-width: 500px;
  width: fit-content;
}

.premium-promo-content-title {
  font-size: var(--title-2-size-mobile);
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--title-2-color);
}

.premium-promo-content-text-1 {
  font-size: var(--text-1-size-mobile);
  margin-bottom: 10px;
  color: var(--text-1-color);
  font-weight: 500;
}

.premium-promo-content-text-2 {
  font-size: var(--text-2-size-mobile);
  margin-bottom: 10px;
  color: var(--text-2-color);
}

.premium-promo-link {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  color: var(--btn-color) !important;
  background-color: var(--btn-background);
  border-radius: var(--btn-border-radius);
  border: none;
  transition: all ease-in-out .4s;
  z-index: 1;
  cursor: pointer;
}

.premium-promo-link::before {
  content: "";
  position: absolute;
  width: 105%;
  min-width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  background-color: var(--btn-background-hover);
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  transition: all ease-in-out .4s;
  z-index: -1;
}

.premium-promo-link:hover::before {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.premium-promo-link:hover {
  color: var(--btn-color-hover) !important;
}

.premium-promo-link-text {
  position: relative;
  z-index: 2;
  font-weight: 700;
  color: inherit;
}

.premium-promo-link svg {
  font-size: 0;
  margin-left: 0;
  height: 0;
  width: 0;
  transform: translateX(-10px) scale(0);
  transition: all .3s ease;
  color: var(--btn-color-hover);
}

.premium-promo-link:hover svg {
  font-size: 14px;
  margin-left: 6px;
  height: 30px;
  width: 30px;
  transform: translateX(0) scale(1);
}

.premium-promo-separator {
  border-top: 4px dashed var(--banner-background);
  border-left: none;
  position: relative;
  z-index: 1;
  background-color: #fff;
  width: calc(100% - 40px);
  margin: 0 auto;
  height: 4px;
}

.premium-promo-flip-container {
  width: 350px;
  height: 450px;
}

.premium-promo-flipper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform-style: preserve-3d;
}

.premium-promo-container:hover .premium-promo-flip-container .premium-promo-flipper {
  transform: rotateY(180deg);
}

.premium-promo-container:hover .premium-promo-flip-container .premium-promo-front {
  opacity: 0;
}

.premium-promo-container:hover .premium-promo-flip-container .premium-promo-back {
  opacity: 1;
}

.premium-promo-front,
.premium-promo-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  transition: opacity 0.3s ease-in-out;
}

.premium-promo-front img,
.premium-promo-back img {
  border-radius: var(--image-border-radius);
}

.premium-promo-front {
  z-index: 2;
  opacity: 1;
}

.premium-promo-back {
  transform: rotateY(180deg);
  opacity: 0;
}

.premium-promo-card-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

@keyframes beat-text-shadow {
  from {
    transform: scale(1);
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
  to {
    transform: scale(1.1);
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
  }
}

@media (min-width: 1024px) {
  .premium-promo-timer .premium-promo-time-block__unit {
    margin-top: 10px;
    font-size: var(--date-size-text-desktop);
  }

  .premium-promo-timer .premium-promo-time-block__num {
    font-size: var(--date-size-number-desktop);
    min-width: 48.6px;
  }
}

@media (min-width: 992px) {
  .premium-promo-discount-text p {
    font-size: var(--title-1-size-desktop);
  }

  .premium-promo-content-title {
    font-size: var(--title-2-size-desktop);
  }

  .premium-promo-section {
    flex-direction: row;
    height: 100%;
    width: auto;
  }

  .premium-promo-content-section {
    margin-bottom: 0;
    text-align: start;
  }

  .premium-promo-discount-text {
    margin-bottom: 0;
  }

  .premium-promo-container {
    flex-direction: row;
    height: 320px;
  }

  .premium-promo-separator {
    height: 285px;
    width: 0;
    border-left: 4px dashed var(--banner-background);
    border-top: none;
  }

  .premium-promo-timer {
    margin-bottom: 0;
  }
}
</style>