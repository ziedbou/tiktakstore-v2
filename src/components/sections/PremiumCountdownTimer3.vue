<template>
  <div
    class="countdown-body"
    :style="{
      '--sub-title-color': data.values.sub_title_color,
      '--title-color': data.values.title_color,
      '--title-size-mobile': data.values.title_size_mobile + 'px',
      '--title-size-desktop': data.values.title_size_desktop + 'px',
      '--text-color': data.values.text_color,
      '--btn-color': data.values.btn_color,
      '--btn-background': data.values.btn_background,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-background-hover': data.values.btn_background_hover,
      '--left-section-background': data.values.left_section_background,
      '--timer-color': data.values.timer_color,
      '--timer-background-color': data.values.timer_background_color,
      '--timer-border-color': data.values.timer_border_color,
    }"
  >
      <div class="countdown-content">
        <div class="countdown-subheading">
          <p>{{ data.values.sub_title }}</p>
        </div>
        <div class="countdown-heading">
          <h2>{{ data.values.title }}</h2>
        </div>
        <div class="countdown-text">
          <p>{{ data.values.text }}</p>
        </div>
        <div class="countdown-timer">
          <div class="time-block">
            <span class="time-block__num js-timer-days">00</span>
            <span class="time-block__unit">Days</span>
          </div>
          <div class="time-block">
            <span class="time-block__num js-timer-hours">00</span>
            <span class="time-block__unit">Hours</span>
          </div>
          <div class="time-block">
            <span class="time-block__num js-timer-minutes">00</span>
            <span class="time-block__unit">Minutes</span>
          </div>
          <div class="time-block">
            <span class="time-block__num js-timer-seconds">00</span>
            <span class="time-block__unit">Seconds</span>
          </div>
        </div>
        <div class="countdown-timer-completed-text"></div>
        <a class="countdown-button" :href="data.values.link">{{
          data.values.btn_text
        }}</a>
      </div>
      <div class="countdown-image">
        <img :src="data.values.image.image" alt="" loading="lazy" />
      </div>
    </div>
  
</template>

<script setup>
import { onMounted } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  startTimer();
});

function startTimer() {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    wrapper = document.querySelector(".countdown-timer"),
    countDown = new Date(props.data.values.date + "T00:00:00Z").getTime();

  const interval = setInterval(function () {
    let now = new Date().getTime(),
      distance = countDown - now,
      days = Math.floor(distance / day),
      hours = Math.floor((distance % day) / hour),
      minutes = Math.floor((distance % hour) / minute),
      seconds = Math.floor((distance % minute) / second);

    wrapper.querySelector(".js-timer-days").innerText = days;
    wrapper.querySelector(".js-timer-hours").innerText = hours;
    wrapper.querySelector(".js-timer-minutes").innerText = minutes;
    wrapper.querySelector(".js-timer-seconds").innerText = seconds;

    if (distance < 0) {
      wrapper.querySelector(".js-timer-days").innerText = "00";
      wrapper.querySelector(".js-timer-hours").innerText = "00";
      wrapper.querySelector(".js-timer-minutes").innerText = "00";
      wrapper.querySelector(".js-timer-seconds").innerText = "00";

      document.querySelector(".countdown-timer-completed-text").style.display =
        "block";
      clearInterval(interval);
    }
  }, second);
}
</script>

<style>

.countdown-body {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0px;
}

.countdown-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 24px;
  border-radius: 0px;
  background-color: var(--left-section-background);
  box-sizing: border-box;
  order: 2;
}

.countdown-subheading {
  text-align: center;
}

.countdown-subheading * {
  margin: 0px;
  font-size: 14px;
  color: var(--sub-title-color);
  line-height: 130%;
  text-transform: unset;
}

.countdown-heading {
  margin-top: 6px;
  text-align: center;
}

.countdown-heading * {
  margin: 0px;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
}

.countdown-text {
  width: 100%;
  max-width: 100%;
  margin-top: 9px;
  text-align: center;
}

.countdown-text * {
  margin: 0px;
  font-size: 16px;
  color: var(--text-color);
  line-height: 150%;
  text-transform: unset;
}

.countdown-button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  margin: 0;
  margin-top: 12px;
  font-size: 14px;
  color: var(--btn-color);
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 16px 26px;
  border-radius: 0px;
  border: 1px solid var(--btn-background);
  background-color: var(--btn-background);
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
  cursor: pointer;
}

.countdown-button:hover {
  color: var(--btn-color-hover);
  border: 1px solid var(--btn-background-hover);
  background-color: var(--btn-background-hover);
  transition: all 0.25s ease 0s;
}

.countdown-image {
  overflow: hidden;
  order: 1;
  aspect-ratio: 12/12;
}

.countdown-image img,
.countdown-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.countdown-image svg {
  background-color: #dddddd;
}

.countdown-timer {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0px;
}

.countdown-timer .time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 0px;
  border: 1px solid var(--timer-border-color);
  background-color: var(--timer-background-color);
}

.countdown-timer .time-block:not(:first-child) {
  border-left: 0px;
}

.countdown-timer .time-block__num {
  margin: 0px;
  font-size: 20px;
  color: var(--timer-color);
  line-height: 130%;
  text-transform: unset;
}

.countdown-timer .time-block__unit {
  margin: 0px;
  margin-top: 6px;
  font-size: 12px;
  color: var(--timer-color);
  line-height: 130%;
  text-transform: unset;
}

.countdown-timer-completed-text {
  display: none;
}

@media (min-width: 1024px) {

  .countdown-body {
    grid-template-columns: repeat(2, 1fr);
    gap: 0px;
  }

  .countdown-content {
    align-items: center;
    justify-content: center;
    padding: 24px 24px;
    order: 1;
  }

  .countdown-subheading {
    text-align: center;
  }

  .countdown-subheading * {
    font-size: 14px;
  }

  .countdown-heading {
    margin-top: 8px;
    text-align: center;
  }

  .countdown-heading * {
    font-size: var(--title-size-desktop);
  }

  .countdown-text {
    max-width: 74%;
    margin-top: 12px;
    text-align: center;
  }

  .countdown-text * {
    font-size: 16px;
  }

  .countdown-button {
    margin-top: 16px;
    padding: 16px 26px;
    font-size: 14px;
  }

  .countdown-timer {
    margin-top: 24px;
    gap: 0px;
  }

  .countdown-timer .time-block {
    padding: 12px 24px;
  }

  .countdown-timer .time-block__unit {
    margin-top: 8px;
    font-size: 16px;
  }

  .countdown-timer .time-block__num {
    font-size: 34px;
  }

  .countdown-image {
    aspect-ratio: 12/12;
    order: 2;
  }

  .countdown-timer .time-block:not(:first-child) {
    border-left: 0px;
  }
}
</style>
