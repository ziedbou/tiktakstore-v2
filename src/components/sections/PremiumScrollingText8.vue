<template>
  <div 
    class="scrolling-wrap no-padding"
    :style="{
      '--text-full-color': data.values.text_full_color,
      '--text-empty-color': data.values.text_empty_color,
      '--text-size-mobile': data.values.text_size_mobile + 'px',
      '--text-size-desktop': data.values.text_size_desktop + 'px',
      '--date-color': data.values.date_color,
      '--image-border-radius': data.values.image_border_radius + 'px'
    }"
  >
    <div v-for="(_, groupIndex) in 3" :key="'group-' + groupIndex" class="scrolling-list">
      <template v-for="(_, itemIndex) in 4" :key="'set-' + itemIndex">
        <div class="scrolling-item scrolling-item-text">
          <a class="scrolling-text" :href="data.values.link">
            {{ data.values.text_full }}<span class="scrolling-stencill ml-4">{{ data.values.text_empty }}</span>
          </a>
        </div>
        <div class="scrolling-item scrolling-item-timer">
          <div class="countdown-timer">
            <div class="time-block">
              <div class="time-row">
                <span class="time-block__num js-timer-days">00</span>
                <span class="separator">:</span>
              </div>
              <span class="time-block__unit">JOURS</span>
            </div>
            <div class="time-block">
              <div class="time-row">
                <span class="time-block__num js-timer-hours">00</span>
                <span class="separator">:</span>
              </div>
              <span class="time-block__unit">HEURE</span>
            </div>
            <div class="time-block">
              <div class="time-row">
                <span class="time-block__num js-timer-minutes">00</span>
                <span class="separator">:</span>
              </div>
              <span class="time-block__unit">MIN</span>
            </div>
            <div class="time-block">
              <div class="time-row">
                <span class="time-block__num js-timer-seconds">00</span>
              </div>
              <span class="time-block__unit">SEC</span>
            </div>
          </div>
          <div class="countdown-completed-text"></div>
        </div>
        <div class="scrolling-item scrolling-item-image">
          <div class="scrolling-image">
            <img :src="data.values.image?.image" alt="" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  // Wait a short moment to ensure DOM is fully rendered
  setTimeout(() => {
    initScrollingText();
  }, 100);
});

function initScrollingText() {
  // Get all countdown timer elements
  const timers = document.querySelectorAll('.countdown-timer');
  
  if (!timers.length) {
    console.warn('No countdown timers found in the DOM');
    return;
  }
  
  // Set up each timer
  timers.forEach(timer => {
    // Make sure the countdown date is valid
    if (!props.data.values.date) {
      console.warn('No countdown date provided');
      return;
    }
    
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
    
    let countDown;
    try {
      countDown = new Date(props.data.values.date).getTime();
    } catch (error) {
      console.error('Invalid date format:', props.data.values.date);
      return;
    }
    
    // Reference to DOM elements
    const daysEl = timer.querySelector('.js-timer-days');
    const hoursEl = timer.querySelector('.js-timer-hours');
    const minutesEl = timer.querySelector('.js-timer-minutes');
    const secondsEl = timer.querySelector('.js-timer-seconds');
    const completedTextEl = timer.parentElement.querySelector('.countdown-completed-text');
    
    // Ensure all elements exist
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
      console.warn('Missing timer elements');
      return;
    }
    
    // Update function for the timer
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = countDown - now;
      
      if (distance < 0) {
        // Timer expired
        daysEl.innerText = '00';
        hoursEl.innerText = '00';
        minutesEl.innerText = '00';
        secondsEl.innerText = '00';
        
        if (completedTextEl) {
          completedTextEl.style.display = 'block';
        }
        
        clearInterval(interval);
        return;
      }
      
      // Calculate time units
      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);
      
      // Format with leading zeros
      daysEl.innerText = days < 10 ? `0${days}` : days;
      hoursEl.innerText = hours < 10 ? `0${hours}` : hours;
      minutesEl.innerText = minutes < 10 ? `0${minutes}` : minutes;
      secondsEl.innerText = seconds < 10 ? `0${seconds}` : seconds;
    };
    
    // Initial update
    updateTimer();
    
    // Set up interval for updating the timer
    const interval = setInterval(updateTimer, second);
  });
}
</script>

<style scoped>
.scrolling-wrap {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  background-attachment: scroll !important;
  transform-origin: center;
  overflow: hidden;
}

.scrolling-list {
  display: flex;
  align-items: center;
  white-space: nowrap;
  background-attachment: scroll !important;
  animation: scrollingTextTicker 40s infinite linear;
  flex-shrink: 0;
}

.scrolling-item {
  background-attachment: scroll !important;
  flex-shrink: 0;
  text-decoration: none;
}

@keyframes scrollingTextTicker {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.scrolling-wrap:hover .scrolling-list {
  animation-play-state: paused;
}

.scrolling-item-text {
  text-decoration: none;
}

.scrolling-text {
  margin: 0px;
  margin-right: 40px;
  font-size: var(--text-size-mobile);
  color: var(--text-full-color);
  line-height: 130%;
  text-transform: unset;
  letter-spacing: 0px;
  text-decoration: none;
  font-weight: 900;
  font-style: normal;
}

.scrolling-text:hover {
  color: var(--text-full-color);
}

.scrolling-stencill {
  -webkit-text-stroke: 2px var(--text-empty-color);
  -webkit-text-fill-color: transparent;
}

.countdown-timer {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
}

.countdown-timer .time-row {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.countdown-timer .time-block__num {
  min-width: 27.0px;
  text-align: center;
}

.countdown-timer .separator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -6.0px;
}

.countdown-timer .time-block__num,
.countdown-timer .separator {
  margin: 0px;
  font-size: 20px;
  color: var(--date-color);
  line-height: 100%;
  text-transform: unset;
}

.countdown-timer .time-block__unit {
  display: block;
  width: 100%;
  text-align: center;
  margin: 0px;
  margin-top: 10px;
  font-size: 12px;
  color: var(--date-color);
  line-height: 100%;
  text-transform: unset;
  font-weight: 400;
  font-style: normal;
}

.scrolling-image {
  margin-right: 40px;
  width: 50px;
  overflow: hidden;
  border-radius: var(--image-border-radius);
}

.scrolling-image img,
.scrolling-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scrolling-image svg {
  background-color: #F7F7F7;
}

.countdown-completed-text {
  display: none;
}

@media(min-width: 1024px) {
  .scrolling-text {
    margin-right: 50px;
    font-size: var(--text-size-desktop);
  }
  
  .countdown-timer {
    margin-right: 50px;
  }

  .countdown-timer .time-block__unit {
    margin-top: 10px;
    font-size: 16px;
  }

  .countdown-timer .time-block__num,
  .countdown-timer .separator {
    font-size: 36px;
  }

  .countdown-timer .separator {
    right: -10.8px;
  }

  .countdown-timer .time-block__num {
    min-width: 48.6px;
  }
  
  .scrolling-image {
    margin-right: 50px;
    width: 100px;
  }
}
</style>