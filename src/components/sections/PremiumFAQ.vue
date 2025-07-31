<template>
  <div
    class="overflow-hidden faq-section"
    :style="{
      '--title-size-mobile': data.values.title_size_mobile + 'px',
      '--title-size-desktop': data.values.title_size_desktop + 'px',
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--question-size-desktop': data.values.question_size_desktop + 'px',
      '--answer-size-desktop': data.values.answer_size_desktop + 'px'
    }"
  >
    <div class="mx-auto">
      <div class="faq-body">
        <div class="faq-content">
          <div class="faq-heading">
            <h2>{{ data.values.first_title }}<br />{{ data.values.second_title }}</h2>
          </div>
          <div class="faq-subtitle">
            <p>{{ data.values.sub_title }}</p>
          </div>
        </div>

        <div class="faq-items">
          <div
            v-for="(child, index) in data.values.children"
            :key="index"
            class="faq-item"
            :style="{
              borderRadius: data.values.question_border_radius + 'px',
              backgroundColor: data.values.question_background
            }"
          >
            <div class="faq-toggle" @click="toggle(index)">
              <p
                class="faq-question"
                :style="{
                  color: data.values.question_color,
                  fontSize: data.values.question_size_mobile + 'px'
                }"
              >
                {{ child.question }}
              </p>
              <div class="faq-arrow" :style="{ '--rotate': activeIndex === index ? '180deg' : '0deg' }">
                <svg viewBox="0 0 143 83" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0,83) scale(0.1,-0.1)">
                    <path d="M57 772 l-57 -57 360 -360 360 -360 357 357 358 358 -63 62 -62 63 -298 -298 -297 -297 -295 295 c-162 162 -297 295 -300 295 -3 0 -31 -26 -63 -58z" />
                  </g>
                </svg>
              </div>
            </div>

            <transition name="faq">
              <div
                v-show="activeIndex === index"
                class="faq-answer"
                :style="{
                  color: data.values.answer_color,
                  fontSize: data.values.answer_size_mobile + 'px'
                }"
              >
                <p>{{ child.answer }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
})

import { ref } from 'vue'

const activeIndex = ref(-1)

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>

<style scoped>
.faq-body {
  display: grid;
  gap: 20px;
}
.faq-item {
  padding: 20px;
  position: relative;
box-shadow: rgba(18, 18, 23, 0.08) 0px 6px 4px -1px;
  transition: all 0.3s ease;
  overflow: hidden;
  margin-bottom: 10px;
}
.faq-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  gap: 12px;
}
.faq-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
  transform: rotate(var(--rotate));
}
.faq-arrow svg {
  width: 12px;
  height: 12px;
  fill: #757575;
}
.faq-question {
  margin: 0;
  font-weight: 700;
  line-height: 130%;
}
.faq-answer {
  padding-top: 16px;
  line-height: 170%;
}
.faq-heading {
  text-align: center;
  margin-top: 0;
}
.faq-heading h2 {
  margin: 0;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 130%;
}
.faq-subtitle {
  text-align: center;
  margin-top: 20px;
  font-weight: 400;
  font-style: normal;
}
.faq-subtitle p {
  font-size: 16px;
  color: var(--text-color);
  line-height: 130%;
}
@media(min-width: 1024px) {
  .faq-body {
    gap: 30px;
  }
  .faq-heading h2 {
    font-size: var(--title-size-desktop);
  }
  .faq-subtitle p {
    font-size: 18px;
  }
  .faq-question {
    font-size: var(--question-size-desktop);
  }
  .faq-answer {
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