<template>
  <div
    class="section-countdown"
    :class="{ 'no-padding': data.design.container === 'container-fluid' }"
    :style="{
      '--background-color': data.values.background,
      '--text-color': data.values.text_color,
      '--btn-color': data.values.btn_color,
      '--btn-background': data.values.btn_background,
      background: 'var(--background-color)',
    }"
  >
    <div class="countdown-body">
      <div class="countdown-content">
        <div class="countdown-content-inner">
          <div class="countdown-heading">
            <h2>{{ data.values.title }}</h2>
          </div>
          <div class="countdown-text">
            <p>{{ data.values.description }}</p>
            <p v-if="isExpired" class="expired-message">
              {{ data.values.end_msg }}
            </p>
          </div>
          <div class="countdown-timer" v-if="!isExpired">
            <div class="time-block">
              <span class="time-block__num" ref="daysEl">00</span>
              <span class="time-block__unit">Days</span>
            </div>
            <div class="time-block">
              <span class="time-block__num" ref="hoursEl">00</span>
              <span class="time-block__unit">Hours</span>
            </div>
            <div class="time-block">
              <span class="time-block__num" ref="minutesEl">00</span>
              <span class="time-block__unit">Minutes</span>
            </div>
            <div class="time-block">
              <span class="time-block__num" ref="secondsEl">00</span>
              <span class="time-block__unit">Seconds</span>
            </div>
          </div>
          <div
            class="countdown-timer-completed-text"
            ref="completedTextEl"
            style="display: none"
          ></div>
          <a :href="data.values.link" class="countdown-button">
            {{ data.values.btn_text }}
          </a>
        </div>
      </div>
      <div class="countdown-image">
        <img :src="data.values.image?.image" alt="" loading="lazy" />
        <svg
          class="countdown-mobile-shape"
          width="1118"
          height="154"
          viewBox="0 0 1118 154"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 153.16h.992868C104.323 60.9285 327.224.00001207 558.971.00000194 790.784-.00000819 1001.94 52.0417 1116.93 153.16h1.01V-.0000225L558.971.00000195-.0000067.00002637 0 153.16Z"
            :fill="data.values.background"
          ></path>
        </svg>
        <svg
          class="countdown-desktop-shape"
          width="77"
          height="559"
          viewBox="0 0 77 559"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M.416016 0v.49646C46.5342 52.1643 77 163.62 77 279.5 77 395.412 50.9778 500.997.416016 558.496V559H77V0H.416016Z"
            :fill="data.values.background"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const daysEl = ref(null);
const hoursEl = ref(null);
const minutesEl = ref(null);
const secondsEl = ref(null);
const completedTextEl = ref(null);
const isExpired = ref(false);

onMounted(() => {
  if (props.data.values.date) {
    checkExpiration();
    if (!isExpired.value) {
      startTimer();
    }
  }
});

function checkExpiration() {
  const countDownDate = props.data.values.date;
  const countDown = new Date(countDownDate + "T00:00:00Z").getTime();
  const now = new Date().getTime();

  if (countDown <= now) {
    isExpired.value = true;
  }
}

function startTimer() {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    countDown = new Date(props.data.values.date + "T00:00:00Z").getTime();

  const interval = setInterval(function () {
    let now = new Date().getTime(),
      distance = countDown - now,
      days = Math.floor(distance / day),
      hours = Math.floor((distance % day) / hour),
      minutes = Math.floor((distance % hour) / minute),
      seconds = Math.floor((distance % minute) / second);

    if (daysEl.value) daysEl.value.innerText = days < 10 ? `0${days}` : days;
    if (hoursEl.value)
      hoursEl.value.innerText = hours < 10 ? `0${hours}` : hours;
    if (minutesEl.value)
      minutesEl.value.innerText = minutes < 10 ? `0${minutes}` : minutes;
    if (secondsEl.value)
      secondsEl.value.innerText = seconds < 10 ? `0${seconds}` : seconds;

    if (distance < 0) {
      isExpired.value = true;

      if (daysEl.value) daysEl.value.innerText = "00";
      if (hoursEl.value) hoursEl.value.innerText = "00";
      if (minutesEl.value) minutesEl.value.innerText = "00";
      if (secondsEl.value) secondsEl.value.innerText = "00";

      if (completedTextEl.value) completedTextEl.value.style.display = "block";

      clearInterval(interval);
    }
  }, second);
}
</script>

