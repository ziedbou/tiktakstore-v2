<template>
  <div :class="[{'no-padding':data.design.container=='container-fluid'},'countdown-last-call']" >
    <div 
      class="countdown-last-call__wrapper"
      :style="{
        '--pt': data.values.padding_top + 'px',
        '--pt-desktop': data.values.padding_top_desktop + 'px',
        '--pb': data.values.padding_bottom + 'px',
        '--pb-desktop': data.values.padding_bottom_desktop + 'px',
        'background-color': data.values.background
      }"
    >
      <div 
        class="countdown-last-call__container"
        :style="{
          '--section-height': data.values.section_height,
          '--section-height-mobile': data.values.section_height_mobile
        }"
      >
        <div class="countdown-last-call__content flex-col md:flex-row">
          <div 
            class="countdown-last-call__heading"
            :style="{ color: data.values.color || '#fff' }"
          >
            {{ data.values.title }}
          </div>
          <div class="countdown-last-call__timer flex-col sm:flex-row gap-3 sm:gap-6">
            <div 
              v-if="!isOfferEnded"
              class="countdown-last-call__countdown"
              :style="{ color: data.values.text_color || '#fff' }"
            >
              <div class="time-block">
                <span class="time-block__num js-timer-days">0</span>
                <span class="time-block__unit">Jr</span>
              </div>
              <span class="time-colon">:</span>
              <div class="time-block">
                <span class="time-block__num js-timer-hours">0</span>
                <span class="time-block__unit">Hrs</span>
              </div>
              <span class="time-colon">:</span>
              <div class="time-block">
                <span class="time-block__num js-timer-minutes">0</span>
                <span class="time-block__unit">Mins</span>
              </div>
              <span class="time-colon">:</span>
              <div class="time-block">
                <span class="time-block__num js-timer-seconds">0</span>
                <span class="time-block__unit">Secs</span>
              </div>
            </div>
            <div 
              v-else
              class="countdown-last-call__offer-ended"
              :style="{ color: data.values.text_color || '#fff' }"
            >
              {{ data.values.offer_ends_text }}
            </div>
            <a 
              :href="data.values.link"
              class="countdown-last-call__button"
              :style="{
                color: data.values.btn_color || '#ffffff',
                backgroundColor: data.values.btn_background || '#fa61b3'
              }"
            >
              {{ data.values.btn_text }}
            </a>
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
  
  const countDown = new Date(props.data.values.date).getTime();
  
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

    if (daysEl) daysEl.innerText = (days < 10 ? '0' : '') + days;
    if (hoursEl) hoursEl.innerText = ('0' + hours).slice(-2);
    if (minutesEl) minutesEl.innerText = ('0' + minutes).slice(-2);
    if (secondsEl) secondsEl.innerText = ('0' + seconds).slice(-2);

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
.countdown-last-call a {
  padding: 10px 15px;
}

.countdown-last-call__wrapper {
  padding-top: var(--pt);
  padding-bottom: var(--pb);
  position: relative;
}

@media screen and (min-width: 750px) {
  .countdown-last-call__wrapper {
    padding-top: var(--pt-desktop);
    padding-bottom: var(--pb-desktop);
  }
}

.countdown-last-call__container {
  position: relative;
  height: var(--section-height-mobile);
  overflow: hidden;
}

@media screen and (min-width: 750px) {
  .countdown-last-call__container {
    height: var(--section-height);
  }
}

.countdown-last-call__content {
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  text-align: center;
  line-height: 1.1;
  padding: 16px 5px;
}

.countdown-last-call__heading {
  font-weight: 700;
  font-size: 20px;
}

@media (min-width: 750px) {
  .countdown-last-call__heading {
    font-size: 24px;
  }
}

.countdown-last-call__timer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.countdown-last-call__countdown {
  display: flex;
  justify-content: center;
  gap: 0px;
}

@media (min-width: 750px) {
  .countdown-last-call__countdown {
    gap: 0px;
  }

}

.countdown-last-call__countdown .time-block {
  position: relative;
  border-radius: 12px;
  padding: 0 0.5rem;
}

@media (min-width: 750px) {
  .countdown-last-call__countdown .time-block {
    padding: 0 0.75rem;
  }
}

.countdown-last-call__countdown .time-block__num,
.countdown-last-call__countdown .time-block__unit {
  display: block;
  text-align: center;
}

.countdown-last-call__countdown .time-block__num {
  font-size: 17px;
  font-weight: 700;
  line-height: 1;
}

.countdown-last-call__countdown .time-block__unit {
  margin-top: 3px;
  font-size: 9px;
}

@media (min-width: 750px) {
  .countdown-last-call__countdown .time-block__unit {
    font-size: 10px;
  }

  .countdown-last-call__countdown .time-block__num {
    font-size: 20px;
  }

  .countdown-last-call__countdown .time-colon {
    font-weight: 700;
    font-size: 20px;
  }
}

.countdown-last-call__countdown .time-colon {
  font-weight: 700;
  font-size: 17px;
}

.countdown-last-call__button {
  padding: 16px 12px;
  text-decoration: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  border: 0px #ffffff solid;
}

@media (min-width: 750px) {
  .countdown-last-call__button {
    padding: 16px 25px;
  }
}

.countdown-last-call__offer-ended {
  font-size: 17px;
  font-weight: 700;
  text-align: center;
}

@media (min-width: 750px) {
  .countdown-last-call__offer-ended {
    font-size: 20px;
  }
}
</style>
