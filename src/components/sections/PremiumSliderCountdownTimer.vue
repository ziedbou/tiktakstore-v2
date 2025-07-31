<template>
  <div 
    class="countdown-banner-wrapper" 
    :style="{
      '--button-border-radius': data.values.button_border_radius + 'px',
      '--button-color': data.values.button_color,
      '--button-color-hover': data.values.button_color_hover,
      '--button-bg-color': data.values.button_bg_color,
      '--button-bg-color-hover': data.values.button_bg_hover_color,
      '--button-border-color': data.values.button_border_color,
      '--button-border-color-hover': data.values.button_border_color_hover,
      '--count-down-color':data.values.count_down_color
    }"
  >
    <div 
      class="countdown-banner">
      <div 
      class="h-full w-full relative overflow-hidden"
        :style="{'border-radius': data.values.img_border_radius + 'px'}"
      >
        <!-- Desktop Image -->
        <img 
          :alt="data.values.alt_text || ''" 
          class="countdown-banner-image countdown-banner-image--desktop" 
          loading="lazy" 
          :src="data.values.image?.image"
        />
        
        <!-- Mobile Image -->
        <img 
          :alt="data.values.alt_text || ''" 
          class="countdown-banner-image countdown-banner-image--mobile" 
          loading="lazy" 
          :src="data.values.mobile_image?.image || data.values.image?.image"
        />

        <div class="countdown-banner-content">
          <div 
            style="
              opacity: 0.3;
              background-color: #000000;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: -1;
              display: block;
            "
            :style="{'background-color': '#000000', 'opacity': 0.3}"
          ></div>
            <h2 :style="{'color':data.values.title_color}" class=" text-2xl sm:text-4xl font-bold mb-4 px-4 max-w-3xl">{{ data.values.title }}</h2>
          <a 
            class="countdown-banner-button" 
            :href="data.values.link">
            {{ data.values.button_text }}
          </a>

          <div 
            class="countdown-timer" 
            ref="countdownTimer">
            <div class="time-block">
              <span class="time-block__num" ref="daysElement">00</span>
              <span class="time-block__unit">Days</span>
            </div>
            <span class="time-divier"></span>
            <div class="time-block">
              <span class="time-block__num" ref="hoursElement">00</span>
              <span class="time-block__unit">Hours</span>
            </div>
            <span class="time-divier"></span>
            <div class="time-block">
              <span class="time-block__num" ref="minutesElement">00</span>
              <span class="time-block__unit">Minutes</span>
            </div>
            <span class="time-divier"></span>
            <div class="time-block">
              <span class="time-block__num" ref="secondsElement">00</span>
              <span class="time-block__unit">Seconds</span>
            </div>
          </div>

          <div 
            class="countdown-timer-completed-text" 
            ref="completedTextElement"
            :style="{'display': 'none', 'color': data.values.timer_color || '#ffffff'}"
          >
            {{ data.values.offer_ends_text || 'This offer has ended!' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// Refs for DOM elements
const countdownTimer = ref(null);
const daysElement = ref(null);
const hoursElement = ref(null);
const minutesElement = ref(null);
const secondsElement = ref(null);
const completedTextElement = ref(null);

// Countdown timer interval
let countdownInterval = null;

const startTimer = () => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  
  // Use the date from props or fallback to a future date
  const targetDate = new Date(props.data.values.date || '2026-01-01T00:00:00Z').getTime();
  
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    
    // Update DOM elements
    if (daysElement.value) daysElement.value.innerText = days.toString().padStart(2, '0');
    if (hoursElement.value) hoursElement.value.innerText = hours.toString().padStart(2, '0');
    if (minutesElement.value) minutesElement.value.innerText = minutes.toString().padStart(2, '0');
    if (secondsElement.value) secondsElement.value.innerText = seconds.toString().padStart(2, '0');
    
    // Check if countdown has ended
    if (distance < 0) {
      // Set all values to 00
      if (daysElement.value) daysElement.value.innerText = '00';
      if (hoursElement.value) hoursElement.value.innerText = '00';
      if (minutesElement.value) minutesElement.value.innerText = '00';
      if (secondsElement.value) secondsElement.value.innerText = '00';
      
      // Show completed text
      if (completedTextElement.value) {
        completedTextElement.value.style.display = 'block';
      }
      
      // Hide timer elements
      if (countdownTimer.value) {
        countdownTimer.value.style.display = 'none';
      }
      
      clearInterval(countdownInterval);
    }
  }, second);
};

onMounted(() => {
  startTimer();
});

onBeforeUnmount(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>

<style scoped>

.countdown-banner {
  position: relative;
  height: 500px;
  overflow: hidden;
}

@media screen and (min-width: 750px) {
  .countdown-banner {
    height: 600px;
  }
}

.countdown-banner .countdown-banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.countdown-banner .countdown-banner-image--desktop {
  display: none;
}

@media screen and (min-width: 750px) {
  .countdown-banner .countdown-banner-image--desktop {
    display: block;
  }
  .countdown-banner .countdown-banner-image--mobile {
    display: none;
  }
}

.countdown-banner-content {
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-align: center;
  line-height: 1.1;
}

.countdown-banner-button {
  padding: 9px 25px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  cursor: pointer;
  color: var(--button-color);
  background-color: var(--button-bg-color);
  border-color: var(--button-border-color);
  border-style: solid;
  border-radius: var(--button-border-radius);
  margin:5px 10px;
}

.countdown-banner-button:hover {
  color: var(--button-color-hover);
  background-color: var(--button-bg-color-hover);
  border-color: var(--button-border-color-hover);
  transform: translateY(-3px);
}

.countdown-banner-button:active {
  transform: translateY(-1px);
}

@media screen and (min-width: 750px) {
  .countdown-banner-button {
    padding: 11px 25px;
  }
}

.countdown-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 5px 10px;
  color:var(--count-down-color);
}

@media (min-width: 750px) {
  .countdown-timer {
    gap: 20px;
  }
}

.countdown-timer .time-block {
  position: relative;
  border-radius: 12px;
  padding: 0 1rem;
}

.countdown-timer .time-block__num,
.countdown-timer .time-block__unit {
  display: block;
  text-align: center;
}

.countdown-timer .time-block__num {
  font-size: 25px;
  line-height: 1;
}

.countdown-timer .time-block__unit {
  text-transform: uppercase;
  margin-top: 6px;
  font-size: 10px;
}

@media (min-width: 750px) {
  .countdown-timer .time-block__unit {
    font-size: 12px;
  }
}

.countdown-timer .time-divier {
  position: relative;
  width: 1px;
  height: 40px;
  background-color: var(--count-down-color);
}

.countdown-timer-completed-text {
  display: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
}

</style>