<style scoped>
.expired-message {
  font-weight: bold;
  color: var(--text-color);
  font-size: 24px !important;
}

.countdown-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0px;
}

.countdown-image {
  border-radius: 0px;
  border: 0px solid;
  overflow: hidden;
  position: relative;
  order: 1;
  aspect-ratio: 12/10;
}

.countdown-image > img:first-child,
.countdown-image > svg:first-child {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.countdown-image > svg:first-child {
  background-color: #afafaf;
}

.countdown-desktop-shape {
  display: none;
  position: absolute;
  height: 102%;
  width: auto;
  z-index: 2;
  top: -1%;
}

.countdown-mobile-shape {
  position: absolute;
  height: auto;
  width: 100%;
  z-index: 2;
  left: 0;
  top: -1px;
}

.countdown-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  order: 2;
}

.countdown-content-inner {
  width: 100%;
}

.countdown-heading {
  text-align: center;
  margin-top: 0px;
}

.countdown-heading * {
  margin: 0;
  font-size: 32px;
  color: var(--text-color);
  line-height: 130%;
  text-transform: unset;
  font-weight: bold;
}

.countdown-text {
  text-align: center;
  margin-top: 8px;
}

.countdown-text * {
  margin: 0;
  font-size: 18px;
  color: var(--text-color);
  line-height: 150%;
  text-transform: unset;
}

.countdown-timer {
  margin-top: 12px;
  display: flex;
  align-items: stretch;
  gap: 6px;
  justify-content: center;
}

.countdown-timer .time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 70px;
  gap: 10px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 6px 6px;
}

.countdown-timer .time-block__num {
  margin: 0;
  font-size: 35px;
  color: var(--text-color);
  line-height: 100%;
  text-transform: unset;
  font-weight: 700;
}

.countdown-timer .time-block__unit {
  margin: 0;
  font-size: 11px;
  color: var(--text-color);
  line-height: 100%;
  text-transform: unset;
}

.countdown-timer-completed-text {
  display: none;
}

.countdown-timer-completed-text * {
  margin: 0;
  font-size: 16px;
  color: var(--text-color);
  line-height: 100%;
  text-transform: unset;
}

.countdown-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 300px;
  margin: 0;
  margin-top: 24px;
  margin-left: auto;
  margin-right: auto;
  font-size: 18px;
  color: var(--btn-color);
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 12px 32px;
  border-radius: 8px;
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
  background-color: var(--btn-background);
}

.countdown-button:hover {
  color: #ffffff;
  background-color: var(--btn-background);
  transition: all 0.25s ease 0s;
}

.countdown-button svg {
  width: 14px;
  height: 14px;
}

.countdown-button svg path {
  fill: #ffffff;
  transition: all 0.25s ease 0s;
}

.countdown-button:hover svg path {
  fill: #ffffff;
  transition: all 0.25s ease 0s;
}

@media (min-width: 1024px) {
  .countdown-body {
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: center;
  }

  .countdown-desktop-shape {
    display: block;
    right: -1px;
  }

  .countdown-mobile-shape {
    display: none;
  }

  .countdown-content {
    align-items: start;
    padding: 40px 24px;
    order: 2;
  }

  .countdown-content-inner {
    max-width: 600px;
  }

  .countdown-image {
    order: 1;
    aspect-ratio: 12/10;
  }

  .countdown-heading {
    text-align: left;
    margin-top: 0px;
  }

  .countdown-heading * {
    font-size: 50px;
  }

  .countdown-text {
    text-align: left;
    margin-top: 8px;
  }

  .countdown-text * {
    font-size: 24px;
  }

  .countdown-timer {
    margin-top: 16px;
    gap: 8px;
    justify-content: start;
  }

  .countdown-timer .time-block {
    max-width: 70px;
    padding: 8px 8px;
  }

  .countdown-timer .time-block__num {
    font-size: 35px;
  }

  .countdown-timer .time-block__unit {
    font-size: 11px;
  }

  .countdown-timer-completed-text * {
    font-size: 11px;
  }

  .countdown-button {
    margin-top: 28px;
    max-width: 300px;
    padding: 16px 32px;
    font-size: 18px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>
