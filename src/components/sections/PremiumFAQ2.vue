<template>
  <div
    class="faq-two-wrapper"
    :style="{
      '--title-size-mobile': data.values.title_size_mobile + 'px',
      '--title-size-desktop': data.values.title_size_desktop + 'px',
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--question-size-mobile': data.values.question_size_mobile + 'px',
      '--question-size-desktop': data.values.question_size_desktop + 'px',
      '--question-color': data.values.question_color,
      '--answer-size-mobile': data.values.answer_size_mobile + 'px',
      '--answer-size-desktop': data.values.answer_size_desktop + 'px',
      '--answer-color': data.values.answer_color,
      '--arrow-color': data.values.arrow_color,
      '--btn-color': data.values.btn_color,
      '--btn-bg': data.values.btn_background,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-bg-hover': data.values.btn_background_hover,
      '--btn-radius': data.values.btn_color_border_radius + 'px'
    }"
  >
    <div class="faq-two-container">
      <div class="faq-two-content">
        <div class="faq-heading">
          <h2>{{ data.values.title }}</h2>
        </div>
        <div class="faq-subtitle">
          <p>{{ data.values.text }}</p>
        </div>
        <NuxtLink :to="data.values.link" class="faq-button">
          {{ data.values.link_text }}
       <svg height="192" viewBox="0 0 192 192" width="192" xmlns="http://www.w3.org/2000/svg"><path d="M187.827 98.7858C188.123 98.4749 188.123 98.4749 188.123 98.1761C188.419 97.8652 188.419 97.5663 188.704 97.5663C189 96.9566 189 96.6458 189 96.0361C189 95.4263 189 94.8166 188.704 94.5058C188.704 94.195 188.408 93.8961 188.123 93.5852C188.123 93.2744 187.827 93.2744 187.827 92.9755L103.287 4.21945C102.41 3.29889 101.533 3 100.668 3C99.791 3 98.6295 3.31083 98.0488 4.21945C97.1719 5.14 96.8872 6.06058 96.8872 6.96919C96.8872 7.88974 97.1833 9.10918 98.0488 9.7189L175.587 92.0539H6.79206C4.75371 92.0539 3 93.895 3 96.0351C3 98.1751 4.75365 100.016 6.79206 100.016H175.575L97.7543 182.042C96.2967 183.572 96.2967 186.322 97.7543 187.852C99.2119 189.383 101.831 189.383 103.288 187.852L187.827 98.7858Z"></path><path clip-rule="evenodd" d="M188.607 97.5657C188.432 97.5657 188.365 97.6788 188.27 97.8382C188.211 97.9378 188.141 98.0554 188.027 98.1748C188.027 98.4734 188.027 98.4734 187.731 98.7839L103.281 187.759C101.825 189.287 99.2085 189.287 97.7524 187.759C96.2963 186.23 96.2963 183.483 97.7524 181.954L175.492 100.013L6.88489 100.013C4.8486 100.013 3.09677 98.1739 3.09677 96.036C3.09677 93.8982 4.84866 92.059 6.88489 92.059L175.504 92.059L98.0465 9.80878C97.182 9.19968 96.8862 7.9815 96.8862 7.0619C96.8862 6.15422 97.1706 5.2346 98.0465 4.315C98.6267 3.40732 99.787 3.0968 100.663 3.0968C101.527 3.0968 102.403 3.39539 103.279 4.315L187.731 92.9796C187.731 93.1274 187.804 93.2021 187.877 93.2774C187.952 93.3543 188.027 93.4319 188.027 93.5887C188.046 93.6098 188.066 93.6308 188.085 93.6518C188.338 93.9267 188.584 94.1935 188.606 94.4689C188.607 94.482 188.607 94.4951 188.607 94.5083C188.903 94.8188 188.903 95.4279 188.903 96.037C188.903 96.6461 188.903 96.9566 188.607 97.5657ZM191.489 93.2767C191.79 93.8661 191.89 94.4204 191.934 94.7363C192.001 95.2226 192 95.7194 192 95.9856L192 96.037C192 96.0544 192 96.0729 192 96.0926C192 96.3523 192.001 96.8096 191.924 97.2931C191.828 97.8884 191.64 98.41 191.393 98.9184L190.546 100.663H190.212C190.127 100.759 190.038 100.852 189.988 100.905L189.974 100.92L105.527 189.891C102.85 192.701 98.1865 192.704 95.51 189.895C94.1476 188.464 93.5636 186.587 93.5636 184.857C93.5636 183.128 94.1468 181.252 95.5071 179.822M191.489 93.2767C191.316 92.7908 191.078 92.4357 190.938 92.2406C190.903 92.1912 190.866 92.142 190.828 92.0939V91.7408L105.522 2.17912C104.076 0.661813 102.397 0 100.663 0C99.3914 0 97.0569 0.401401 95.6212 2.37737C94.3151 3.83819 93.7895 5.45521 93.7895 7.0619C93.7895 8.26663 94.1183 10.6061 95.9608 12.111L168.333 88.9622L6.88489 88.9622C2.9981 88.9622 0 92.3316 0 96.036C0 99.7405 2.99801 103.11 6.88489 103.11L168.285 103.11"  fill-rule="evenodd"></path><path d="M169.5 104L16.5 102.5V90H171L97.5 10.5V7L107.5 4.5C131.167 29.6667 180.2 81.5 187 87.5C193.8 93.5 191.5 99 189.5 101L105.5 184L94 181.5L169.5 104Z" ></path></svg>
        </NuxtLink>
      </div>

      <div class="faq-two-items">
        <div
          v-for="(child, index) in data.values.children"
          :key="index"
          class="faq-two-item"
          :style="{
            borderRadius: data.values.question_border_radius + 'px',
            backgroundColor: data.values.question_background
          }"
        >
          <div class="faq-two-toggle" @click="toggle(index)">
            <p class="faq-two-question">{{ child.question }}</p>
            <div class="faq-two-arrow" :style="{ '--rotate': activeIndex === index ? '180deg' : '0deg' }">
             <svg preserveAspectRatio="xMidYMid meet" version="1.0" viewBox="0 0 143.000000 83.000000" xmlns="http://www.w3.org/2000/svg"><g stroke="none" transform="translate(0.000000,83.000000) scale(0.100000,-0.100000)"><path fill="rgb(122,115,105)" d="M57 772 l-57 -57 360 -360 360 -360 357 357 358 358 -63 62 -62 63 -298 -298 -297 -297 -295 295 c-162 162 -297 295 -300 295 -3 0 -31 -26 -63 -58z"></path></g></svg>
            </div>
          </div>

          <transition name="faq">
            <div v-show="activeIndex === index" class="faq-two-answer">
              <p>{{ child.answer }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ data: Object })
