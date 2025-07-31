<template>
  <div
    class="countdown-banner-wrapper"
    :style="{
      '--pt': '39px',
      '--pt-desktop': '52px',
      '--pb': '39px',
      '--pb-desktop': '52px',
      '--title-color': data.values.title_color,
      '--btn-text-color': data.values.btn_text_color,
      '--btn-bg-color': data.values.btn_bg,
      '--btn-border-color': data.values.btn_border_color,
      '--timer-color': data.values.time_color,
      backgroundColor: '#ffffff',
    }"
  >
    <div
      class="countdown-banner page-width"
      :style="{
        '--section-height': '600px',
        '--section-height-mobile': '500px',
      }"
    >
      <div
        style="
          height: 100%;
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 15px;
        "
      >
        <img
          class="countdown-banner-image countdown-banner-image--desktop"
          :src="data.values.image.image"
          alt=""
          loading="lazy"
        />

        <img
          class="countdown-banner-image countdown-banner-image--mobile"
          :src="data.values.image.image"
          loading="lazy"
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
          ></div>

            <p class="countdown-banner-heading">
              <strong
                style="font-size: 30px"
                :style="{ color: 'var(--title-color)' }"
              >
                {{ data.values.title }}
              </strong>
            </p>
       

          <NuxtLink
            :to="data.values.btn_link"
            class="countdown-banner-button"
            :style="{
              color: 'var(--btn-text-color)',
              backgroundColor: 'var(--btn-bg-color)',
              borderRadius: '50px',
              fontSize: '18px',
              border: '2px var(--btn-border-color) solid',
              margin: '5px 10px',
            }"
          >
            {{ data.values.btn_text }}
          </NuxtLink>

          <div
            class="countdown-timer"
            :style="{
              color: 'var(--timer-color)',
            }"
          >
            <div class="time-block">
              <span class="time-block__num js-timer-days">{{ days }}</span>
              <span class="time-block__unit">Days</span>
            </div>

            <span class="time-divier"></span>
            <div class="time-block">
              <span class="time-block__num js-timer-hours">{{ hours }}</span>
              <span class="time-block__unit">Hours</span>
            </div>

            <span class="time-divier"></span>
            <div class="time-block">
              <span class="time-block__num js-timer-minutes">{{
                minutes
              }}</span>
              <span class="time-block__unit">Minutes</span>
            </div>

            <span class="time-divier"></span>
            <div class="time-block">
              <span class="time-block__num js-timer-seconds">{{
                seconds
              }}</span>
              <span class="time-block__unit">Seconds</span>
            </div>
          </div>

          <div
            class="countdown-timer-completed-text"
            :style="{ display: timerCompleted ? 'block' : 'none' }"
          >
            Offer Expired
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Timer state
const days = ref("00");
const hours = ref("00");
const minutes = ref("00");
const seconds = ref("00");
const timerCompleted = ref(false);

const startTimer = () => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Create UTC date string in a Safari-friendly format
  const inputDate = props.data.values.end_date;
  const date = new Date(inputDate);
  const dateString = `${date.getUTCFullYear()}/${String(
    date.getUTCMonth() + 1
  ).padStart(2, "0")}/${String(date.getUTCDate()).padStart(2, "0")} ${String(
    date.getUTCHours()
  ).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}:00 UTC`;

  const countDown = Date.parse(dateString);

  // Timer interval
  let interval: any = null;

  interval = setInterval(() => {
    const now = Date.now();
    const distance = countDown - now;

    // Handle case when distance is negative or invalid
    if (distance < 0 || isNaN(distance)) {
      days.value = "00";
      hours.value = "00";
      minutes.value = "00";
      seconds.value = "00";
      timerCompleted.value = true;
      clearInterval(interval);
      return;
    }

    // Calculate time units
    const daysValue = Math.floor(distance / day);
    const hoursValue = Math.floor((distance % day) / hour);
    const minutesValue = Math.floor((distance % hour) / minute);
    const secondsValue = Math.floor((distance % minute) / second);

    // Format numbers to always show two digits
    const formatNumber = (num: number) => (num < 10 ? "0" + num : String(num));

    // Update reactive values
    days.value = formatNumber(daysValue);
    hours.value = formatNumber(hoursValue);
    minutes.value = formatNumber(minutesValue);
    seconds.value = formatNumber(secondsValue);
  }, second);
};

onMounted(() => {
  // Start timer with a small delay to ensure DOM is ready
  setTimeout(() => {
    startTimer();
  }, 100);
});
</script>

<style scoped>
.countdown-banner-wrapper {
  padding-top: var(--pt);
  padding-bottom: var(--pb);
}

@media screen and (min-width: 750px) {
  .countdown-banner-wrapper {
    padding-top: var(--pt-desktop);
    padding-bottom: var(--pb-desktop);
  }
}

.countdown-banner {
  position: relative;
  height: var(--section-height-mobile);
  overflow: hidden;
}

@media screen and (min-width: 750px) {
  .countdown-banner {
    height: var(--section-height);
  }
}

.countdown-banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.countdown-banner-image--desktop {
  display: none;
}

@media screen and (min-width: 750px) {
  .countdown-banner-image--desktop {
    display: block;
  }

  .countdown-banner-image--mobile {
    display: none;
  }
}

.countdown-timer-completed-text {
  display: none;
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

.countdown-banner-heading {
  margin: 0 10px;
}

.countdown-banner-button {
  padding: 9px 25px;
  text-decoration: none;
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
  background-color: var(--timer-color);
}
</style>
