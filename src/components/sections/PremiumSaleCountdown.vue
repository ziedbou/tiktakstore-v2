<template>
  <div class="premium-sale-countdown">
    <div 
      class="premium-sale-countdown__wrapper"
      :style="{
        '--pt': data.values.padding_top + 'px',
        '--pt-desktop': data.values.padding_top_desktop + 'px',
        '--pb': data.values.padding_bottom + 'px',
        '--pb-desktop': data.values.padding_bottom_desktop + 'px'
      }"
    >
      <div 
        class="premium-sale-countdown__container"
        :style="{
          'background-color': data.values.background || '#000000',
          'border-radius': '15px'
        }"
      >
        <div class="premium-sale-countdown__content">
          <div class="premium-sale-countdown__text">
            <div 
              class="premium-sale-countdown__heading"
              :style="{ color: data.values.color || '#fff' }"
            >
              {{ data.values.title }}
            </div>
            <div 
              class="premium-sale-countdown__subtitle"
              :style="{ color: data.values.color || '#fff' }"
            >
              <p>{{ data.values.subtitle }}</p>
            </div>
          </div>

          <div 
            v-if="!isOfferEnded"
            class="premium-sale-countdown__timer"
            :style="{ color: data.values.text_color || '#fcfcfc' }"
          >
            <div class="time-block">
              <span class="time-block__num js-timer-days">0</span>
              <span class="time-block__unit">Jours</span>
            </div>
            <span class="time-divier"></span>
            <div class="time-block">
              <span class="time-block__num js-timer-hours">0</span>
              <span class="time-block__unit">Heures</span>
            </div>
            <span class="time-divier"></span>
            <div class="time-block">
              <span class="time-block__num js-timer-minutes">0</span>
              <span class="time-block__unit">Minutes</span>
            </div>
            <span class="time-divier"></span>
            <div class="time-block">
              <span class="time-block__num js-timer-seconds">0</span>
              <span class="time-block__unit">Secondes</span>
            </div>
          </div>

          <div 
            v-else
            class="premium-sale-countdown__completed-text"
            :style="{ color: data.values.text_color || '#fcfcfc' }"
          >
            {{ data.values.offer_ends_text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const isOfferEnded = ref(false);

onMounted(() => {
  startTimer();
});

function startTimer() {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
  
  const countDown = new Date(props.data.values.date + 'T00:00:00Z').getTime();
  
  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDown - now;
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Update timer elements
    const daysEl = document.querySelector('.js-timer-days');
    const hoursEl = document.querySelector('.js-timer-hours');
    const minutesEl = document.querySelector('.js-timer-minutes');
    const secondsEl = document.querySelector('.js-timer-seconds');

    if (daysEl) daysEl.innerText = days;
    if (hoursEl) hoursEl.innerText = hours;
    if (minutesEl) minutesEl.innerText = minutes;
    if (secondsEl) secondsEl.innerText = seconds;

    if (distance < 0) {
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      isOfferEnded.value = true;
      clearInterval(interval);
    }
  }, second);
}
</script>

<style>
.premium-sale-countdown__wrapper {
  padding-top: var(--pt);
  padding-bottom: var(--pb);
}

@media screen and (min-width: 750px) {
  .premium-sale-countdown__wrapper {
    padding-top: var(--pt-desktop);
    padding-bottom: var(--pb-desktop);
  }
}

.premium-sale-countdown__container {
  position: relative;
  padding: 32px;
}

@media screen and (min-width: 750px) {
  .premium-sale-countdown__container {
    padding: 25px 32px;
  }
}

@media screen and (min-width: 750px) {
  .premium-sale-countdown__container {
    padding-left: 4%;
    padding-right: 4%;
  }
}

.premium-sale-countdown__content {
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  text-align: center;
  line-height: 1.1;
}

@media screen and (min-width: 750px) {
  .premium-sale-countdown__content {
    flex-wrap: nowrap;
  }
}

.premium-sale-countdown__timer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-top: 16px;
  margin-bottom: 16px;
  align-items: stretch;
}

.premium-sale-countdown__timer .time-block {
  position: relative;
  border-radius: 12px;
  padding: 0 1rem;
}

.premium-sale-countdown__timer .time-block__num,
.premium-sale-countdown__timer .time-block__unit {
  display: block;
  text-align: center;
}

.premium-sale-countdown__timer .time-block__num {
  font-size: 25px;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 4px;
}

.premium-sale-countdown__timer .time-block__unit {
  text-transform: uppercase;
  margin-top: 6px;
  font-size: 10px;
}

@media (min-width: 750px) {
  .premium-sale-countdown__timer .time-block__unit {
    font-size: 12px;
  }
}

.premium-sale-countdown__timer .time-divier {
  position: relative;
  width: 1px;
  min-height: 100%;
  background-color: var(--color, #fcfcfc);
}

.premium-sale-countdown__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
  gap: 20px;
}

@media screen and (min-width: 750px) {
  .premium-sale-countdown__text {
    text-align: left;
  }
}

.premium-sale-countdown__subtitle p {
  margin: 0;
  line-height: 1.5;
  font-size: 14px;
}

.premium-sale-countdown__heading {
  font-weight: 700;
  font-size: 30px;
}

.premium-sale-countdown__completed-text {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}
</style>