import { ref } from 'vue'
const activeIndex = ref(-1)
const toggle = index => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>

<style scoped>
.faq-two-wrapper {
  display: grid;
  gap: 20px;
}
.faq-two-container {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}
@media (min-width: 1024px) {
  .faq-two-container {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}
.faq-heading {
  text-align: center;
  margin-top: 0;
}
.faq-heading h2 {
  margin: 0;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
}
@media (min-width: 1024px) {
  .faq-heading {
    text-align: left;
  }
  .faq-heading h2 {
    font-size: var(--title-size-desktop);
  }
}
.faq-subtitle {
  text-align: center;
  margin-top: 20px;
  color: var(--text-color);
}
@media (min-width: 1024px) {
  .faq-subtitle {
    text-align: left;
  }
}
.faq-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 22px;
  font-weight: bold;
  border-radius: var(--btn-radius);
  background-color: var(--btn-bg);
  color: var(--btn-color);
  width: fit-content;
  margin: 16px auto 0;
  text-decoration: none;
  transition: all 0.25s ease;
}
.faq-button svg {
  fill:var(--btn-color);
}
.faq-button:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-bg-hover);
}
.faq-button svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}
@media (min-width: 1024px) {
  .faq-button {
    margin: 40px 0 0;
    font-size: 16px;
    padding: 16px 24px;
  }
}
.faq-two-items {
  display: flex;
  flex-direction: column;
}
.faq-two-item {
  padding: 20px;
  margin-bottom: 10px;
  position: relative;
  box-shadow: rgba(18, 18, 23, 0.08) 0px 6px 4px -1px;
  transition: all 0.3s ease;
  overflow: hidden;
}
.faq-two-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  gap: 12px;
}
.faq-two-arrow {
  transition: transform 0.3s ease;
  transform: rotate(var(--rotate));
  width: 24px;
  height: 24px;
      justify-content: center;
    display: flex;
    align-items: center;
}
.faq-two-toggle,
.faq-two-question,
.faq-two-arrow {
  user-select: none;
}

.faq-two-arrow svg {
  width: 12px;
  height: 12px;
}
.faq-two-question {
  margin: 0;
  font-size: var(--question-size-mobile);
  color: var(--question-color);
  font-weight: bold;
  line-height: 130%;
}
.faq-two-answer {
  padding-top: 16px;
  font-size: var(--answer-size-mobile);
  color: var(--answer-color);
  line-height: 170%;
}
@media (min-width: 1024px) {
  .faq-two-question {
    font-size: var(--question-size-desktop);
  }
  .faq-two-answer {
    font-size: var(--answer-size-desktop);
  }
}
.faq-enter-active, .faq-leave-active {
  transition: all 0.3s ease;
}
.faq-enter-from, .faq-leave-to {
  opacity: 0;
  height: 0;
  padding-top: 0;
}
</style>
